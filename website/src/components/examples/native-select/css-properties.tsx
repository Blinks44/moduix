import type { CssProperty } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const nativeSelectCssProperties: CssProperty[] = [
  {
    name: '--moduix-select-width',
    defaultValue: '14rem',
    description: 'Controls the select width.',
  },
  {
    name: '--moduix-select-control-height',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Controls the single-select height.',
  },
  {
    name: '--moduix-select-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the border radius.',
  },
  {
    name: '--moduix-select-action-size',
    defaultValue: 'var(--moduix-size-xs)',
    description: 'Controls the indicator box size and the text space reserved for it.',
  },
];

export function NativeSelectCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={nativeSelectCssProperties} />;
}