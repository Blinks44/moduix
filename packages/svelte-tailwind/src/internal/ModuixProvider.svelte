<script module lang="ts">
  import type { Snippet } from 'svelte';
  import type { A11yLabels } from './a11yLabels';

  export interface ModuixProviderProps {
    children?: Snippet;
    labels?: Partial<A11yLabels>;
    locale?: string;
  }
</script>

<script lang="ts">
  import { LocaleProvider } from '@ark-ui/svelte/locale';
  import { setA11yLabels } from './a11yLabels';

  let { children, labels, locale }: ModuixProviderProps = $props();

  setA11yLabels(() => labels);
</script>

{#if locale}
  <LocaleProvider {locale}>
    {@render children?.()}
  </LocaleProvider>
{:else}
  {@render children?.()}
{/if}