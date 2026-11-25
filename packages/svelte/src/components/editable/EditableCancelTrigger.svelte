<script lang="ts">
  import { EditableCancelTrigger, type EditableCancelTriggerProps } from '@ark-ui/svelte/editable';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Editable.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: EditableCancelTriggerProps = $props();
</script>

<EditableCancelTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="editable-cancel-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <UiIcon icon="close" />
  {/if}
</EditableCancelTrigger>