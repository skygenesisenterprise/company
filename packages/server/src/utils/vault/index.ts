import { db } from "@company/server/db";
import {
	type VaultProviderConfig,
	vaultProvider,
	vaultSecret,
} from "@company/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { awsClient } from "./aws";
import { awsParameterStoreClient } from "./aws-parameter-store";
import { azureClient } from "./azure";
import { dockerClient } from "./docker";
import { dopplerClient } from "./doppler";
import { gcpClient } from "./gcp";
import { genericClient } from "./generic";
import { hashicorpClient } from "./hashicorp";
import { infisicalClient } from "./infisical";
import { kubernetesClient } from "./kubernetes";
import { ociClient } from "./oci";
import { onepasswordClient } from "./onepassword";
import { phaseClient } from "./phase";
import { scalewayClient } from "./scaleway";
import type { VaultClient } from "./types";
import { vaultwardenClient } from "./vaultwarden";

export type { VaultClient, VaultSecretRecord } from "./types";

export const VAULT_REF_REGEX = /\$\{\{vault\.([a-zA-Z0-9_-]+)\.([^}]+)\}\}/g;

const clients: Record<VaultProviderConfig["providerType"], VaultClient> = {
	hashicorp: hashicorpClient as VaultClient,
	infisical: infisicalClient as VaultClient,
	aws: awsClient as VaultClient,
	"aws-parameter-store": awsParameterStoreClient as VaultClient,
	doppler: dopplerClient as VaultClient,
	azure: azureClient as VaultClient,
	scaleway: scalewayClient as VaultClient,
	phase: phaseClient as VaultClient,
	gcp: gcpClient as VaultClient,
	oci: ociClient as VaultClient,
	onepassword: onepasswordClient as VaultClient,
	vaultwarden: vaultwardenClient as VaultClient,
	kubernetes: kubernetesClient as VaultClient,
	docker: dockerClient as VaultClient,
	generic: genericClient as VaultClient,
};

export const getVaultClient = (
	providerType: VaultProviderConfig["providerType"],
) => clients[providerType];

export type VaultProviderType = VaultProviderConfig["providerType"];

/**
 * Where a provider can be operated. `managed` means an external SaaS reached
 * through its own API, `self-hosted` an instance or endpoint you run yourself,
 * and `internal` secrets read from the deployment runtime itself.
 */
export type VaultProviderCategory = "managed" | "self-hosted" | "internal";

/**
 * Explicit capability matrix per provider, surfaced in the Console so a
 * connected provider always shows exactly what it supports. Keeping it next to
 * the adapters means the API and the UI cannot disagree.
 */
export type VaultCapabilityMatrix = {
	/** Resolve `${{vault.*}}` references at deploy time (runtime injection). */
	readSecrets: boolean;
	/** Browse secret names from the Console — never their values. */
	listSecrets: boolean;
	/** Probe the provider with `testConnection`. */
	healthChecks: boolean;
	/** Support the `${{vault.<name>.secret:FIELD}}` JSON field syntax. */
	jsonFields: boolean;
	/** Provider-native rotation (V2 of the Secrets Manager roadmap). */
	rotation: boolean;
};

