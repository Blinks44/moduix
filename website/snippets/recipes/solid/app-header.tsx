import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@moduix/solid/avatar';
import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/command-palette';
import { Menu } from '@moduix/solid/menu';
import {
  ChevronDown,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  Menu as MenuIcon,
  Orbit as OrbitIcon,
  Search,
  Settings,
  UserRound,
} from 'lucide-solid';
import { For } from 'solid-js';
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
    icon: <LayoutDashboard />,
  },
  {
    id: 'projects',
    section: 'Navigate',
    label: 'Projects',
    description: 'Browse active projects',
    href: '#projects',
    icon: <FolderKanban />,
  },
  {
    id: 'team',
    section: 'Navigate',
    label: 'Team',
    description: 'See your teammates',
    href: '#team',
    icon: <UserRound />,
  },
  {
    id: 'workspace-settings',
    section: 'Workspace',
    label: 'Workspace settings',
    description: 'Manage your workspace preferences',
    href: '#workspace-settings',
    icon: <Settings />,
  },
  {
    id: 'help',
    section: 'Workspace',
    label: 'Help and support',
    description: 'Find product help',
    href: '#help',
    icon: <CircleHelp />,
  },
];

const account = {
  name: 'Alex Morgan',
  role: 'Product designer',
  email: 'alex@acme.studio',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
};

export function AppHeader() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.href,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    groupBy: (item) => item.section,
  });

  return (
    <CommandPalette
      aria-label="Search workspace"
      onOpenChange={(details) => {
        if (!details.open) {
          collectionState.filter('');
        }
      }}
    >
      <header class={styles.root}>
        <div class={styles.leading}>
          <a class={styles.brand} href="#overview" aria-label="Orbit home">
            <span class={styles.brandMark} aria-hidden>
              <OrbitIcon />
            </span>
            <span class={styles.brandName}>Orbit</span>
          </a>

          <span class={styles.workspace}>
            <span class={styles.statusDot} aria-hidden />
            Acme Studio
          </span>
        </div>

        <nav class={styles.navigation} aria-label="Primary navigation">
          <For each={navigation}>
            {(item, index) => (
              <a
                class={styles.navigationLink}
                href={item.href}
                aria-current={index() === 0 ? 'page' : undefined}
              >
                {item.label}
              </a>
            )}
          </For>
        </nav>

        <div class={styles.actions}>
          <span class={styles.mobileNavigation}>
            <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
              <Menu.Trigger
                asChild={(props) => (
                  <Button
                    {...props()}
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Open navigation"
                  />
                )}
              >
                <MenuIcon />
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content class={styles.mobileNavigationMenu}>
                  <Menu.Viewport>
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>Navigation</Menu.ItemGroupLabel>
                      <For each={navigation}>
                        {(item, index) => (
                          <Menu.Item
                            value={item.href}
                            asChild={(props) => (
                              <a
                                {...props()}
                                href={item.href}
                                aria-current={index() === 0 ? 'page' : undefined}
                              />
                            )}
                          >
                            {item.label}
                          </Menu.Item>
                        )}
                      </For>
                    </Menu.ItemGroup>
                  </Menu.Viewport>
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </span>

          <CommandPaletteTrigger
            asChild={(props) => (
              <Button
                {...props()}
                class={styles.searchTrigger}
                variant="ghost"
                size="icon-sm"
                aria-label="Search"
              />
            )}
          >
            <Search aria-hidden />
          </CommandPaletteTrigger>

          <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
            <Menu.Trigger
              asChild={(props) => (
                <Button
                  {...props()}
                  class={styles.accountTrigger}
                  variant="ghost"
                  size="sm"
                  aria-label={`Open ${account.name}'s account menu`}
                />
              )}
            >
              <Avatar class={styles.avatar} size="sm">
                <AvatarImage src={account.image} alt="" />
                <AvatarFallback>{account.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span class={styles.accountDetails}>
                <strong>{account.name}</strong>
                <span>{account.role}</span>
              </span>
              <ChevronDown class={styles.accountChevron} aria-hidden />
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content class={styles.accountMenu}>
                <Menu.Viewport>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel class={styles.accountSummary}>
                      <strong>{account.name}</strong>
                      <span>{account.email}</span>
                    </Menu.ItemGroupLabel>
                    <Menu.Item
                      value="profile"
                      asChild={(props) => (
                        <a {...props()} class={styles.menuLink} href="#profile" />
                      )}
                    >
                      <UserRound aria-hidden />
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      value="workspace-settings"
                      asChild={(props) => (
                        <a {...props()} class={styles.menuLink} href="#workspace-settings" />
                      )}
                    >
                      <Settings aria-hidden />
                      Workspace settings
                    </Menu.Item>
                    <Menu.Item
                      value="help"
                      asChild={(props) => <a {...props()} class={styles.menuLink} href="#help" />}
                    >
                      <CircleHelp aria-hidden />
                      Help and support
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.Viewport>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </div>
      </header>

      <CommandPalettePanel class={styles.commandPalette}>
        <CommandPaletteCombobox
          collection={collectionState.collection()}
          onInputValueChange={(details) => collectionState.filter(details.inputValue)}
          onSelect={(details) => {
            window.location.hash = details.itemValue;
          }}
        >
          <CommandPaletteSearch placeholder="Search workspace..." />
          <CommandPaletteList>
            <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
            <For each={collectionState.collection().group()}>
              {([section, items]) => (
                <CommandPaletteItemGroup>
                  <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
                  <For each={items}>
                    {(item) => (
                      <CommandPaletteItem item={item}>
                        <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                        <CommandPaletteItemText>
                          <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                          <CommandPaletteItemDescription>
                            {item.description}
                          </CommandPaletteItemDescription>
                        </CommandPaletteItemText>
                      </CommandPaletteItem>
                    )}
                  </For>
                </CommandPaletteItemGroup>
              )}
            </For>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  );
}