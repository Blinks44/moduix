<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import CircleHelp from '@lucide/svelte/icons/circle-help';
  import FolderKanban from '@lucide/svelte/icons/folder-kanban';
  import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
  import MenuIcon from '@lucide/svelte/icons/menu';
  import OrbitIcon from '@lucide/svelte/icons/orbit';
  import Search from '@lucide/svelte/icons/search';
  import Settings from '@lucide/svelte/icons/settings';
  import UserRound from '@lucide/svelte/icons/user-round';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Button } from '@/components/ui/button';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteEmpty,
    CommandPaletteItem,
    CommandPaletteItemDescription,
    CommandPaletteItemGroup,
    CommandPaletteItemGroupLabel,
    CommandPaletteItemIcon,
    CommandPaletteItemLabel,
    CommandPaletteItemText,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTrigger,
  } from '@/components/ui/command-palette';
  import {
    Menu,
    MenuTrigger,
    MenuPositioner,
    MenuContent,
    MenuViewport,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
  } from '@/components/ui/menu';
  import styles from './app-header.module.css';

  const navigation = [
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects' },
    { label: 'Team', href: '#team' },
  ];

  const commandItems = [
    {
      id: 'overview',
      section: 'Navigate',
      label: 'Overview',
      description: 'View your workspace summary',
      href: '#overview',
      icon: LayoutDashboard,
    },
    {
      id: 'projects',
      section: 'Navigate',
      label: 'Projects',
      description: 'Browse active projects',
      href: '#projects',
      icon: FolderKanban,
    },
    {
      id: 'team',
      section: 'Navigate',
      label: 'Team',
      description: 'See your teammates',
      href: '#team',
      icon: UserRound,
    },
    {
      id: 'workspace-settings',
      section: 'Workspace',
      label: 'Workspace settings',
      description: 'Manage your workspace preferences',
      href: '#workspace-settings',
      icon: Settings,
    },
    {
      id: 'help',
      section: 'Workspace',
      label: 'Help and support',
      description: 'Find product help',
      href: '#help',
      icon: CircleHelp,
    },
  ];

  const account = {
    name: 'Alex Morgan',
    role: 'Product designer',
    email: 'alex@acme.studio',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
  };
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.href,
    filter: (text, query) => filterOptions().contains(text, query),
    groupBy: (item) => item.section,
  });
  const navigate = (value: string) => {
    window.location.hash = value;
  };
</script>

<CommandPalette
  aria-label="Search workspace"
  onOpenChange={(details) => !details.open && filter('')}
>
  <header class={styles.root}>
    <div class={styles.leading}>
      <a class={styles.brand} href="#overview" aria-label="Orbit home">
        <span class={styles.brandMark} aria-hidden="true"><OrbitIcon /></span>
        <span class={styles.brandName}>Orbit</span>
      </a>
      <span class={styles.workspace}>
        <span class={styles.statusDot} aria-hidden="true"></span>Acme Studio
      </span>
    </div>
    <nav class={styles.navigation} aria-label="Primary navigation">
      {#each navigation as item, index (item.href)}
        <a
          class={styles.navigationLink}
          href={item.href}
          aria-current={index === 0 ? 'page' : undefined}>{item.label}</a
        >
      {/each}
    </nav>
    <div class={styles.actions}>
      <span class={styles.mobileNavigation}>
        <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
          <MenuTrigger>
            {#snippet asChild(props)}
              <Button {...props()} variant="ghost" size="icon-sm" aria-label="Open navigation">
                <MenuIcon />
              </Button>
            {/snippet}
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent class={styles.mobileNavigationMenu}>
              <MenuViewport>
                <MenuItemGroup>
                  <MenuItemGroupLabel>Navigation</MenuItemGroupLabel>
                  {#each navigation as item, index (item.href)}
                    <MenuItem value={item.href}>
                      {#snippet asChild(props)}
                        <a
                          {...props()}
                          href={item.href}
                          aria-current={index === 0 ? 'page' : undefined}>{item.label}</a
                        >
                      {/snippet}
                    </MenuItem>
                  {/each}
                </MenuItemGroup>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </span>
      <CommandPaletteTrigger>
        {#snippet asChild(props)}
          <Button
            {...props()}
            class={styles.searchTrigger}
            variant="ghost"
            size="icon-sm"
            aria-label="Search workspace"
          >
            <Search />
          </Button>
        {/snippet}
      </CommandPaletteTrigger>
      <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
        <MenuTrigger>
          {#snippet asChild(props)}
            <Button
              {...props()}
              class={styles.accountTrigger}
              variant="ghost"
              size="sm"
              aria-label={`Open ${account.name}'s account menu`}
            >
              <Avatar class={styles.avatar} size="sm">
                <AvatarImage src={account.image} alt="" />
                <AvatarFallback>{account.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span class={styles.accountDetails}>
                <strong>{account.name}</strong><span>{account.role}</span>
              </span>
              <ChevronDown class={styles.accountChevron} aria-hidden="true" />
            </Button>
          {/snippet}
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent class={styles.accountMenu}>
            <MenuViewport>
              <MenuItemGroup>
                <MenuItemGroupLabel class={styles.accountSummary}>
                  <strong>{account.name}</strong><span>{account.email}</span>
                </MenuItemGroupLabel>
                <MenuItem value="profile">
                  {#snippet asChild(props)}
                    <a {...props()} class={styles.menuLink} href="#profile">
                      <UserRound aria-hidden="true" />Profile
                    </a>
                  {/snippet}
                </MenuItem>
                <MenuItem value="workspace-settings">
                  {#snippet asChild(props)}
                    <a {...props()} class={styles.menuLink} href="#workspace-settings">
                      <Settings aria-hidden="true" />Workspace settings
                    </a>
                  {/snippet}
                </MenuItem>
                <MenuItem value="help">
                  {#snippet asChild(props)}
                    <a {...props()} class={styles.menuLink} href="#help">
                      <CircleHelp aria-hidden="true" />Help and support
                    </a>
                  {/snippet}
                </MenuItem>
              </MenuItemGroup>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </div>
  </header>
  <CommandPalettePanel class={styles.commandPalette}>
    <CommandPaletteCombobox
      collection={collection()}
      onInputValueChange={(details) => filter(details.inputValue)}
      onSelect={(details) => navigate(details.itemValue)}
    >
      <CommandPaletteSearch placeholder="Search workspace..." />
      <CommandPaletteList>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        {#each collection().group() as [section, items] (section)}
          <CommandPaletteItemGroup>
            <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
            {#each items as item (item.id)}
              <CommandPaletteItem {item}>
                <CommandPaletteItemIcon><item.icon /></CommandPaletteItemIcon>
                <CommandPaletteItemText>
                  <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                  <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
                </CommandPaletteItemText>
              </CommandPaletteItem>
            {/each}
          </CommandPaletteItemGroup>
        {/each}
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>