const capabilityMatrix: Record<VaultProviderType, VaultCapabilityMatrix> = {
	hashicorp: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	infisical: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	aws: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	"aws-parameter-store": {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	doppler: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	azure: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	scaleway: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	phase: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	gcp: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	oci: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	onepassword: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	vaultwarden: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	kubernetes: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
	docker: {
		readSecrets: true,
		listSecrets: true,
		healthChecks: true,
		jsonFields: false,
		rotation: false,
	},
	generic: {
		readSecrets: true,
		// Discovery is impossible on an arbitrary endpoint: references are paths.
		listSecrets: false,
		healthChecks: true,
		jsonFields: true,
		rotation: false,
	},
};

const categoryMatrix: Record<VaultProviderType, VaultProviderCategory> = {
	hashicorp: "self-hosted",
	infisical: "self-hosted",
	phase: "self-hosted",
	onepassword: "self-hosted",
	vaultwarden: "self-hosted",
	generic: "self-hosted",
	aws: "managed",
	"aws-parameter-store": "managed",
	azure: "managed",
	doppler: "managed",
	scaleway: "managed",
	gcp: "managed",
	oci: "managed",
	kubernetes: "internal",
	docker: "internal",
};

export const vaultProviderTypes = Object.keys(
	capabilityMatrix,
) as VaultProviderType[];

/**
 * `listSecrets` is derived from the adapter itself, so a provider can never
 * advertise a capability the adapter does not implement.
 */
export const getVaultCapabilities = (
	providerType: VaultProviderType,
): VaultCapabilityMatrix => ({
	...capabilityMatrix[providerType],
	listSecrets: typeof clients[providerType]?.listSecretNames === "function",
});

export const getVaultProviderCategory = (
	providerType: VaultProviderType,
): VaultProviderCategory => categoryMatrix[providerType];

const refKey = (providerName: string, ref: string) => `${providerName}\u0000${ref}`;

export type VaultResolutionScope = {
	organizationId: string;
	projectId: string;
	environmentId?: string;
};

export const isVaultProviderAssigned = (
	assignments: { projectId: string; environmentIds: string[] }[],
	projectId: string,
	environmentId?: string,
) =>
	assignments.some(
		(assignment) =>
			assignment.projectId === projectId &&
			(assignment.environmentIds.length === 0 ||
				!environmentId ||
				assignment.environmentIds.includes(environmentId)),
	);

export const resolveVaultReferences = async (
	rawEnv: string | null | undefined,
	scope?: VaultResolutionScope,
): Promise<string | null> => {
	if (!rawEnv) {
		return rawEnv ?? null;
	}

	const matches = [...rawEnv.matchAll(VAULT_REF_REGEX)];
	if (matches.length === 0) {
		return rawEnv;
	}

	if (!scope) {
		throw new Error(
			"Vault references (${{vault.*}}) are not supported in this context",
		);
	}

	const refsByProvider = new Map<string, Set<string>>();
	for (const match of matches) {
		const providerName = match[1] as string;
		const ref = match[2] as string;
		const refs = refsByProvider.get(providerName) ?? new Set<string>();
		refs.add(ref);
		refsByProvider.set(providerName, refs);
	}

	const providers = await db.query.vaultProvider.findMany({
		where: eq(vaultProvider.organizationId, scope.organizationId),
	});

	// Secrets guilderia manages itself take precedence over the provider adapter,
	// so a name is always resolvable even if the external provider cannot list it.
	const managedByProvider = new Map<string, Map<string, string>>();
	if (providers.length > 0) {
		const managedSecrets = await db
			.select()
			.from(vaultSecret)
			.where(
				inArray(
					vaultSecret.vaultProviderId,
					providers.map((provider) => provider.vaultProviderId),
				),
			);
		for (const secret of managedSecrets) {
			const byName =
				managedByProvider.get(secret.vaultProviderId) ?? new Map<string, string>();
			byName.set(secret.name, secret.value);
			managedByProvider.set(secret.vaultProviderId, byName);
		}
	}

	const resolved = new Map<string, string>();
	await Promise.all(
		[...refsByProvider.entries()].map(async ([providerName, refs]) => {
			const provider = providers.find((p) => p.name === providerName);
			if (!provider) {
				throw new Error(
					`Vault provider "${providerName}" not found. Configure it in Settings -> Secrets Providers.`,
				);
			}
			if (
				!isVaultProviderAssigned(
					provider.assignments,
					scope.projectId,
					scope.environmentId,
				)
			) {
				throw new Error(
					`Vault provider "${providerName}" is not enabled for this project/environment. Assign it in Settings -> Secrets Providers.`,
				);
			}
			const managed = managedByProvider.get(provider.vaultProviderId);
			const externalRefs: string[] = [];
			for (const ref of refs) {
				const managedValue = managed?.get(ref);
				if (managedValue !== undefined) {
					resolved.set(refKey(providerName, ref), managedValue);
				} else {
					externalRefs.push(ref);
				}
			}
			if (externalRefs.length === 0) {
				return;
			}
			const client = clients[provider.providerType];
			const values = await client.getSecrets(provider.config, externalRefs);
			for (const ref of externalRefs) {
				const value = values[ref];
				if (value === undefined) {
					throw new Error(
						`Secret "${ref}" not found in vault provider "${providerName}"`,
					);
				}
				resolved.set(refKey(providerName, ref), value);
			}
		}),
	);

	return rawEnv.replace(
		VAULT_REF_REGEX,
		(_, providerName, ref) => resolved.get(refKey(providerName, ref)) ?? "",
	);
};

type EnvBearingEntity = {
	env: string | null;
	buildArgs?: string | null;
	buildSecrets?: string | null;
	environment: {
		environmentId: string;
		env: string | null;
		project: {
			projectId: string;
			env: string | null;
			organizationId: string;
		};
	};
};

export const withResolvedVaultRefs = async <T extends EnvBearingEntity>(
	entity: T,
): Promise<T> => {
	const scope: VaultResolutionScope = {
		organizationId: entity.environment.project.organizationId,
		projectId: entity.environment.project.projectId,
		environmentId: entity.environment.environmentId,
	};
	const resolve = (value: string | null | undefined) =>
		resolveVaultReferences(value ?? null, scope);

	const resolved: T = {
		...entity,
		env: await resolve(entity.env),
		environment: {
			...entity.environment,
			env: await resolve(entity.environment.env),
			project: {
				...entity.environment.project,
				env: await resolve(entity.environment.project.env),
			},
		},
	};

	if (entity.buildArgs !== undefined) {
		resolved.buildArgs = await resolve(entity.buildArgs);
	}
	if (entity.buildSecrets !== undefined) {
		resolved.buildSecrets = await resolve(entity.buildSecrets);
	}

	return resolved;
};
