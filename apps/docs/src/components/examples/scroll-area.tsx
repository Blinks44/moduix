import { ScrollArea, type ScrollAreaProps } from 'moduix';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CssPropertyInput } from '../preview';
import styles from './scroll-area.module.css';

export const scrollAreaCssProperties: CssPropertyInput[] = [
  ['--scroll-area-width', '24rem', 'Controls the root width.'],
  ['--scroll-area-height', '13rem', 'Controls the root height.'],
  ['--scroll-area-radius', 'var(--radius-md)', 'Controls the viewport border radius.'],
  ['--scroll-area-bg', 'transparent', 'Controls the viewport background color.'],
  ['--scroll-area-color', 'var(--color-foreground)', 'Controls the root text color.'],
  ['--scroll-area-content-padding', 'var(--spacing-3)', 'Controls the content slot padding.'],
  ['--scroll-area-fade-size', 'var(--spacing-10)', 'Controls the default fade size.'],
  [
    '--scroll-area-fade-start-size',
    'var(--scroll-area-fade-size)',
    'Controls vertical start fade.',
  ],
  ['--scroll-area-fade-end-size', 'var(--scroll-area-fade-size)', 'Controls vertical end fade.'],
  [
    '--scroll-area-fade-inline-start-size',
    'var(--scroll-area-fade-size)',
    'Controls horizontal start fade.',
  ],
  [
    '--scroll-area-fade-inline-end-size',
    'var(--scroll-area-fade-size)',
    'Controls horizontal end fade.',
  ],
  [
    '--scroll-area-focus-ring-color',
    'var(--color-ring)',
    'Controls the viewport focus ring color.',
  ],
  ['--scroll-area-corner-bg', 'transparent', 'Controls the corner color for two-axis scrolling.'],
  ['--scroll-area-scrollbar-bg', 'transparent', 'Controls the scrollbar track background color.'],
  ['--scroll-area-scrollbar-padding', '0', 'Controls scrollbar track padding.'],
  ['--scroll-area-scrollbar-size', '0.375rem', 'Controls the scrollbar track thickness.'],
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
  ['--scroll-area-scrollbar-radius', 'var(--radius-md)', 'Controls scrollbar track radius.'],
  ['--scroll-area-thumb-bg', 'var(--color-border)', 'Controls the draggable thumb color.'],
  ['--scroll-area-thumb-radius', 'var(--radius-full)', 'Controls the thumb border radius.'],
  ['--scroll-area-thumb-min-size', '1.5rem', 'Controls the minimum draggable thumb size.'],
  ['--scroll-area-transition', 'var(--transition-default)', 'Controls scrollbar fade timing.'],
];

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