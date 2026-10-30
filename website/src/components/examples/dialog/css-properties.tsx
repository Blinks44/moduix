import type { CssControls } from '../../mdx/customize';
import type { CssPropertyInput } from '../../mdx/reference';

export const dialogOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-dialog-width', '28rem', 'Content width. Overrides the width from the `size` prop.'],
];

export const dialogControls: CssControls = {
  '--moduix-dialog-width': [280, 640, 8, 'px'],
};