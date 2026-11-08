<script lang="ts">
  import { StepsItem, type StepsItemProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsItemProps = $props();
</script>

<StepsItem
  {...props}
  bind:ref
  class={cn(
    'group/steps-item relative flex min-w-0 flex-1 items-center gap-3 last:flex-none data-[orientation=vertical]:min-h-16 data-[orientation=vertical]:flex-none data-[orientation=vertical]:items-start max-[40rem]:data-[orientation=horizontal]:flex-none',
    className,
  )}
  data-slot="steps-item"
/>