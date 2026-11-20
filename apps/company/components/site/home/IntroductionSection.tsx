import { Link } from "@company/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/Container";
import { deploymentModels, introduction } from "@/lib/content/ecosystem";

/** Run pillars: the same pattern as Cloudflare's "Run everywhere / anywhere /
 * at massive scale", stated with the group's own deployment models. */
const runHeadlines = [
	"Run self-hosted.",
	"Run hybrid.",
	"Run cloud-operated.",
] as const;

/**
 * 01 — Homepage introduction, composed after the "platform capabilities"
 * pattern: one headline, one supporting paragraph, then the three ways the
 * group's software can run. The eyebrow is dropped (the header already names
 * the group) and the pillars carry no redundant label above their headline.
 * Elements marked `data-reveal` are staggered by the Reveal component.
 */
export function IntroductionSection() {
	return (
		<section
			aria-labelledby="introduction-title"
			className="bg-background py-20 sm:py-28 lg:py-32"
		>
			<Container>
				<div className="max-w-4xl">
					<h2
						id="introduction-title"
						data-reveal
						className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
					>
						{introduction.title}
					</h2>
					<p
						data-reveal
						className="mt-6 max-w-3xl text-lg leading-8 text-foreground/85"
					>
						{introduction.paragraphs[0]}
					</p>
					<ul data-reveal className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
						{introduction.links.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									variant="plain"
									className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
								>
									{item.label}
									<ArrowRight className="size-4" aria-hidden="true" />
								</Link>
							</li>
						))}
					</ul>
				</div>

				<ul data-reveal className="mt-16 grid gap-4 md:grid-cols-3">
					{deploymentModels.map((model, index) => (
						<li
							key={model.name}
							className="flex min-w-0 flex-col bg-muted/40 p-7 sm:p-8"
						>
							<h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
								{runHeadlines[index]}
							</h3>
							<p className="mt-3 text-base leading-7 text-foreground/80">
								{model.description}
							</p>
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
}
