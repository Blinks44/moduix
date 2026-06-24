import type { ComponentProps } from 'react';
import { Breadcrumbs, Menu, Portal, SeparatorMarkIcon } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const collapsedItems = [
  { href: '/engineering', label: 'Engineering' },
  { href: '/engineering/backend', label: 'Backend' },
  { href: '/engineering/backend/golang', label: 'Golang' },
] as const;

const previewContainerStyle = {
  maxWidth: 'min(34rem, 100%)',
};

const longLabelStyle = {
  '--breadcrumbs-item-max-width': '12rem',
};

const separatorIconStyle = {
  width: '0.75rem',
  height: '0.25rem',
};

const collapsedMenuTriggerStyle = {
  minWidth: 'auto',
  minHeight: 'auto',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
};

const collapsedMenuContentStyle = {
  '--menu-popup-min-width': '8rem',
  '--menu-item-font-size': 'var(--text-xs)',
  '--menu-item-padding-x-start': '0.5rem',
  '--menu-item-padding-x-end': '0.5rem',
  '--menu-item-padding-y': '0.25rem',
};

export const breadcrumbsOverrideCssProperties: CssPropertyInput[] = [
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

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function BreadcrumbsCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={breadcrumbsOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function BreadcrumbsExample(props: ComponentProps<typeof Breadcrumbs>) {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs {...props}>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/vacancies">Vacancies</Breadcrumbs.Link>
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
              <Menu.Trigger aria-label="Show hidden path items" style={collapsedMenuTriggerStyle}>
                <Breadcrumbs.Ellipsis />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content style={collapsedMenuContentStyle}>
                    {collapsedItems.map((item) => (
                      <Menu.Item key={item.href} value={item.href} asChild>
                        <a href={item.href}>{item.label}</a>
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/vacancies">Vacancies</Breadcrumbs.Link>
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
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator>
            <SeparatorMarkIcon style={separatorIconStyle} />
          </Breadcrumbs.Separator>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/vacancies">Vacancies</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator>
            <SeparatorMarkIcon style={separatorIconStyle} />
          </Breadcrumbs.Separator>
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsLongLabelExample() {
  return (
    <div style={previewContainerStyle}>
      <Breadcrumbs style={longLabelStyle}>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/vacancies">Vacancies</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>
              <span title="Go lang developer to production team with cross-functional ownership and platform support">
                Go lang developer to production team with cross-functional ownership and platform
                support
              </span>
            </Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
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
              <a href="/engineering" data-framework-link>
                Engineering
              </a>
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Link asChild>
              <a href="/vacancies" data-framework-link>
                Vacancies
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