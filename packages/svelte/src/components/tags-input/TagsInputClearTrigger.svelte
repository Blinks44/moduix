<script lang="ts">
  import {
    TagsInputClearTrigger,
    type TagsInputClearTriggerProps,
  } from '@ark-ui/svelte/tags-input';
  import { clsx } from 'clsx';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './TagsInput.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TagsInputClearTriggerProps = $props();
</script>

<!-- Ark merges its label, anatomy, and state props onto the CloseButton host. -->
{#if asChild}
  <TagsInputClearTrigger
    {...props}
    bind:ref
    {asChild}
    class={clsx(styles.clearTrigger, className)}
    data-slot="tags-input-clear-trigger"
  />
{:else}
  <TagsInputClearTrigger
    {...props}
    bind:ref
    class={clsx(styles.clearTrigger, className)}
    data-slot="tags-input-clear-trigger"
  >
    {#snippet asChild(triggerProps)}
      <CloseButton {...triggerProps()} {children} />
    {/snippet}
  </TagsInputClearTrigger>
{/if}