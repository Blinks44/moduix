import { Breadcrumbs, SeparatorMarkIcon, type BreadcrumbsProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './breadcrumbs.module.css';

export const breadcrumbsOverrideCssProperties: CssPropertyInput[] = [
  ['--breadcrumbs-color', 'var(--color-muted-foreground)', 'Controls base breadcrumbs text color.'],
  ['--breadcrumbs-ellipsis-bg', 'transparent', 'Controls collapsed trigger background.'],
  [
    '--breadcrumbs-ellipsis-bg-hover',
    'var(--color-accent)',
    'Controls collapsed trigger hover background.',
  ],
  ['--breadcrumbs-ellipsis-border', 'none', 'Controls collapsed trigger border.'],
  [
    '--breadcrumbs-ellipsis-color',
    'var(--breadcrumbs-color, var(--color-muted-foreground))',
    'Controls collapsed trigger text color.',
  ],
  [
    '--breadcrumbs-ellipsis-color-hover',
    'var(--color-foreground)',
    'Controls collapsed trigger hover text color.',
  ],
  ['--breadcrumbs-ellipsis-padding-x', '0.2rem', 'Controls collapsed trigger horizontal padding.'],
  ['--breadcrumbs-ellipsis-radius', 'var(--radius-sm)', 'Controls collapsed trigger radius.'],
  ['--breadcrumbs-ellipsis-size', '1.5rem', 'Controls collapsed trigger size.'],
  [
    '--breadcrumbs-ellipsis-transition',
    'var(--transition-default)',
    'Controls collapsed trigger transition.',
  ],
  ['--breadcrumbs-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--breadcrumbs-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--breadcrumbs-font-size', 'var(--text-sm)', 'Controls breadcrumbs font size.'],
  ['--breadcrumbs-gap', 'var(--spacing-1)', 'Controls spacing between breadcrumb parts.'],
  ['--breadcrumbs-item-max-width', '16rem', 'Controls max width of each breadcrumb item.'],
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
  ['--breadcrumbs-popup-bg', 'var(--color-popover)', 'Controls collapsed menu background.'],
  [
    '--breadcrumbs-popup-border-color',
    'var(--color-border)',
    'Controls collapsed menu border color.',
  ],
  [
    '--breadcrumbs-popup-border-width',
    'var(--border-width-sm)',
    'Controls collapsed menu border width.',
  ],
  [
    '--breadcrumbs-popup-color',
    'var(--color-popover-foreground)',
    'Controls collapsed menu text color.',
  ],
  ['--breadcrumbs-popup-item-bg', 'transparent', 'Controls collapsed menu item background.'],
  [
    '--breadcrumbs-popup-item-bg-highlighted',
    'var(--color-accent)',
    'Controls highlighted collapsed item background.',
  ],
  [
    '--breadcrumbs-popup-item-bg-hover',
    'var(--breadcrumbs-popup-item-bg-highlighted)',
    'Controls collapsed menu item hover background.',
  ],
  ['--breadcrumbs-popup-item-border', 'none', 'Controls collapsed menu item border.'],
  ['--breadcrumbs-popup-item-color', 'inherit', 'Controls collapsed menu item text color.'],
  [
    '--breadcrumbs-popup-item-font-size',
    'var(--text-xs)',
    'Controls collapsed menu item font size.',
  ],
  [
    '--breadcrumbs-popup-item-line-height',
    'var(--line-height-text-xs)',
    'Controls collapsed menu item line height.',
  ],
  ['--breadcrumbs-popup-item-min-height', '1.75rem', 'Controls collapsed menu item min height.'],
  [
    '--breadcrumbs-popup-item-padding-x',
    '0.5rem',
    'Controls collapsed menu item horizontal padding.',
  ],
  [
    '--breadcrumbs-popup-item-padding-y',
    '0.25rem',
    'Controls collapsed menu item vertical padding.',
  ],
  ['--breadcrumbs-popup-item-radius', 'var(--radius-sm)', 'Controls collapsed menu item radius.'],
  [
    '--breadcrumbs-popup-item-transition',
    'var(--transition-default)',
    'Controls collapsed menu item transition.',
  ],
  ['--breadcrumbs-popup-max-width', '16rem', 'Controls collapsed menu max width.'],
  ['--breadcrumbs-popup-min-width', '9rem', 'Controls collapsed menu min width.'],
  ['--breadcrumbs-popup-padding', 'var(--spacing-1)', 'Controls collapsed menu inner padding.'],
  ['--breadcrumbs-popup-radius', 'var(--radius-md)', 'Controls collapsed menu radius.'],
  ['--breadcrumbs-popup-scale', 'var(--scale-popup)', 'Controls collapsed menu enter/exit scale.'],
  ['--breadcrumbs-popup-shadow', 'var(--shadow-md)', 'Controls collapsed menu shadow.'],
  [
    '--breadcrumbs-popup-transition',
    'var(--transition-default)',
    'Controls collapsed menu enter/exit transition.',
  ],
  ['--breadcrumbs-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
];

export const breadcrumbsPlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--breadcrumbs-ellipsis-bg-hover',
    'var(--color-accent)',
    'Controls collapsed trigger hover background.',
  ],
  ['--breadcrumbs-item-max-width', '16rem', 'Controls max width of each breadcrumb item.'],
  ['--breadcrumbs-link-color', 'var(--color-muted-foreground)', 'Controls breadcrumb link color.'],
  [
    '--breadcrumbs-link-color-hover',
    'var(--color-foreground)',
    'Controls breadcrumb link hover color.',
  ],
  [
    '--breadcrumbs-popup-item-bg-hover',
    'var(--breadcrumbs-popup-item-bg-highlighted)',
    'Controls collapsed menu item hover background.',
  ],
  [
    '--breadcrumbs-popup-item-font-size',
    'var(--text-xs)',
    'Controls collapsed menu item font size.',
  ],
  ['--breadcrumbs-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function BreadcrumbsCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={breadcrumbsOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function BreadcrumbsCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={breadcrumbsPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function BreadcrumbsExample(props: Omit<BreadcrumbsProps, 'items'>) {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#' },
          { label: 'Engineering', href: '#' },
          { label: 'Backend', href: '#' },
          { label: 'Golang', href: '#' },
          { label: 'Vacancies', href: '#' },
          { label: 'Go Developer' },
        ]}
        {...props}
      />
    </div>
  );
}

export function BreadcrumbsCollapsedExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        maxVisibleItems={4}
        items={[
          { label: 'Home', href: '#' },
          { label: 'Engineering', href: '#' },
          { label: 'Backend', href: '#' },
          { label: 'Golang', href: '#' },
          { label: 'Vacancies', href: '#' },
          { label: 'Go Developer' },
        ]}
      />
    </div>
  );
}

export function BreadcrumbsCustomSeparatorExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        separator={<SeparatorMarkIcon className={styles.separatorIcon} />}
        items={[
          { label: 'Home', href: '#' },
          { label: 'Vacancies', href: '#' },
          { label: 'Go Developer' },
        ]}
      />
    </div>
  );
}

export function BreadcrumbsLongLabelExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#' },
          { label: 'Vacancies', href: '#' },
          {
            label:
              'Go lang developer to production team with cross-functional ownership and platform support',
            pageProps: {
              title:
                'Go lang developer to production team with cross-functional ownership and platform support',
            },
          },
        ]}
      />
    </div>
  );
}

export function BreadcrumbsRenderExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        maxVisibleItems={3}
        items={[
          {
            label: 'Home',
            href: '/home',
            render: ({ href, className, children, ...props }) => (
              <a href={href} className={className} data-framework-link {...props}>
                {children}
              </a>
            ),
          },
          {
            label: 'Engineering',
            href: '/engineering',
            render: ({ href, className, children, ...props }) => (
              <a href={href} className={className} data-framework-link {...props}>
                {children}
              </a>
            ),
          },
          {
            label: 'Backend',
            href: '/engineering/backend',
            render: ({ href, className, children, ...props }) => (
              <a href={href} className={className} data-framework-link {...props}>
                {children}
              </a>
            ),
          },
          { label: 'Vacancies', href: '/vacancies' },
          { label: 'Go Developer' },
        ]}
      />
    </div>
  );
}

export function BreadcrumbsSlotsExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        maxVisibleItems={3}
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Engineering', href: '/engineering' },
          { label: 'Backend', href: '/engineering/backend' },
          { label: 'Vacancies', href: '/vacancies' },
          { label: 'Go Developer' },
        ]}
        classNames={{
          ellipsisTrigger: styles.ellipsisTrigger,
          popup: styles.popup,
          popupItem: styles.popupItem,
        }}
        slotProps={{
          positioner: { sideOffset: 6 },
          popup: { 'aria-label': 'Hidden breadcrumb links' },
        }}
      />
    </div>
  );
}

export function BreadcrumbsActionExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        maxVisibleItems={3}
        items={[
          { label: 'Home', href: '#' },
          { label: 'Projects', onClick: () => undefined },
          { label: 'Backend', onClick: () => undefined },
          { label: 'Go Developer' },
        ]}
      />
    </div>
  );
}