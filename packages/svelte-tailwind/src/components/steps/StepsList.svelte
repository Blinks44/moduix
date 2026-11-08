<script lang="ts">
  import { StepsList, type StepsListProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsListProps = $props();
</script>

<StepsList
  {...props}
  bind:ref
  class={cn(
    'flex min-w-0 data-[orientation=horizontal]:items-center data-[orientation=vertical]:flex-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-4 max-[40rem]:data-[orientation=horizontal]:[scrollbar-width:thin] max-[40rem]:data-[orientation=horizontal]:overflow-x-auto',
    className,
  )}
  data-slot="steps-list"
/>