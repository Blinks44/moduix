<script lang="ts">
  import { MenuRadioItemGroup, type MenuRadioItemGroupProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: MenuRadioItemGroupProps = $props();
</script>

<MenuRadioItemGroup
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.radioItemGroup, className)}
  data-slot="menu-radio-item-group"
/>