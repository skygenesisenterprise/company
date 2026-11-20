"use client";

import {
	cn,
	Grid,
	GridItem,
	LayerCard,
	LinkButton,
	Text,
} from "@company/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
	developerDestinations,
	openSourceGroups,
	openSourceSection,
} from "@/lib/content/ecosystem";
import { SectionHeading } from "./section-heading";

export function TeamSection() {
	return (
		<section
			id="developers"
			aria-labelledby="developers-heading"
			className="border-b border-border bg-background py-24 sm:py-32"
		>
			<div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
				<SectionHeading
					id="developers-heading"
					title={openSourceSection.title}
					description={openSourceSection.description}
				/>

				<Grid variant="3up" gap="base" className="mt-12">
					{openSourceGroups.map((group) => (
						<GridItem key={group.id} className="h-full">
							<LayerCard className="flex h-full flex-col gap-5 rounded-xl border border-border p-6">
								<div>
									<div className="flex items-center justify-between gap-3">
										<h3 className="text-base font-medium tracking-normal text-foreground">
											{group.title}
										</h3>
										<span className="font-mono text-xs text-muted-foreground tabular-nums">
											{group.items.length}
										</span>
									</div>
									<p className="mt-2 text-sm leading-6 text-muted-foreground">
										{group.description}
									</p>
								</div>
								<ul className="space-y-3">
									{group.items.map((item) => (
										<li key={item.name} className="border-t border-border pt-3">
											<div className="flex flex-wrap items-center justify-between gap-2">
												<p className="text-sm font-medium text-foreground">
													{item.name}
												</p>
												{item.packageName ? (
													<span className="font-mono text-[11px] text-muted-foreground">
														{item.packageName}
													</span>
												) : null}
											</div>
											<Text variant="secondary" size="sm" as="span">
												{item.detail}
											</Text>
										</li>
									))}
								</ul>
							</LayerCard>
						</GridItem>
					))}
				</Grid>

				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{developerDestinations.map((destination, index) => (
						<LayerCard
							key={destination.label}
							className={cn(
								"flex min-h-[220px] flex-col justify-between gap-8 rounded-xl border border-border p-6",
								index === 0 && "sm:col-span-2",
							)}
						>
							<div>
								<span className="font-mono text-xs text-muted-foreground tabular-nums">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h3 className="mt-5 text-base font-medium tracking-normal text-foreground">
									{destination.label}
								</h3>
								<Text variant="secondary" size="sm" as="span">
									{destination.description}
								</Text>
							</div>
							<LinkButton
								href={destination.href}
								external={destination.external}
								variant="ghost"
								icon={<ArrowUpRight className="size-[18px]" />}
								className="justify-start"
							>
								Open
							</LinkButton>
						</LayerCard>
					))}
				</div>

				<p className="mt-8 max-w-3xl text-xs leading-6 text-muted-foreground">
					{openSourceSection.note}
				</p>
			</div>
		</section>
	);
}
