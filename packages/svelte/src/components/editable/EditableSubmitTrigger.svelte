<script lang="ts">
  import { EditableSubmitTrigger, type EditableSubmitTriggerProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Editable.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: EditableSubmitTriggerProps = $props();
</script>

<EditableSubmitTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="editable-submit-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</EditableSubmitTrigger>