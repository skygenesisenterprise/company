"use client";

import { Button, cn, LayerCard, LinkButton, Text } from "@company/react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import * as React from "react";
import { getFeaturedProjects, productsSection } from "@/lib/content/ecosystem";
import { SectionHeading } from "./section-heading";

export function ProjectRailSection() {
	const projects = React.useMemo(() => getFeaturedProjects().slice(0, 3), []);
	const [active, setActive] = React.useState(0);

	if (!projects.length) return null;
	const entry = projects[active] ?? projects[0];
	if (!entry) return null;

	return (
		<section
			id="projects"
			aria-labelledby="projects-heading"
			className="border-b border-border bg-surface/40 py-24 sm:py-32"
		>
			<div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
				<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<SectionHeading
						id="projects-heading"
						title={productsSection.title}
						description={productsSection.description}
						className="max-w-2xl"
					/>
					<div className="flex items-center gap-2">
						<Button
							type="button"
							shape="square"
							variant="ghost"
							icon={<CaretLeft className="size-[18px]" />}
							aria-label="Previous project"
							onClick={() =>
								setActive(
									(index) => (index - 1 + projects.length) % projects.length,
								)
							}
						/>
						<Button
							type="button"
							shape="square"
							variant="ghost"
							icon={<CaretRight className="size-[18px]" />}
							aria-label="Next project"
							onClick={() =>
								setActive((index) => (index + 1) % projects.length)
							}
						/>
					</div>
				</div>

				<div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<div
						role="tablist"
						aria-label="Featured projects"
						className="flex flex-col gap-2"
					>
						{projects.map((item, index) => {
							const isActive = index === active;
							return (
								<Button
									key={item.product.name}
									type="button"
									role="tab"
									aria-selected={isActive}
									variant={isActive ? "secondary" : "ghost"}
									onClick={() => setActive(index)}
									className={cn(
										"h-auto w-full justify-start gap-3 rounded-lg border px-4 py-4 text-left transition-colors",
										isActive
											? "border-primary/40 bg-accent"
											: "border-border bg-transparent hover:bg-muted",
									)}
								>
									<span className="w-6 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
										{item.category.number}
									</span>
									<span className="min-w-0 flex-1">
										<span className="block truncate text-sm font-medium text-foreground">
											{item.product.name}
										</span>
										<span className="block truncate text-xs text-muted-foreground">
											{item.category.name}
										</span>
									</span>
								</Button>
							);
						})}
					</div>

					<LayerCard data-ui className="min-h-[360px] p-6">
						<div className="flex h-full flex-col justify-between gap-8">
							<div>
								<p className="font-mono text-xs text-muted-foreground">
									{entry.category.name} &middot;{" "}
									{entry.product.kind ?? "project"}
								</p>
								<h3 className="mt-4 text-2xl font-medium tracking-normal text-foreground">
									{entry.product.name}
								</h3>
								<p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
									{entry.product.description}
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-4">
								<LinkButton
									href={entry.product.href ?? entry.category.href}
									external={entry.product.external}
									variant="secondary"
									icon={<ArrowUpRight className="size-[18px]" />}
								>
									{entry.product.href ? "View project" : "Open category"}
								</LinkButton>
								<Text variant="secondary" size="sm" as="span">
									Curated from the published catalogue
								</Text>
							</div>
						</div>
					</LayerCard>
				</div>

				<p className="mt-8 max-w-3xl text-xs leading-6 text-muted-foreground">
					{productsSection.note}
				</p>
			</div>
		</section>
	);
}
