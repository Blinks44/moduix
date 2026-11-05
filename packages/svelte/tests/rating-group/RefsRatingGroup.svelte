<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItem,
    RatingGroupItemIndicator,
    RatingGroupLabel,
  } from '@/components/rating-group';

  const refs: Record<'root' | 'label' | 'control' | 'item', Element | null> = $state({
    root: null,
    label: null,
    control: null,
    item: null,
  });

  export const getRefs = () => refs;
</script>

<RatingGroup bind:ref={refs.root} defaultValue={3} data-probe="root">
  <RatingGroupLabel bind:ref={refs.label}>Rating</RatingGroupLabel>
  <RatingGroupControl bind:ref={refs.control}>
    <RatingGroupItem bind:ref={refs.item} index={1}>
      <RatingGroupItemIndicator />
    </RatingGroupItem>
  </RatingGroupControl>
  <RatingGroupHiddenInput />
</RatingGroup>