<script lang="ts">
  import { MenuItem } from '@moduix/svelte/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@moduix/svelte/split-button';
  import { Stack } from '@moduix/svelte/stack';

  const variants = [
    'default',
    'outline',
    'secondary',
    'destructive',
    'destructive-outline',
    'ghost',
  ] as const;
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  {#each variants as variant (variant)}
    <SplitButton aria-label={`${variant} actions`} {variant}>
      <SplitButtonAction>{variant}</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value={`${variant}-edit`}>Edit</MenuItem>
          <MenuItem value={`${variant}-duplicate`}>Duplicate</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  {/each}
</Stack>