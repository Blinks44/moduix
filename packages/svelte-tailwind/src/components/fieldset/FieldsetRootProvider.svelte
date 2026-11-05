<script lang="ts">
  import { FieldsetRootProvider, type FieldsetRootProviderProps } from '@ark-ui/svelte/fieldset';
  import { cn } from '@/lib/moduix/cn';

  const rootClass = 'flex w-full min-w-0 flex-col gap-4 data-disabled:opacity-disabled';

  let { class: className, ref = $bindable(null), ...props }: FieldsetRootProviderProps = $props();
</script>

<FieldsetRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="fieldset-root-provider"
/>