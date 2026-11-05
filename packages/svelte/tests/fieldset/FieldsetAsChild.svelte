<script lang="ts">
  import { Fieldset, FieldsetLegend } from '@/components/fieldset';

  let rootRef: Element | null = $state(null);
  let legendRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, legendRef });
</script>

<Fieldset bind:ref={rootRef}>
  {#snippet asChild(props)}
    <fieldset {...props()}>
      <FieldsetLegend bind:ref={legendRef}>
        {#snippet asChild(legendProps)}
          <legend {...legendProps()}>Account details</legend>
        {/snippet}
      </FieldsetLegend>
    </fieldset>
  {/snippet}
</Fieldset>