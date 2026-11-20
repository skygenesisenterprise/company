import type { Metadata } from "next";
import { SignalHero } from "@/components/site/SignalHero";
import { BuildSection } from "@/components/site/home/build-section";
import { ComparisonSection } from "@/components/site/home/comparison-section";
import { CoverageSection } from "@/components/site/home/coverage-section";
import { PlatformPricingSection } from "@/components/site/home/platform-pricing-section";
import { ProjectRailSection } from "@/components/site/home/project-rail-section";
import { Reveal } from "@/components/site/home/Reveal";
import { TeamSection } from "@/components/site/home/team-section";
import { homeSeo, productCategories } from "@/lib/content/ecosystem";
import { links } from "@/lib/content/site";
import { SITE_URL, pageMetadata } from "@/lib/domain/queries";

const baseMetadata = pageMetadata({
	title: homeSeo.title,
	description: homeSeo.description,
	path: "/",
});

/** The global title template still carries the site brand; the homepage
 * declares the group name explicitly for social and structured data. */
export const metadata: Metadata = {
	...baseMetadata,
	openGraph: {
		...(baseMetadata.openGraph ?? {}),
		siteName: "Sky Genesis Enterprise",
	},
};

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			name: "Sky Genesis Enterprise",
			url: SITE_URL,
			logo: `${SITE_URL}/icon.svg`,
			description: homeSeo.description,
			sameAs: [links.skyGenesis, links.githubOrg],
		},
		{
			"@type": "WebSite",
			name: "Sky Genesis Enterprise",
			url: SITE_URL,
			inLanguage: "en",
			potentialAction: {
				"@type": "SearchAction",
				target: `${SITE_URL}/products?q={search_term_string}`,
				"query-input": "required name=search_term_string",
			},
		},
		{
			"@type": "ItemList",
			name: "Sky Genesis Enterprise technology domains",
			itemListElement: productCategories.map((category, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: category.name,
				url: `${SITE_URL}${category.href}`,
			})),
		},
	],
};

/**
 * Homepage composition after the protected hero: deployment coverage and
 * pillars, a browsable project rail, the independence comparison, a tabbed
 * platform/pricing surface, a bento of working surfaces and the closing panel.
 * The footer in the root layout is protected.
 */
export default function HomePage() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<div className="bg-background text-foreground">
				<SignalHero />
				<Reveal>
					<div className="zenth-root isolate bg-background font-sans">
						<CoverageSection />
						<ProjectRailSection />
						<ComparisonSection />
						<PlatformPricingSection />
						<TeamSection />
						<BuildSection />
					</div>
				</Reveal>
			</div>
		</>
	);
}
