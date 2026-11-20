import { Link } from "@company/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import { homeCta } from "@/lib/content/ecosystem";

/**
 * Closing bookend to the hero: the same saturated brand panel inset into the
 * white stage, dot field, oversized centred headline and one pill action. The
 * panel uses the same container edges as the hero so the page closes on the
 * same continuous stage it opened with.
 */
export function BuildSection() {
	return (
		<section
			id="build"
			aria-labelledby="build-heading"
			className="bg-background pb-24 pt-2 sm:pb-32"
		>
			<Container>
				<div className="relative overflow-hidden rounded-2xl bg-brand text-brand-foreground">
					<div
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_45%,transparent_38%,rgba(0,0,0,0.16))]"
						aria-hidden="true"
					/>
					<div
						className="signal-dots absolute inset-0 opacity-80"
						aria-hidden="true"
					/>
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_75%_100%_at_50%_100%,rgba(255,255,255,0.55),transparent_72%)]"
						aria-hidden="true"
					/>

					<div className="relative mx-auto flex min-h-[60svh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
						<p className="text-xs font-medium text-brand-foreground/80">
							{homeCta.eyebrow}
						</p>
						<h2
							id="build-heading"
							className="mt-5 max-w-5xl text-balance font-display text-5xl font-medium leading-[1.04] tracking-tight text-brand-foreground sm:text-6xl lg:text-7xl"
						>
							{homeCta.title}
						</h2>
						<p className="mt-6 max-w-xl text-base leading-relaxed text-brand-foreground/95 sm:text-lg">
							{homeCta.description}
						</p>

						<Link
							href={homeCta.primary.href}
							className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-brand-foreground px-7 text-base font-medium text-ink no-underline shadow-sm transition-colors hover:bg-brand-foreground/90"
						>
							{homeCta.primary.label}
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>

						<div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
							<Link
								href={homeCta.secondary.href}
								variant="plain"
								className="text-sm font-medium text-brand-foreground no-underline! underline-offset-4 hover:underline"
							>
								{homeCta.secondary.label}
							</Link>
							<Link
								href={homeCta.tertiary.href}
								variant="plain"
								target="_blank"
								rel="noreferrer"
								className="text-sm font-medium text-brand-foreground no-underline! underline-offset-4 hover:underline"
							>
								{homeCta.tertiary.label}
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
