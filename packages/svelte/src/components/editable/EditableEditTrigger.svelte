<script lang="ts">
  import { EditableEditTrigger, type EditableEditTriggerProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import { PencilIcon } from '@/lib/moduix/icons/ui';
  import styles from './Editable.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: EditableEditTriggerProps = $props();
</script>

<EditableEditTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="editable-edit-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <PencilIcon />
  {/if}
</EditableEditTrigger>