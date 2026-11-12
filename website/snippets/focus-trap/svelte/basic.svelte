<script lang="ts">
  import { FocusTrap } from '@ark-ui/svelte/focus-trap';
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@moduix/svelte/card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/focus-trap/focus-trap-basic.module.css';

  let isReviewing = $state(false);
  let detailsButton = $state<HTMLButtonElement | null>(null);
</script>

<Stack align="center" class={styles.root} gap={4}>
  <FocusTrap
    class={styles.trap}
    disabled={!isReviewing}
    initialFocus={() => detailsButton || false}
    onDeactivate={() => (isReviewing = false)}
  >
    <Card>
      <CardHeader><CardTitle>Review mode</CardTitle></CardHeader>
      <CardBody>When active, Tab and Shift + Tab stay inside these actions.</CardBody>
      <CardFooter>
        <Button bind:ref={detailsButton} size="sm" type="button" variant="outline">
          Review details
        </Button>
        <Button size="sm" type="button" onclick={() => (isReviewing = false)}>Finish review</Button>
      </CardFooter>
    </Card>
  </FocusTrap>
  <Stack align="center" direction="row" gap={2}>
    <div data-preview-meta>
      <output aria-live="polite">Focus trap: {isReviewing ? 'active' : 'inactive'}</output>
      <Button disabled={isReviewing} size="sm" type="button" onclick={() => (isReviewing = true)}>
        Start review
      </Button>
    </div>
  </Stack>
</Stack>