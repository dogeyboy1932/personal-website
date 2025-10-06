<script lang="ts">
  import { cn } from "../../lib/utils";
  import { Avatar as AvatarPrimitive } from "radix-svelte";
</script>

<AvatarPrimitive.Fallback
  {...$$props}
  class={cn(
    "flex h-full w-full items-center justify-center rounded-full bg-muted",
    $$props.class
  )}
>
  <slot />
</AvatarPrimitive.Fallback>
