"use client";

import {
	cn,
	Grid,
	GridItem,
	LayerCard,
	LinkButton,
	Tabs,
	Text,
} from "@company/react";
import * as React from "react";
import { deploymentModels, independenceSection } from "@/lib/content/ecosystem";
import {
	consumption,
	families,
	planSection,
	plans,
	type SubscriptionPlan,
	type SubscriptionPrice,
} from "@/lib/content/plans";
import { formatMinorUnits } from "@/lib/domain/pricing";
import { SectionHeading } from "./section-heading";

type PricingTab = "subscriptions" | "consumption" | "deployment";

const tabs = [
	{ value: "subscriptions", label: "Subscriptions" },
	{ value: "consumption", label: "Consumption" },
	{ value: "deployment", label: "Deployment" },
] as const;

function PlanPrice({ price }: { price: SubscriptionPrice }) {
	if (price.amountMinor !== null) {
		return (
			<span className="font-display text-3xl font-medium tracking-normal text-foreground tabular-nums">
				{formatMinorUnits(price.amountMinor, price.currency)}
				<Text variant="secondary" size="sm" as="span">
					/{price.interval}
				</Text>
			</span>
		);
	}

	return (
		<span className="text-sm font-medium text-foreground">
			{price.state === "quote" ? "Custom quote" : "Pricing in finalisation"}
		</span>
	);
}

function PlanCard({ plan }: { plan: SubscriptionPlan }) {
	return (
		<LayerCard
			className={cn(
				"flex h-full flex-col justify-between gap-10 rounded-xl border border-border p-6",
				plan.featured && "border-t-2 border-t-primary",
			)}
		>
			<LayerCard.Primary>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<h3 className="text-lg font-medium tracking-normal text-foreground">
						{plan.name}
					</h3>
					{plan.featured ? (
						<span className="font-mono text-xs text-muted-foreground">
							Recommended
						</span>
					) : null}
				</div>
				<p className="mt-3 text-xs text-muted-foreground">{plan.audience}</p>
				<p className="mt-2 text-xl font-medium tracking-normal text-foreground">
					{plan.headline}
				</p>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					{plan.summary}
				</p>
				<div className="mt-8">
					<PlanPrice price={plan.price} />
					<span className="mt-1 block text-xs text-muted-foreground">
						{plan.price.note}
					</span>
				</div>
				<ul className="mt-8 space-y-3">
					{plan.features.slice(0, 4).map((feature) => (
						<li
							key={feature}
							className="flex items-start gap-2.5 text-sm text-muted-foreground"
						>
							<span
								className={cn(
									"mt-2 size-1.5 shrink-0 rounded-full",
									plan.featured ? "bg-primary" : "bg-border",
								)}
								aria-hidden="true"
							/>
							{feature}
						</li>
					))}
				</ul>
				<p className="mt-6 text-xs leading-6 text-muted-foreground">
					{plan.limitNote}
				</p>
			</LayerCard.Primary>
			<LayerCard.Secondary>
				<LinkButton
					href={plan.cta.href}
					external={plan.cta.external}
					variant={plan.featured ? "primary" : "secondary"}
					className="w-full justify-center"
				>
					{plan.cta.label}
				</LinkButton>
			</LayerCard.Secondary>
		</LayerCard>
	);
}

export function PlatformPricingSection() {
	const [tab, setTab] = React.useState<PricingTab>("subscriptions");

	return (
		<section
			id="platform"
			aria-labelledby="platform-heading"
			className="border-b border-border bg-surface/40 py-24 sm:py-32"
		>
			<div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-medium text-muted-foreground">
					{planSection.eyebrow}
				</p>
				<SectionHeading
					id="platform-heading"
					title={planSection.title}
					description={planSection.description}
					className="mt-3"
				/>

				<Tabs
					tabs={tabs.map((item) => ({ ...item }))}
					value={tab}
					onValueChange={(value) => setTab(value as PricingTab)}
					variant="underline"
					className="mt-10"
					listClassName="justify-start"
				/>

				{tab === "subscriptions" ? (
					<div className="mt-8 grid gap-6 lg:grid-cols-3" data-ui>
						{plans.map((plan) => (
							<PlanCard key={plan.id} plan={plan} />
						))}
					</div>
				) : null}

				{tab === "consumption" ? (
					<div className="mt-8 space-y-6" data-ui>
						<LayerCard className="rounded-xl border border-border p-6">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
								<div>
									<h3 className="text-xl font-medium tracking-normal text-foreground">
										{consumption.consumption.title}
									</h3>
									<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
										{consumption.consumption.description}
									</p>
								</div>
								<Text variant="mono">Per resource</Text>
							</div>
							<div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
								{consumption.consumption.items.map((item) => (
									<div key={item.resource} className="bg-card p-5">
										<p className="font-mono text-xs text-muted-foreground">
											{item.unit}
										</p>
										<p className="mt-3 text-sm font-medium text-foreground">
											{item.resource}
										</p>
									</div>
								))}
							</div>
							<p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
								{consumption.billing}
							</p>
						</LayerCard>
						<LayerCard className="rounded-xl border border-border p-6">
							<h3 className="text-lg font-medium tracking-normal text-foreground">
								{families.section.title}
							</h3>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								{families.section.description}
							</p>
							<Grid variant="3up" gap="sm" className="mt-8">
								{families.items.map((family) => (
									<GridItem key={family.name}>
										<LinkButton
											href={family.href}
											variant="outline"
											className="h-full w-full justify-start text-left"
										>
											{family.name}
										</LinkButton>
									</GridItem>
								))}
							</Grid>
						</LayerCard>
					</div>
				) : null}

				{tab === "deployment" ? (
					<div className="mt-8" data-ui>
						<h3 className="text-xl font-medium tracking-normal text-foreground">
							{independenceSection.title}
						</h3>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
							{independenceSection.description}
						</p>
						<Grid variant="3up" gap="base" className="mt-8">
							{deploymentModels.map((model) => (
								<GridItem key={model.name} className="h-full">
									<LayerCard className="h-full rounded-xl border border-border p-6">
										<h4 className="text-base font-medium tracking-normal text-foreground">
											{model.name}
										</h4>
										<p className="mt-4 text-sm leading-6 text-muted-foreground">
											{model.description}
										</p>
									</LayerCard>
								</GridItem>
							))}
						</Grid>
						<p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
							{independenceSection.note}
						</p>
					</div>
				) : null}

				<p className="mt-10 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
					{planSection.note}
				</p>
			</div>
		</section>
	);
}
