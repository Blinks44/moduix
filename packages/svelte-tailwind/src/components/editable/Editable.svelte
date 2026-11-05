<script module lang="ts">
  import type { PolymorphicProps } from '@ark-ui/svelte';
  import type { EditableRootProps as ArkEditableRootProps } from '@ark-ui/svelte/editable';

  // Ark Svelte renders the root through `Ark`, so `asChild` works but its type omits it.
  export interface EditableRootProps
    extends ArkEditableRootProps, Pick<PolymorphicProps<'div'>, 'asChild'> {}
</script>

<script lang="ts">
  import { EditableRoot } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  const rootClass =
    'grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-1 text-foreground has-data-autoresize:w-fit has-data-autoresize:max-w-full has-data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

  let {
    activationMode = 'dblclick',
    class: className,
    edit = $bindable(),
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: EditableRootProps = $props();
</script>

<EditableRoot
  {...props}
  bind:ref
  bind:value
  bind:edit
  {activationMode}
  class={cn(rootClass, className)}
  data-slot="editable-root"
/>