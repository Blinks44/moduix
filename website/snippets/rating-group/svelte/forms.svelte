<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
  import styles from '@/components/examples/rating-group/component-forms.module.css';

  let submitted = $state('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('review') ?? '');
  };
</script>

<form class={styles.stack} onsubmit={handleSubmit}>
  <RatingGroup name="review" defaultValue={4} required>
    <RatingGroupLabel>Review score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
  <div data-preview-meta>
    <output class={styles.hint}>Submitted: {submitted}</output>
    <Button type="submit">Submit</Button>
  </div>
</form>