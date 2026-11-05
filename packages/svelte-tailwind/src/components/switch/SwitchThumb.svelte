<script lang="ts">
  import { SwitchThumb, type SwitchThumbProps } from '@ark-ui/svelte/switch';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SwitchThumbProps = $props();
</script>

<SwitchThumb
  {...props}
  bind:ref
  class={cn(
    'absolute start-0.5 top-1/2 inline-flex aspect-square h-[calc(100%-var(--moduix-spacing-0-5)*2)] -translate-y-1/2 items-center justify-center rounded-full bg-white text-muted-foreground shadow-sm transition-[inset-inline-start,translate,background-color,color] duration-normal ease-in-out data-[state=checked]:start-[calc(100%-var(--moduix-spacing-0-5))] data-[state=checked]:-translate-x-full data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary [&>svg]:size-[65%] data-[state=checked]:[&[dir=rtl]]:translate-x-full',
    className,
  )}
  data-slot="switch-thumb"
/>