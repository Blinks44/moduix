<script lang="ts">
  import { Select, SelectField, SelectHiddenSelect, SelectLabel } from '@/components/select';
  import { fruits } from './fruits';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<Select bind:ref={rootRef} collection={fruits}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Fruit selection">
      <SelectLabel>Fruit</SelectLabel>
      <SelectField placeholder="Select fruit" />
      <SelectHiddenSelect />
    </section>
  {/snippet}
</Select>