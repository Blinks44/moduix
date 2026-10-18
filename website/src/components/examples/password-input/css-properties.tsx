import type { CssProperty } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const passwordInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-password-input-width',
    defaultValue: '100%',
    description: 'Width of the root.',
  },
  {
    name: '--moduix-password-input-height',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Minimum height of the control for every size.',
  },
  {
    name: '--moduix-password-input-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Corner radius of the control.',
  },
];

export function PasswordInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={passwordInputOverrideCssProperties} />;
}