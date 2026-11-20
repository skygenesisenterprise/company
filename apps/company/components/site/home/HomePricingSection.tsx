import { Link, LinkButton } from "@company/react";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";
import {
	planSection,
	plans,
	type SubscriptionPlan,
	type SubscriptionPrice,
} from "@/lib/content/plans";
import { formatMinorUnits } from "@/lib/domain/pricing";
import { SectionIntro } from "./SectionIntro";

/** Price display: shows the amount as soon as it is published, otherwise the
 * honest state — same convention as the pricing page. */
function HomePlanPrice({ price }: { price: SubscriptionPrice }) {
	if (price.amountMinor !== null) {
		return (
			<p className="font-display text-5xl font-medium tracking-tight">
				{formatMinorUnits(price.amountMinor, price.currency)}
				<span className="ml-1 text-sm font-normal opacity-75">
					/ {price.interval}
				</span>
			</p>
		);
	}

	return (
		<p className="font-display text-3xl font-medium tracking-tight opacity-90">
			{price.state === "quote" ? "Custom" : "Pricing in finalisation"}
		</p>
	);
}

/** Compact plan card for the homepage promo band. */
function HomePlanCard({ plan }: { plan: SubscriptionPlan }) {
	return (
		<li
			className={cn(
				"flex min-w-0 flex-col rounded-2xl p-8 sm:p-9",
				plan.featured
					? "bg-primary text-primary-foreground"
					: "bg-background text-foreground",
			)}
		>
			<p
				className={cn(
					"text-sm font-medium",
					plan.featured ? "text-primary-foreground/80" : "text-primary",
				)}
			>
				{plan.audience}
			</p>
			<h3
				className={cn(
					"mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl",
				)}
			>
				{plan.name}
			</h3>
			<p
				className={cn(
					"mt-1 text-sm font-medium",
					plan.featured ? "text-primary-foreground/85" : "text-muted-foreground",
				)}
			>
				{plan.headline}
			</p>

			<div className="mt-8">
				<HomePlanPrice price={plan.price} />
			</div>

			<ul className="mt-8 space-y-3">
				{plan.features.slice(0, 4).map((feature) => (
					<li
						key={feature}
						className={cn(
							"flex gap-3 text-sm leading-6",
							plan.featured
								? "text-primary-foreground/90"
								: "text-foreground/85",
						)}
					>
						<Check
							className={cn(
								"mt-0.5 size-4 shrink-0",
								plan.featured ? "text-primary-foreground" : "text-primary",
							)}
							aria-hidden="true"
						/>
						{feature}
					</li>
				))}
			</ul>

			<div className="mt-auto pt-10">
				<LinkButton
					href={plan.cta.href}
					external={plan.cta.external}
					variant={plan.featured ? "secondary" : "primary"}
					className="w-full justify-center"
				>
					{plan.cta.label}
					<ArrowRight className="size-4" aria-hidden="true" />
				</LinkButton>
			</div>
		</li>
	);
}

/**
 * Homepage pricing promo. The Cloudflare-pattern band between "Why choose" and
 * the showcase: the three subscription plans as large tier cards, everything
 * resolved from `lib/content/plans.ts` so no price or feature is invented.
 */
export function HomePricingSection() {
	return (
		<section
			aria-labelledby="home-pricing-title"
			className="bg-muted/30 py-20 sm:py-28 lg:py-32"
		>
			<Container>
				<SectionIntro
					id="home-pricing-title"
					eyebrow={planSection.eyebrow}
					title={planSection.title}
					description={planSection.description}
					actions={
						<Link
							href="/pricing"
							variant="plain"
							className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
						>
							Compare all plans
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>
					}
				/>

				<ul data-reveal className="mt-12 grid gap-5 lg:grid-cols-3">
					{plans.map((plan) => (
						<HomePlanCard key={plan.id} plan={plan} />
					))}
				</ul>

				<p data-reveal className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
					{planSection.note}
				</p>
			</Container>
		</section>
	);
}
