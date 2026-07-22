import { CSSPropertiesReferenceTable, type CssProperty } from '../mdx/reference';

const passwordInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--password-input-width',
    defaultValue: '100%',
    description: 'Width of the root password input stack.',
  },
  {
    name: '--password-input-max-width',
    defaultValue: '20rem',
    description: 'Maximum width of the root password input stack.',
  },
  {
    name: '--password-input-gap',
    defaultValue: 'var(--field-gap, var(--spacing-1))',
    description: 'Gap between password input parts; falls back to the shared Field spacing.',
  },
  {
    name: '--password-input-bg',
    defaultValue: 'var(--input-bg, var(--color-background))',
    description: 'Background color of the control shell.',
  },
  {
    name: '--password-input-border-color',
    defaultValue: 'var(--input-border-color, var(--color-border))',
    description: 'Border color of the control shell.',
  },
  {
    name: '--password-input-color',
    defaultValue: 'var(--input-color, var(--color-foreground))',
    description: 'Text color for the root, control, and input.',
  },
  {
    name: '--password-input-disabled-opacity',
    defaultValue:
      'var(--field-disabled-opacity, var(--input-disabled-opacity, var(--opacity-disabled)))',
    description: 'Opacity applied to disabled root, label, and control states.',
  },
  {
    name: '--password-input-focus-ring-color',
    defaultValue: 'var(--input-focus-ring-color, var(--color-ring))',
    description: 'Focus ring color for the control shell and visibility trigger.',
  },
  {
    name: '--password-input-font-size',
    defaultValue: 'var(--input-font-size, var(--input-font-size-md, var(--text-md)))',
    description: 'Font size of the input text.',
  },
  {
    name: '--password-input-height',
    defaultValue: 'var(--input-height, var(--input-height-md, var(--size-md)))',
    description: 'Minimum height of the control shell.',
  },
  {
    name: '--password-input-icon-size',
    defaultValue: 'var(--button-icon-size, var(--spacing-4))',
    description: 'Icon size inside the visibility indicator.',
  },
  {
    name: '--password-input-invalid-border-color',
    defaultValue: 'var(--input-border-color-invalid, var(--color-destructive))',
    description: 'Border color of the invalid control shell.',
  },
  {
    name: '--password-input-invalid-focus-ring-color',
    defaultValue: 'var(--input-border-color-invalid, var(--color-destructive))',
    description: 'Focus ring color of the invalid control shell.',
  },
  {
    name: '--password-input-label-color',
    defaultValue: 'var(--field-label-color, var(--color-foreground))',
    description: 'Label text color.',
  },
  {
    name: '--password-input-label-font-size',
    defaultValue: 'var(--field-label-font-size, var(--text-sm))',
    description: 'Label font size.',
  },
  {
    name: '--password-input-label-font-weight',
    defaultValue: 'var(--field-label-font-weight, var(--weight-medium))',
    description: 'Label font weight.',
  },
  {
    name: '--password-input-label-line-height',
    defaultValue: 'var(--field-label-line-height, var(--line-height-text-sm))',
    description: 'Label line height.',
  },
  {
    name: '--password-input-label-gap',
    defaultValue: 'var(--field-label-gap, var(--spacing-1))',
    description: 'Gap between label content and any composed label adornments.',
  },
  {
    name: '--password-input-line-height',
    defaultValue:
      'var(--input-line-height, var(--input-line-height-md, var(--line-height-text-md)))',
    description: 'Line height of the input text.',
  },
  {
    name: '--password-input-padding-x',
    defaultValue: 'var(--input-padding-x, var(--input-padding-x-md, var(--spacing-3)))',
    description: 'Horizontal padding used by the text input inside the control shell.',
  },
  {
    name: '--password-input-padding-y',
    defaultValue: 'var(--input-padding-y, var(--input-padding-y-md, var(--spacing-2)))',
    description: 'Vertical padding used by the text input inside the control shell.',
  },
  {
    name: '--password-input-placeholder-color',
    defaultValue: 'var(--input-placeholder-color, var(--color-muted-foreground))',
    description: 'Placeholder text color.',
  },
  {
    name: '--password-input-radius',
    defaultValue: 'var(--input-radius, var(--radius-md))',
    description: 'Border radius of the control shell.',
  },
  {
    name: '--password-input-readonly-bg',
    defaultValue: 'var(--input-readonly-bg, var(--color-background))',
    description: 'Background color of the readonly control shell.',
  },
  {
    name: '--password-input-readonly-color',
    defaultValue: 'var(--input-readonly-color, var(--color-foreground))',
    description: 'Text color for readonly control and input states.',
  },
  {
    name: '--password-input-trigger-bg',
    defaultValue: 'transparent',
    description: 'Background color of the visibility trigger.',
  },
  {
    name: '--password-input-trigger-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Icon color of the visibility trigger.',
  },
  {
    name: '--password-input-trigger-hover-bg',
    defaultValue: 'var(--color-muted)',
    description: 'Hover and focus background behind the visibility icon.',
  },
  {
    name: '--password-input-trigger-hover-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Hover color of the visibility trigger.',
  },
  {
    name: '--password-input-trigger-size',
    defaultValue: 'var(--button-size-sm, var(--size-sm))',
    description: 'Square size of the visibility trigger button.',
  },
  {
    name: '--password-input-trigger-inset',
    defaultValue: 'var(--spacing-2)',
    description:
      'Inline-end padding on the control shell so the trigger stays inset from the border.',
  },
  {
    name: '--password-input-trigger-visual-padding',
    defaultValue: 'var(--spacing-1)',
    description: 'Inner visual padding around the eye icon hover/focus background.',
  },
  {
    name: '--password-input-trigger-radius',
    defaultValue: 'var(--radius-sm)',
    description: 'Border radius of the visibility trigger and indicator hover surface.',
  },
];

export function PasswordInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={passwordInputOverrideCssProperties} />;
}