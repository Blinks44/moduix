import { useMediaQuery } from '@base-ui/react/unstable-use-media-query';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './navigation-menu.module.css';

export const navigationMenuOverrideCssProperties: CssPropertyInput[] = [
  ['--navigation-menu-arrow-height', '0.625rem', 'Controls popup arrow height.'],
  ['--navigation-menu-arrow-inline-offset', '0.8125rem', 'Controls arrow inline-axis offset.'],
  ['--navigation-menu-arrow-offset', '0.5rem', 'Controls arrow block-axis offset.'],
  [
    '--navigation-menu-arrow-stroke-color',
    'var(--navigation-menu-popup-border-color)',
    'Controls popup arrow stroke color.',
  ],
  [
    '--navigation-menu-arrow-transition-duration',
    'var(--duration-slow)',
    'Controls popup arrow movement duration.',
  ],
  ['--navigation-menu-arrow-width', '1.25rem', 'Controls popup arrow width.'],
  ['--navigation-menu-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Controls backdrop color.'],
  ['--navigation-menu-backdrop-blur', '0', 'Controls backdrop blur when backdrop is enabled.'],
  [
    '--navigation-menu-backdrop-transition',
    'var(--navigation-menu-transition, var(--transition-default))',
    'Controls backdrop opacity transition.',
  ],
  ['--navigation-menu-bg', 'transparent', 'Controls root background.'],
  ['--navigation-menu-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--navigation-menu-content-min-width', '20rem', 'Controls desktop content minimum width.'],
  [
    '--navigation-menu-content-opacity-duration',
    'calc(var(--duration-slow) * 0.7)',
    'Controls content fade duration.',
  ],
  ['--navigation-menu-content-padding', 'var(--spacing-4)', 'Controls content padding.'],
  ['--navigation-menu-content-slide-distance', '50%', 'Controls content slide animation distance.'],
  [
    '--navigation-menu-content-width-mobile',
    'calc(100vw - var(--spacing-8))',
    'Controls mobile content width.',
  ],
  ['--navigation-menu-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--navigation-menu-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--navigation-menu-focus-ring-width',
    'var(--border-width-sm)',
    'Controls trigger focus ring width.',
  ],
  [
    '--navigation-menu-full-width-inset',
    '0px',
    'Controls screen gutter for full-width popup mode.',
  ],
  ['--navigation-menu-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--navigation-menu-icon-size', '0.875rem', 'Controls trigger icon size.'],
  [
    '--navigation-menu-icon-transition',
    'var(--navigation-menu-transition, 200ms ease)',
    'Controls trigger icon rotation transition.',
  ],
  ['--navigation-menu-list-gap', '0', 'Controls spacing between top-level items.'],
  [
    '--navigation-menu-list-justify',
    'flex-start',
    'Controls horizontal alignment of top-level items.',
  ],
  ['--navigation-menu-min-width', 'max-content', 'Controls root minimum width.'],
  ['--navigation-menu-padding', 'var(--spacing-1)', 'Controls root padding.'],
  ['--navigation-menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  [
    '--navigation-menu-popup-border-color',
    'var(--color-border)',
    'Controls popup border and arrow stroke color.',
  ],
  ['--navigation-menu-popup-border-style', 'solid', 'Controls popup border style.'],
  [
    '--navigation-menu-popup-border-width',
    'var(--border-width-sm)',
    'Controls popup border width.',
  ],
  [
    '--navigation-menu-popup-color',
    'var(--color-popover-foreground)',
    'Controls popup text color.',
  ],
  [
    '--navigation-menu-popup-leave-duration',
    '150ms',
    'Controls popup closing transition duration.',
  ],
  ['--navigation-menu-popup-radius', 'var(--radius-lg)', 'Controls popup border radius.'],
  ['--navigation-menu-popup-scale', 'var(--scale-popup)', 'Controls popup enter/exit scale.'],
  ['--navigation-menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  [
    '--navigation-menu-popup-transition-duration',
    'var(--duration-slow)',
    'Controls popup transition duration.',
  ],
  [
    '--navigation-menu-popup-transition-easing',
    'cubic-bezier(0.22, 1, 0.36, 1)',
    'Controls popup transition easing.',
  ],
  [
    '--navigation-menu-positioner-gap',
    '0.625rem',
    'Controls hover bridge spacing between trigger and popup.',
  ],
  [
    '--navigation-menu-positioner-max-width',
    'calc(100vw - var(--spacing-8))',
    'Controls popup positioner maximum width.',
  ],
  ['--navigation-menu-radius', 'var(--radius-lg)', 'Controls root border radius.'],
  [
    '--navigation-menu-submenu-trigger-bg',
    'transparent',
    'Controls nested submenu trigger background.',
  ],
  [
    '--navigation-menu-submenu-trigger-bg-active',
    'var(--navigation-menu-popup-bg, var(--color-background))',
    'Controls nested submenu trigger active background.',
  ],
  [
    '--navigation-menu-submenu-trigger-min-width',
    '9rem',
    'Controls nested submenu trigger minimum width.',
  ],
  [
    '--navigation-menu-submenu-trigger-padding-x',
    '0.75rem',
    'Controls nested submenu trigger horizontal padding.',
  ],
  [
    '--navigation-menu-submenu-trigger-padding-y',
    '0.5rem',
    'Controls nested submenu trigger vertical padding.',
  ],
  [
    '--navigation-menu-submenu-trigger-radius',
    'var(--radius-lg)',
    'Controls nested submenu trigger border radius.',
  ],
  [
    '--navigation-menu-submenu-trigger-shadow-active',
    '0 1px 2px rgb(0 0 0 / 0.08), 0 1px 1px rgb(0 0 0 / 0.04)',
    'Controls nested submenu trigger active shadow.',
  ],
  ['--navigation-menu-transition', 'var(--transition-default)', 'Controls trigger transitions.'],
  ['--navigation-menu-trigger-bg', 'transparent', 'Controls trigger background.'],
  [
    '--navigation-menu-trigger-bg-active',
    'var(--color-muted)',
    'Controls trigger background when active or open.',
  ],
  [
    '--navigation-menu-trigger-bg-hover',
    'var(--color-accent)',
    'Controls trigger background on hover.',
  ],
  ['--navigation-menu-trigger-border-color', 'transparent', 'Controls trigger border color.'],
  ['--navigation-menu-trigger-border-style', 'solid', 'Controls trigger border style.'],
  ['--navigation-menu-trigger-border-width', '0', 'Controls trigger border width.'],
  ['--navigation-menu-trigger-color', 'var(--color-foreground)', 'Controls trigger text color.'],
  ['--navigation-menu-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--navigation-menu-trigger-gap', '0.375rem', 'Controls trigger content gap.'],
  ['--navigation-menu-trigger-height', 'var(--size-md)', 'Controls trigger minimum height.'],
  [
    '--navigation-menu-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls trigger line height.',
  ],
  ['--navigation-menu-trigger-padding-x', '0.75rem', 'Controls trigger horizontal padding.'],
  ['--navigation-menu-trigger-padding-y', '0', 'Controls trigger vertical padding.'],
  ['--navigation-menu-trigger-radius', 'var(--radius-md)', 'Controls trigger border radius.'],
];
export const navigationMenuPlaygroundCssProperties: CssPropertyInput[] = [
  ['--navigation-menu-bg', 'transparent', 'Controls root background.'],
  ['--navigation-menu-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--navigation-menu-list-justify', 'flex-start', 'Controls top-level item alignment.'],
  ['--navigation-menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--navigation-menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--navigation-menu-popup-radius', 'var(--radius-lg)', 'Controls popup border radius.'],
  ['--navigation-menu-radius', 'var(--radius-lg)', 'Controls root border radius.'],
  ['--navigation-menu-trigger-bg', 'transparent', 'Controls trigger background.'],
  [
    '--navigation-menu-trigger-bg-active',
    'var(--color-muted)',
    'Controls trigger active background.',
  ],
  [
    '--navigation-menu-trigger-bg-hover',
    'var(--color-accent)',
    'Controls trigger hover background.',
  ],
  ['--navigation-menu-trigger-border-color', 'transparent', 'Controls trigger border color.'],
  ['--navigation-menu-trigger-border-width', '0', 'Controls trigger border width.'],
];

