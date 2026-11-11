<script lang="ts">
  import { DialogDescription, type DialogDescriptionProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DialogDescriptionProps = $props();
</script>

<DialogDescription
  {...props}
  bind:ref
  class={cn('text-md text-muted-foreground', className)}
  data-slot="dialog-description"
/>