/**
 * Content for the protected homepage hero (`SignalHero`).
 *
 * The hero is preserved unchanged by the homepage workstream, so its copy
 * stays here rather than being folded into the new ecosystem content.
 * Everything below the hero is defined in `lib/content/ecosystem.ts`.
 */

export const homeHero = {
	eyebrow: "Enterprise cloud infrastructure",
	title: "Cloud infrastructure.",
	highlight: "Built to connect.",
	description:
		"Compute, storage, networking, platform and security services on infrastructure operated by Company and by named partners. One catalogue, with availability and commercial state published per product and region.",
	primaryCta: { href: "/products", label: "Explore products" },
	secondaryCta: { href: "/pricing", label: "View pricing" },
} as const;
