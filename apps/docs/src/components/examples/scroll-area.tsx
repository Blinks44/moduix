import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const scrollAreaOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-scroll-area-bg', 'transparent', 'Controls the viewport background color.'],
  ['--moduix-scroll-area-color', 'var(--moduix-color-foreground)', 'Controls the root text color.'],
  ['--moduix-scroll-area-content-padding', '0', 'Controls the content slot padding.'],
  [
    '--moduix-scroll-area-corner-bg',
    'var(--moduix-scroll-area-scrollbar-bg, transparent)',
    'Controls the corner color for two-axis scrolling.',
  ],
  [
    '--moduix-scroll-area-fade-end-size',
    'var(--moduix-scroll-area-fade-size, var(--moduix-spacing-10))',
    'Controls the bottom fade depth when `fade` is enabled.',
  ],
  [
    '--moduix-scroll-area-fade-size',
    'var(--moduix-spacing-10)',
    'Controls the default top and bottom fade depth when `fade` is enabled.',
  ],
  [
    '--moduix-scroll-area-fade-start-size',
    'var(--moduix-scroll-area-fade-size, var(--moduix-spacing-10))',
    'Controls the top fade depth when `fade` is enabled.',
  ],
  [
    '--moduix-scroll-area-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls the viewport focus ring color.',
  ],
  [
    '--moduix-scroll-area-focus-ring-offset',
    'calc(var(--moduix-scroll-area-focus-ring-width, var(--moduix-border-width-sm)) * -1)',
    'Controls the viewport focus ring offset.',
  ],
  [
    '--moduix-scroll-area-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls the viewport focus ring width.',
  ],
  ['--moduix-scroll-area-height', '100%', 'Controls the root height.'],
  [
    '--moduix-scroll-area-radius',
    'var(--moduix-radius-md)',
    'Controls the viewport border radius.',
  ],
  [
    '--moduix-scroll-area-scrollbar-bg',
    'transparent',
    'Controls the scrollbar track background color.',
  ],
  ['--moduix-scroll-area-scrollbar-hidden-opacity', '0', 'Controls hidden scrollbar opacity.'],
  [
    '--moduix-scroll-area-scrollbar-hit-area-size',
    'var(--moduix-spacing-5)',
    'Controls the invisible pointer hit area around the scrollbar.',
  ],
  [
    '--moduix-scroll-area-scrollbar-margin',
    'var(--moduix-spacing-1)',
    'Controls spacing between scrollbar and viewport edge.',
  ],
  ['--moduix-scroll-area-scrollbar-padding', '0', 'Controls scrollbar track padding.'],
  [
    '--moduix-scroll-area-scrollbar-radius',
    'var(--moduix-radius-md)',
    'Controls scrollbar track radius.',
  ],
  [
    '--moduix-scroll-area-scrollbar-size',
    'var(--moduix-spacing-1)',
    'Controls the scrollbar track thickness.',
  ],
  ['--moduix-scroll-area-scrollbar-visible-opacity', '1', 'Controls visible scrollbar opacity.'],
  [
    '--moduix-scroll-area-thumb-bg',
    'var(--moduix-color-border)',
    'Controls the draggable thumb color.',
  ],
  [
    '--moduix-scroll-area-thumb-hover-increase',
    '2px',
    'Controls how much the thumb grows across its track on hover and drag.',
  ],
  [
    '--moduix-scroll-area-thumb-hover-transition',
    'var(--moduix-transition-fast)',
    'Controls the hover and drag growth timing without slowing the scrollbar response.',
  ],
  [
    '--moduix-scroll-area-thumb-min-size',
    'var(--moduix-size-xs)',
    'Controls the minimum draggable thumb size.',
  ],
  [
    '--moduix-scroll-area-thumb-radius',
    'var(--moduix-radius-full)',
    'Controls the thumb border radius.',
  ],
  [
    '--moduix-scroll-area-transition',
    'var(--moduix-transition-default)',
    'Controls scrollbar fade timing.',
  ],
  ['--moduix-scroll-area-width', '100%', 'Controls the root width.'],
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