<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuContextTrigger,
    MenuItem,
    MenuPositioner,
    MenuViewport,
  } from '@moduix/svelte/menu';
  import styles from '@/components/examples/menu/menu-lazy-mounted-context-menu.module.css';
</script>

<Menu lazyMount unmountOnExit>
  <MenuContextTrigger class={styles.contextTrigger}>
    Right click lazy mounted content
  </MenuContextTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="cut">Cut</MenuItem>
        <MenuItem value="copy">Copy</MenuItem>
        <MenuItem value="paste">Paste</MenuItem>
        <MenuItem value="delete" tone="destructive">Delete</MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>