<script lang="ts">
  import { SwitchLabel, type SwitchLabelProps } from '@ark-ui/svelte/switch';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SwitchLabelProps = $props();
</script>

<SwitchLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium select-none', className)}
  data-slot="switch-label"
/>