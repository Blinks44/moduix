<script lang="ts">
  import { MenuItem } from '@moduix/svelte/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@moduix/svelte/split-button';
</script>

<SplitButton aria-label="Save actions">
  <SplitButtonAction disabled>Save Changes</SplitButtonAction>
  <SplitButtonTrigger aria-label="More save actions" />
  <SplitButtonPositioner>
    <SplitButtonContent>
      <MenuItem value="save-draft">Save as Draft</MenuItem>
      <MenuItem value="duplicate">Duplicate</MenuItem>
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>