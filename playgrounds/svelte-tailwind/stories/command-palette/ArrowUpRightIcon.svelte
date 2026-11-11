<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let props: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
  <path
    d="M7 17 17 7M9 7h8v8"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>