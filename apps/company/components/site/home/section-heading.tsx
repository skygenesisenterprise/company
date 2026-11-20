"use client";

import { cn } from "@company/react";

interface SectionHeadingProps {
	id?: string;
	title: string;
	description?: string;
	className?: string;
}

export function SectionHeading({
	id,
	title,
	description,
	className,
}: SectionHeadingProps) {
	return (
		<div className={cn("max-w-3xl text-left", className)}>
			<h2
				id={id}
				data-reveal
				className="font-display text-[28px] font-medium leading-[1.15] tracking-normal text-foreground sm:text-[36px]"
			>
				{title}
			</h2>
			{description ? (
				<p
					data-reveal
					className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground"
				>
					{description}
				</p>
			) : null}
		</div>
	);
}
