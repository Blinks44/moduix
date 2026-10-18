import type { CssProperty } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const numberInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-number-input-control-height',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Overrides the input height and the trigger size for every size.',
  },
  {
    name: '--moduix-number-input-input-width',
    defaultValue: '6rem',
    description: 'Controls input width.',
  },
  {
    name: '--moduix-number-input-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the outer control corner radius.',
  },
];

export function NumberInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={numberInputOverrideCssProperties} />;
}