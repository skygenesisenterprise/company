import { Link } from "@company/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import {
	ecosystemSection,
	getFeaturedProjects,
	productCategories,
	productsSection,
	solutionPatterns,
	solutionsSection,
} from "@/lib/content/ecosystem";
import { SectionIntro } from "./SectionIntro";

/**
 * 02 — Our ecosystem. Six domains as editorial rows: number, domain, scope,
 * selected projects and one destination. Deliberately not six equal cards.
 */
export function EcosystemSection() {
	return (
		<section
			aria-labelledby="ecosystem-title"
			className="border-b border-border bg-muted/30 py-20 sm:py-28"
		>
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
					<div className="lg:sticky lg:top-24 lg:h-fit">
						<SectionIntro
							id="ecosystem-title"
							eyebrow={ecosystemSection.eyebrow}
							title={ecosystemSection.title}
							description={ecosystemSection.description}
						/>
						<p className="mt-6 max-w-md border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground">
							{ecosystemSection.note}
						</p>
						<Link
							href="/products"
							variant="plain"
							className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline hover:underline"
						>
							Browse the full catalogue
							<ArrowRight className="size-3.5" aria-hidden="true" />
						</Link>
					</div>

					<ol className="border-t border-border">
						{productCategories.map((category) => (
							<li key={category.id} className="border-b border-border py-7">
								<div className="grid gap-4 sm:grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-start md:gap-6">
									<span className="pt-1 font-mono text-xs text-muted-foreground">
										{category.number}
									</span>

									<div className="min-w-0">
										<h3 className="font-display text-xl tracking-tight text-foreground">
											<Link
												href={category.href}
												variant="plain"
												className="text-foreground no-underline hover:text-primary"
											>
												{category.name}
											</Link>
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
											{category.description}
										</p>
										<p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
											{category.scope.join(" · ")}
										</p>
										<ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground">
											{category.products.slice(0, 3).map((product) => (
												<li key={product.name}>{product.name}</li>
											))}
											{category.products.length > 3 ? (
												<li className="text-muted-foreground">
													+{category.products.length - 3} more
												</li>
											) : null}
										</ul>
									</div>

									<Link
										href={category.href}
										variant="plain"
										className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary no-underline hover:underline md:justify-self-end"
									>
										Explore
										<span className="sr-only"> {category.name}</span>
										<ArrowRight className="size-3.5" aria-hidden="true" />
									</Link>
								</div>
							</li>
						))}
					</ol>
				</div>
			</Container>
		</section>
	);
}

/**
 * 03 — Products and platforms. A curated lead project plus a compact list,
 * every entry resolved from the ecosystem data so nothing is invented.
 */
export function ProductsSection() {
	const projects = getFeaturedProjects();
	const [lead, ...rest] = projects;
	if (!lead) return null;

	return (
		<section
			aria-labelledby="products-title"
			className="border-b border-border bg-background py-20 sm:py-28"
		>
			<Container>
				<SectionIntro
					id="products-title"
					eyebrow={productsSection.eyebrow}
					title={productsSection.title}
					description={productsSection.description}
				/>

				<div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
					<article className="flex min-w-0 flex-col border border-border bg-muted/40 p-7 sm:p-9">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{lead.category.name}
							</p>
							<span className="border border-border px-1.5 py-px text-[10px] uppercase tracking-wide text-muted-foreground">
								{lead.product.kind === "component" ? "Component" : "Project"}
							</span>
						</div>
						<h3 className="mt-5 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
							{lead.product.name}
						</h3>
						<p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
							{lead.product.description}
						</p>
						<div className="mt-auto pt-8">
							<Link
								href={lead.product.href ?? lead.category.href}
								variant="plain"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline hover:underline"
							>
								{lead.product.href ? "View project" : "Open the category overview"}
								<ArrowRight className="size-3.5" aria-hidden="true" />
							</Link>
						</div>
					</article>

					<div className="min-w-0">
						<ul className="divide-y divide-border border-y border-border">
							{rest.map(({ product, category }) => (
								<li key={product.name} className="py-5">
									<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
										<p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
											{category.name}
										</p>
										<Link
											href={product.href ?? category.href}
											variant="plain"
											className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline hover:underline"
										>
											Open
											<span className="sr-only"> {product.name}</span>
											<ArrowRight className="size-3.5" aria-hidden="true" />
										</Link>
									</div>
									<h3 className="mt-1 font-display text-lg tracking-tight text-foreground">
										{product.name}
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
										{product.description}
									</p>
								</li>
							))}
						</ul>
						<p className="mt-4 text-xs leading-relaxed text-muted-foreground">
							{productsSection.note}
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}

/** 04 — Solutions and technologies, stated as patterns rather than products. */
export function SolutionsSection() {
	return (
		<section
			aria-labelledby="solutions-title"
			className="border-b border-border bg-muted/30 py-20 sm:py-28"
		>
			<Container>
				<SectionIntro
					id="solutions-title"
					eyebrow={solutionsSection.eyebrow}
					title={solutionsSection.title}
					description={solutionsSection.description}
				/>

				<ol className="mt-12 border-t border-border">
					{solutionPatterns.map((pattern, index) => (
						<li key={pattern.id} className="border-b border-border py-7">
							<div className="grid gap-4 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,0.9fr)_auto] md:items-start md:gap-6">
								<span className="pt-1 font-mono text-xs text-muted-foreground">
									{String(index + 1).padStart(2, "0")}
								</span>

								<div className="min-w-0">
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="font-display text-lg tracking-tight text-foreground">
											{pattern.title}
										</h3>
										<span className="border border-border px-1.5 py-px text-[10px] uppercase tracking-wide text-muted-foreground">
											{pattern.relationship}
										</span>
									</div>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										{pattern.description}
									</p>
								</div>

								<p className="min-w-0 text-sm leading-relaxed text-foreground">
									{pattern.productNames.join(" · ")}
								</p>

								<Link
									href={pattern.href}
									variant="plain"
									className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary no-underline hover:underline md:justify-self-end"
								>
									Explore
									<span className="sr-only"> {pattern.title}</span>
									<ArrowRight className="size-3.5" aria-hidden="true" />
								</Link>
							</div>
						</li>
					))}
				</ol>

				<p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
					{solutionsSection.note}
				</p>
			</Container>
		</section>
	);
}
