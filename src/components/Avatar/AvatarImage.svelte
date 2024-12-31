<script lang="ts">
	import { cn } from '../../functions/utils';
	import { Avatar as AvatarPrimitive } from 'radix-svelte';
</script>

<AvatarPrimitive.Image {...$$props} class={cn('aspect-square h-full w-full', $$props.class)} />
