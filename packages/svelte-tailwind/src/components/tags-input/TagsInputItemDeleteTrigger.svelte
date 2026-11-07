<script lang="ts">
  import {
    TagsInputItemDeleteTrigger,
    type TagsInputItemDeleteTriggerProps,
  } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';
  import { CloseIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TagsInputItemDeleteTriggerProps = $props();

  const deleteTriggerClass =
    'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit outline-0 transition-[background-color,box-shadow] duration-normal ease-in-out group-data-readonly:hidden focus-visible:ring-(length:--moduix-focus-ring-inset-width) focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-disabled [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100 [@media(hover:hover)]:hover:bg-current/12';
</script>

<TagsInputItemDeleteTrigger
  {...props}
  bind:ref
  class={cn(deleteTriggerClass, className)}
  data-slot="tags-input-item-delete-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <CloseIcon />
  {/if}
</TagsInputItemDeleteTrigger>