export function NavigationMenuCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={navigationMenuOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function NavigationMenuCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={navigationMenuPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function NavigationMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
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

export function FullWidthNavigationMenuExample() {
  return (
    <header className={styles.fullWidthHeader}>
      <div className={styles.fullWidthContainer}>
        <NavigationMenu
          className={styles.fullWidthMenu}
          popupContent={{
            fullWidth: true,
            sideOffset: 12,
            withArrow: false,
            classNames: { positioner: styles.fullWidthPositioner },
          }}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
              <NavigationMenuContent className={styles.fullWidthContent}>
                <div className={styles.fullWidthInner}>
                  <ul className={`${styles.fullWidthGrid} ${styles.fullWidthCols2}`}>
                    {fullWidthPlatformLinks.map((link) => (
                      <li key={link.title}>
                        <a href={link.href} className={styles.linkCard}>
                          <p className={styles.title}>{link.title}</p>
                          <p className={styles.description}>{link.description}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
              <NavigationMenuContent className={styles.fullWidthContent}>
                <div className={styles.fullWidthInner}>
                  <ul className={`${styles.fullWidthGrid} ${styles.fullWidthCols3}`}>
                    {fullWidthDeveloperLinks.map((link) => (
                      <li key={link.title}>
                        <a href={link.href} className={styles.linkCard}>
                          <p className={styles.title}>{link.title}</p>
                          <p className={styles.description}>{link.description}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Design System</NavigationMenuTrigger>
              <NavigationMenuContent className={styles.fullWidthContent}>
                <div className={styles.fullWidthInner}>
                  <ul className={`${styles.fullWidthGrid} ${styles.fullWidthCols4}`}>
                    {fullWidthSystemLinks.map((link) => (
                      <li key={link.title}>
                        <a href={link.href} className={styles.linkCard}>
                          <p className={styles.title}>{link.title}</p>
                          <p className={styles.description}>{link.description}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export function NestedNavigationMenuExample() {
  return (
    <NavigationMenu popupContent={{ collisionAvoidance: { side: 'none' } }}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
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
                    withArrow: false,
                  }}
                >
                  <NavigationMenuList className={styles.fullWidth}>
                    <NavigationMenuItem className={styles.fullWidth}>
                      <NavigationMenuTrigger
                        className={styles.nestedTrigger}
                        icon={<ChevronRightIcon />}
                        classNames={{ icon: styles.nestedIcon }}
                      >
                        <span className={styles.title}>Handbook</span>
                        <span className={styles.description}>Styling and composition guides.</span>
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
      className={styles.customRoot}
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
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent className={styles.inlineProductContent}>
            <NavigationMenu
              className={styles.inlineNestedRoot}
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              defaultValue="developers"
              popupContent={false}
              withViewport
              classNames={{ viewport: styles.inlineViewport }}
            >
              <NavigationMenuList className={styles.inlineList}>
                <NavigationMenuItem value="developers">
                  <NavigationMenuTrigger className={styles.inlineTrigger} hideIcon>
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
                  <NavigationMenuTrigger className={styles.inlineTrigger} hideIcon>
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
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
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
          <NavigationMenuTrigger
            icon={<ChevronDownIcon />}
            classNames={{ icon: styles.customIcon }}
          >
            Resources
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

const fullWidthPlatformLinks = [
  {
    href: '#',
    title: 'Maps SDK',
    description: 'Embed maps and controls in product UI.',
  },
  {
    href: '#',
    title: 'Routing API',
    description: 'Build routes, ETA and navigation flows.',
  },
  {
    href: '#',
    title: 'Geocoder API',
    description: 'Convert addresses and coordinates in both directions.',
  },
] as const satisfies readonly NavigationLink[];

const fullWidthDeveloperLinks = [
  {
    href: '#',
    title: 'Authentication',
    description: 'Secure service-to-service access.',
  },
  {
    href: '#',
    title: 'Webhooks',
    description: 'Subscribe to async events in your app.',
  },
  {
    href: '#',
    title: 'Rate Limits',
    description: 'Plan request quotas and retries.',
  },
  {
    href: '#',
    title: 'SDK Changelog',
    description: 'Track integration updates before release windows.',
  },
] as const satisfies readonly NavigationLink[];

const fullWidthSystemLinks = [
  {
    href: '#',
    title: 'Tokens',
    description: 'Unify color, spacing and typography.',
  },
  {
    href: '#',
    title: 'Accessibility',
    description: 'Ship keyboard-safe default behavior.',
  },
  {
    href: '#',
    title: 'Theming',
    description: 'Map app brand to component variables.',
  },
  {
    href: '#',
    title: 'Governance',
    description: 'Keep patterns consistent across teams.',
  },
  {
    href: '#',
    title: 'Contributing',
    description: 'Document review flow and ownership of UI changes.',
  },
] as const satisfies readonly NavigationLink[];