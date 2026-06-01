import type { ComponentProps, CSSProperties } from 'react';
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  Menu,
  MenuContent,
  MenuLinkItem,
  MenuTrigger,
  SeparatorMarkIcon,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './breadcrumbs.module.css';

const separatorIconStyle = { width: '0.75rem', height: '0.25rem' } as CSSProperties;

const collapsedMenuTriggerStyle = {
  minWidth: 'auto',
  minHeight: 'auto',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
} as CSSProperties;

const collapsedMenuContentStyle = {
  '--menu-popup-min-width': '8rem',
  '--menu-item-font-size': 'var(--text-xs)',
  '--menu-item-padding-x-start': '0.625rem',
  '--menu-item-padding-x-end': '0.625rem',
  '--menu-item-padding-y': '0.25rem',
} as CSSProperties;

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

export const breadcrumbsPlaygroundCssProperties: CssPropertyInput[] = [
  ['--breadcrumbs-item-max-width', '16rem', 'Controls max width of each breadcrumb item.'],
  ['--breadcrumbs-link-color', 'var(--color-muted-foreground)', 'Controls breadcrumb link color.'],
  [
    '--breadcrumbs-link-color-hover',
    'var(--color-foreground)',
    'Controls breadcrumb link hover color.',
  ],
  ['--breadcrumbs-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function BreadcrumbsDemo({ className, ...props }: ComponentProps<typeof Breadcrumbs>) {
  return (
    <Breadcrumbs className={className} {...props}>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
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

export function BreadcrumbsExample(props: ComponentProps<typeof Breadcrumbs>) {
  return (
    <div className={styles.container}>
      <BreadcrumbsDemo {...props} />
    </div>
  );
}

export function BreadcrumbsCollapsedExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <Menu>
              <MenuTrigger aria-label="Show hidden path items" style={collapsedMenuTriggerStyle}>
                <BreadcrumbsEllipsis />
              </MenuTrigger>
              <MenuContent align="start" style={collapsedMenuContentStyle}>
                <MenuLinkItem closeOnClick href="/engineering">
                  Engineering
                </MenuLinkItem>
                <MenuLinkItem closeOnClick href="/engineering/backend">
                  Backend
                </MenuLinkItem>
                <MenuLinkItem closeOnClick href="/engineering/backend/golang">
                  Golang
                </MenuLinkItem>
              </MenuContent>
            </Menu>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsCustomSeparatorExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator>
            <SeparatorMarkIcon style={separatorIconStyle} />
          </BreadcrumbsSeparator>
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator>
            <SeparatorMarkIcon style={separatorIconStyle} />
          </BreadcrumbsSeparator>
          <BreadcrumbsItem>
            <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsLongLabelExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsPage>
              <span title="Go lang developer to production team with cross-functional ownership and platform support">
                Go lang developer to production team with cross-functional ownership and platform
                support
              </span>
            </BreadcrumbsPage>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </div>
  );
}

export function BreadcrumbsFrameworkLinkExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem>
            <BreadcrumbsLink render={<a href="/" data-framework-link />}>Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink render={<a href="/engineering" data-framework-link />}>
              Engineering
            </BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink render={<a href="/vacancies" data-framework-link />}>
              Vacancies
            </BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </div>
  );
}