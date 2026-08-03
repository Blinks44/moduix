import { Avatar } from '@moduix/react/avatar';
import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import {
  ChevronDown,
  CircleHelp,
  Menu as MenuIcon,
  Orbit as OrbitIcon,
  Plus,
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

const account = {
  name: 'Alex Morgan',
  role: 'Product designer',
  email: 'alex@acme.studio',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
};

export function AppHeader() {
  return (
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

        <Button className={styles.searchLink} asChild variant="ghost" size="sm">
          <a href="#search" aria-label="Search">
            <Search aria-hidden />
            <span className={styles.searchLabel}>Search</span>
          </a>
        </Button>

        <Button className={styles.createLink} asChild size="sm">
          <a href="#new-project" aria-label="New project">
            <Plus aria-hidden />
            <span className={styles.createLabel}>New project</span>
          </a>
        </Button>

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
  );
}