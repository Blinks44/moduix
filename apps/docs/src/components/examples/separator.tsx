import type { ComponentProps } from 'react';
import { Separator, type SeparatorSize, type SeparatorVariant } from '@moduix/react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './separator.module.css';

export const separatorSections = ['Account settings', 'Billing details'];
export const separatorNavigationItems = ['Home', 'Pricing', 'Sign in'];
export const separatorVariantItems: SeparatorVariant[] = ['solid', 'dashed', 'dotted'];
export const separatorSizeItems: SeparatorSize[] = ['xs', 'sm', 'md', 'lg'];
export const separatorNativeRuleLabels = ['Before native rule', 'After native rule'];
export const separatorStepLabels = ['Completed profile', 'Next step: billing details'];

export const separatorOverrideCssProperties: CssPropertyInput[] = [
  [
    '--separator-border-style',
    'active variant style',
    'Overrides the separator variant border style.',
  ],
  ['--separator-color', 'var(--color-border)', 'Controls the separator color.'],
  ['--separator-length-horizontal', '100%', 'Controls horizontal separator width.'],
  ['--separator-length-vertical', '1em', 'Controls vertical separator height.'],
  [
    '--separator-size-thickness',
    '1px',
    'Controls the recipe-provided thickness for the active size.',
  ],
  [
    '--separator-thickness',
    'var(--separator-size-thickness)',
    'Overrides separator thickness for both orientations.',
  ],
];

export function SeparatorCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={separatorOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function SeparatorExample(props: ComponentProps<typeof Separator>) {
  return (
    <div className={styles.card}>
      <div className={styles.stack}>
        <span className={styles.text}>{separatorSections[0]}</span>
        <Separator {...props} />
        <span className={styles.text}>{separatorSections[1]}</span>
      </div>
    </div>
  );
}

export function VerticalSeparatorExample() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {separatorNavigationItems.slice(0, 2).map((item) => (
        <a key={item} href="#" className={styles.link}>
          {item}
        </a>
      ))}
      <Separator orientation="vertical" />
      <a href="#" className={styles.link}>
        {separatorNavigationItems[2]}
      </a>
    </nav>
  );
}

export function SeparatorVariantsExample() {
  return (
    <div className={styles.section}>
      {separatorVariantItems.map((variant) => (
        <div key={variant} className={styles.exampleRow}>
          <span className={styles.text}>{variant}</span>
          <Separator variant={variant} />
        </div>
      ))}
    </div>
  );
}

export function SeparatorSizesExample() {
  return (
    <div className={styles.section}>
      {separatorSizeItems.map((size) => (
        <div key={size} className={styles.exampleRow}>
          <span className={styles.text}>{size}</span>
          <Separator size={size} />
        </div>
      ))}
    </div>
  );
}

export function SeparatorAsChildExample() {
  return (
    <div className={styles.section}>
      <span className={styles.text}>{separatorNativeRuleLabels[0]}</span>
      <Separator asChild>
        <hr className={styles.nativeRule} />
      </Separator>
      <span className={styles.text}>{separatorNativeRuleLabels[1]}</span>
    </div>
  );
}

export function StyledSeparatorExample() {
  return (
    <div className={styles.section}>
      <span className={styles.text}>{separatorStepLabels[0]}</span>
      <Separator className={styles.customSeparator} />
      <span className={styles.text}>{separatorStepLabels[1]}</span>
    </div>
  );
}