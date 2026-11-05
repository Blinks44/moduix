<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import { SelectItem, type SelectItemProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectItemProps<T> = $props();
</script>

<SelectItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="select-item" />