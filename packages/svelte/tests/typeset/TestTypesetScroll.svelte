<script lang="ts">
  import { TypesetScroll } from '@/components/typeset';
  import type { TypesetScrollProps } from '@/components/typeset/TypesetScroll.svelte';

  let { ...props }: Omit<TypesetScrollProps, 'asChild'> = $props();
</script>

<button type="button">Before table</button>
<h2 id="comparison-label">Comparison table</h2>
<TypesetScroll {...props}>
  <table style="width: 200vw">
    <tbody>
      <tr><td>Wide content</td></tr>
    </tbody>
  </table>
</TypesetScroll>