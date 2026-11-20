import { Link } from "@company/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import { introduction } from "@/lib/content/ecosystem";

/**
 * 01 — Introducing Sky Genesis Enterprise.
 *
 * Institutional presentation, not a startup pitch: what the group is, what it
 * builds, and the principles behind the way it builds.
 */
export function IntroductionSection() {
	return (
		<section
			aria-labelledby="introduction-title"
			className="border-b border-border bg-background py-20 sm:py-28"
		>
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
					<div className="lg:sticky lg:top-24 lg:h-fit">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
							{introduction.eyebrow}
						</p>
						<h2
							id="introduction-title"
							className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl"
						>
							{introduction.title}
						</h2>
						<ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
							{introduction.links.map((item) => (
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

					<div className="min-w-0">
						<div className="space-y-5">
							{introduction.paragraphs.map((paragraph) => (
								<p
									key={paragraph}
									className="max-w-2xl text-base leading-relaxed text-muted-foreground"
								>
									{paragraph}
								</p>
							))}
						</div>

						<dl className="mt-10 border-t border-border">
							{introduction.principles.map((principle) => (
								<div
									key={principle.title}
									className="grid gap-1.5 border-b border-border py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-6"
								>
									<dt className="text-sm font-semibold text-foreground">
										{principle.title}
									</dt>
									<dd className="text-sm leading-relaxed text-muted-foreground">
										{principle.description}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</Container>
		</section>
	);
}
