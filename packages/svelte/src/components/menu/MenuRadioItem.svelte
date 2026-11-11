<script module lang="ts">
  import type { MenuRadioItemProps as ArkMenuRadioItemProps } from '@ark-ui/svelte/menu';
  import type { MenuIndicatorPosition } from './MenuCheckboxItem.svelte';

  export interface MenuRadioItemProps extends ArkMenuRadioItemProps {
    /** Where the radio indicator sits relative to the label. */
    indicator?: MenuIndicatorPosition;
  }
</script>

<script lang="ts">
  import { MenuRadioItem } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let {
    class: className,
    indicator = 'start',
    ref = $bindable(null),
    ...props
  }: MenuRadioItemProps = $props();
</script>

<MenuRadioItem
  {...props}
  bind:ref
  class={clsx(styles.radioItem, className)}
  data-indicator-position={indicator}
  data-slot="menu-radio-item"
/>