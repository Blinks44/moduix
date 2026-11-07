<script lang="ts">
  import { TagsInputItemText, type TagsInputItemTextProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemTextProps = $props();
</script>

<TagsInputItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="tags-input-item-text"
/>