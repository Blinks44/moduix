<script lang="ts">
  import { EditableRootProvider, type EditableRootProviderProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

  let { class: className, ref = $bindable(null), ...props }: EditableRootProviderProps = $props();
</script>

<EditableRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="editable-root-provider"
/>