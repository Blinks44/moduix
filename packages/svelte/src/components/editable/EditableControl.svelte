<script lang="ts">
  import { EditableControl, type EditableControlProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

  let { class: className, ref = $bindable(null), ...props }: EditableControlProps = $props();
</script>

<EditableControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="editable-control"
/>