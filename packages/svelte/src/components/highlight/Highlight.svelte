<script module lang="ts">
  import type { HighlightProps } from '@ark-ui/svelte/highlight';

  export type HighlightRootProps = HighlightProps;
</script>

<script lang="ts">
  import { Highlight as ArkHighlight } from '@ark-ui/svelte/highlight';
  import { clsx } from 'clsx';
  import styles from './Highlight.module.css';
  let { class: className, ...props }: HighlightRootProps = $props();
</script>

<ArkHighlight
  {...props}
  class={clsx(styles.root, className)}
  data-scope="highlight"
  data-part="root"
  data-slot="highlight-root"
/>