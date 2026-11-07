<script lang="ts">
  import {
    TagsInputItemDeleteTrigger,
    type TagsInputItemDeleteTriggerProps,
  } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import { CloseIcon } from '@/lib/moduix/icons/ui';
  import styles from './TagsInput.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TagsInputItemDeleteTriggerProps = $props();
</script>

<TagsInputItemDeleteTrigger
  {...props}
  bind:ref
  class={clsx(styles.itemDeleteTrigger, className)}
  data-slot="tags-input-item-delete-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <CloseIcon />
  {/if}
</TagsInputItemDeleteTrigger>