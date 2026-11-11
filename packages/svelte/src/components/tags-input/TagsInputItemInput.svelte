<script lang="ts">
  import { TagsInputItemInput, type TagsInputItemInputProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemInputProps = $props();
</script>

<TagsInputItemInput
  {...props}
  bind:ref
  class={clsx(styles.itemInput, className)}
  data-slot="tags-input-item-input"
/>