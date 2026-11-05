<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@/components/rating-group';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<RatingGroup bind:ref={rootRef} defaultValue={2}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Rating section">
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
      <RatingGroupHiddenInput />
    </section>
  {/snippet}
</RatingGroup>