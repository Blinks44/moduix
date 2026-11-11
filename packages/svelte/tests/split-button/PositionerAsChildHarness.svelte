<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';

  let positionerRef: Element | null = $state(null);

  export const getRefs = () => ({ positionerRef });
</script>

<SplitButton defaultOpen>
  <SplitButtonAction>Save</SplitButtonAction>
  <SplitButtonTrigger />
  <SplitButtonPositioner bind:ref={positionerRef} data-probe="positioner">
    {#snippet asChild(props)}
      <section {...props()}>
        <SplitButtonContent><MenuItem value="edit">Edit</MenuItem></SplitButtonContent>
      </section>
    {/snippet}
  </SplitButtonPositioner>
</SplitButton>