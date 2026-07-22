import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const kbdOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-kbd-bg', 'var(--moduix-color-muted)', 'Controls key background color.'],
  ['--moduix-kbd-border-color', 'var(--moduix-color-border)', 'Controls key border color.'],
  ['--moduix-kbd-border-width', 'var(--moduix-border-width-sm)', 'Controls key border width.'],
  ['--moduix-kbd-color', 'var(--moduix-color-foreground)', 'Controls key text color.'],
  ['--moduix-kbd-font-family', 'var(--moduix-font-mono)', 'Controls key font family.'],
  ['--moduix-kbd-font-size', 'var(--moduix-text-xs)', 'Controls key font size.'],
  ['--moduix-kbd-font-weight', 'var(--moduix-weight-medium)', 'Controls key font weight.'],
  ['--moduix-kbd-group-gap', 'var(--moduix-spacing-1)', 'Controls spacing between grouped keys.'],
  [
    '--moduix-kbd-group-separator-color',
    'var(--moduix-color-muted-foreground)',
    'Controls text separator color inside Kbd.Group.',
  ],
  ['--moduix-kbd-height', 'var(--moduix-size-xs)', 'Controls key height.'],
  ['--moduix-kbd-line-height', 'var(--moduix-line-height-text-xs)', 'Controls key line-height.'],
  ['--moduix-kbd-min-width', 'var(--moduix-kbd-height, 1.5rem)', 'Controls minimum key width.'],
  ['--moduix-kbd-padding-x', 'var(--moduix-spacing-2)', 'Controls horizontal key padding.'],
  ['--moduix-kbd-padding-y', '0', 'Controls vertical key padding.'],
  ['--moduix-kbd-radius', 'var(--moduix-radius-sm)', 'Controls key border radius.'],
  [
    '--moduix-kbd-shadow',
    'inset 0 -1px 0 color-mix(in oklab, var(--moduix-color-foreground) 12%, transparent)',
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