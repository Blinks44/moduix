import type { ComponentProps, CSSProperties } from 'react';
import { Breadcrumbs, Menu, SeparatorMarkIcon } from '@moduix/react';
import type { CssPropertyInput } from '../preview';

const basicItems = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Go Developer' },
] as const;

const collapsedItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/quick-start', label: 'Quick Start' },
  { href: '/docs/composition-patterns', label: 'Composition Patterns' },
] as const;

const previewContainerStyle = {
  maxWidth: 'min(34rem, 100%)',
};

type CssVariables = CSSProperties & Partial<Record<`--${string}`, string>>;

const longLabelStyle: CssVariables = {
  '--breadcrumbs-item-max-width': '12rem',
};

const separatorIconStyle = {
  width: '0.75rem',
  height: '0.25rem',
};

const collapsedMenuContentStyle: CssVariables = {
  '--menu-popup-min-width': '8rem',
  '--menu-item-font-size': 'var(--text-xs)',
  '--menu-item-padding-x-start': '0.5rem',
  '--menu-item-padding-x-end': '0.5rem',
  '--menu-item-padding-y': '0.25rem',
};

export const breadcrumbsCssProperties: CssPropertyInput[] = [
  ['--breadcrumbs-color', 'var(--color-muted-foreground)', 'Controls base breadcrumbs text color.'],
  ['--breadcrumbs-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--breadcrumbs-ellipsis-radius', 'var(--radius-sm)', 'Controls ellipsis radius.'],
  ['--breadcrumbs-ellipsis-size', '1rem', 'Controls ellipsis size.'],
  ['--breadcrumbs-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--breadcrumbs-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--breadcrumbs-font-size', 'var(--text-sm)', 'Controls breadcrumbs font size.'],
  ['--breadcrumbs-gap', 'var(--spacing-1)', 'Controls spacing between breadcrumb parts.'],
  ['--breadcrumbs-item-max-width', '16rem', 'Controls max width of each breadcrumb item.'],
  [
    '--breadcrumbs-item-padding-x',
    '0.25rem',
    'Controls inline padding for links, page text, and ellipsis.',
  ],
  ['--breadcrumbs-line-height', 'var(--line-height-text-sm)', 'Controls breadcrumbs line height.'],
  ['--breadcrumbs-link-color', 'var(--color-muted-foreground)', 'Controls breadcrumb link color.'],
  [
    '--breadcrumbs-link-color-hover',
    'var(--color-foreground)',
    'Controls breadcrumb link hover color.',
  ],
  ['--breadcrumbs-link-radius', 'var(--radius-sm)', 'Controls breadcrumb link radius.'],
  ['--breadcrumbs-link-text-decoration', 'none', 'Controls breadcrumb link text decoration.'],
  [
    '--breadcrumbs-link-text-decoration-hover',
    'none',
    'Controls breadcrumb link hover text decoration.',
  ],
  [
    '--breadcrumbs-link-transition',
    'var(--transition-default)',
    'Controls breadcrumb link transition.',
  ],
  ['--breadcrumbs-link-underline-offset', '0.2em', 'Controls breadcrumb link underline offset.'],
  ['--breadcrumbs-max-width', '100%', 'Controls max width of breadcrumbs root.'],
  [
    '--breadcrumbs-page-color',
    'var(--color-foreground)',
    'Controls current page breadcrumb color.',
  ],
  [
    '--breadcrumbs-page-font-weight',
    'var(--weight-medium)',
    'Controls current page breadcrumb font weight.',
  ],
  ['--breadcrumbs-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  ['--breadcrumbs-separator-font-size', '0.875em', 'Controls separator font size.'],
];

export function BreadcrumbsExample(props: ComponentProps<typeof Breadcrumbs>) {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs {...props}>
        <Breadcrumbs.Path items={basicItems} />
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsCollapsedExample() {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Menu positioning={{ placement: 'bottom-start' }}>
              <Menu.Trigger asChild>
                <button
                  type="button"
                  aria-label="Show hidden path items"
                  className="collapsed-menu-trigger"
                >
                  <Breadcrumbs.Ellipsis />
                </button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content style={collapsedMenuContentStyle}>
                  {collapsedItems.map((item) => (
                    <Menu.Item key={item.href} value={item.href} asChild>
                      <a href={item.href}>{item.label}</a>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/docs/breadcrumbs">Breadcrumbs</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsCustomSeparatorExample() {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs>
        <Breadcrumbs.Path
          items={basicItems}
          separator={<SeparatorMarkIcon style={separatorIconStyle} />}
        />
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsLongLabelExample() {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs style={longLabelStyle}>
        <Breadcrumbs.Path
          items={[
            { href: '/', label: 'Home' },
            { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
            {
              label: (
                <span title="Go lang developer to production team with cross-functional ownership and platform support">
                  Go lang developer to production team with cross-functional ownership and platform
                  support
                </span>
              ),
            },
          ]}
        />
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsFrameworkLinkExample() {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link asChild>
              <a href="/" data-framework-link>
                Home
              </a>
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link asChild>
              <a href="/docs" data-framework-link>
                Docs
              </a>
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link asChild>
              <a href="/docs/breadcrumbs" data-framework-link>
                Breadcrumbs
              </a>
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
    </div>
  );
}