<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  let rootRef: Element | null = $state(null);
  let itemRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, itemRef });
</script>

<ToggleGroup bind:ref={rootRef} defaultValue={['left']} aria-label="Custom alignment">
  {#snippet asChild(props)}
    <section {...props()}>
      <ToggleGroupItem bind:ref={itemRef} value="left">
        {#snippet asChild(itemProps)}
          <button {...itemProps()} type="button">Left</button>
        {/snippet}
      </ToggleGroupItem>
    </section>
  {/snippet}
</ToggleGroup>