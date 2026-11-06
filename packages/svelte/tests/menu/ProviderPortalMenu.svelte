<script lang="ts">
  import {
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuRootProvider,
    MenuTrigger,
    useMenu,
  } from '@/components/menu';

  let { providerProps = {} }: { providerProps?: { portalled?: boolean } } = $props();
  const menu = useMenu({ id: 'portal-menu', defaultOpen: true });
</script>

<MenuRootProvider value={menu} {...providerProps}>
  <MenuTrigger>Provider actions</MenuTrigger>
  <MenuPositioner>
    <MenuContent><MenuItem value="edit">Edit</MenuItem></MenuContent>
  </MenuPositioner>
</MenuRootProvider>