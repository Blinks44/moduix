<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
  import { Stack } from '@moduix/svelte/stack';

  let open = $state(false);
</script>

<Stack align="center" gap="3">
  <Popover bind:open>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open controlled popover</Button>{/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Publish changes?</PopoverTitle>
          <PopoverDescription>
            This action will make your latest updates visible to all users.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
  <div data-preview-meta>
    <output>Open: {open ? 'yes' : 'no'}</output>
  </div>
</Stack>