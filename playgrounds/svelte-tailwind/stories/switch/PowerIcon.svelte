<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let props: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
  <path
    d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
  />
</svg>