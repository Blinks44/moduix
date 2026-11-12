<script lang="ts">
  import { MenuItem, MenuSeparator } from '@moduix/svelte/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@moduix/svelte/split-button';
  import { Stack } from '@moduix/svelte/stack';

  let status = $state('Ready to save.');
</script>

<Stack align="center" gap="4">
  <SplitButton aria-label="Save actions">
    <SplitButtonAction onclick={() => (status = 'Changes saved.')}>Save Changes</SplitButtonAction>
    <SplitButtonTrigger />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem value="publish">Publish Now</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
  <div data-preview-meta>
    <output aria-live="polite">{status}</output>
  </div>
</Stack>