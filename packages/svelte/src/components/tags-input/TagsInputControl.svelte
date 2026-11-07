<script lang="ts">
  import { TagsInputControl, type TagsInputControlProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputControlProps = $props();
</script>

<TagsInputControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="tags-input-control"
/>