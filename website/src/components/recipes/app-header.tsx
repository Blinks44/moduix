import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@moduix/react/avatar';
import { Button } from '@moduix/react/button';
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
} from '@moduix/react/command-palette';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuItemGroup, MenuItemGroupLabel } from '@moduix/react/menu';
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
              <MenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Open navigation">
                  <MenuIcon />
                </Button>
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent className={styles.mobileNavigationMenu}>
                  <MenuViewport>
                    <MenuItemGroup>
                      <MenuItemGroupLabel>Navigation</MenuItemGroupLabel>
                      {navigation.map((item, index) => (
                        <MenuItem value={item.href} asChild key={item.href}>
                          <a href={item.href} aria-current={index === 0 ? 'page' : undefined}>
                            {item.label}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItemGroup>
                  </MenuViewport>
                </MenuContent>
              </MenuPositioner>
            </Menu>
          </span>

          <CommandPaletteTrigger asChild>
            <Button
              className={styles.searchTrigger}
              variant="ghost"
              size="icon-sm"
              aria-label="Search"
            >
              <Search aria-hidden />
            </Button>
          </CommandPaletteTrigger>

          <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
            <MenuTrigger asChild>
              <Button
                className={styles.accountTrigger}
                variant="ghost"
                size="sm"
                aria-label={`Open ${account.name}'s account menu`}
              >
                <Avatar className={styles.avatar} size="sm">
                  <AvatarImage src={account.image} alt="" />
                  <AvatarFallback>{account.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span className={styles.accountDetails}>
                  <strong>{account.name}</strong>
                  <span>{account.role}</span>
                </span>
                <ChevronDown className={styles.accountChevron} aria-hidden />
              </Button>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent className={styles.accountMenu}>
                <MenuViewport>
                  <MenuItemGroup>
                    <MenuItemGroupLabel className={styles.accountSummary}>
                      <strong>{account.name}</strong>
                      <span>{account.email}</span>
                    </MenuItemGroupLabel>
                    <MenuItem value="profile" asChild>
                      <a className={styles.menuLink} href="#profile">
                        <UserRound aria-hidden />
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem value="workspace-settings" asChild>
                      <a className={styles.menuLink} href="#workspace-settings">
                        <Settings aria-hidden />
                        Workspace settings
                      </a>
                    </MenuItem>
                    <MenuItem value="help" asChild>
                      <a className={styles.menuLink} href="#help">
                        <CircleHelp aria-hidden />
                        Help and support
                      </a>
                    </MenuItem>
                  </MenuItemGroup>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </div>
      </header>

      <CommandPalettePanel className={styles.commandPalette}>
        <CommandPaletteCombobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
          onSelect={(details) => {
            window.location.hash = details.itemValue;
          }}
        >
          <CommandPaletteSearch placeholder="Search workspace..." />
          <CommandPaletteList>
            <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
            {collection.group().map(([section, items]) => (
              <CommandPaletteItemGroup key={section}>
                <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
                {items.map((item) => (
                  <CommandPaletteItem key={item.id} item={item}>
                    <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                    <CommandPaletteItemText>
                      <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                      <CommandPaletteItemDescription>
                        {item.description}
                      </CommandPaletteItemDescription>
                    </CommandPaletteItemText>
                  </CommandPaletteItem>
                ))}
              </CommandPaletteItemGroup>
            ))}
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  );
}
