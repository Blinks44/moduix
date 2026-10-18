import type { CssProperty } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const paginationOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-pagination-item-size',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Controls the height and minimum width of page items, ellipses, and triggers.',
  },
];

export function PaginationCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={paginationOverrideCssProperties} />;
}