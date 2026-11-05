<script lang="ts">
  import { EditableLabel, type EditableLabelProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

  let { class: className, ref = $bindable(null), ...props }: EditableLabelProps = $props();
</script>

<EditableLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="editable-label"
/>