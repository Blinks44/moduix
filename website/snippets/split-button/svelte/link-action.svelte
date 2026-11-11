<script lang="ts">
  import { ArrowUpRight as ArrowUpRightIcon } from '@lucide/svelte';
  import { MenuItem } from '@moduix/svelte/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@moduix/svelte/split-button';
</script>

<SplitButton aria-label="Documentation actions" variant="outline">
  <SplitButtonAction>
    {#snippet asChild(props)}
      <a {...props()} href="#split-button"
        >Open Docs<ArrowUpRightIcon aria-hidden="true" focusable="false" /></a
      >
    {/snippet}
  </SplitButtonAction>
  <SplitButtonTrigger aria-label="More docs actions" />
  <SplitButtonPositioner>
    <SplitButtonContent>
      <MenuItem value="copy-link">Copy Link</MenuItem>
      <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>