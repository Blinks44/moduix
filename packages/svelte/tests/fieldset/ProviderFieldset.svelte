<script lang="ts">
  import {
    FieldsetContext,
    FieldsetLegend,
    FieldsetRootProvider,
    useFieldset,
  } from '@/components/fieldset';
  import FieldsetContextState from './FieldsetContextState.svelte';

  // Ark Svelte does not generate an id for the standalone hook.
  const fieldset = useFieldset({ id: 'account', invalid: true });
</script>

<FieldsetRootProvider value={fieldset}>
  <FieldsetLegend>Account details</FieldsetLegend>
  <FieldsetContext>
    {#snippet render(context)}
      <output data-testid="render-prop-state">{String(context().invalid)}</output>
    {/snippet}
  </FieldsetContext>
  <FieldsetContextState />
</FieldsetRootProvider>