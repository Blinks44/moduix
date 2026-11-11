<script lang="ts">
  import { StepsRoot, type StepsRootProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    step = $bindable(),
    ...props
  }: StepsRootProps = $props();

  const rootClass =
    'flex w-full min-w-0 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4';
</script>

<StepsRoot {...props} bind:ref bind:step class={cn(rootClass, className)} data-slot="steps-root" />