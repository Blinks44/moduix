<script module lang="ts">
  import type { Snippet } from 'svelte';
  import type { A11yLabels } from './a11yLabels';

  export interface LabelsProviderProps {
    children?: Snippet;
    labels?: Partial<A11yLabels>;
  }
</script>

<script lang="ts">
  import { setA11yLabels } from './a11yLabels';

  let { children, labels }: LabelsProviderProps = $props();

  setA11yLabels(() => labels);
</script>

{@render children?.()}