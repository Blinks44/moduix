import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const stackOverrideCssProperties = [
  {
    name: '--stack-direction-mobile',
    defaultValue: 'column',
    description:
      'Controls the root `flex-direction` below `640px`. The `direction` prop writes an inline override.',
  },
  {
    name: '--stack-direction-desktop',
    defaultValue: 'column',
    description:
      'Controls the root `flex-direction` from `640px` up. The `direction` prop writes an inline override.',
  },
  {
    name: '--stack-flex',
    defaultValue: 'initial',
    description: 'Controls the root `flex` value. The `fill` prop writes an inline override.',
  },
] satisfies CssPropertyInput[];

export function StackCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={stackOverrideCssProperties} />;
}