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
  import { ChevronUpDownIcon, PencilIcon, RestartIcon, TrashIcon } from '@/lib/moduix/icons/ui';
  import { classes } from './classes';

  let { accentClass }: { accentClass?: string } = $props();
</script>

<Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
  <MenuTrigger>
    {#snippet asChild(triggerProps)}
      <SidebarNavigationButton
        {...triggerProps()}
        size="lg"
        title="Account"
        class={[classes.accountButton, accentClass]}
      >
        <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
        <SidebarLabel class={classes.accountMeta}>
          <strong>Alex Morgan</strong>
          <span>alex@acme.dev</span>
        </SidebarLabel>
        <MenuIndicator><ChevronUpDownIcon /></MenuIndicator>
      </SidebarNavigationButton>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent class={classes.accountMenu}>
      <MenuViewport>
        <MenuItemGroup>
          <MenuItemGroupLabel>Acme Inc.</MenuItemGroupLabel>
          <MenuItem value="profile">
            <MenuItemText><PencilIcon />Profile</MenuItemText>
          </MenuItem>
          <MenuItem value="settings">
            <MenuItemText><RestartIcon />Settings</MenuItemText>
          </MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItem value="sign-out" tone="destructive">
          <MenuItemText><TrashIcon />Sign out</MenuItemText>
        </MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>