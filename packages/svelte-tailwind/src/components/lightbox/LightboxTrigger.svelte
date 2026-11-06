<script lang="ts">
  import { Trigger as DialogTrigger, type DialogTriggerProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DialogTriggerProps = $props();
</script>

<DialogTrigger
  {...props}
  bind:ref
  class={cn(
    'cursor-zoom-in focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring',
    className,
  )}
  data-slot="lightbox-trigger"
/>