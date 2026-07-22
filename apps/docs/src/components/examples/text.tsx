import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const textOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-text-default-color', 'var(--moduix-color-foreground)', 'Controls default tone color.'],
  [
    '--moduix-text-destructive-color',
    'var(--moduix-color-destructive)',
    'Controls destructive tone color.',
  ],
  ['--moduix-text-font-family', 'inherit', 'Controls text font family.'],
  ['--moduix-text-font-size-xs', 'var(--moduix-text-xs)', 'Controls `xs` text font size.'],
  ['--moduix-text-font-size-sm', 'var(--moduix-text-sm)', 'Controls `sm` text font size.'],
  ['--moduix-text-font-size-md', 'var(--moduix-text-md)', 'Controls `md` text font size.'],
  ['--moduix-text-font-size-lg', 'var(--moduix-text-lg)', 'Controls `lg` text font size.'],
  ['--moduix-text-font-size-xl', 'var(--moduix-text-xl)', 'Controls `xl` text font size.'],
  ['--moduix-text-font-weight-bold', 'var(--moduix-weight-bold)', 'Controls bold text weight.'],
  [
    '--moduix-text-font-weight-medium',
    'var(--moduix-weight-medium)',
    'Controls medium text weight.',
  ],
  [
    '--moduix-text-font-weight-regular',
    'var(--moduix-weight-regular)',
    'Controls regular text weight.',
  ],
  [
    '--moduix-text-font-weight-semibold',
    'var(--moduix-weight-semibold)',
    'Controls semibold text weight.',
  ],
  ['--moduix-text-letter-spacing', '0', 'Controls text letter spacing.'],
  ['--moduix-text-line-clamp', 'set by `lineClamp`', 'Controls the active line clamp count.'],
  [
    '--moduix-text-line-height-xs',
    'var(--moduix-line-height-text-xs)',
    'Controls `xs` text line height.',
  ],
  [
    '--moduix-text-line-height-sm',
    'var(--moduix-line-height-text-sm)',
    'Controls `sm` text line height.',
  ],
  [
    '--moduix-text-line-height-md',
    'var(--moduix-line-height-text-md)',
    'Controls `md` text line height.',
  ],
  [
    '--moduix-text-line-height-lg',
    'var(--moduix-line-height-text-lg)',
    'Controls `lg` text line height.',
  ],
  [
    '--moduix-text-line-height-xl',
    'var(--moduix-line-height-text-xl)',
    'Controls `xl` text line height.',
  ],
  [
    '--moduix-text-muted-color',
    'var(--moduix-color-muted-foreground)',
    'Controls muted tone color.',
  ],
  ['--moduix-text-primary-color', 'var(--moduix-color-primary)', 'Controls primary tone color.'],
  [
    '--moduix-text-subtle-color',
    'var(--moduix-color-secondary-foreground)',
    'Controls subtle tone color.',
  ],
];
export function TextCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={textOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}