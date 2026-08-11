import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Avatar } from '@moduix/react/avatar';
import { Button } from '@moduix/react/button';
import { CommandPalette } from '@moduix/react/command-palette';
import { Menu } from '@moduix/react/menu';
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
} from 'lucide-react';
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
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.href,
    filter: contains,
    groupBy: (item) => item.section,
  });

  return (
    <CommandPalette
      aria-label="Search workspace"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <header className={styles.root}>
        <div className={styles.leading}>
          <a className={styles.brand} href="#overview" aria-label="Orbit home">
            <span className={styles.brandMark} aria-hidden>
              <OrbitIcon />
            </span>
            <span className={styles.brandName}>Orbit</span>
          </a>

          <span className={styles.workspace}>
            <span className={styles.statusDot} aria-hidden />
            Acme Studio
          </span>
        </div>

        <nav className={styles.navigation} aria-label="Primary navigation">
          {navigation.map((item, index) => (
            <a
              className={styles.navigationLink}
              href={item.href}
              aria-current={index === 0 ? 'page' : undefined}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.mobileNavigation}>
            <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
              <Menu.Trigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Open navigation">
                  <MenuIcon />
                </Button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content className={styles.mobileNavigationMenu}>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>Navigation</Menu.ItemGroupLabel>
                    {navigation.map((item, index) => (
                      <Menu.Item value={item.href} asChild key={item.href}>
                        <a href={item.href} aria-current={index === 0 ? 'page' : undefined}>
                          {item.label}
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </span>

          <CommandPalette.Trigger asChild>
            <Button
              className={styles.searchTrigger}
              variant="ghost"
              size="icon-sm"
              aria-label="Search"
            >
              <Search aria-hidden />
            </Button>
          </CommandPalette.Trigger>

          <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
            <Menu.Trigger asChild>
              <Button
                className={styles.accountTrigger}
                variant="ghost"
                size="sm"
                aria-label={`Open ${account.name}'s account menu`}
              >
                <Avatar className={styles.avatar} size="sm">
                  <Avatar.Image src={account.image} alt="" />
                  <Avatar.Fallback name={account.name} />
                </Avatar>
                <span className={styles.accountDetails}>
                  <strong>{account.name}</strong>
                  <span>{account.role}</span>
                </span>
                <ChevronDown className={styles.accountChevron} aria-hidden />
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.accountMenu}>
                <Menu.ItemGroup>
                  <Menu.ItemGroupLabel className={styles.accountSummary}>
                    <strong>{account.name}</strong>
                    <span>{account.email}</span>
                  </Menu.ItemGroupLabel>
                  <Menu.Item value="profile" asChild>
                    <a className={styles.menuLink} href="#profile">
                      <UserRound aria-hidden />
                      Profile
                    </a>
                  </Menu.Item>
                  <Menu.Item value="workspace-settings" asChild>
                    <a className={styles.menuLink} href="#workspace-settings">
                      <Settings aria-hidden />
                      Workspace settings
                    </a>
                  </Menu.Item>
                  <Menu.Item value="help" asChild>
                    <a className={styles.menuLink} href="#help">
                      <CircleHelp aria-hidden />
                      Help and support
                    </a>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </div>
      </header>

      <CommandPalette.Panel className={styles.commandPalette}>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
          onSelect={(details) => {
            window.location.hash = details.itemValue;
          }}
        >
          <CommandPalette.Search placeholder="Search workspace..." />
          <CommandPalette.List>
            <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
            {collection.group().map(([section, items]) => (
              <CommandPalette.ItemGroup key={section}>
                <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
                {items.map((item) => (
                  <CommandPalette.Item key={item.id} item={item}>
                    <CommandPalette.ItemIcon>{item.icon}</CommandPalette.ItemIcon>
                    <CommandPalette.ItemText>
                      <CommandPalette.ItemLabel>{item.label}</CommandPalette.ItemLabel>
                      <CommandPalette.ItemDescription>
                        {item.description}
                      </CommandPalette.ItemDescription>
                    </CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
              </CommandPalette.ItemGroup>
            ))}
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}