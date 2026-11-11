<script lang="ts">
  import { EditableInput, type EditableInputProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

  let { class: className, ref = $bindable(null), ...props }: EditableInputProps = $props();
</script>

<EditableInput
  {...props}
  bind:ref
  class={clsx(styles.input, className)}
  data-slot="editable-input"
/>