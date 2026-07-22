import { Switch } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';
import styles from './switch.module.css';

const switchOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-switch-bg', 'var(--moduix-color-muted)', 'Controls unchecked background color.'],
  [
    '--moduix-switch-bg-checked',
    'var(--moduix-color-primary)',
    'Controls checked background color.',
  ],
  [
    '--moduix-switch-bg-checked-hover',
    'var(--moduix-switch-bg-checked, var(--moduix-color-primary))',
    'Controls checked hover background color.',
  ],
  [
    '--moduix-switch-bg-hover',
    'var(--moduix-color-accent)',
    'Controls unchecked hover background color.',
  ],
  [
    '--moduix-switch-border-color',
    'var(--moduix-color-border)',
    'Controls unchecked border color.',
  ],
  [
    '--moduix-switch-border-color-checked',
    'var(--moduix-color-primary)',
    'Controls checked border color.',
  ],
  [
    '--moduix-switch-border-width',
    'var(--moduix-border-width-sm)',
    'Controls switch border width.',
  ],
  [
    '--moduix-switch-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-switch-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-switch-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-switch-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-switch-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between switch control and label.',
  ],
  ['--moduix-switch-height-xs', '1rem', 'Controls switch height for the xs size.'],
  ['--moduix-switch-height-sm', '1.25rem', 'Controls switch height for the sm size.'],
  ['--moduix-switch-height-md', 'var(--moduix-size-xs)', 'Controls switch height for the md size.'],
  ['--moduix-switch-height-lg', '1.75rem', 'Controls switch height for the lg size.'],
  ['--moduix-switch-height-xl', 'var(--moduix-size-sm)', 'Controls switch height for the xl size.'],
  ['--moduix-switch-label-color', 'var(--moduix-color-foreground)', 'Controls label text color.'],
  ['--moduix-switch-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-switch-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-switch-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-switch-padding', 'var(--moduix-spacing-0-5)', 'Controls inner switch padding.'],
  ['--moduix-switch-radius', 'var(--moduix-radius-full)', 'Controls switch corner radius.'],
  [
    '--moduix-switch-thumb-bg',
    'var(--moduix-color-background)',
    'Controls thumb background color for both states.',
  ],
  [
    '--moduix-switch-thumb-bg-checked',
    'var(--moduix-switch-thumb-bg, var(--moduix-color-primary-foreground))',
    'Controls checked thumb background color.',
  ],
  [
    '--moduix-switch-thumb-bg-unchecked',
    'var(--moduix-switch-thumb-bg, var(--moduix-color-background))',
    'Controls unchecked thumb background color.',
  ],
  ['--moduix-switch-thumb-border-color', 'transparent', 'Controls thumb border color.'],
  ['--moduix-switch-thumb-border-width', '0', 'Controls thumb border width.'],
  ['--moduix-switch-thumb-color', 'var(--moduix-color-muted)', 'Controls thumb content color.'],
  [
    '--moduix-switch-thumb-color-checked',
    'var(--moduix-switch-thumb-color, var(--moduix-color-primary))',
    'Controls checked thumb content color.',
  ],
  [
    '--moduix-switch-thumb-color-unchecked',
    'var(--moduix-switch-thumb-color, var(--moduix-color-muted))',
    'Controls unchecked thumb content color.',
  ],
  ['--moduix-switch-thumb-icon-size', '65%', 'Controls custom thumb icon size.'],
  ['--moduix-switch-thumb-radius', 'var(--moduix-radius-full)', 'Controls thumb corner radius.'],
  ['--moduix-switch-thumb-shadow', 'var(--moduix-shadow-sm)', 'Controls thumb shadow.'],
  [
    '--moduix-switch-thumb-size-xs',
    'var(--moduix-spacing-3)',
    'Controls thumb size for the xs switch size.',
  ],
  [
    '--moduix-switch-thumb-size-sm',
    'var(--moduix-spacing-4)',
    'Controls thumb size for the sm switch size.',
  ],
  [
    '--moduix-switch-thumb-size-md',
    'var(--moduix-spacing-5)',
    'Controls thumb size for the md switch size.',
  ],
  [
    '--moduix-switch-thumb-size-lg',
    'var(--moduix-size-xs)',
    'Controls thumb size for the lg switch size.',
  ],
  [
    '--moduix-switch-thumb-size-xl',
    'var(--moduix-spacing-7)',
    'Controls thumb size for the xl switch size.',
  ],
  [
    '--moduix-switch-thumb-transition',
    'var(--moduix-switch-transition, var(--moduix-transition-default))',
    'Controls thumb movement transition timing.',
  ],
  [
    '--moduix-switch-thumb-translate',
    'var(--switch-thumb-translate-default)',
    'Controls checked thumb translation distance.',
  ],
  [
    '--moduix-switch-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
  ['--moduix-switch-width-xs', '1.75rem', 'Controls switch width for the xs size.'],
  ['--moduix-switch-width-sm', '2.25rem', 'Controls switch width for the sm size.'],
  ['--moduix-switch-width-md', '2.75rem', 'Controls switch width for the md size.'],
  ['--moduix-switch-width-lg', '3.25rem', 'Controls switch width for the lg size.'],
  ['--moduix-switch-width-xl', '3.75rem', 'Controls switch width for the xl size.'],
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