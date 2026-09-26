import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  NavigationMenu,
  useNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuArrow,
  NavigationMenuViewportPositioner,
  NavigationMenuViewport,
  NavigationMenuRootProvider,
} from '@/components/navigation-menu/NavigationMenu';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

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
    <NavigationMenuList>
      <NavigationMenuItem value="home">
        <NavigationMenuLink href="#home">Home</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem value="products">
        <NavigationMenuTrigger>
          Products
          <ChevronDownIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
          <NavigationMenuLink href="#automation">Automation</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="docs">
        <NavigationMenuTrigger>
          Docs
          <ChevronDownIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
          <NavigationMenuLink href="#api">API reference</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
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
      <div className="grid w-[30rem] gap-3">
        <NavigationMenu
          value={value}
          onValueChange={(details) => setValue(details.value ?? undefined)}
        >
          <NavigationMenuParts />
        </NavigationMenu>
        <output className="text-sm text-muted-foreground">open: {value ?? 'none'}</output>
      </div>
    );
  },
};

export const Viewport: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>
            Products
            <ChevronDownIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-80">
            <div className="grid grid-cols-2">
              <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
              <NavigationMenuLink href="#automation">Automation</NavigationMenuLink>
              <NavigationMenuLink href="#integrations">Integrations</NavigationMenuLink>
              <NavigationMenuLink href="#reports">Reports</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="company">
          <NavigationMenuTrigger>
            Company
            <ChevronDownIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-56">
            <NavigationMenuLink href="#about">About</NavigationMenuLink>
            <NavigationMenuLink href="#careers">Careers</NavigationMenuLink>
            <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>
            Resources
            <ChevronDownIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <NavigationMenuLink href="#blog">Blog</NavigationMenuLink>
            <NavigationMenuLink href="#customers">Customer stories</NavigationMenuLink>
            <NavigationMenuLink href="#support">Support</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator>
          <NavigationMenuArrow />
        </NavigationMenuIndicator>
      </NavigationMenuList>
      <NavigationMenuViewportPositioner>
        <NavigationMenuViewport />
      </NavigationMenuViewportPositioner>
    </NavigationMenu>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

    return (
      <div className="grid w-[30rem] gap-3">
        <output className="text-sm text-muted-foreground">
          open: {navigationMenu.value ?? 'none'}
        </output>
        <NavigationMenuRootProvider value={navigationMenu}>
          <NavigationMenuParts />
        </NavigationMenuRootProvider>
      </div>
    );
  },
};