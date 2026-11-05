<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let props: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false" {...props}>
  <path d="M5 1.5V8.5M1.5 5H8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
</svg>