<script lang="ts">
  import { Presence } from '@ark-ui/svelte/presence';
  import { Button } from '@moduix/svelte/button';
  import { Card } from '@moduix/svelte/card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/presence/presence-exit-animations.module.css';

  let present = $state(true);
  let status = $state('Visible');
</script>

<Stack gap={4}>
  <Button size="sm" type="button" variant="outline" onclick={() => (present = !present)}>
    {present ? 'Hide saved filters' : 'Show saved filters'}
  </Button>

  <Presence
    class={styles.panel}
    {present}
    unmountOnExit
    onEnterComplete={() => (status = 'Visible')}
    onExitComplete={() => (status = 'Hidden')}
  >
    <Card>Saved filters will apply to the next refresh.</Card>
  </Presence>

  <p aria-live="polite">Status: {status}</p>
</Stack>