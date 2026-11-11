<script lang="ts">
  import { Plus as PlusIcon } from '@lucide/svelte';
  import { MenuItem, MenuSeparator } from '@moduix/svelte/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@moduix/svelte/split-button';
</script>

<SplitButton aria-label="Create actions">
  <SplitButtonAction><PlusIcon aria-hidden="true" focusable="false" />Create Item</SplitButtonAction
  >
  <SplitButtonTrigger aria-label="More create actions" />
  <SplitButtonPositioner>
    <SplitButtonContent>
      <MenuItem value="create-blank">Create Blank</MenuItem>
      <MenuItem value="create-template">Create From Template</MenuItem>
      <MenuSeparator />
      <MenuItem value="import-existing">Import Existing</MenuItem>
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>