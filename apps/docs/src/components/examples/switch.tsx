import { Switch } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';
import styles from './switch.module.css';

const switchOverrideCssProperties: CssPropertyInput[] = [
  ['--switch-bg', 'var(--color-muted)', 'Controls unchecked background color.'],
  ['--switch-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  [
    '--switch-bg-checked-hover',
    'var(--switch-bg-checked, var(--color-primary))',
    'Controls checked hover background color.',
  ],
  ['--switch-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--switch-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--switch-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--switch-border-width', 'var(--border-width-sm)', 'Controls switch border width.'],
  ['--switch-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--switch-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--switch-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  [
    '--switch-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--switch-gap', 'var(--spacing-2)', 'Controls spacing between switch control and label.'],
  ['--switch-height-xs', '1rem', 'Controls switch height for the xs size.'],
  ['--switch-height-sm', '1.25rem', 'Controls switch height for the sm size.'],
  ['--switch-height-md', 'var(--size-xs)', 'Controls switch height for the md size.'],
  ['--switch-height-lg', '1.75rem', 'Controls switch height for the lg size.'],
  ['--switch-height-xl', 'var(--size-sm)', 'Controls switch height for the xl size.'],
  ['--switch-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--switch-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--switch-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--switch-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--switch-padding', 'var(--spacing-0-5)', 'Controls inner switch padding.'],
  ['--switch-radius', 'var(--radius-full)', 'Controls switch corner radius.'],
  [
    '--switch-thumb-bg',
    'var(--color-background)',
    'Controls thumb background color for both states.',
  ],
  [
    '--switch-thumb-bg-checked',
    'var(--switch-thumb-bg, var(--color-primary-foreground))',
    'Controls checked thumb background color.',
  ],
  [
    '--switch-thumb-bg-unchecked',
    'var(--switch-thumb-bg, var(--color-background))',
    'Controls unchecked thumb background color.',
  ],
  ['--switch-thumb-border-color', 'transparent', 'Controls thumb border color.'],
  ['--switch-thumb-border-width', '0', 'Controls thumb border width.'],
  ['--switch-thumb-color', 'var(--color-muted)', 'Controls thumb content color.'],
  [
    '--switch-thumb-color-checked',
    'var(--switch-thumb-color, var(--color-primary))',
    'Controls checked thumb content color.',
  ],
  [
    '--switch-thumb-color-unchecked',
    'var(--switch-thumb-color, var(--color-muted))',
    'Controls unchecked thumb content color.',
  ],
  ['--switch-thumb-icon-size', '65%', 'Controls custom thumb icon size.'],
  ['--switch-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--switch-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--switch-thumb-size-xs', 'var(--spacing-3)', 'Controls thumb size for the xs switch size.'],
  ['--switch-thumb-size-sm', 'var(--spacing-4)', 'Controls thumb size for the sm switch size.'],
  ['--switch-thumb-size-md', 'var(--spacing-5)', 'Controls thumb size for the md switch size.'],
  ['--switch-thumb-size-lg', 'var(--size-xs)', 'Controls thumb size for the lg switch size.'],
  ['--switch-thumb-size-xl', 'var(--spacing-7)', 'Controls thumb size for the xl switch size.'],
  [
    '--switch-thumb-transition',
    'var(--switch-transition, var(--transition-default))',
    'Controls thumb movement transition timing.',
  ],
  [
    '--switch-thumb-translate',
    'var(--switch-thumb-translate-default)',
    'Controls checked thumb translation distance.',
  ],
  ['--switch-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--switch-width-xs', '1.75rem', 'Controls switch width for the xs size.'],
  ['--switch-width-sm', '2.25rem', 'Controls switch width for the sm size.'],
  ['--switch-width-md', '2.75rem', 'Controls switch width for the md size.'],
  ['--switch-width-lg', '3.25rem', 'Controls switch width for the lg size.'],
  ['--switch-width-xl', '3.75rem', 'Controls switch width for the xl size.'],
];

export function SwitchCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={switchOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function ControlledSwitchExample() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.stack}>
      <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
      </Switch>
      <span className={styles.hint}>Current value: {String(checked)}</span>
    </div>
  );
}