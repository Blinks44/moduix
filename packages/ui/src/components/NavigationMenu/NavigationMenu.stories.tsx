import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMediaQuery } from '@base-ui/react/unstable-use-media-query';
import { ChevronRightIcon } from '@/primitives/Icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './NavigationMenu';
import styles from './NavigationMenu.stories.module.css';

const meta = {
  title: 'Components/NavigationMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const productContentClassName = `${styles.inlineSharedContent} ${styles.inlineProductContent}`;
const guidesContentClassName = `${styles.inlineSharedContent} ${styles.inlineGuidesContent}`;

export const Basic: Story = {
  render: () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Guides
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={styles.contentList}>
                <li>
                  <a href="#" className={styles.linkCard}>
                    <p className={styles.contentTitle}>Quick Start</p>
                    <p className={styles.contentDescription}>
                      Install and create your first UI screen.
                    </p>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkCard}>
                    <p className={styles.contentTitle}>Styling</p>
                    <p className={styles.contentDescription}>
                      Adjust tokens and theme contract variables.
                    </p>
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Components
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={styles.contentList}>
                <li>
                  <a href="#" className={styles.linkCard}>
                    <p className={styles.contentTitle}>Forms</p>
                    <p className={styles.contentDescription}>
                      Field, Input, Checkbox, Radio and validation.
                    </p>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkCard}>
                    <p className={styles.contentTitle}>Navigation</p>
                    <p className={styles.contentDescription}>Menu, Menubar and nested popups.</p>
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="#" closeOnClick>
              Changelog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

export const PopupOptions: Story = {
  name: 'Popup Options',
  render: () => {
    return (
      <NavigationMenu
        popupContent={{
          sideOffset: 16,
          withBackdrop: true,
          classNames: {
            backdrop: styles.backdrop,
          },
        }}
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Resources
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={styles.contentList}>
                {guideLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className={styles.linkCard}>
                      <p className={styles.contentTitle}>{link.title}</p>
                      <p className={styles.contentDescription}>{link.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

export const NestedSubmenu: Story = {
  name: 'Nested Submenu',
  render: () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Overview
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={styles.contentList}>
                <li>
                  <a href="#" className={styles.linkCard}>
                    <p className={styles.contentTitle}>Quick Start</p>
                    <p className={styles.contentDescription}>
                      Install and assemble your first component.
                    </p>
                  </a>
                </li>
                <li className={styles.nestedItem}>
                  <NavigationMenu
                    className={styles.nestedMenu}
                    orientation="vertical"
                    popupContent={{
                      side: 'right',
                      align: 'end',
                      sideOffset: 24,
                      alignOffset: -24,
                      showArrow: false,
                    }}
                  >
                    <NavigationMenuList className={styles.nestedList}>
                      <NavigationMenuItem className={styles.nestedItem}>
                        <NavigationMenuTrigger
                          className={`${styles.linkCard} ${styles.nestedTrigger}`}
                        >
                          <span className={styles.contentTitle}>Handbook</span>
                          <span className={styles.contentDescription}>
                            How to use Base UI effectively.
                          </span>
                          <NavigationMenuIcon className={styles.nestedTriggerIcon}>
                            <ChevronRightIcon />
                          </NavigationMenuIcon>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={styles.contentList}>
                            <li>
                              <a href="#" className={styles.linkCard}>
                                <p className={styles.contentTitle}>Styling</p>
                                <p className={styles.contentDescription}>
                                  Customize components with CSS variables and slots.
                                </p>
                              </a>
                            </li>
                            <li>
                              <a href="#" className={styles.linkCard}>
                                <p className={styles.contentTitle}>Animation</p>
                                <p className={styles.contentDescription}>
                                  Use transitions for positioner, popup and content.
                                </p>
                              </a>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="#">GitHub</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

export const NestedInlineSubmenu: Story = {
  name: 'Nested Inline Submenu',
  render: () => {
    const isDesktop = useMediaQuery('(min-width: 700px)', { defaultMatches: true });

    return (
      <NavigationMenu
        className={styles.inlineRoot}
        popupContent={{ collisionAvoidance: { side: 'none' } }}
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Product
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className={productContentClassName}>
              <NavigationMenu
                orientation={isDesktop ? 'vertical' : 'horizontal'}
                defaultValue="developers"
                className={`${styles.inlineNestedRoot} ${styles.inlineLayout}`}
                popupContent={false}
                viewport
                classNames={{ viewport: styles.inlineViewport }}
              >
                <NavigationMenuList className={styles.inlineList}>
                  <NavigationMenuItem value="developers">
                    <NavigationMenuTrigger className={styles.inlineMenuTrigger}>
                      <span className={styles.contentTitle}>Developers</span>
                      <span className={styles.contentDescription}>API, SDK and integrations</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={styles.inlineSubmenuContent}>
                      <h4 className={styles.panelTitle}>Build product UI with control</h4>
                      <p className={styles.panelDescription}>
                        Start with accessible parts and shape them to your application.
                      </p>
                      <ul className={styles.panelList}>
                        {developerLinks.map((link) => (
                          <li key={link.title}>
                            <a href={link.href} className={styles.linkCard}>
                              <p className={styles.contentTitle}>{link.title}</p>
                              <p className={styles.contentDescription}>{link.description}</p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem value="systems">
                    <NavigationMenuTrigger className={styles.inlineMenuTrigger}>
                      <span className={styles.contentTitle}>Design Systems</span>
                      <span className={styles.contentDescription}>Patterns and governance</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={styles.inlineSubmenuContent}>
                      <h4 className={styles.panelTitle}>Turn standards into components</h4>
                      <p className={styles.panelDescription}>
                        Connect tokens, states and accessibility rules once for every team.
                      </p>
                      <ul className={styles.panelList}>
                        {systemLinks.map((link) => (
                          <li key={link.title}>
                            <a href={link.href} className={styles.linkCard}>
                              <p className={styles.contentTitle}>{link.title}</p>
                              <p className={styles.contentDescription}>{link.description}</p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Learn
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className={guidesContentClassName}>
              <div className={styles.panel}>
                <h4 className={styles.panelTitle}>Where teams usually start</h4>
                <p className={styles.panelDescription}>
                  These guides help turn a prototype into shared UI.
                </p>
                <ul className={styles.panelList}>
                  {guideLinks.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className={styles.linkCard}>
                        <p className={styles.contentTitle}>{link.title}</p>
                        <p className={styles.contentDescription}>{link.description}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

const developerLinks = [
  {
    href: '#',
    title: 'API Overview',
    description: 'Endpoints, auth and request lifecycle for integrations.',
  },
  {
    href: '#',
    title: 'Web SDK',
    description: 'Components and hooks for map-driven products.',
  },
  {
    href: '#',
    title: 'Composition',
    description: 'Wrap and combine parts to match your product structure.',
  },
] as const;

const systemLinks = [
  {
    href: '#',
    title: 'Styling',
    description: 'Map component states to your token system.',
  },
  {
    href: '#',
    title: 'Accessibility',
    description: 'Review keyboard support and semantic defaults.',
  },
  {
    href: '#',
    title: 'Release notes',
    description: 'Track version changes before upgrades surprise teams.',
  },
] as const;

const guideLinks = [
  {
    href: '#',
    title: 'Accessibility handbook',
    description: 'Take a practical pass over focus order and keyboard support.',
  },
  {
    href: '#',
    title: 'Composition handbook',
    description: 'Learn when to wrap parts and expose flexible APIs.',
  },
  {
    href: '#',
    title: 'Styling handbook',
    description: 'Apply tokens and state styles without fighting markup.',
  },
] as const;