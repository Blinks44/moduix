<script lang="ts">
  import { SwitchControl, type SwitchControlProps } from '@ark-ui/svelte/switch';
  import { clsx } from 'clsx';
  import styles from './Switch.module.css';
  import SwitchThumb from './SwitchThumb.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SwitchControlProps = $props();
</script>

<SwitchControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="switch-control"
>
  {#if children}
    {@render children()}
  {:else}
    <SwitchThumb />
  {/if}
</SwitchControl>