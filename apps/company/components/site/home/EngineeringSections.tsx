import { Link } from "@company/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import {
	deploymentModels,
	developerDestinations,
	independenceSection,
	openSourceGroups,
	openSourceSection,
} from "@/lib/content/ecosystem";
import { SectionIntro } from "./SectionIntro";

/**
 * 05 — Infrastructure and independence. The operating philosophy, with the
 * three deployment models defined but never attached to a project that has not
 * documented support for them.
 */
export function IndependenceSection() {
	return (
		<section
			aria-labelledby="independence-title"
			className="border-b border-border bg-background py-20 sm:py-28"
		>
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
					<div className="min-w-0">
						<SectionIntro
							id="independence-title"
							eyebrow={independenceSection.eyebrow}
							title={independenceSection.title}
							description={independenceSection.description}
						/>

						<ul className="mt-8 space-y-3 border-t border-border pt-6">
							{independenceSection.points.map((point) => (
								<li
									key={point}
									className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
								>
									<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
									<span>{point}</span>
								</li>
							))}
						</ul>

						<div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
							<Link
								href="/infrastructure"
								variant="plain"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline hover:underline"
							>
								Infrastructure overview
								<ArrowRight className="size-3.5" aria-hidden="true" />
							</Link>
							<Link
								href="/infrastructure/architecture"
								variant="plain"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline hover:underline"
							>
								Architecture
								<ArrowRight className="size-3.5" aria-hidden="true" />
							</Link>
						</div>
					</div>

					<div className="min-w-0">
						<ol className="border-t border-border">
							{deploymentModels.map((model) => (
								<li
									key={model.name}
									className="grid gap-2 border-b border-border py-6 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-6"
								>
									<h3 className="font-display text-lg tracking-tight text-foreground">
										{model.name}
									</h3>
									<p className="text-sm leading-relaxed text-muted-foreground">
										{model.description}
									</p>
								</li>
							))}
						</ol>

						<p className="mt-6 border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
							{independenceSection.note}
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}

/**
 * 06 — Open source and developers. Official libraries, tools and platforms are
 * kept distinct, and each destination is an existing page or repository.
 */
export function OpenSourceSection() {
	return (
		<section
			aria-labelledby="open-source-title"
			className="border-b border-border bg-muted/30 py-20 sm:py-28"
		>
			<Container>
				<SectionIntro
					id="open-source-title"
					eyebrow={openSourceSection.eyebrow}
					title={openSourceSection.title}
					description={openSourceSection.description}
				/>

				<div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-16">
					<div className="grid min-w-0 gap-8 sm:grid-cols-3">
						{openSourceGroups.map((group) => (
							<section key={group.id} aria-labelledby={`open-source-${group.id}`} className="min-w-0">
								<h3
									id={`open-source-${group.id}`}
									className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground"
								>
									{group.title}
								</h3>
								<p className="mt-2 text-xs leading-relaxed text-muted-foreground">
									{group.description}
								</p>
								<ul className="mt-4 divide-y divide-border border-y border-border">
									{group.items.map((item) => (
										<li key={item.name} className="py-3">
											<p className="text-sm font-medium text-foreground">
												{item.name}
											</p>
											<p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
												{item.detail}
											</p>
											{item.packageName ? (
												<code className="mt-1.5 block break-all font-mono text-[11px] text-muted-foreground">
													{item.packageName}
												</code>
											) : null}
										</li>
									))}
								</ul>
							</section>
						))}
					</div>

					<div className="min-w-0">
						<ul className="divide-y divide-border border-y border-border">
							{developerDestinations.map((destination) => (
								<li key={destination.href}>
									<Link
										href={destination.href}
										variant="plain"
										target={destination.external ? "_blank" : undefined}
										rel={destination.external ? "noreferrer" : undefined}
										className="flex min-w-0 items-start justify-between gap-4 py-4 no-underline"
									>
										<span className="min-w-0">
											<span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
												{destination.label}
												{destination.external ? (
													<ArrowUpRight
														className="size-3.5 shrink-0 text-muted-foreground"
														aria-hidden="true"
													/>
												) : null}
											</span>
											<span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
												{destination.description}
											</span>
										</span>
										{destination.external ? (
											<span className="sr-only"> (opens in a new tab)</span>
										) : null}
									</Link>
								</li>
							))}
						</ul>
						<p className="mt-5 text-xs leading-relaxed text-muted-foreground">
							{openSourceSection.note}
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
