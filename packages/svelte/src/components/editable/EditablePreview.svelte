<script lang="ts">
  import { EditablePreview, type EditablePreviewProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import styles from './Editable.module.css';

  let { class: className, ref = $bindable(null), ...props }: EditablePreviewProps = $props();
</script>

<EditablePreview
  {...props}
  bind:ref
  class={clsx(styles.preview, className)}
  data-slot="editable-preview"
/>