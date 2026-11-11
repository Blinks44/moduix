<script lang="ts">
  import { EditableRootProvider, type EditableRootProviderProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  const rootClass =
    'grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-1 text-foreground has-data-autoresize:w-fit has-data-autoresize:max-w-full has-data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

  let { class: className, ref = $bindable(null), ...props }: EditableRootProviderProps = $props();
</script>

<EditableRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="editable-root-provider"
/>