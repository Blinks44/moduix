<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
  } from '@/components/segment-group';

  let rootRef: Element | null = $state(null);
  let itemRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, itemRef });
</script>

<SegmentGroup bind:ref={rootRef} defaultValue="React" aria-label="Framework">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Framework choices">
      <SegmentGroupItem bind:ref={itemRef} value="React">
        {#snippet asChild(itemProps)}
          <label {...itemProps()} data-testid="custom-item">
            <SegmentGroupItemText>React</SegmentGroupItemText>
            <SegmentGroupItemHiddenInput />
          </label>
        {/snippet}
      </SegmentGroupItem>
    </section>
  {/snippet}
</SegmentGroup>