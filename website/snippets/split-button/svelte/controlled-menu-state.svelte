<script lang="ts">
  import { MenuItem, MenuSeparator } from '@moduix/svelte/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@moduix/svelte/split-button';

  let open = $state(false);
</script>

<SplitButton aria-label="Share actions" bind:open variant="outline">
  <SplitButtonAction>Share</SplitButtonAction>
  <SplitButtonTrigger aria-label="More share actions" />
  <SplitButtonPositioner>
    <SplitButtonContent>
      <MenuItem value="copy-link">Copy Link</MenuItem>
      <MenuItem value="invite-email">Invite by Email</MenuItem>
      <MenuSeparator />
      <MenuItem value="close-menu" onSelect={() => (open = false)}>Close Menu</MenuItem>
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>