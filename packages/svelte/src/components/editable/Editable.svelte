<script module lang="ts">
  import type { PolymorphicProps } from '@ark-ui/svelte';
  import type { EditableRootProps as ArkEditableRootProps } from '@ark-ui/svelte/editable';

  // Ark Svelte renders the root through `Ark`, so `asChild` works but its type omits it.
  export interface EditableRootProps
    extends ArkEditableRootProps, Pick<PolymorphicProps<'div'>, 'asChild'> {}
</script>

<script lang="ts">
  import { EditableRoot } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="editable-root"
/>