import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const textOverrideCssProperties: CssPropertyInput[] = [
  ['--text-default-color', 'var(--color-foreground)', 'Controls default tone color.'],
  ['--text-destructive-color', 'var(--color-destructive)', 'Controls destructive tone color.'],
  ['--text-font-family', 'inherit', 'Controls text font family.'],
  ['--text-font-size-xs', 'var(--text-xs)', 'Controls `xs` text font size.'],
  ['--text-font-size-sm', 'var(--text-sm)', 'Controls `sm` text font size.'],
  ['--text-font-size-md', 'var(--text-md)', 'Controls `md` text font size.'],
  ['--text-font-size-lg', 'var(--text-lg)', 'Controls `lg` text font size.'],
  ['--text-font-size-xl', 'var(--text-xl)', 'Controls `xl` text font size.'],
  ['--text-font-weight-bold', 'var(--weight-bold)', 'Controls bold text weight.'],
  ['--text-font-weight-medium', 'var(--weight-medium)', 'Controls medium text weight.'],
  ['--text-font-weight-regular', 'var(--weight-regular)', 'Controls regular text weight.'],
  ['--text-font-weight-semibold', 'var(--weight-semibold)', 'Controls semibold text weight.'],
  ['--text-letter-spacing', '0', 'Controls text letter spacing.'],
  ['--text-line-clamp', 'set by `lineClamp`', 'Controls the active line clamp count.'],
  ['--text-line-height-xs', 'var(--line-height-text-xs)', 'Controls `xs` text line height.'],
  ['--text-line-height-sm', 'var(--line-height-text-sm)', 'Controls `sm` text line height.'],
  ['--text-line-height-md', 'var(--line-height-text-md)', 'Controls `md` text line height.'],
  ['--text-line-height-lg', 'var(--line-height-text-lg)', 'Controls `lg` text line height.'],
  ['--text-line-height-xl', 'var(--line-height-text-xl)', 'Controls `xl` text line height.'],
  ['--text-muted-color', 'var(--color-muted-foreground)', 'Controls muted tone color.'],
  ['--text-primary-color', 'var(--color-primary)', 'Controls primary tone color.'],
  ['--text-subtle-color', 'var(--color-secondary-foreground)', 'Controls subtle tone color.'],
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