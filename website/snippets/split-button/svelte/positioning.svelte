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

<SplitButton
  aria-label="Export actions"
  positioning={{ placement: 'bottom-start', gutter: 8 }}
  variant="outline"
>
  <SplitButtonAction>Export</SplitButtonAction>
  <SplitButtonTrigger aria-label="More export actions" />
  <SplitButtonPositioner>
    <SplitButtonContent>
      <MenuItem value="export-pdf">Export PDF</MenuItem>
      <MenuItem value="export-csv">Export CSV</MenuItem>
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>