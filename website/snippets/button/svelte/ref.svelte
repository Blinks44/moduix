<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';

  const labels = {
    target: 'Focus target',
    trigger: 'Focus first button',
  };
  let button: Element | null = $state(null);

  const focusButton = () => {
    if (button instanceof HTMLButtonElement) button.focus();
  };
</script>

<Stack align="center" gap="3">
  <Button bind:ref={button} aria-label="Focus target">{labels.target}</Button>
  <Button size="sm" variant="outline" onclick={focusButton}>{labels.trigger}</Button>
</Stack>