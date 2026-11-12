<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-form-submission.module.css';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

  let submitted = $state('none');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('framework') ?? 'none');
  }
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <SegmentGroup aria-label="Framework" name="framework" defaultValue="React">
    <SegmentGroupIndicator />
    <SegmentGroupItems items={frameworks} />
  </SegmentGroup>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>