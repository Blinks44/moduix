<script lang="ts">
  import { TagsInputInput, type TagsInputInputProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputInputProps = $props();
</script>

<TagsInputInput
  {...props}
  bind:ref
  class={clsx(styles.input, className)}
  data-slot="tags-input-input"
/>