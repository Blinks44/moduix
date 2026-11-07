<script lang="ts">
  import {
    TagsInputRootProvider,
    type TagsInputRootProviderProps,
  } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import styles from './TagsInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: TagsInputRootProviderProps = $props();
</script>

<TagsInputRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="tags-input-root-provider"
/>