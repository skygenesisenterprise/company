import { Link } from "@company/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import {
	newsDestinations,
	newsSection,
	partnershipsSection,
	researchAreas,
	researchSection,
} from "@/lib/content/ecosystem";
import { SectionIntro } from "./SectionIntro";

/**
 * 07 — Partnerships and collaboration. Every relationship type is named, and
 * the publication state is explicit: no partner is claimed without evidence.
 */
export function PartnershipsSection() {
	return (
		<section
			aria-labelledby="partnerships-title"
			className="border-b border-border bg-background py-20 sm:py-28"
		>
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
					<div className="min-w-0">
						<SectionIntro
							id="partnerships-title"
							eyebrow={partnershipsSection.eyebrow}
							title={partnershipsSection.title}
							description={partnershipsSection.description}
						/>

						<p className="mt-8 border border-border bg-muted/40 p-5 text-sm leading-relaxed text-muted-foreground">
							{partnershipsSection.emptyState}
						</p>

						<ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
							{partnershipsSection.links.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										variant="plain"
										className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline hover:underline"
									>
										{item.label}
										<ArrowRight className="size-3.5" aria-hidden="true" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					<dl className="min-w-0 border-t border-border">
						{partnershipsSection.relationshipTypes.map((type) => (
							<div
								key={type.title}
								className="grid gap-1.5 border-b border-border py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-6"
							>
								<dt className="text-sm font-semibold text-foreground">
									{type.title}
								</dt>
								<dd className="text-sm leading-relaxed text-muted-foreground">
									{type.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</Container>
		</section>
	);
}

/**
 * 08 — Research and innovation. Themes, not finished products; no output is
 * claimed while none is published.
 */
export function ResearchSection() {
	return (
		<section
			aria-labelledby="research-title"
			className="border-b border-border bg-muted/30 py-20 sm:py-28"
		>
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
					<div className="min-w-0">
						<SectionIntro
							id="research-title"
							eyebrow={researchSection.eyebrow}
							title={researchSection.title}
							description={researchSection.description}
						/>
						<p className="mt-6 border-l-2 border-primary/40 pl-4 text-[13px] leading-relaxed text-muted-foreground">
							{researchSection.note}
						</p>
					</div>

					<ol className="min-w-0 border-t border-border">
						{researchAreas.map((area, index) => (
							<li
								key={area.title}
								className="grid gap-2 border-b border-border py-5 sm:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-5"
							>
								<span className="font-mono text-[13px] text-muted-foreground">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h3 className="text-sm font-semibold text-foreground">
									{area.title}
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{area.description}
								</p>
							</li>
						))}
					</ol>
				</div>
			</Container>
		</section>
	);
}

/**
 * 09 — News and insights. An honest empty state with real destinations instead
 * of generated announcements.
 */
export function NewsSection() {
	return (
		<section
			aria-labelledby="news-title"
			className="border-b border-border bg-background py-20 sm:py-28"
		>
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
					<div className="min-w-0">
						<SectionIntro
							id="news-title"
							eyebrow={newsSection.eyebrow}
							title={newsSection.title}
							description={newsSection.description}
						/>
						<p className="mt-8 border border-border bg-muted/40 p-5 text-sm leading-relaxed text-muted-foreground">
							{newsSection.emptyState}
						</p>
					</div>

					<ul className="min-w-0 divide-y divide-border border-y border-border">
						{newsDestinations.map((destination) => (
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
											) : (
												<ArrowRight
													className="size-3.5 shrink-0 text-muted-foreground"
													aria-hidden="true"
												/>
											)}
										</span>
										<span className="mt-0.5 block text-[13px] leading-relaxed text-muted-foreground">
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
				</div>
			</Container>
		</section>
	);
}

/**
 * 07b — Institutional band. The three public-facing surfaces (partnerships,
 * research, publications) condensed into one compact band so the homepage
 * keeps the short, low-band rhythm of the reference composition; the full
 * sections remain available for the pages that need them.
 */
export function InstitutionBandSection() {
	const columns = [
		{
			id: "partnerships",
			title: partnershipsSection.title,
			description: partnershipsSection.emptyState,
			list: partnershipsSection.relationshipTypes.map((type) => type.title),
			links: partnershipsSection.links,
		},
		{
			id: "research",
			title: researchSection.title,
			description: researchSection.note,
			list: researchAreas.map((area) => area.title),
			links: [] as readonly { href: string; label: string }[],
		},
		{
			id: "news",
			title: newsSection.title,
			description: newsSection.emptyState,
			list: [] as string[],
			links: newsDestinations,
		},
	];

	return (
		<section
			aria-labelledby="institution-band-title"
			className="bg-background py-20 sm:py-28"
		>
			<Container>
				<SectionIntro
					id="institution-band-title"
					eyebrow="The group in public"
					title="Partnerships, research and publications."
				/>

				<ul data-reveal className="mt-12 grid gap-5 lg:grid-cols-3">
					{columns.map((column) => (
						<li
							key={column.id}
							className="flex min-w-0 flex-col bg-muted/40 p-7 sm:p-8"
						>
							<h3 className="font-display text-xl font-medium leading-snug tracking-tight text-foreground">
								{column.title}
							</h3>
							<p className="mt-3 text-sm leading-6 text-muted-foreground">
								{column.description}
							</p>

							{column.list.length > 0 ? (
								<ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
									{column.list.map((item) => (
										<li
											key={item}
											className="text-sm leading-6 text-foreground/80"
										>
											{item}
										</li>
									))}
								</ul>
							) : null}

							{column.links.length > 0 ? (
								<ul className="mt-auto space-y-0.5 pt-6">
									{column.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												variant="plain"
												className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline"
											>
												{link.label}
												<ArrowRight className="size-3.5" aria-hidden="true" />
											</Link>
										</li>
									))}
								</ul>
							) : null}
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
}
