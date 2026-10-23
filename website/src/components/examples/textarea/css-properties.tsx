import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const textareaCssProperties: CssPropertyInput[] = [
  ['--moduix-textarea-radius', 'var(--moduix-radius-md)', 'Controls the border radius.'],
  ['--moduix-textarea-width', '100%', 'Controls the width.'],
];

export function TextareaCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={textareaCssProperties.map(normalizeCssProperty)} />
  );
}

const normalizeCssProperty = (property: CssPropertyInput) =>
  'name' in property
    ? property
    : { name: property[0], defaultValue: property[1], description: property[2] };