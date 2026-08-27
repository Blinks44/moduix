import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const tocExampleCss = `
  .table-of-contents-demo {
    inline-size: 100%;
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 12rem);
    --moduix-table-of-contents-gap: var(--moduix-spacing-4);
    --moduix-table-of-contents-nav-padding: var(--moduix-spacing-3);
  }

  .table-of-contents-demo [data-slot='toc-content'] {
    min-width: 0;
  }

  .table-of-contents-demo-scroll-area {
    display: grid;
    block-size: 26rem;
    gap: var(--moduix-spacing-3);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--moduix-spacing-3);
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    scrollbar-gutter: stable;
    scroll-behavior: smooth;
  }

  .table-of-contents-demo-scroll-area > section {
    padding: var(--moduix-spacing-3);
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background: var(--moduix-color-background);
  }

  .table-of-contents-demo-scroll-area :is(h2, h3) {
    margin: 0;
    scroll-margin-block: var(--moduix-spacing-3);
    font-size: var(--moduix-text-sm);
  }

  .table-of-contents-demo-scroll-area p {
    margin: var(--moduix-spacing-1) 0 0;
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

  .table-of-contents-provider-demo {
    display: grid;
    gap: var(--moduix-spacing-3);
  }

  .table-of-contents-provider-demo output {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
  }

  .table-of-contents-provider-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--moduix-spacing-2);
  }

  .table-of-contents-collapsible-demo {
    grid-template-columns: minmax(0, 1fr);
  }

  .table-of-contents-collapsible-demo > [data-slot='collapsible-root'] {
    min-width: 0;
  }

  .table-of-contents-collapsible-demo [data-slot='collapsible-trigger'] {
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background: var(--moduix-color-background);
  }

  .table-of-contents-collapsible-trigger-content {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: var(--moduix-spacing-2);
  }

  .table-of-contents-collapsible-trigger-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .table-of-contents-progress-ring {
    flex: 0 0 auto;
    color: var(--moduix-color-muted-foreground);
  }

  .table-of-contents-progress-ring [data-progress] {
    color: var(--moduix-color-primary);
  }

  .table-of-contents-collapsible-demo [data-slot='collapsible-content'] {
    padding-block: var(--moduix-spacing-2);
  }

  .table-of-contents-collapsible-demo [data-slot='collapsible-content'] [data-slot='toc-list'] {
    margin-inline: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .table-of-contents-demo-scroll-area {
      scroll-behavior: auto;
    }
  }

  @media (max-width: 32rem) {
    .table-of-contents-demo {
      grid-template-columns: minmax(0, 1fr);
    }

    .table-of-contents-demo [data-slot='toc-nav'] {
      position: static;
    }
  }
`;

const tableOfContentsOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-table-of-contents-color',
    'var(--moduix-color-foreground)',
    'Controls root text color.',
  ],
  [
    '--moduix-table-of-contents-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls link focus ring color.',
  ],
  [
    '--moduix-table-of-contents-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls link focus ring width.',
  ],
  ['--moduix-table-of-contents-gap', 'var(--moduix-spacing-6)', 'Controls root column gap.'],
  [
    '--moduix-table-of-contents-indicator-bg',
    'var(--moduix-color-muted-foreground)',
    'Controls active indicator color.',
  ],
  [
    '--moduix-table-of-contents-indicator-radius',
    'var(--moduix-radius-full)',
    'Controls active indicator radius.',
  ],
  [
    '--moduix-table-of-contents-indicator-track-bg',
    'var(--moduix-color-border)',
    'Controls the inactive track behind the indicator.',
  ],
  [
    '--moduix-table-of-contents-indicator-width',
    'var(--moduix-border-width-md)',
    'Controls active indicator width.',
  ],
  [
    '--moduix-table-of-contents-link-color',
    'var(--moduix-color-muted-foreground)',
    'Controls link text color.',
  ],
  [
    '--moduix-table-of-contents-link-color-active',
    'var(--moduix-color-foreground)',
    'Controls active link text color.',
  ],
  [
    '--moduix-table-of-contents-link-color-hover',
    'var(--moduix-color-foreground)',
    'Controls link hover text color.',
  ],
  [
    '--moduix-table-of-contents-link-font-size',
    'var(--moduix-text-sm)',
    'Controls link font size.',
  ],
  [
    '--moduix-table-of-contents-link-font-weight-active',
    'var(--moduix-weight-medium)',
    'Controls active link font weight.',
  ],
  [
    '--moduix-table-of-contents-link-indent',
    'var(--moduix-spacing-2)',
    'Controls indentation between heading depths.',
  ],
  [
    '--moduix-table-of-contents-link-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls link line height.',
  ],
  [
    '--moduix-table-of-contents-link-padding-x',
    'var(--moduix-spacing-1)',
    'Controls horizontal link padding.',
  ],
  [
    '--moduix-table-of-contents-link-padding-y',
    'var(--moduix-spacing-1)',
    'Controls vertical link padding.',
  ],
  ['--moduix-table-of-contents-link-radius', 'var(--moduix-radius-sm)', 'Controls link radius.'],
  [
    '--moduix-table-of-contents-list-padding-start',
    'var(--moduix-spacing-1)',
    'Controls the gap between the activity rail and links.',
  ],
  [
    '--moduix-table-of-contents-list-gap',
    'var(--moduix-spacing-0-5)',
    'Controls spacing between items.',
  ],
  [
    '--moduix-table-of-contents-rail-color',
    'var(--moduix-color-border)',
    'Controls the subtle connector rail between heading levels.',
  ],
  [
    '--moduix-table-of-contents-nav-bg',
    'var(--moduix-color-card)',
    'Controls navigation background.',
  ],
  [
    '--moduix-table-of-contents-nav-border-color',
    'var(--moduix-color-border)',
    'Controls navigation border color.',
  ],
  [
    '--moduix-table-of-contents-nav-border-width',
    'var(--moduix-border-width-sm)',
    'Controls navigation border width.',
  ],
  [
    '--moduix-table-of-contents-nav-max-height',
    'calc(100dvh - 2rem)',
    'Controls navigation maximum height.',
  ],
  ['--moduix-table-of-contents-nav-min-width', '12rem', 'Controls navigation minimum width.'],
  [
    '--moduix-table-of-contents-nav-padding',
    'var(--moduix-spacing-4)',
    'Controls navigation inner padding.',
  ],
  [
    '--moduix-table-of-contents-nav-radius',
    'var(--moduix-radius-lg)',
    'Controls navigation radius.',
  ],
  [
    '--moduix-table-of-contents-nav-top',
    'var(--moduix-spacing-4)',
    'Controls sticky navigation offset.',
  ],
  ['--moduix-table-of-contents-nav-width', '16rem', 'Controls navigation column width.'],
  [
    '--moduix-table-of-contents-title-color',
    'var(--moduix-color-foreground)',
    'Controls title color.',
  ],
  [
    '--moduix-table-of-contents-title-font-size',
    'var(--moduix-text-sm)',
    'Controls title font size.',
  ],
  [
    '--moduix-table-of-contents-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls title font weight.',
  ],
  [
    '--moduix-table-of-contents-title-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls title line height.',
  ],
  [
    '--moduix-table-of-contents-title-margin-bottom',
    'var(--moduix-spacing-2)',
    'Controls spacing below the title.',
  ],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const tableOfContentsCssProperties = tableOfContentsOverrideCssProperties.map(normalizeCssProperty);

export function TocCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={tableOfContentsCssProperties} />;
}