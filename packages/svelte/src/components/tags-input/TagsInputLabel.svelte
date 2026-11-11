<script lang="ts">
  import { TagsInputLabel, type TagsInputLabelProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputLabelProps = $props();
</script>

<TagsInputLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="tags-input-label"
/>