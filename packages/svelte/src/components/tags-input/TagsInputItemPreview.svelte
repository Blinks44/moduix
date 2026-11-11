<script lang="ts">
  import { TagsInputItemPreview, type TagsInputItemPreviewProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemPreviewProps = $props();
</script>

<TagsInputItemPreview
  {...props}
  bind:ref
  class={clsx(styles.itemPreview, className)}
  data-slot="tags-input-item-preview"
/>