<script lang="ts">
  import { Presence } from '@ark-ui/svelte/presence';
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/presence/presence-mount-on-demand.module.css';

  let present = $state(false);
</script>

<Stack class={styles.root} align="center" gap={6}>
  <Button size="sm" type="button" variant="outline" onclick={() => (present = !present)}>
    {present ? 'Close update' : 'Open update'}
  </Button>

  <Presence class={styles.panel} lazyMount {present} unmountOnExit>
    <Card class={styles.card}>
      <CardHeader>
        <CardTitle>New workspace update</CardTitle>
        <CardDescription>The panel mounts only while it is needed.</CardDescription>
      </CardHeader>
      <CardBody>Publish the update when the release notes are ready for your team.</CardBody>
    </Card>
  </Presence>
</Stack>