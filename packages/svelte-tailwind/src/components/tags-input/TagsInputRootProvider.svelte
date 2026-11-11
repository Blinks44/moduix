<script lang="ts">
  import {
    TagsInputRootProvider,
    type TagsInputRootProviderProps,
  } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputRootProviderProps = $props();

  const rootClass =
    'flex w-96 max-w-full flex-col gap-1 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>

<TagsInputRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="tags-input-root-provider"
/>