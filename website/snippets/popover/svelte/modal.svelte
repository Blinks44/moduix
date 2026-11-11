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
  import styles from '@/components/examples/popover/popover-modal.module.css';

  let inputRef = $state<HTMLInputElement | null>(null);
</script>

<Popover modal initialFocusEl={() => inputRef}>
  <PopoverTrigger>
    {#snippet asChild(props)}<Button {...props()}>Invite teammates</Button>{/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Invite teammates</PopoverTitle>
        <PopoverDescription>
          Focus is trapped inside this modal popover until dismissed.
        </PopoverDescription>
      </PopoverHeader>
      <PopoverBody>
        <label class={styles.label}>
          <span>Email</span><input bind:this={inputRef} class={styles.input} />
        </label>
      </PopoverBody>
      <PopoverFooter><PopoverCloseTrigger>Done</PopoverCloseTrigger></PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>