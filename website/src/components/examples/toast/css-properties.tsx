import type { CssProperty } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const toastCssProperties = (
  [
    ['--moduix-toast-bg', 'Type-specific', 'Overrides the toast background for every type.'],
    [
      '--moduix-toast-border-color',
      'Type-specific',
      'Overrides the toast border color for every type.',
    ],
    ['--moduix-toast-color', 'Type-specific', 'Overrides the toast text color for every type.'],
    [
      '--moduix-toast-description-color',
      'var(--moduix-color-muted-foreground)',
      'Controls the description text color.',
    ],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];

export function ToastCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={toastCssProperties} />;
}