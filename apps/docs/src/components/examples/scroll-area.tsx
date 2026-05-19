import { ScrollArea, type ScrollAreaProps } from 'moduix';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './scroll-area.module.css';

export const scrollAreaOverrideCssProperties: CssPropertyInput[] = [
  ['--scroll-area-bg', 'transparent', 'Controls the viewport background color.'],
  ['--scroll-area-color', 'var(--color-foreground)', 'Controls the root text color.'],
  ['--scroll-area-content-padding', 'var(--spacing-3)', 'Controls the content slot padding.'],
  ['--scroll-area-corner-bg', 'transparent', 'Controls the corner color for two-axis scrolling.'],
  ['--scroll-area-fade-end-size', 'var(--scroll-area-fade-size)', 'Controls vertical end fade.'],
  [
    '--scroll-area-fade-inline-end-size',
    'var(--scroll-area-fade-size)',
    'Controls horizontal end fade.',
  ],
  [
    '--scroll-area-fade-inline-start-size',
    'var(--scroll-area-fade-size)',
    'Controls horizontal start fade.',
  ],
  ['--scroll-area-fade-size', 'var(--spacing-10)', 'Controls the default fade size.'],
  [
    '--scroll-area-fade-start-size',
    'var(--scroll-area-fade-size)',
    'Controls vertical start fade.',
  ],
  [
    '--scroll-area-focus-ring-color',
    'var(--color-ring)',
    'Controls the viewport focus ring color.',
  ],
  ['--scroll-area-focus-ring-offset', '-1px', 'Controls the viewport focus ring offset.'],
  [
    '--scroll-area-focus-ring-width',
    'var(--border-width-sm)',
    'Controls the viewport focus ring width.',
  ],
  ['--scroll-area-height', '13rem', 'Controls the root height.'],
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
  ['--scroll-area-width', '24rem', 'Controls the root width.'],
];
export const scrollAreaPlaygroundCssProperties: CssPropertyInput[] = [
  ['--scroll-area-bg', 'transparent', 'Controls viewport background color.'],
  ['--scroll-area-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--scroll-area-content-padding', 'var(--spacing-3)', 'Controls content slot padding.'],
  ['--scroll-area-focus-ring-color', 'var(--color-ring)', 'Controls viewport focus ring color.'],
  ['--scroll-area-radius', 'var(--radius-md)', 'Controls viewport border radius.'],
  ['--scroll-area-scrollbar-bg', 'transparent', 'Controls scrollbar track background color.'],
  ['--scroll-area-thumb-bg', 'var(--color-border)', 'Controls draggable thumb color.'],
];

export function ScrollAreaCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={scrollAreaOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ScrollAreaCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={scrollAreaPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function ScrollAreaExample(props: ScrollAreaProps) {
  return (
    <ScrollArea {...props} className={styles.root} classNames={{ content: styles.textContent }}>
      {insideScrollSections.map((item) => (
        <section key={item.title}>
          <h3>{item.title}</h3>
          <p className={styles.paragraph}>{item.body}</p>
        </section>
      ))}
    </ScrollArea>
  );
}

export function BothScrollbarsScrollAreaExample() {
  return (
    <ScrollArea
      scrollbars="both"
      contentMinWidth="fit-content"
      className={styles.sizedRoot}
      classNames={{ content: styles.gridContent }}
    >
      {Array.from({ length: 96 }, (_, index) => (
        <div key={index} className={styles.cell}>
          {index + 1}
        </div>
      ))}
    </ScrollArea>
  );
}

export function GradientFadeScrollAreaExample() {
  return (
    <ScrollArea
      fade
      className={styles.sizedRoot}
      classNames={{ content: styles.paddedTextContent }}
    >
      {insideScrollSections.map((item) => (
        <section key={item.title}>
          <h3>{item.title}</h3>
          <p className={styles.paragraph}>{item.body}</p>
        </section>
      ))}
    </ScrollArea>
  );
}

export function OverflowEdgeThresholdScrollAreaExample() {
  return (
    <ScrollArea
      fade
      className={styles.sizedRoot}
      classNames={{ content: styles.compactTextContent }}
      overflowEdgeThreshold={28}
    >
      {insideScrollSections.map((item) => (
        <section key={item.title}>
          <h3>{item.title}</h3>
          <p className={styles.paragraph}>{item.body}</p>
        </section>
      ))}
    </ScrollArea>
  );
}

export function KeepMountedScrollAreaExample() {
  const [denseContent, setDenseContent] = React.useState(false);

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setDenseContent((value) => !value)}
      >
        Toggle overflow: {denseContent ? 'on' : 'off'}
      </button>

      <ScrollArea
        className={styles.sizedRoot}
        classNames={{ content: styles.compactTextContent }}
        scrollbarKeepMounted
      >
        {(denseContent ? insideScrollSections : insideScrollSections.slice(0, 2)).map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </ScrollArea>
    </div>
  );
}

export function CustomStylesScrollAreaExample() {
  return (
    <ScrollArea
      scrollbars="both"
      className={styles.customRoot}
      classNames={{
        viewport: styles.customViewport,
        content: styles.customContent,
        verticalScrollbar: styles.customVerticalScrollbar,
        horizontalScrollbar: styles.customHorizontalScrollbar,
        verticalThumb: styles.customVerticalThumb,
        horizontalThumb: styles.customHorizontalThumb,
        corner: styles.customCorner,
      }}
    >
      {Array.from({ length: 80 }, (_, index) => (
        <div key={index} className={styles.customCell}>
          {index + 1}
        </div>
      ))}
    </ScrollArea>
  );
}