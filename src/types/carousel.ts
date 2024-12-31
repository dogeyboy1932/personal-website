import type { EmblaCarouselType } from 'embla-carousel';
import type emblaCarouselSvelte from 'embla-carousel-svelte';

export type EmblaCarouselConfig = Parameters<
	NonNullable<ReturnType<typeof emblaCarouselSvelte>['update']>
>[0];

export interface CarouselContext {
	api?: EmblaCarouselType;
	config: EmblaCarouselConfig;
}
