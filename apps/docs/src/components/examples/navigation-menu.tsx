import { useMediaQuery } from '@base-ui/react/unstable-use-media-query';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './navigation-menu.module.css';

export const navigationMenuCssProperties: CssPropertyInput[] = [
  ['--navigation-menu-bg', 'transparent', 'Controls root background.'],
  ['--navigation-menu-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--navigation-menu-min-width', 'max-content', 'Controls root minimum width.'],
  ['--navigation-menu-padding', 'var(--spacing-1)', 'Controls root padding.'],
  ['--navigation-menu-radius', 'var(--radius-lg)', 'Controls root border radius.'],
  ['--navigation-menu-list-gap', '0', 'Controls spacing between top-level items.'],
  ['--navigation-menu-trigger-height', 'var(--size-md)', 'Controls trigger minimum height.'],
  ['--navigation-menu-trigger-padding-x', '0.75rem', 'Controls trigger horizontal padding.'],
  ['--navigation-menu-trigger-radius', 'var(--radius-md)', 'Controls trigger border radius.'],
  ['--navigation-menu-trigger-gap', '0.375rem', 'Controls trigger content gap.'],
  ['--navigation-menu-trigger-bg', 'transparent', 'Controls trigger background.'],
  [
    '--navigation-menu-trigger-bg-hover',
    'var(--color-accent)',
    'Controls trigger background on hover.',
  ],
  [
    '--navigation-menu-trigger-bg-active',
    'var(--color-muted)',
    'Controls trigger background when active or open.',
  ],
  ['--navigation-menu-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--navigation-menu-icon-size', '0.875rem', 'Controls trigger icon size.'],
  ['--navigation-menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  [
    '--navigation-menu-popup-color',
    'var(--color-popover-foreground)',
    'Controls popup text color.',
  ],
  [
    '--navigation-menu-popup-border-color',
    'var(--color-border)',
    'Controls popup border and arrow stroke color.',
  ],
  ['--navigation-menu-popup-radius', 'var(--radius-lg)', 'Controls popup border radius.'],
  ['--navigation-menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--navigation-menu-content-padding', 'var(--spacing-4)', 'Controls content padding.'],
  ['--navigation-menu-content-min-width', '20rem', 'Controls desktop content minimum width.'],
  ['--navigation-menu-content-slide-distance', '50%', 'Controls content slide animation distance.'],
  ['--navigation-menu-arrow-width', '1.25rem', 'Controls popup arrow width.'],
  ['--navigation-menu-arrow-height', '0.625rem', 'Controls popup arrow height.'],
  ['--navigation-menu-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Controls backdrop color.'],
  ['--navigation-menu-backdrop-blur', '0', 'Controls backdrop blur when backdrop is enabled.'],
];

export function NavigationMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Product
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={styles.contentGrid}>
              {productLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={styles.linkCard}>
                    <p className={styles.title}>{link.title}</p>
                    <p className={styles.description}>{link.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Guides
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={styles.contentList}>
              {guideLinks.slice(0, 2).map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={styles.linkCard}>
                    <p className={styles.title}>{link.title}</p>
                    <p className={styles.description}>{link.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" closeOnClick>
            Releases
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NestedNavigationMenuExample() {
  return (
    <NavigationMenu popupContent={{ collisionAvoidance: { side: 'none' } }}>
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
                  <p className={styles.title}>Quick Start</p>
                  <p className={styles.description}>Install and assemble your first screen.</p>
                </a>
              </li>
              <li className={styles.fullWidth}>
                <NavigationMenu
                  className={styles.nestedRoot}
                  orientation="vertical"
                  popupContent={{
                    side: 'right',
                    align: 'end',
                    sideOffset: 24,
                    alignOffset: -24,
                    showArrow: false,
                  }}
                >
                  <NavigationMenuList className={styles.fullWidth}>
                    <NavigationMenuItem className={styles.fullWidth}>
                      <NavigationMenuTrigger className={styles.nestedTrigger}>
                        <span className={styles.title}>Handbook</span>
                        <span className={styles.description}>Styling and composition guides.</span>
                        <NavigationMenuIcon className={styles.nestedIcon}>
                          <ChevronRightIcon />
                        </NavigationMenuIcon>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className={styles.contentList}>
                          {guideLinks.map((link) => (
                            <li key={link.title}>
                              <a href={link.href} className={styles.linkCard}>
                                <p className={styles.title}>{link.title}</p>
                                <p className={styles.description}>{link.description}</p>
                              </a>
                            </li>
                          ))}
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
}

export function CustomStylesNavigationMenuExample() {
  return (
    <NavigationMenu
      popupContent={{
        sideOffset: 16,
        withBackdrop: true,
        classNames: {
          portal: styles.portal,
          backdrop: styles.backdrop,
          positioner: styles.positioner,
          arrow: styles.arrow,
          viewport: styles.viewport,
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
                    <p className={styles.title}>{link.title}</p>
                    <p className={styles.description}>{link.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NestedInlineNavigationMenuExample() {
  const isDesktop = useMediaQuery('(min-width: 700px)', { defaultMatches: true });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Product
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className={styles.inlineProductContent}>
            <NavigationMenu
              className={styles.inlineNestedRoot}
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              defaultValue="developers"
              popupContent={false}
              viewport
              classNames={{ viewport: styles.inlineViewport }}
            >
              <NavigationMenuList className={styles.inlineList}>
                <NavigationMenuItem value="developers">
                  <NavigationMenuTrigger className={styles.inlineTrigger}>
                    <span className={styles.title}>Developers</span>
                    <span className={styles.description}>API, SDK and integrations</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className={styles.inlineSubmenuContent}>
                    <PanelContent
                      title="Build product UI with control"
                      description="Start with accessible parts and shape them to your application."
                      links={developerLinks}
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem value="systems">
                  <NavigationMenuTrigger className={styles.inlineTrigger}>
                    <span className={styles.title}>Design Systems</span>
                    <span className={styles.description}>Patterns and governance</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className={styles.inlineSubmenuContent}>
                    <PanelContent
                      title="Turn standards into components"
                      description="Connect tokens, states and accessibility rules once for every team."
                      links={systemLinks}
                    />
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
          <NavigationMenuContent className={styles.inlineGuidesContent}>
            <div className={styles.panel}>
              <PanelContent
                title="Where teams usually start"
                description="These guides help turn a prototype into shared UI."
                links={guideLinks}
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function CustomIconNavigationMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Resources
            <NavigationMenuIcon className={styles.customIcon}>
              <ChevronDownIcon />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={styles.contentList}>
              {guideLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={styles.linkCard}>
                    <p className={styles.title}>{link.title}</p>
                    <p className={styles.description}>{link.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function PanelContent({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: readonly NavigationLink[];
}) {
  return (
    <React.Fragment>
      <h4 className={styles.panelTitle}>{title}</h4>
      <p className={styles.panelDescription}>{description}</p>
      <ul className={styles.panelList}>
        {links.map((link) => (
          <li key={link.title}>
            <a href={link.href} className={styles.linkCard}>
              <p className={styles.title}>{link.title}</p>
              <p className={styles.description}>{link.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

type NavigationLink = {
  href: string;
  title: string;
  description: string;
};

const productLinks = [
  {
    href: '#',
    title: 'Quick Start',
    description: 'Install the package and assemble your first navigation.',
  },
  {
    href: '#',
    title: 'Composition',
    description: 'Use slots and className to match your application layout.',
  },
] as const satisfies readonly NavigationLink[];

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
] as const satisfies readonly NavigationLink[];

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
] as const satisfies readonly NavigationLink[];

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
] as const satisfies readonly NavigationLink[];