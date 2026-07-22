import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const scrollAreaOverrideCssProperties: CssPropertyInput[] = [
  ['--scroll-area-bg', 'transparent', 'Controls the viewport background color.'],
  ['--scroll-area-color', 'var(--color-foreground)', 'Controls the root text color.'],
  ['--scroll-area-content-padding', '0', 'Controls the content slot padding.'],
  [
    '--scroll-area-corner-bg',
    'var(--scroll-area-scrollbar-bg, transparent)',
    'Controls the corner color for two-axis scrolling.',
  ],
  [
    '--scroll-area-fade-end-size',
    'var(--scroll-area-fade-size, var(--spacing-10))',
    'Controls the bottom fade depth when `fade` is enabled.',
  ],
  [
    '--scroll-area-fade-size',
    'var(--spacing-10)',
    'Controls the default top and bottom fade depth when `fade` is enabled.',
  ],
  [
    '--scroll-area-fade-start-size',
    'var(--scroll-area-fade-size, var(--spacing-10))',
    'Controls the top fade depth when `fade` is enabled.',
  ],
  [
    '--scroll-area-focus-ring-color',
    'var(--color-ring)',
    'Controls the viewport focus ring color.',
  ],
  [
    '--scroll-area-focus-ring-offset',
    'calc(var(--scroll-area-focus-ring-width, var(--border-width-sm)) * -1)',
    'Controls the viewport focus ring offset.',
  ],
  [
    '--scroll-area-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls the viewport focus ring width.',
  ],
  ['--scroll-area-height', '100%', 'Controls the root height.'],
  ['--scroll-area-radius', 'var(--radius-md)', 'Controls the viewport border radius.'],
  ['--scroll-area-scrollbar-bg', 'transparent', 'Controls the scrollbar track background color.'],
  ['--scroll-area-scrollbar-hidden-opacity', '0', 'Controls hidden scrollbar opacity.'],
  [
    '--scroll-area-scrollbar-hit-area-size',
    'var(--spacing-5)',
    'Controls the invisible pointer hit area around the scrollbar.',
  ],
  [
    '--scroll-area-scrollbar-margin',
    'var(--spacing-1)',
    'Controls spacing between scrollbar and viewport edge.',
  ],
  ['--scroll-area-scrollbar-padding', '0', 'Controls scrollbar track padding.'],
  ['--scroll-area-scrollbar-radius', 'var(--radius-md)', 'Controls scrollbar track radius.'],
  ['--scroll-area-scrollbar-size', 'var(--spacing-1)', 'Controls the scrollbar track thickness.'],
  ['--scroll-area-scrollbar-visible-opacity', '1', 'Controls visible scrollbar opacity.'],
  ['--scroll-area-thumb-bg', 'var(--color-border)', 'Controls the draggable thumb color.'],
  [
    '--scroll-area-thumb-hover-increase',
    '2px',
    'Controls how much the thumb grows across its track on hover and drag.',
  ],
  [
    '--scroll-area-thumb-hover-transition',
    'var(--transition-fast)',
    'Controls the hover and drag growth timing without slowing the scrollbar response.',
  ],
  ['--scroll-area-thumb-min-size', 'var(--size-xs)', 'Controls the minimum draggable thumb size.'],
  ['--scroll-area-thumb-radius', 'var(--radius-full)', 'Controls the thumb border radius.'],
  ['--scroll-area-transition', 'var(--transition-default)', 'Controls scrollbar fade timing.'],
  ['--scroll-area-width', '100%', 'Controls the root width.'],
];

export function ScrollAreaCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={scrollAreaOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}