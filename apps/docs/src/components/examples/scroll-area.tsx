import type { ComponentProps } from 'react';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'moduix';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './scroll-area.module.css';

export const scrollAreaOverrideCssProperties: CssPropertyInput[] = [
  ['--scroll-area-bg', 'transparent', 'Controls the viewport background color.'],
  ['--scroll-area-color', 'var(--color-foreground)', 'Controls the root text color.'],
  ['--scroll-area-content-padding', '0', 'Controls the content slot padding.'],
  [
    '--scroll-area-corner-bg',
    'var(--scroll-area-scrollbar-bg, transparent)',
    'Controls the corner color for two-axis scrolling.',
  ],
  [
    '--scroll-area-fade-end-size',
    'var(--scroll-area-fade-size, var(--spacing-10))',
    'Controls vertical end fade.',
  ],
  [
    '--scroll-area-fade-inline-end-size',
    'var(--scroll-area-fade-size, var(--spacing-10))',
    'Controls horizontal end fade.',
  ],
  [
    '--scroll-area-fade-inline-start-size',
    'var(--scroll-area-fade-size, var(--spacing-10))',
    'Controls horizontal start fade.',
  ],
  ['--scroll-area-fade-size', 'var(--spacing-10)', 'Controls the default fade size.'],
  [
    '--scroll-area-fade-start-size',
    'var(--scroll-area-fade-size, var(--spacing-10))',
    'Controls vertical start fade.',
  ],
  [
    '--scroll-area-focus-ring-color',
    'var(--color-ring)',
    'Controls the viewport focus ring color.',
  ],
  [
    '--scroll-area-focus-ring-offset',
    'calc(var(--scroll-area-focus-ring-width, var(--border-width-sm)) * -1)',
    'Controls the viewport focus ring offset.',
  ],
  [
    '--scroll-area-focus-ring-width',
    'var(--border-width-sm)',
    'Controls the viewport focus ring width.',
  ],
  ['--scroll-area-height', '100%', 'Controls the root height.'],
  ['--scroll-area-radius', 'var(--radius-md)', 'Controls the viewport border radius.'],
  ['--scroll-area-scrollbar-bg', 'transparent', 'Controls the scrollbar track background color.'],
  ['--scroll-area-scrollbar-hidden-opacity', '0', 'Controls hidden scrollbar opacity.'],
  [
    '--scroll-area-scrollbar-hit-area-size',
    '1.25rem',
    'Controls the invisible pointer hit area around the scrollbar.',
  ],
  [
    '--scroll-area-scrollbar-margin',
    'calc(var(--spacing-1) / 2)',
    'Controls spacing between scrollbar and viewport edge.',
  ],
  ['--scroll-area-scrollbar-padding', '0', 'Controls scrollbar track padding.'],
  ['--scroll-area-scrollbar-radius', 'var(--radius-md)', 'Controls scrollbar track radius.'],
  ['--scroll-area-scrollbar-size', '0.375rem', 'Controls the scrollbar track thickness.'],
  ['--scroll-area-scrollbar-visible-opacity', '1', 'Controls visible scrollbar opacity.'],
  ['--scroll-area-thumb-bg', 'var(--color-border)', 'Controls the draggable thumb color.'],
  ['--scroll-area-thumb-min-size', '1.5rem', 'Controls the minimum draggable thumb size.'],
  ['--scroll-area-thumb-radius', 'var(--radius-full)', 'Controls the thumb border radius.'],
  ['--scroll-area-transition', 'var(--transition-default)', 'Controls scrollbar fade timing.'],
  ['--scroll-area-width', '100%', 'Controls the root width.'],
];

export function ScrollAreaCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={scrollAreaOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function ScrollAreaExample(props: ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea {...props} className={styles.root}>
      <div className={styles.textContent}>
        {insideScrollSections.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </div>
    </ScrollArea>
  );
}

export function BothScrollbarsScrollAreaExample() {
  return (
    <ScrollArea scrollbars="both" className={styles.sizedRoot}>
      <div className={styles.gridContent}>
        {Array.from({ length: 96 }, (_, index) => (
          <div key={index} className={styles.cell}>
            {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function GradientFadeScrollAreaExample() {
  return (
    <ScrollArea fade className={styles.sizedRoot}>
      <div className={styles.textContent}>
        {insideScrollSections.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </div>
    </ScrollArea>
  );
}

export function CustomCompositionScrollAreaExample() {
  return (
    <ScrollAreaRoot className={styles.customRoot} data-fade="both" overflowEdgeThreshold={28}>
      <ScrollAreaViewport className={styles.customViewport}>
        <ScrollAreaContent className={styles.customContent}>
          {Array.from({ length: 80 }, (_, index) => (
            <div key={index} className={styles.customCell}>
              {index + 1}
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar className={styles.customVerticalScrollbar} keepMounted>
        <ScrollAreaThumb className={styles.customVerticalThumb} />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal" className={styles.customHorizontalScrollbar}>
        <ScrollAreaThumb className={styles.customHorizontalThumb} />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner className={styles.customCorner} />
    </ScrollAreaRoot>
  );
}