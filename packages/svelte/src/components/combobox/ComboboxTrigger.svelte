<script lang="ts">
  import { ComboboxTrigger, type ComboboxTriggerProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Combobox.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ComboboxTriggerProps = $props();
</script>

<ComboboxTrigger
  {...props}
  bind:ref
  class={clsx(styles.trigger, className)}
  data-slot="combobox-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <UiIcon icon="chevron-up-down" />
  {/if}
</ComboboxTrigger>