import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRootProvider,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
  useNavigationMenu,
} from '@/components/navigation-menu';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NavigationMenu.stories.module.css';

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const navigationMenuComponents = {
  ChevronDownIcon,
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRootProvider,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
};

const NavigationMenuParts = defineComponent({
  components: navigationMenuComponents,
  template: `
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
  `,
});

const storyComponents = { ...navigationMenuComponents, NavigationMenuParts };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <NavigationMenu v-model:value="value">
          <NavigationMenuParts />
        </NavigationMenu>
        <output>open: {{ value || 'none' }}</output>
      </div>
    `,
    () => ({ value: ref<string | undefined>() }),
  ),
};

export const Viewport: Story = {
  render: renderStory(`
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>
            Products
            <ChevronDownIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent style="width: 20rem">
            <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))">
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
          <NavigationMenuContent style="width: 14rem">
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
          <NavigationMenuContent style="width: 18rem">
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
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <output>open: {{ navigationMenu.value || 'none' }}</output>
        <NavigationMenuRootProvider :value="navigationMenu">
          <NavigationMenuParts />
        </NavigationMenuRootProvider>
      </div>
    `,
    () => ({ navigationMenu: useNavigationMenu({ defaultValue: 'products' }) }),
  ),
};