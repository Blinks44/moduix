<script lang="ts">
  import {
    Popover,
    PopoverCloseIcon,
    PopoverContent,
    PopoverPositioner,
    PopoverTitle,
  } from '@/components/popover';

  let {
    label,
    labelledby,
    custom = false,
  }: { label?: string; labelledby?: string; custom?: boolean } = $props();
</script>

<Popover defaultOpen portalled={false}>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverTitle>Preview</PopoverTitle>
      {#if custom}
        <PopoverCloseIcon
          aria-label={label}
          aria-labelledby={labelledby}
          class="consumer-close"
          style="color: red"
          title="Dismiss preview"
          data-testid="close"
        >
          <span>Custom close</span>
        </PopoverCloseIcon>
      {:else}
        <PopoverCloseIcon
          aria-label={label}
          aria-labelledby={labelledby}
          class="consumer-close"
          style="color: red"
          title="Dismiss preview"
          data-testid="close"
        />
      {/if}
    </PopoverContent>
  </PopoverPositioner>
</Popover>