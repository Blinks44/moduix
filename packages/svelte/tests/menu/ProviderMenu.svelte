<script lang="ts">
  import {
    MenuCheckboxItem,
    MenuContent,
    MenuContext,
    MenuItemContext,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuRootProvider,
    MenuTrigger,
    MenuViewport,
    useMenu,
  } from '@/components/menu';
  import ItemState from './ItemState.svelte';
  import MenuState from './MenuState.svelte';

  const menu = useMenu({ id: 'provider-menu', defaultOpen: true });
</script>

<MenuRootProvider value={menu} portalled={false}>
  <MenuState />
  <MenuContext>
    {#snippet render(context)}<output>{context().open ? 'Open slot' : 'Closed slot'}</output
      >{/snippet}
  </MenuContext>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuCheckboxItem checked value="toolbar">
          <MenuItemIndicator />
          <MenuItemText>
            Show toolbar
            <ItemState />
            <MenuItemContext>
              {#snippet render(item)}<span
                  >{item().checked ? 'Checked slot' : 'Unchecked slot'}</span
                >{/snippet}
            </MenuItemContext>
          </MenuItemText>
        </MenuCheckboxItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</MenuRootProvider>