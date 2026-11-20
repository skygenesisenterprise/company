import type { Metadata } from "next";
import { SignalHero } from "@/components/site/SignalHero";
import {
	EcosystemSection,
	ProductsSection,
	SolutionsSection,
} from "@/components/site/home/EcosystemSections";
import {
	IndependenceSection,
	OpenSourceSection,
} from "@/components/site/home/EngineeringSections";
import { HomeCtaSection } from "@/components/site/home/HomeCtaSection";
import {
	NewsSection,
	PartnershipsSection,
	ResearchSection,
} from "@/components/site/home/InstitutionalSections";
import { IntroductionSection } from "@/components/site/home/IntroductionSection";
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
 * Homepage composition.
 *
 * The hero (`SignalHero`) and the footer (`SiteFooter`, in the root layout) are
 * protected and unchanged. Everything between them presents Sky Genesis
 * Enterprise as a technology group: introduction, the six technology domains,
 * selected projects, solution patterns, deployment philosophy, open source,
 * partnerships, research, news and a closing call to action.
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
				<IntroductionSection />
				<EcosystemSection />
				<ProductsSection />
				<SolutionsSection />
				<IndependenceSection />
				<OpenSourceSection />
				<PartnershipsSection />
				<ResearchSection />
				<NewsSection />
				<HomeCtaSection />
			</div>
		</>
	);
}
