<script lang="ts">
  import { Presence } from '@ark-ui/svelte/presence';
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/presence/presence-basic.module.css';

  let present = $state(true);
</script>

<Stack class={styles.root} align="center" gap={6}>
  <Button size="sm" type="button" variant="outline" onclick={() => (present = !present)}>
    {present ? 'Hide activity' : 'Show activity'}
  </Button>

  <Presence class={styles.panel} {present} unmountOnExit>
    <Card class={styles.card}>
      <CardHeader>
        <CardTitle>Import complete</CardTitle>
        <CardDescription>24 contacts are ready to review.</CardDescription>
      </CardHeader>
      <CardBody>Review their fields and invite them to the workspace when you are ready.</CardBody>
    </Card>
  </Presence>
</Stack>