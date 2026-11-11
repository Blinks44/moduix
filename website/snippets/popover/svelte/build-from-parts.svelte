<script lang="ts">
  import { Bell as BellIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/popover/popover-build-from-parts.module.css';
</script>

<Popover positioning={{ gutter: 8 }}>
  <PopoverTrigger>
    {#snippet asChild(props)}
      <Button {...props()}><BellIcon aria-hidden="true" size={16} /> Notifications</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <Stack gap="1">
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
      </Stack>
      <div class={styles.footer}><PopoverCloseTrigger>Close</PopoverCloseTrigger></div>
    </PopoverContent>
  </PopoverPositioner>
</Popover>