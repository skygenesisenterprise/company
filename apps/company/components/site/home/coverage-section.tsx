"use client";

import { cn, Link } from "@company/react";
import {
	deploymentModels,
	independenceSection,
	introduction,
} from "@/lib/content/ecosystem";
import { SectionHeading } from "./section-heading";

export function CoverageSection() {
	return (
		<section
			id="coverage"
			aria-labelledby="coverage-heading"
			className="border-b border-border bg-background py-24 sm:py-32"
		>
			<div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
				<SectionHeading
					id="coverage-heading"
					title={introduction.title}
					description={introduction.paragraphs[0]}
				/>

				<p className="mt-8 font-mono text-xs text-muted-foreground">
					{introduction.principles.length} published principles
				</p>
				<div className="mt-3 border-t border-border" data-ui>
					{introduction.principles.map((principle, index) => (
						<div
							key={principle.title}
							className="grid gap-2 border-b border-border py-5 sm:grid-cols-[48px_1fr_2fr] sm:items-baseline sm:gap-6"
						>
							<span className="font-mono text-xs text-muted-foreground tabular-nums">
								0{index + 1}
							</span>
							<h3 className="text-base font-medium tracking-normal text-foreground">
								{principle.title}
							</h3>
							<p className="text-sm leading-6 text-muted-foreground">
								{principle.description}
							</p>
						</div>
					))}
				</div>

				<div className="mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
					<div data-reveal className="max-w-xl">
						<p className="text-xs font-medium text-muted-foreground">
							{independenceSection.eyebrow}
						</p>
						<h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-normal text-foreground sm:text-[28px]">
							{independenceSection.title}
						</h3>
						<p className="mt-4 text-pretty text-[15px] leading-7 text-muted-foreground">
							{independenceSection.description}
						</p>
						<Link
							href="/products"
							variant="plain"
							className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground no-underline! underline-offset-4 hover:underline"
						>
							Explore deployment models
							<span aria-hidden="true">&#8594;</span>
						</Link>
					</div>

					<div
						data-ui
						className="overflow-hidden rounded-2xl border border-border bg-card px-6 py-8 sm:px-8 sm:py-10"
					>
						<div className="grid gap-8 sm:grid-cols-[1fr_64px_1fr]">
							<div>
								<p className="font-mono text-xs text-muted-foreground">
									Your side
								</p>
								<h4 className="mt-3 text-base font-medium tracking-normal text-foreground">
									Your infrastructure
								</h4>
								<p className="mt-3 text-sm leading-6 text-muted-foreground">
									{deploymentModels[0]?.description}
								</p>
							</div>

							<div className="flex flex-col items-center justify-center gap-3">
								<span
									className={cn(
										"relative block h-px w-full bg-primary/50",
										"sm:h-24 sm:w-px",
									)}
									aria-hidden="true"
								>
									<span className="absolute -right-0.5 -top-1 size-1.5 rounded-full bg-primary sm:-left-0.5 sm:-top-1.5" />
								</span>
								<span className="font-mono text-[11px] text-muted-foreground">
									Boundary
								</span>
							</div>

							<div>
								<p className="font-mono text-xs text-muted-foreground">
									Operated side
								</p>
								<ul className="mt-4 space-y-5">
									{deploymentModels.slice(1).map((model) => (
										<li key={model.name} className="flex gap-3">
											<span
												className="relative mt-1.5 h-4 w-px shrink-0 bg-primary/50"
												aria-hidden="true"
											>
												<span className="absolute -left-0.5 -top-0.5 size-1.5 rounded-full bg-primary" />
											</span>
											<div>
												<h5 className="text-sm font-medium tracking-normal text-foreground">
													{model.name}
												</h5>
												<p className="mt-1 text-xs leading-5 text-muted-foreground">
													{model.description}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				<p className="mt-10 max-w-3xl text-xs leading-6 text-muted-foreground">
					{independenceSection.note}
				</p>
			</div>
		</section>
	);
}
