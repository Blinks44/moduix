<script lang="ts">
  import { TagsInputRoot, type TagsInputRootProps } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let {
    class: className,
    inputValue = $bindable(),
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: TagsInputRootProps = $props();
</script>

<TagsInputRoot
  {...props}
  bind:ref
  bind:value
  bind:inputValue
  class={clsx(styles.root, className)}
  data-slot="tags-input-root"
/>