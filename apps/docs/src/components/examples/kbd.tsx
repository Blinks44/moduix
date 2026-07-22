import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const kbdOverrideCssProperties: CssPropertyInput[] = [
  ['--kbd-bg', 'var(--color-muted)', 'Controls key background color.'],
  ['--kbd-border-color', 'var(--color-border)', 'Controls key border color.'],
  ['--kbd-border-width', 'var(--border-width-sm)', 'Controls key border width.'],
  ['--kbd-color', 'var(--color-foreground)', 'Controls key text color.'],
  ['--kbd-font-family', 'var(--font-mono)', 'Controls key font family.'],
  ['--kbd-font-size', 'var(--text-xs)', 'Controls key font size.'],
  ['--kbd-font-weight', 'var(--weight-medium)', 'Controls key font weight.'],
  ['--kbd-group-gap', 'var(--spacing-1)', 'Controls spacing between grouped keys.'],
  [
    '--kbd-group-separator-color',
    'var(--color-muted-foreground)',
    'Controls text separator color inside Kbd.Group.',
  ],
  ['--kbd-height', 'var(--size-xs)', 'Controls key height.'],
  ['--kbd-line-height', 'var(--line-height-text-xs)', 'Controls key line-height.'],
  ['--kbd-min-width', 'var(--kbd-height, 1.5rem)', 'Controls minimum key width.'],
  ['--kbd-padding-x', 'var(--spacing-2)', 'Controls horizontal key padding.'],
  ['--kbd-padding-y', '0', 'Controls vertical key padding.'],
  ['--kbd-radius', 'var(--radius-sm)', 'Controls key border radius.'],
  [
    '--kbd-shadow',
    'inset 0 -1px 0 color-mix(in oklab, var(--color-foreground) 12%, transparent)',
    'Controls key inset shadow.',
  ],
];

export function KbdCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={kbdOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}