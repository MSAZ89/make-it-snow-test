import { COLOR } from './../../.svelte-kit/ambient.d';
declare module 'make-anything-snow' {
	export default class SnowEffect {
		constructor(options: {
			targetSelector: string;
			minSize?: number;
			maxSize?: number;
			wind?: number;
			maxFlakes?: number;
			imageUrl?: string;
			imageWidth?: number;
			imageHeight?: number;
			density?: number;
			speed?: number;
			opacity?: number;
		});
		init(): void;
		destroy(): void;
	}
}
