<script lang="ts">
  import { TagsInputItem, type TagsInputItemProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemProps = $props();
</script>

<TagsInputItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-slot="tags-input-item"
/>