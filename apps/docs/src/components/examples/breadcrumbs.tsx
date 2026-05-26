import type { ComponentProps } from 'react';
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
          <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
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
            <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <Menu>
              <MenuTrigger className={styles.menuTrigger} aria-label="Show hidden path items">
                <BreadcrumbsEllipsis />
              </MenuTrigger>
              <MenuContent align="start" className={styles.menuContent}>
                <MenuLinkItem closeOnClick href="#">
                  Engineering
                </MenuLinkItem>
                <MenuLinkItem closeOnClick href="#">
                  Backend
                </MenuLinkItem>
                <MenuLinkItem closeOnClick href="#">
                  Golang
                </MenuLinkItem>
              </MenuContent>
            </Menu>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
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
            <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator>
            <SeparatorMarkIcon className={styles.separatorIcon} />
          </BreadcrumbsSeparator>
          <BreadcrumbsItem>
            <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator>
            <SeparatorMarkIcon className={styles.separatorIcon} />
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
            <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
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

export function BreadcrumbsRenderExample() {
  return (
    <div className={styles.container}>
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem>
            <BreadcrumbsLink
              href="/home"
              render={({ href, className, children, ...props }) => (
                <a href={href} className={className} data-framework-link {...props}>
                  {children}
                </a>
              )}
            >
              Home
            </BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink
              href="/engineering"
              render={({ href, className, children, ...props }) => (
                <a href={href} className={className} data-framework-link {...props}>
                  {children}
                </a>
              )}
            >
              Engineering
            </BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsLink
              href="/vacancies"
              render={({ href, className, children, ...props }) => (
                <a href={href} className={className} data-framework-link {...props}>
                  {children}
                </a>
              )}
            >
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