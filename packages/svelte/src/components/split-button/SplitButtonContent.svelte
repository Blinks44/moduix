<script lang="ts">
  import { MenuContent, type MenuContentProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import styles from '../menu/Menu.module.css';
  import MenuViewport from '../menu/MenuViewport.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: MenuContentProps = $props();
</script>

<MenuContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="split-button-content"
>
  <MenuViewport>{@render children?.()}</MenuViewport>
</MenuContent>