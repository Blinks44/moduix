<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Input } from '@moduix/svelte/input';
  import {
    Popover,
    PopoverAnchor,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
  import styles from '@/components/examples/popover/popover-anchor.module.css';
</script>

<div class={styles.root}>
  <Popover positioning={{ gutter: 8 }}>
    <PopoverAnchor>
      {#snippet asChild(props)}<Input {...props()} placeholder="Popover anchor" />{/snippet}
    </PopoverAnchor>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open below the input</Button>{/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Custom anchor</PopoverTitle>
          <PopoverDescription>
            The popup is positioned relative to the input instead of the trigger.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</div>