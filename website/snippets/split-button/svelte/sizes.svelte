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

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  {#each sizes as size (size)}
    <SplitButton aria-label={`${size} create actions`} {size} variant="outline">
      <SplitButtonAction>{size}</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value={`${size}-create`}>Create</MenuItem>
          <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  {/each}
</Stack>