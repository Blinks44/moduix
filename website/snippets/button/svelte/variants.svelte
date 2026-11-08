<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';

  const variants = [
    'default',
    'outline',
    'secondary',
    'destructive',
    'destructive-outline',
    'ghost',
    'link',
  ] as const;
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  {#each variants as variant (variant)}
    <Button {variant}>
      {variant}
    </Button>
  {/each}
</Stack>