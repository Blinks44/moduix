<script lang="ts">
  import {
    TagsInputClearTrigger,
    type TagsInputClearTriggerProps,
  } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TagsInputClearTriggerProps = $props();

  const asChildClass = 'ms-auto data-readonly:hidden';
  const closeButtonClass =
    'ms-auto size-control-xs focus-visible:outline-focus-inset focus-visible:outline-offset-1 data-readonly:hidden [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100';
</script>

<!-- Ark merges its label, anatomy, and state props onto the CloseButton host. -->
{#if asChild}
  <TagsInputClearTrigger
    {...props}
    bind:ref
    {asChild}
    class={cn(asChildClass, className)}
    data-slot="tags-input-clear-trigger"
  />
{:else}
  <TagsInputClearTrigger
    {...props}
    bind:ref
    class={cn(closeButtonClass, className)}
    data-slot="tags-input-clear-trigger"
  >
    {#snippet asChild(triggerProps)}
      <CloseButton {...triggerProps()} {children} />
    {/snippet}
  </TagsInputClearTrigger>
{/if}