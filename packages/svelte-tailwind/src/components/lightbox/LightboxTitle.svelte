<script lang="ts">
  import { Title as DialogTitle, type DialogTitleProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DialogTitleProps = $props();
</script>

<DialogTitle
  {...props}
  bind:ref
  class={cn('m-0 text-md leading-6 font-semibold text-foreground', className)}
  data-slot="lightbox-title"
/>