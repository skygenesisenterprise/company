import { Link } from "@company/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import {
	developerDestinations,
	openSourceGroups,
	openSourceSection,
	whySection,
} from "@/lib/content/ecosystem";
import { SectionIntro } from "./SectionIntro";

/**
 * 05 — "Why choose Sky Genesis Enterprise". Composed after Cloudflare's
 * comparison pattern: the closed-cloud alternative on the left, the group's
 * design constraints on the right, against a brand-coloured field.
 */
export function WhySection() {
	return (
		<section
			aria-labelledby="why-title"
			className="bg-background py-20 sm:py-28 lg:py-32"
		>
			<Container>
				<SectionIntro
					id="why-title"
					eyebrow={whySection.eyebrow}
					title={whySection.title}
					description={whySection.description}
				/>

				<div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
					<div data-reveal className="bg-muted/40 p-7 sm:p-10">
						<h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-muted-foreground sm:text-3xl">
							{whySection.before.title}
						</h3>
						<ul className="mt-8 space-y-4">
							{whySection.before.points.map((point) => (
								<li
									key={point}
									className="flex gap-3 text-base leading-7 text-foreground/70"
								>
									<span
										className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40"
										aria-hidden="true"
									/>
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>

					<div data-reveal className="bg-brand p-7 text-brand-foreground sm:p-10">
						<h3 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
							{whySection.after.title}
						</h3>
						<ul className="mt-8 space-y-4">
							{whySection.after.points.map((point) => (
								<li
									key={point}
									className="flex gap-3 text-base leading-7 text-brand-foreground/90"
								>
									<span
										className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-foreground"
										aria-hidden="true"
									/>
									<span>{point}</span>
								</li>
							))}
						</ul>
						<div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-brand-foreground/25 pt-6">
							<Link
								href="/infrastructure"
								variant="plain"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-foreground no-underline hover:underline"
							>
								Infrastructure overview
								<ArrowRight className="size-3.5" aria-hidden="true" />
							</Link>
							<Link
								href="/infrastructure/architecture"
								variant="plain"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-foreground no-underline hover:underline"
							>
								Architecture
								<ArrowRight className="size-3.5" aria-hidden="true" />
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

/**
 * 06 — Open source and developers. Official libraries, tools and platforms are
 * kept distinct, and each destination is an existing page or repository.
 */
export function OpenSourceSection() {
	return (
		<section
			aria-labelledby="open-source-title"
			className="border-b border-border bg-muted/30 py-20 sm:py-28"
		>
			<Container>
				<SectionIntro
					id="open-source-title"
					eyebrow={openSourceSection.eyebrow}
					title={openSourceSection.title}
					description={openSourceSection.description}
				/>

				<div data-reveal className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-16">
					<div className="grid min-w-0 gap-8 sm:grid-cols-3">
						{openSourceGroups.map((group) => (
							<section key={group.id} aria-labelledby={`open-source-${group.id}`} className="min-w-0">
								<h3
									id={`open-source-${group.id}`}
									className="text-[13px] font-semibold text-foreground"
								>
									{group.title}
								</h3>
								<p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
									{group.description}
								</p>
								<ul className="mt-4 divide-y divide-border border-y border-border">
									{group.items.map((item) => (
										<li key={item.name} className="py-3">
											<p className="text-sm font-medium text-foreground">
												{item.name}
											</p>
											<p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
												{item.detail}
											</p>
											{item.packageName ? (
												<code className="mt-1.5 block break-all font-mono text-[11px] text-muted-foreground">
													{item.packageName}
												</code>
											) : null}
										</li>
									))}
								</ul>
							</section>
						))}
					</div>

					<div className="min-w-0">
						<ul className="divide-y divide-border border-y border-border">
							{developerDestinations.map((destination) => (
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
												) : null}
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
						<p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
							{openSourceSection.note}
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
