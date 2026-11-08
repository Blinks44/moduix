<script lang="ts">
  import { Title as DialogTitle, type DialogTitleProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DialogTitleProps = $props();
</script>

<DialogTitle
  {...props}
  bind:ref
  class={cn('text-md leading-6 font-semibold', className)}
  data-slot="command-palette-title"
/>