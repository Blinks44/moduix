import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const tourCssProperties: CssPropertyInput[] = [
  [
    '--moduix-tour-action-bg',
    'var(--moduix-color-background)',
    'Controls secondary action background.',
  ],
  [
    '--moduix-tour-action-bg-hover',
    'var(--moduix-color-accent)',
    'Controls secondary action hover background.',
  ],
  [
    '--moduix-tour-action-border-color',
    'var(--moduix-color-border)',
    'Controls secondary action border color.',
  ],
  [
    '--moduix-tour-action-border-width',
    'var(--moduix-border-width-sm)',
    'Controls action border width.',
  ],
  [
    '--moduix-tour-action-color',
    'var(--moduix-color-foreground)',
    'Controls secondary action text color.',
  ],
  [
    '--moduix-tour-action-primary-bg',
    'var(--moduix-color-primary)',
    'Controls next and dismiss action background.',
  ],
  [
    '--moduix-tour-action-primary-color',
    'var(--moduix-color-primary-foreground)',
    'Controls next and dismiss action text color.',
  ],
  [
    '--moduix-tour-arrow-background',
    'var(--moduix-tour-bg, var(--moduix-color-popover))',
    'Controls arrow fill.',
  ],
  ['--moduix-tour-arrow-size', 'var(--moduix-spacing-2-5)', 'Controls Ark arrow size.'],
  [
    '--moduix-tour-arrow-stroke-color',
    'var(--moduix-tour-border-color, var(--moduix-color-border))',
    'Controls arrow border color.',
  ],
  [
    '--moduix-tour-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Controls backdrop color.',
  ],
  ['--moduix-tour-bg', 'var(--moduix-color-popover)', 'Controls content background.'],
  ['--moduix-tour-border-color', 'var(--moduix-color-border)', 'Controls content border color.'],
  ['--moduix-tour-color', 'var(--moduix-color-popover-foreground)', 'Controls content foreground.'],
  ['--moduix-tour-dialog-width', '26rem', 'Controls dialog step width.'],
  ['--moduix-tour-floating-width', '22rem', 'Controls floating step width.'],
  ['--moduix-tour-max-height', '24rem', 'Controls content max height.'],
  [
    '--moduix-tour-max-width',
    'calc(100vw - var(--moduix-spacing-8))',
    'Controls content max width.',
  ],
  ['--moduix-tour-padding', 'var(--moduix-spacing-5)', 'Controls content padding.'],
  ['--moduix-tour-radius', 'var(--moduix-radius-lg)', 'Controls content border radius.'],
  ['--moduix-tour-shadow', 'var(--moduix-shadow-lg)', 'Controls content shadow.'],
  ['--moduix-tour-title-font-size', 'var(--moduix-text-md)', 'Controls title font size.'],
  [
    '--moduix-tour-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls description color.',
  ],
  [
    '--moduix-tour-progress-text-color',
    'var(--moduix-color-muted-foreground)',
    'Controls progress text color.',
  ],
  ['--moduix-tour-z-index', 'var(--moduix-z-modal)', 'Controls tour layer z-index.'],
  ['--moduix-tour-action-font-size', 'var(--moduix-text-sm)', 'Controls action font size.'],
  [
    '--moduix-tour-action-font-weight',
    'var(--moduix-weight-medium)',
    'Controls action font weight.',
  ],
  ['--moduix-tour-action-gap', 'var(--moduix-spacing-2)', 'Controls action content gap.'],
  ['--moduix-tour-action-height', 'var(--moduix-size-sm)', 'Controls action height.'],
  [
    '--moduix-tour-action-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls action line height.',
  ],
  [
    '--moduix-tour-action-padding-x',
    'var(--moduix-spacing-3)',
    'Controls action horizontal padding.',
  ],
  [
    '--moduix-tour-action-padding-y',
    'var(--moduix-spacing-1-5)',
    'Controls action vertical padding.',
  ],
  [
    '--moduix-tour-action-primary-bg-hover',
    'color-mix(in oklab, var(--moduix-color-primary), black 12%)',
    'Controls primary action hover background.',
  ],
  [
    '--moduix-tour-action-primary-border-color',
    'var(--moduix-color-primary)',
    'Controls primary action border color.',
  ],
  [
    '--moduix-tour-action-primary-border-color-hover',
    'color-mix(in oklab, var(--moduix-color-primary), black 12%)',
    'Controls primary action hover border color.',
  ],
  ['--moduix-tour-action-radius', 'var(--moduix-radius-md)', 'Controls action border radius.'],
  [
    '--moduix-tour-action-transition',
    'var(--moduix-transition-default)',
    'Controls action transitions.',
  ],
  ['--moduix-tour-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--moduix-tour-backdrop-ending-blur', 'none', 'Controls backdrop blur at the end of exit.'],
  ['--moduix-tour-backdrop-ending-opacity', '0', 'Controls backdrop opacity at the end of exit.'],
  ['--moduix-tour-backdrop-starting-blur', 'none', 'Controls backdrop blur at the start of enter.'],
  [
    '--moduix-tour-backdrop-starting-opacity',
    '0',
    'Controls backdrop opacity at the start of enter.',
  ],
  [
    '--moduix-tour-backdrop-transition',
    'var(--moduix-transition-default)',
    'Controls backdrop animation.',
  ],
  ['--moduix-tour-border-width', 'var(--moduix-border-width-sm)', 'Controls content border width.'],
  ['--moduix-tour-close-trigger-bg', 'transparent', 'Controls close trigger background.'],
  [
    '--moduix-tour-close-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls close trigger hover background.',
  ],
  [
    '--moduix-tour-close-trigger-color',
    'var(--moduix-color-muted-foreground)',
    'Controls close trigger color.',
  ],
  [
    '--moduix-tour-close-trigger-color-hover',
    'var(--moduix-tour-color, var(--moduix-color-popover-foreground))',
    'Controls close trigger hover color.',
  ],
  [
    '--moduix-tour-close-trigger-icon-size',
    'var(--moduix-spacing-3)',
    'Controls close trigger icon size.',
  ],
  [
    '--moduix-tour-close-trigger-offset',
    'var(--moduix-spacing-4)',
    'Controls close trigger inset offset.',
  ],
  [
    '--moduix-tour-close-trigger-radius',
    'var(--moduix-radius-md)',
    'Controls close trigger border radius.',
  ],
  [
    '--moduix-tour-close-trigger-size',
    'var(--moduix-spacing-7)',
    'Controls close trigger square size.',
  ],
  ['--moduix-tour-content-ending-opacity', '0', 'Controls content opacity at the end of exit.'],
  [
    '--moduix-tour-content-ending-scale',
    'var(--moduix-scale-popup)',
    'Controls content scale at the end of exit.',
  ],
  [
    '--moduix-tour-content-ending-translate-x',
    '0',
    'Controls content X offset at the end of exit.',
  ],
  [
    '--moduix-tour-content-ending-translate-y',
    '0',
    'Controls content Y offset at the end of exit.',
  ],
  [
    '--moduix-tour-content-starting-opacity',
    '0',
    'Controls content opacity at the start of enter.',
  ],
  [
    '--moduix-tour-content-starting-scale',
    'var(--moduix-scale-popup)',
    'Controls content scale at the start of enter.',
  ],
  [
    '--moduix-tour-content-starting-translate-x',
    '0',
    'Controls content X offset at the start of enter.',
  ],
  [
    '--moduix-tour-content-starting-translate-y',
    '0',
    'Controls content Y offset at the start of enter.',
  ],
  ['--moduix-tour-control-gap', 'var(--moduix-spacing-2)', 'Controls action group gap.'],
  [
    '--moduix-tour-control-margin-top',
    'var(--moduix-spacing-3)',
    'Controls action group top margin.',
  ],
  [
    '--moduix-tour-description-font-size',
    'var(--moduix-text-sm)',
    'Controls description font size.',
  ],
  [
    '--moduix-tour-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--moduix-tour-description-margin', '0', 'Controls description margin.'],
  [
    '--moduix-tour-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled action opacity.',
  ],
  [
    '--moduix-tour-floating-offset',
    'var(--moduix-spacing-6)',
    'Controls floating step viewport offset.',
  ],
  [
    '--moduix-tour-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls action and close focus ring color.',
  ],
  [
    '--moduix-tour-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls action and close focus ring width.',
  ],
  ['--moduix-tour-gap', 'var(--moduix-spacing-1)', 'Controls content row gap.'],
  [
    '--moduix-tour-positioner-padding',
    'var(--moduix-spacing-4)',
    'Controls dialog positioner padding.',
  ],
  [
    '--moduix-tour-progress-text-font-size',
    'var(--moduix-text-xs)',
    'Controls progress text font size.',
  ],
  [
    '--moduix-tour-progress-text-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls progress text line height.',
  ],
  [
    '--moduix-tour-progress-text-margin-top',
    'var(--moduix-spacing-2)',
    'Controls progress text top margin.',
  ],
  ['--moduix-tour-spotlight-ring-width', '2px', 'Controls spotlight ring width.'],
  [
    '--moduix-tour-spotlight-shadow',
    '0 0 0 var(--moduix-tour-spotlight-ring-width, 2px) var(--moduix-color-ring)',
    'Controls spotlight ring shadow.',
  ],
  [
    '--moduix-tour-title-color',
    'var(--moduix-tour-color, var(--moduix-color-popover-foreground))',
    'Controls title color.',
  ],
  [
    '--moduix-tour-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls title font weight.',
  ],
  [
    '--moduix-tour-title-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls title line height.',
  ],
  ['--moduix-tour-title-margin', '0', 'Controls title margin.'],
  [
    '--moduix-tour-title-padding-inline-end',
    'var(--moduix-spacing-6)',
    'Reserves inline space for the close trigger.',
  ],
  [
    '--moduix-tour-transition',
    'var(--moduix-transition-default)',
    'Controls content animation duration.',
  ],
  ['--moduix-tour-width', '20rem', 'Controls default content width.'],
];

export function TourCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={tourCssProperties.map((property) => {
        if (!('name' in property))
          return { name: property[0], defaultValue: property[1], description: property[2] };
        return property;
      })}
    />
  );
}