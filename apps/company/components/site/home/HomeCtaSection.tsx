import { Link } from "@company/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import { homeCta } from "@/lib/content/ecosystem";

/**
 * 10 — Closing call to action. Institutional rather than commercial: the
 * ecosystem, a conversation, and the open-source entry point.
 */
export function HomeCtaSection() {
	return (
		<section aria-labelledby="home-cta-title" className="bg-background py-20 sm:py-28">
			<Container>
				<div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-16 text-center text-brand-foreground sm:px-12 sm:py-20">
					<div
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_45%,transparent_38%,rgba(0,0,0,0.32))]"
						aria-hidden="true"
					/>
					<div className="signal-dots absolute inset-0" aria-hidden="true" />

					<div className="relative mx-auto max-w-3xl">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-foreground/75">
							{homeCta.eyebrow}
						</p>
						<h2
							id="home-cta-title"
							className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-brand-foreground sm:text-5xl"
						>
							{homeCta.title}
						</h2>
						<p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-foreground/85">
							{homeCta.description}
						</p>

						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Link
								href={homeCta.primary.href}
								className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-foreground px-6 text-sm font-medium text-ink no-underline transition-colors hover:bg-brand-foreground/90"
							>
								{homeCta.primary.label}
								<ArrowRight className="size-4" aria-hidden="true" />
							</Link>
							<Link
								href={homeCta.secondary.href}
								className="inline-flex h-11 items-center rounded-full border border-brand-foreground/35 px-5 text-sm font-medium text-brand-foreground no-underline transition-colors hover:bg-brand-foreground/10"
							>
								{homeCta.secondary.label}
							</Link>
							<Link
								href={homeCta.tertiary.href}
								target="_blank"
								rel="noreferrer"
								className="inline-flex h-11 items-center rounded-full px-5 text-sm font-medium text-brand-foreground/90 no-underline transition-colors hover:bg-brand-foreground/10 hover:text-brand-foreground"
							>
								{homeCta.tertiary.label}
								<span className="sr-only"> (opens in a new tab)</span>
							</Link>
						</div>

						<p className="mt-5 text-xs leading-relaxed text-brand-foreground/75">
							{homeCta.note}
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
