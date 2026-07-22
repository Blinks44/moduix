import { CSSPropertiesReferenceTable, type CssProperty } from '../mdx/reference';

const passwordInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-password-input-width',
    defaultValue: '100%',
    description: 'Width of the root password input stack.',
  },
  {
    name: '--moduix-password-input-max-width',
    defaultValue: '20rem',
    description: 'Maximum width of the root password input stack.',
  },
  {
    name: '--moduix-password-input-gap',
    defaultValue: 'var(--moduix-field-gap, var(--moduix-spacing-1))',
    description: 'Gap between password input parts; falls back to the shared Field spacing.',
  },
  {
    name: '--moduix-password-input-bg',
    defaultValue: 'var(--moduix-input-bg, var(--moduix-color-background))',
    description: 'Background color of the control shell.',
  },
  {
    name: '--moduix-password-input-border-color',
    defaultValue: 'var(--moduix-input-border-color, var(--moduix-color-border))',
    description: 'Border color of the control shell.',
  },
  {
    name: '--moduix-password-input-color',
    defaultValue: 'var(--moduix-input-color, var(--moduix-color-foreground))',
    description: 'Text color for the root, control, and input.',
  },
  {
    name: '--moduix-password-input-disabled-opacity',
    defaultValue:
      'var(--moduix-field-disabled-opacity, var(--moduix-input-disabled-opacity, var(--moduix-opacity-disabled)))',
    description: 'Opacity applied to disabled root, label, and control states.',
  },
  {
    name: '--moduix-password-input-focus-ring-color',
    defaultValue: 'var(--moduix-input-focus-ring-color, var(--moduix-color-ring))',
    description: 'Focus ring color for the control shell and visibility trigger.',
  },
  {
    name: '--moduix-password-input-font-size',
    defaultValue:
      'var(--moduix-input-font-size, var(--moduix-input-font-size-md, var(--moduix-text-md)))',
    description: 'Font size of the input text.',
  },
  {
    name: '--moduix-password-input-height',
    defaultValue:
      'var(--moduix-input-height, var(--moduix-input-height-md, var(--moduix-size-md)))',
    description: 'Minimum height of the control shell.',
  },
  {
    name: '--moduix-password-input-icon-size',
    defaultValue: 'var(--moduix-button-icon-size, var(--moduix-spacing-4))',
    description: 'Icon size inside the visibility indicator.',
  },
  {
    name: '--moduix-password-input-invalid-border-color',
    defaultValue: 'var(--moduix-input-border-color-invalid, var(--moduix-color-destructive))',
    description: 'Border color of the invalid control shell.',
  },
  {
    name: '--moduix-password-input-invalid-focus-ring-color',
    defaultValue: 'var(--moduix-input-border-color-invalid, var(--moduix-color-destructive))',
    description: 'Focus ring color of the invalid control shell.',
  },
  {
    name: '--moduix-password-input-label-color',
    defaultValue: 'var(--moduix-field-label-color, var(--moduix-color-foreground))',
    description: 'Label text color.',
  },
  {
    name: '--moduix-password-input-label-font-size',
    defaultValue: 'var(--moduix-field-label-font-size, var(--moduix-text-sm))',
    description: 'Label font size.',
  },
  {
    name: '--moduix-password-input-label-font-weight',
    defaultValue: 'var(--moduix-field-label-font-weight, var(--moduix-weight-medium))',
    description: 'Label font weight.',
  },
  {
    name: '--moduix-password-input-label-line-height',
    defaultValue: 'var(--moduix-field-label-line-height, var(--moduix-line-height-text-sm))',
    description: 'Label line height.',
  },
  {
    name: '--moduix-password-input-label-gap',
    defaultValue: 'var(--moduix-field-label-gap, var(--moduix-spacing-1))',
    description: 'Gap between label content and any composed label adornments.',
  },
  {
    name: '--moduix-password-input-line-height',
    defaultValue:
      'var(--moduix-input-line-height, var(--moduix-input-line-height-md, var(--moduix-line-height-text-md)))',
    description: 'Line height of the input text.',
  },
  {
    name: '--moduix-password-input-padding-x',
    defaultValue:
      'var(--moduix-input-padding-x, var(--moduix-input-padding-x-md, var(--moduix-spacing-3)))',
    description: 'Horizontal padding used by the text input inside the control shell.',
  },
  {
    name: '--moduix-password-input-padding-y',
    defaultValue:
      'var(--moduix-input-padding-y, var(--moduix-input-padding-y-md, var(--moduix-spacing-2)))',
    description: 'Vertical padding used by the text input inside the control shell.',
  },
  {
    name: '--moduix-password-input-placeholder-color',
    defaultValue: 'var(--moduix-input-placeholder-color, var(--moduix-color-muted-foreground))',
    description: 'Placeholder text color.',
  },
  {
    name: '--moduix-password-input-radius',
    defaultValue: 'var(--moduix-input-radius, var(--moduix-radius-md))',
    description: 'Border radius of the control shell.',
  },
  {
    name: '--moduix-password-input-readonly-bg',
    defaultValue: 'var(--moduix-input-readonly-bg, var(--moduix-color-background))',
    description: 'Background color of the readonly control shell.',
  },
  {
    name: '--moduix-password-input-readonly-color',
    defaultValue: 'var(--moduix-input-readonly-color, var(--moduix-color-foreground))',
    description: 'Text color for readonly control and input states.',
  },
  {
    name: '--moduix-password-input-trigger-bg',
    defaultValue: 'transparent',
    description: 'Background color of the visibility trigger.',
  },
  {
    name: '--moduix-password-input-trigger-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Icon color of the visibility trigger.',
  },
  {
    name: '--moduix-password-input-trigger-hover-bg',
    defaultValue: 'var(--moduix-color-muted)',
    description: 'Hover and focus background behind the visibility icon.',
  },
  {
    name: '--moduix-password-input-trigger-hover-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Hover color of the visibility trigger.',
  },
  {
    name: '--moduix-password-input-trigger-size',
    defaultValue: 'var(--moduix-button-size-sm, var(--moduix-size-sm))',
    description: 'Square size of the visibility trigger button.',
  },
  {
    name: '--moduix-password-input-trigger-inset',
    defaultValue: 'var(--moduix-spacing-2)',
    description:
      'Inline-end padding on the control shell so the trigger stays inset from the border.',
  },
  {
    name: '--moduix-password-input-trigger-visual-padding',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Inner visual padding around the eye icon hover/focus background.',
  },
  {
    name: '--moduix-password-input-trigger-radius',
    defaultValue: 'var(--moduix-radius-sm)',
    description: 'Border radius of the visibility trigger and indicator hover surface.',
  },
];

export function PasswordInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={passwordInputOverrideCssProperties} />;
}