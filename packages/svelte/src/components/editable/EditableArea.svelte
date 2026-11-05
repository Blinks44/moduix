<script lang="ts">
  import { EditableArea, type EditableAreaProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

  let { class: className, ref = $bindable(null), ...props }: EditableAreaProps = $props();
</script>

<EditableArea {...props} bind:ref class={clsx(styles.area, className)} data-slot="editable-area" />