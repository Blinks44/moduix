<script module lang="ts">
  import type { MenuCheckboxItemProps as ArkMenuCheckboxItemProps } from '@ark-ui/svelte/menu';

  export type MenuIndicatorPosition = 'start' | 'end' | 'none';

  export interface MenuCheckboxItemProps extends ArkMenuCheckboxItemProps {
    /** Where the check indicator sits relative to the label. */
    indicator?: MenuIndicatorPosition;
  }
</script>

<script lang="ts">
  import { MenuCheckboxItem } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let {
    checked = $bindable(),
    class: className,
    indicator = 'start',
    ref = $bindable(null),
    ...props
  }: MenuCheckboxItemProps = $props();
</script>

<MenuCheckboxItem
  {...props}
  bind:checked
  bind:ref
  class={clsx(styles.checkboxItem, className)}
  data-indicator-position={indicator}
  data-slot="menu-checkbox-item"
/>