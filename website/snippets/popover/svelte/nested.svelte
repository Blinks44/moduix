<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverBody,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
</script>

<Popover>
  <PopoverTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open settings</Button>{/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Settings</PopoverTitle>
        <PopoverDescription>Nested popovers keep independent state.</PopoverDescription>
      </PopoverHeader>
      <PopoverBody>
        <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
          <PopoverTrigger>
            {#snippet asChild(props)}<Button {...props()}>Advanced</Button>{/snippet}
          </PopoverTrigger>
          <PopoverPositioner>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Advanced settings</PopoverTitle>
                <PopoverDescription>This content belongs to the nested popover.</PopoverDescription>
              </PopoverHeader>
              <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
            </PopoverContent>
          </PopoverPositioner>
        </Popover>
      </PopoverBody>
    </PopoverContent>
  </PopoverPositioner>
</Popover>