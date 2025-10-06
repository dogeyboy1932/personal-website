<script lang="ts">
  import { cn } from "../../functions/utils";
  import { Avatar as AvatarPrimitive } from "radix-svelte";
</script>

<AvatarPrimitive.Root
  {...$$props}
  class={cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    $$props.class
  )}
>
  <slot />
</AvatarPrimitive.Root>
