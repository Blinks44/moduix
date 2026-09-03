import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NavigationMenu, useNavigationMenu } from '@/components/navigation-menu/NavigationMenu';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import styles from './NavigationMenu.stories.module.css';

const meta = {
  title: 'Components/NavigationMenu',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

function NavigationMenuParts() {
  return (
    <NavigationMenu.List>
      <NavigationMenu.Item value="home">
        <NavigationMenu.Link href="#home">Home</NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="products">
        <NavigationMenu.Trigger>
          Products
          <ChevronDownIcon />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
          <NavigationMenu.Link href="#automation">Automation</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger>
          Docs
          <ChevronDownIcon />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
          <NavigationMenu.Link href="#api">API reference</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  );
}

export const Basic: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();

    return (
      <div className={styles.stack}>
        <NavigationMenu
          value={value}
          onValueChange={(details) => setValue(details.value ?? undefined)}
        >
          <NavigationMenuParts />
        </NavigationMenu>
        <output>open: {value ?? 'none'}</output>
      </div>
    );
  },
};

export const Viewport: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>
            Products
            <ChevronDownIcon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content style={{ width: '20rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
              <NavigationMenu.Link href="#automation">Automation</NavigationMenu.Link>
              <NavigationMenu.Link href="#integrations">Integrations</NavigationMenu.Link>
              <NavigationMenu.Link href="#reports">Reports</NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="company">
          <NavigationMenu.Trigger>
            Company
            <ChevronDownIcon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content style={{ width: '14rem' }}>
            <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
            <NavigationMenu.Link href="#careers">Careers</NavigationMenu.Link>
            <NavigationMenu.Link href="#contact">Contact</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="resources">
          <NavigationMenu.Trigger>
            Resources
            <ChevronDownIcon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content style={{ width: '18rem' }}>
            <NavigationMenu.Link href="#blog">Blog</NavigationMenu.Link>
            <NavigationMenu.Link href="#customers">Customer stories</NavigationMenu.Link>
            <NavigationMenu.Link href="#support">Support</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator>
          <NavigationMenu.Arrow />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      <NavigationMenu.ViewportPositioner>
        <NavigationMenu.Viewport />
      </NavigationMenu.ViewportPositioner>
    </NavigationMenu>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

    return (
      <div className={styles.stack}>
        <output>open: {navigationMenu.value ?? 'none'}</output>
        <NavigationMenu.RootProvider value={navigationMenu}>
          <NavigationMenuParts />
        </NavigationMenu.RootProvider>
      </div>
    );
  },
};