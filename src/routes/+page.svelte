<script lang="ts">
	import { onMount } from 'svelte';

	let snowEffect: any = null;
	let isUpdating = $state(false);
	let updateTimeout: any;
	let cminSize: number = $state(10);
	let cmaxSize: number = $state(100);
	let cmaxFlakes: number = $state(75);
	let cimageUrl: string = $state(
		'https://file.aiquickdraw.com/imgcompressed/img/compressed_4c44aa83b8c9de985d2b7d9696f27716.webp'
	);
	let cwind: number = $state(1);
	let copacity: number = $state(1);

	const wee = () => {
		cimageUrl =
			'https://file.aiquickdraw.com/imgcompressed/img/compressed_4c44aa83b8c9de985d2b7d9696f27716.webp';
		cminSize = 10;
		cmaxSize = 100;
		cmaxFlakes = 75;
		cwind = 1;
		copacity = 1;
	};

	const classic = () => {
		cimageUrl = '';
		cminSize = 1;
		cmaxSize = 10;
		cmaxFlakes = 100;
		cwind = 1;
		copacity = 1;
	};

	const cleanupSnow = () => {
		if (snowEffect) {
			snowEffect.destroy();
			snowEffect = null;
			// Force cleanup of any remaining elements
			const oldCanvases = document.querySelectorAll('.snow-container canvas');
			oldCanvases.forEach((canvas) => canvas.remove());
		}
	};

	const initializeSnow = async () => {
		if (isUpdating) return;
		isUpdating = true;

		cleanupSnow();

		try {
			const { default: SnowEffectClass } = await import('make-anything-snow');
			snowEffect = new SnowEffectClass({
				targetSelector: '.snow-container',
				minSize: cminSize,
				maxSize: cmaxSize,
				imageUrl: cimageUrl,
				wind: cwind,
				maxFlakes: cmaxFlakes,
				opacity: copacity
			});
			snowEffect.init();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isUpdating = false;
		}
	};

	onMount(() => {
		initializeSnow();
		return cleanupSnow;
	});

	$effect(() => {
		if (typeof window === 'undefined') return;

		// Clear any pending updates
		if (updateTimeout) clearTimeout(updateTimeout);
		console.log('Min size: ', cminSize);
		console.log('Max size: ', cmaxSize);
		console.log('Max flakes: ', cmaxFlakes);
		console.log('Wind: ', cwind);
		console.log('Opacity: ', copacity);
		console.log('Image URL: ', cimageUrl);

		// Debounce the update
		updateTimeout = setTimeout(() => {
			cleanupSnow();
			initializeSnow();
		}, 100);
	});
</script>

<div class="lg:flex">
	<div class="controls space-y-2 p-4 lg:w-1/4">
		<input type="text" placeholder="Image" bind:value={cimageUrl} class="w-full border" />
		<span class="text-sm">min-size: {cminSize}</span>
		<input type="range" min="0" max="50" bind:value={cminSize} class="w-full" />
		<span class="text-sm">max-size: {cmaxSize}</span>
		<input type="range" min="1" max="1000" bind:value={cmaxSize} class="w-full" />
		<span class="text-sm">max-flakes: {cmaxFlakes}</span>
		<input type="range" min="1" max="1000" bind:value={cmaxFlakes} class="w-full" />
		<span class="text-sm">wind: {cwind}</span>
		<input type="range" min="0" max="25" step="0.1" bind:value={cwind} class="w-full" />
		<span class="text-sm">opacity: {copacity}</span>
		<input type="range" min="0.1" max="1" step="0.1" bind:value={copacity} class="w-full" />

		<div class="flex flex-wrap gap-2">
			<button onclick={classic} class="w-full rounded-lg bg-blue-500 p-2 text-white">
				Classic Snow
			</button>
			<button onclick={wee} class="w-full rounded-lg bg-blue-500 p-2 text-white">
				Minion Snow
			</button>
		</div>
	</div>

	<div
		class="snow-container relative z-10 flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white lg:w-3/4"
	>
		<h1 class="text-2xl">Make Anything Snow Config Demo</h1>
		<a
			class="z-30 text-white/60"
			target="_blank"
			href="https://www.npmjs.com/package/make-anything-snow"
			>https://github.com/MSAZ89/make-anything-snow</a
		>
		<div class="z-20 mt-4 w-full overflow-x-auto rounded-lg bg-gray-800 p-4 lg:w-2/3">
			<code class="text-xs text-gray-300">
				<span class="text-blue-400">targetSelector</span>:
				<span class="text-green-300">'.snow-container'</span>,<br />
				<span class="text-blue-400">minSize</span>:
				<span class="text-green-300">{cminSize}</span>,<br />
				<span class="text-blue-400">maxSize</span>:
				<span class="text-green-300">{cmaxSize}</span>,<br />
				<span class="text-blue-400">maxFlakes</span>:
				<span class="text-green-300">{cmaxFlakes}</span>,<br />
				<span class="text-blue-400">wind</span>: <span class="text-green-300">{cwind}</span>,<br />

				<span class="text-blue-400">opacity</span>:
				<span class="text-green-300">{copacity}</span>,<br />
				<span class="text-blue-400">imageUrl</span>:
				<span class="text-green-300">'{cimageUrl}'</span><br />
			</code>
		</div>
	</div>
</div>
