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

export function EcosystemSection() {
	return (
		<section
			aria-labelledby="ecosystem-title"
			className="bg-brand py-20 text-brand-foreground sm:py-28 lg:py-32"
		>
			<Container>
				<div data-reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-16">
					<div>
						<p className="text-sm font-semibold text-brand-foreground/75 sm:text-base">
							{ecosystemSection.eyebrow}
						</p>
						<h2
							id="ecosystem-title"
							className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl"
						>
							{ecosystemSection.title}
						</h2>
					</div>
					<div>
						<p className="max-w-3xl text-lg leading-8 text-brand-foreground/85">
							{ecosystemSection.description}
						</p>
						<p className="mt-4 max-w-3xl text-base leading-7 text-brand-foreground/75">
							{ecosystemSection.note}
						</p>
						<Link
							href="/products"
							variant="plain"
							className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-foreground no-underline hover:underline"
						>
							Browse the full catalogue
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>
					</div>
				</div>

				<ul data-reveal className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{productCategories.map((category) => (
							<li key={category.id} className="flex flex-col bg-background p-6 text-foreground sm:p-7">
								<p className="text-sm font-medium text-primary">
									{category.scope.join(" · ")}
								</p>
								<h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
									{category.name}
								</h3>
								<p className="mt-3 text-base leading-7 text-foreground/75">
									{category.description}
								</p>
								<ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground">
									{category.products.map((product) => (
										<li key={product.name}>{product.name}</li>
									))}
								</ul>
								<Link
									href={category.href}
									variant="plain"
									className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-primary no-underline hover:underline"
								>
									Explore this domain
									<span className="sr-only">: {category.name}</span>
									<ArrowRight className="size-4" aria-hidden="true" />
								</Link>
							</li>
						))}
				</ul>
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
			className="bg-background py-20 sm:py-28 lg:py-32"
		>
			<Container>
				<SectionIntro
					id="products-title"
					eyebrow={productsSection.eyebrow}
					title={productsSection.title}
					description={productsSection.description}
				/>

				<div data-reveal className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
					<article className="flex min-w-0 flex-col bg-primary p-7 text-primary-foreground sm:p-10 lg:min-h-[480px]">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<p className="text-sm font-semibold text-primary-foreground/80">
								{lead.category.name}
							</p>
							<span className="text-sm text-primary-foreground/80">
								{lead.product.kind === "component" ? "Component" : "Project"}
							</span>
						</div>
						<h3 className="mt-16 max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
							{lead.product.name}
						</h3>
						<p className="mt-5 max-w-lg text-lg leading-8 text-primary-foreground/85">
							{lead.product.description}
						</p>
						<div className="mt-auto pt-10">
							<Link
								href={lead.product.href ?? lead.category.href}
								variant="plain"
								className="inline-flex min-h-12 items-center gap-2 bg-primary-foreground px-5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-foreground/90"
							>
								{lead.product.href ? "View project" : "Open the category overview"}
								<ArrowRight className="size-4" aria-hidden="true" />
							</Link>
						</div>
					</article>

					<div className="min-w-0 bg-muted/30 p-5 sm:p-7">
						<ul className="grid gap-3">
							{rest.map(({ product, category }) => (
								<li key={product.name} className="bg-background p-5 sm:p-6">
									<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
										<p className="text-sm font-medium text-muted-foreground">
											{category.name}
										</p>
										<Link
											href={product.href ?? category.href}
											variant="plain"
											className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline"
										>
											Open
											<span className="sr-only"> {product.name}</span>
											<ArrowRight className="size-4" aria-hidden="true" />
										</Link>
									</div>
									<h3 className="mt-2 font-display text-xl font-medium tracking-tight text-foreground">
										{product.name}
									</h3>
									<p className="mt-2 text-base leading-6 text-foreground/75">
										{product.description}
									</p>
								</li>
							))}
						</ul>
						<p className="mt-5 text-sm leading-6 text-muted-foreground">
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
			className="bg-muted/30 py-20 sm:py-28 lg:py-32"
		>
			<Container>
				<SectionIntro
					id="solutions-title"
					eyebrow={solutionsSection.eyebrow}
					title={solutionsSection.title}
					description={solutionsSection.description}
				/>

				<ul data-reveal className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{solutionPatterns.map((pattern) => (
						<li key={pattern.id} className="flex flex-col bg-background p-6 sm:p-8">
							<p className="text-sm font-medium text-primary">
								{pattern.relationship}
							</p>
							<h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
								{pattern.title}
							</h3>
							<p className="mt-4 text-base leading-7 text-foreground/75">
								{pattern.description}
							</p>
							<p className="mt-5 text-sm font-medium leading-6 text-foreground">
								{pattern.productNames.join(" · ")}
							</p>
							<Link
								href={pattern.href}
								variant="plain"
								className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-primary no-underline hover:underline"
							>
								Explore this solution
								<span className="sr-only">: {pattern.title}</span>
								<ArrowRight className="size-4" aria-hidden="true" />
							</Link>
						</li>
					))}
				</ul>

				<p data-reveal className="mt-5 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
					{solutionsSection.note}
				</p>
			</Container>
		</section>
	);
}
