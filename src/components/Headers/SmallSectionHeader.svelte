<script lang="ts">
  import { theme } from "../../constants/_theme";

  export let line: string = "";
</script>

<!-- text-left is load-bearing: this sits inside centred columns (see /more), and the
     label is meant to hang on the left edge while the content under it stays centred. -->
<div class="py-2 text-left">
  <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{line}</h3>
</div>
