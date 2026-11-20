"use client";

import { cn, LayerCard, LinkButton, Text } from "@company/react";
import { whySection } from "@/lib/content/ecosystem";
import { SectionHeading } from "./section-heading";

export function ComparisonSection() {
	const panels = [
		{
			key: "before" as const,
			title: whySection.before.title,
			points: whySection.before.points,
			tone: "muted" as const,
		},
		{
			key: "after" as const,
			title: whySection.after.title,
			points: whySection.after.points,
			tone: "primary" as const,
		},
	];

	return (
		<section
			id="why"
			aria-labelledby="why-heading"
			className="border-b border-border bg-background py-24 sm:py-32"
		>
			<div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-medium text-muted-foreground">
					{whySection.eyebrow}
				</p>
				<SectionHeading
					id="why-heading"
					title={whySection.title}
					description={whySection.description}
					className="mt-3"
				/>

				<div className="mt-12 grid gap-6 lg:grid-cols-2">
					{panels.map((panel) => (
						<LayerCard
							key={panel.key}
							data-ui
							className={cn(
								"h-full rounded-xl border border-border p-6",
								panel.tone === "primary" && "border-t-2 border-t-primary",
							)}
						>
							<h3 className="text-xl font-medium tracking-normal text-foreground">
								{panel.title}
							</h3>
							<ul className="mt-6 space-y-4">
								{panel.points.map((point) => (
									<li key={point} className="flex items-start gap-3">
										<span
											className={cn(
												"mt-2 size-1.5 shrink-0 rounded-full",
												panel.tone === "primary" ? "bg-primary" : "bg-border",
											)}
											aria-hidden="true"
										/>
										<Text variant="secondary" size="base">
											{point}
										</Text>
									</li>
								))}
							</ul>
						</LayerCard>
					))}
				</div>

				<div className="mt-8 flex flex-wrap items-center gap-3">
					<LinkButton href="/resources/documentation" variant="primary">
						Read the documentation
					</LinkButton>
					<LinkButton href="/products" variant="outline">
						Browse the catalogue
					</LinkButton>
				</div>
			</div>
		</section>
	);
}
