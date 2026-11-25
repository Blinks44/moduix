<script lang="ts">
  import { Avatar, AvatarFallback } from '@/components/avatar';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuItemText,
    MenuPositioner,
    MenuSeparator,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';
  import { SidebarLabel, SidebarNavigationButton } from '@/components/sidebar';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Sidebar.stories.module.css';
</script>

<Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
  <MenuTrigger>
    {#snippet asChild(triggerProps)}
      <SidebarNavigationButton
        {...triggerProps()}
        size="lg"
        title="Account"
        class={styles.accountButton}
      >
        <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
        <SidebarLabel class={styles.accountMeta}>
          <strong>Alex Morgan</strong>
          <span>alex@acme.dev</span>
        </SidebarLabel>
        <MenuIndicator><UiIcon icon="chevron-up-down" /></MenuIndicator>
      </SidebarNavigationButton>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent class={styles.accountMenu}>
      <MenuViewport>
        <MenuItemGroup>
          <MenuItemGroupLabel>Acme Inc.</MenuItemGroupLabel>
          <MenuItem value="profile">
            <MenuItemText><UiIcon icon="pencil" />Profile</MenuItemText>
          </MenuItem>
          <MenuItem value="settings">
            <MenuItemText><UiIcon icon="restart" />Settings</MenuItemText>
          </MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItem value="sign-out" tone="destructive">
          <MenuItemText><UiIcon icon="trash" />Sign out</MenuItemText>
        </MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>