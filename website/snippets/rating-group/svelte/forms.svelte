<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';

  let submitted = $state('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('review') ?? '');
  };
</script>

<form onsubmit={handleSubmit}>
  <RatingGroup name="review" defaultValue={4} required>
    <RatingGroupLabel>Review score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
  <output>Submitted: {submitted}</output>
  <Button type="submit">Submit</Button>
</form>