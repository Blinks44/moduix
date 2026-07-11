import {
  Button,
  createSplitterRegistry,
  Splitter,
  type SplitterPanelData,
  useSplitter,
} from '@moduix/react';
import { useEffect, useRef, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './splitter.module.css';

const panels: SplitterPanelData[] = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

const threePanels: SplitterPanelData[] = [
  { id: 'a', minSize: 15 },
  { id: 'b', minSize: 15 },
  { id: 'c', minSize: 15 },
];

export const splitterNoData = `No external data is required.`;

export const splitterPanelsData = `const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];`;

export const splitterThreePanelsData = `const panels = [
  { id: 'a', minSize: 15 },
  { id: 'b', minSize: 15 },
  { id: 'c', minSize: 15 },
];`;

export const splitterCollapsibleData = `const panels = [
  { id: 'sidebar', minSize: 15, maxSize: 40, collapsible: true, collapsedSize: 5 },
  { id: 'content', minSize: 40 },
];`;

export const splitterNestedData = `const registry = createSplitterRegistry();

const horizontalPanels = [
  { id: 'left', minSize: 20 },
  { id: 'right', minSize: 20 },
];

const verticalPanels = [
  { id: 'top', minSize: 20 },
  { id: 'bottom', minSize: 20 },
];`;

export const splitterExampleCss = `
.splitter-demo {
  --splitter-width: min(56rem, 100%);
  --splitter-height: 28rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}
`;

export const splitterVerticalCss = `
.splitter-vertical {
  --splitter-width: min(34rem, 100%);
  --splitter-height: 28rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}

.splitter-vertical > .splitter-panel {
  min-height: 0;
}
`;

export const splitterStackCss = `
.splitter-stack {
  display: grid;
  gap: var(--spacing-4);
  width: min(56rem, 100%);
  min-width: min(42rem, 100%);
}

.splitter-demo {
  --splitter-width: min(56rem, 100%);
  --splitter-height: 28rem;
}

.splitter-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.splitter-status {
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}
`;

export const splitterNestedCss = `
.splitter-nested {
  --splitter-width: min(56rem, 100%);
  --splitter-height: 30rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}

.splitter-nested [data-orientation="vertical"] {
  --splitter-height: 100%;
  min-height: 0;
}

.splitter-nested [data-orientation="vertical"] > [data-slot="splitter-panel"] {
  min-height: 0;
}
`;

export const splitterBasicCode = `
import { Splitter } from "@moduix/react";

export function SplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[40, 60]} className="splitter-demo">
      <Splitter.Panel id="a" className="splitter-panel">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className="splitter-panel">
        B
      </Splitter.Panel>
    </Splitter>
  );
}
`;

export const splitterVerticalCode = `
import { Splitter } from "@moduix/react";

export function VerticalSplitterDemo() {
  return (
    <Splitter
      orientation="vertical"
      panels={panels}
      defaultSize={[45, 55]}
      className="splitter-vertical"
    >
      <Splitter.Panel id="a" className="splitter-panel">
        Top
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className="splitter-panel">
        Bottom
      </Splitter.Panel>
    </Splitter>
  );
}
`;

export const splitterControlledCode = `
import { Splitter } from "@moduix/react";
import { useState } from "react";

export function ControlledSplitterDemo() {
  const [size, setSize] = useState([30, 70]);

  return (
    <div className="splitter-stack">
      <Splitter
        panels={panels}
        size={size}
        onResize={(details) => setSize(details.size)}
        className="splitter-demo"
      >
        <Splitter.Panel id="a" className="splitter-panel">
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className="splitter-panel">
          B
        </Splitter.Panel>
      </Splitter>
      <output className="splitter-status">Sizes: {size.join(" / ")}</output>
    </div>
  );
}
`;

export const splitterCollapsibleCode = `
import { Splitter } from "@moduix/react";

export function CollapsibleSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[28, 72]} className="splitter-demo">
      <Splitter.Panel id="sidebar" className="splitter-panel">
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" className="splitter-panel">
        Content
      </Splitter.Panel>
    </Splitter>
  );
}
`;

export const splitterMultipleCode = `
import { Splitter } from "@moduix/react";

export function MultiplePanelsSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[25, 45, 30]} className="splitter-demo">
      <Splitter.Panel id="a" className="splitter-panel">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <Splitter.Panel id="b" className="splitter-panel">
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <Splitter.Panel id="c" className="splitter-panel">
        C
      </Splitter.Panel>
    </Splitter>
  );
}
`;

export const splitterRootProviderCode = `
import { Button, Splitter, useSplitter } from "@moduix/react";

export function RootProviderSplitterDemo() {
  const splitter = useSplitter({ panels, defaultSize: [50, 50] });

  return (
    <div className="splitter-stack">
      <div className="splitter-toolbar">
        <Button onClick={() => splitter.resetSizes()}>Reset</Button>
        <Button onClick={() => splitter.resizePanel("a", 25)}>Set A to 25%</Button>
      </div>
      <Splitter.RootProvider value={splitter} className="splitter-demo">
        <Splitter.Panel id="a" className="splitter-panel">
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className="splitter-panel">
          B
        </Splitter.Panel>
      </Splitter.RootProvider>
      <output className="splitter-status">Sizes: {splitter.getSizes().join(" / ")}</output>
    </div>
  );
}
`;

export const splitterDynamicCollapsibleCode = `
import { Splitter, useSplitter } from "@moduix/react";
import { useEffect, useRef, useState } from "react";

export function DynamicCollapsibleSplitterDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootSize, setRootSize] = useState<number | null>(null);
  const isCompact = rootSize != null && rootSize < 520;
  const splitter = useSplitter({
    panels: [
      { id: "sidebar", collapsible: isCompact, collapsedSize: 5, minSize: 18, maxSize: 40 },
      { id: "content", minSize: 40 },
    ],
    defaultSize: [30, 70],
  });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => setRootSize(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isCompact) splitter.collapsePanel("sidebar");
    else splitter.expandPanel("sidebar");
  }, [isCompact, splitter]);

  return (
    <Splitter.RootProvider ref={rootRef} value={splitter} className="splitter-demo">
      <Splitter.Panel id="sidebar" className="splitter-panel">
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" className="splitter-panel">
        Content
      </Splitter.Panel>
    </Splitter.RootProvider>
  );
}
`;

export const splitterNestedCode = `
import { createSplitterRegistry, Splitter } from "@moduix/react";
import { useState } from "react";

export function NestedSplitterDemo() {
  const [registry] = useState(() => createSplitterRegistry());

  return (
    <Splitter
      panels={horizontalPanels}
      defaultSize={[35, 65]}
      registry={registry}
      className="splitter-nested"
    >
      <Splitter.Panel id="left" className="splitter-panel">
        Left
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels" />
      <Splitter.Panel id="right">
        <Splitter
          orientation="vertical"
          panels={verticalPanels}
          defaultSize={[50, 50]}
          registry={registry}
        >
          <Splitter.Panel id="top" className="splitter-panel">
            Top
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
          <Splitter.Panel id="bottom" className="splitter-panel">
            Bottom
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
}
`;

export const splitterOverrideCssProperties: CssPropertyInput[] = [
  ['--splitter-height', '28rem', 'Controls the root height.'],
  ['--splitter-width', '100%', 'Controls the root width.'],
  ['--splitter-min-height', '0', 'Controls the root minimum height.'],
  ['--splitter-min-width', '0', 'Controls the root minimum width.'],
  ['--splitter-bg', 'var(--color-card)', 'Controls the root background.'],
  ['--splitter-border-color', 'var(--color-border)', 'Controls the root border color.'],
  ['--splitter-border-width', 'var(--border-width-sm)', 'Controls the root border width.'],
  ['--splitter-radius', 'var(--radius-md)', 'Controls the root corner radius.'],
  ['--splitter-shadow', 'var(--shadow-sm)', 'Controls the root shadow.'],
  ['--splitter-color', 'var(--color-foreground)', 'Controls default text color.'],
  ['--splitter-panel-bg', 'var(--color-card)', 'Controls panel background color.'],
  ['--splitter-panel-border-color', 'var(--color-border)', 'Controls panel border color.'],
  ['--splitter-panel-border-width', '0', 'Controls optional panel border width.'],
  ['--splitter-panel-color', 'var(--color-card-foreground)', 'Controls panel text color.'],
  ['--splitter-panel-min-height', '12.5rem', 'Controls panel minimum height.'],
  ['--splitter-panel-min-height-vertical', '0', 'Controls vertical panel minimum height.'],
  ['--splitter-panel-min-width', '0', 'Controls panel minimum width.'],
  ['--splitter-panel-padding', 'var(--spacing-4)', 'Controls panel padding.'],
  ['--splitter-panel-radius', '0', 'Controls optional panel corner radius.'],
  ['--splitter-panel-shadow', 'none', 'Controls optional panel shadow.'],
  ['--splitter-resize-trigger-bg', 'transparent', 'Controls the resize trigger background.'],
  ['--splitter-resize-trigger-size', '0.625rem', 'Controls the resize handle hit area.'],
  ['--splitter-resize-trigger-line-length', '100%', 'Controls the visible splitter line length.'],
  [
    '--splitter-resize-trigger-line-radius',
    'var(--radius-full)',
    'Controls the visible splitter line radius.',
  ],
  ['--splitter-resize-trigger-line-size', '1px', 'Controls the splitter layout divider size.'],
  [
    '--splitter-resize-trigger-line-thickness',
    '0.5px',
    'Controls the visual splitter line thickness without changing layout.',
  ],
  [
    '--splitter-resize-trigger-line-color',
    'var(--color-border)',
    'Controls the idle splitter line color.',
  ],
  [
    '--splitter-resize-trigger-line-color-dragging',
    'color-mix(in oklab, var(--splitter-resize-trigger-line-color, var(--color-border)) 72%, var(--color-muted-foreground))',
    'Controls the splitter line color while dragging.',
  ],
  [
    '--splitter-resize-trigger-line-color-hover',
    'color-mix(in oklab, var(--splitter-resize-trigger-line-color, var(--color-border)) 72%, var(--color-muted-foreground))',
    'Controls the splitter line color on hover.',
  ],
  [
    '--splitter-resize-trigger-indicator-bg',
    'var(--color-background)',
    'Controls the handle indicator background.',
  ],
  [
    '--splitter-resize-trigger-indicator-bg-dragging',
    'var(--splitter-resize-trigger-indicator-bg, var(--color-background))',
    'Controls the handle indicator background while dragging.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-color',
    'var(--color-border)',
    'Controls the handle indicator border color.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-width',
    'var(--border-width-sm)',
    'Controls the handle indicator border width.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-color-dragging',
    'var(--splitter-resize-trigger-indicator-border-color, var(--color-border))',
    'Controls the handle indicator border color while dragging.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-color-hover',
    'color-mix(in oklab, var(--splitter-resize-trigger-indicator-border-color, var(--color-border)) 72%, var(--color-muted-foreground))',
    'Controls the handle indicator border color on hover.',
  ],
  ['--splitter-resize-trigger-indicator-height', '1.5rem', 'Controls the handle indicator length.'],
  [
    '--splitter-resize-trigger-indicator-radius',
    'var(--radius-full)',
    'Controls the handle indicator radius.',
  ],
  [
    '--splitter-resize-trigger-indicator-shadow',
    'var(--shadow-sm)',
    'Controls the handle indicator shadow.',
  ],
  [
    '--splitter-resize-trigger-indicator-shadow-dragging',
    'var(--splitter-resize-trigger-indicator-shadow, var(--shadow-sm))',
    'Controls the handle indicator shadow while dragging.',
  ],
  [
    '--splitter-resize-trigger-indicator-shadow-hover',
    'var(--shadow-md)',
    'Controls the handle indicator shadow on hover.',
  ],
  [
    '--splitter-resize-trigger-indicator-width',
    '0.375rem',
    'Controls the handle indicator thickness.',
  ],
  ['--splitter-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--splitter-transition', 'var(--transition-default)', 'Controls splitter visual transitions.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if ('name' in property) return property;

  const [name, defaultValue, description] = property;

  return {
    name,
    defaultValue,
    description,
  };
}

export function BasicSplitterExample() {
  return (
    <Splitter panels={panels} defaultSize={[40, 60]} className={styles.demo}>
      <Splitter.Panel id="a" className={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className={styles.panel}>
        B
      </Splitter.Panel>
    </Splitter>
  );
}

export function VerticalSplitterExample() {
  return (
    <Splitter
      orientation="vertical"
      panels={panels}
      defaultSize={[45, 55]}
      className={styles.vertical}
    >
      <Splitter.Panel id="a" className={styles.panel}>
        Top
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className={styles.panel}>
        Bottom
      </Splitter.Panel>
    </Splitter>
  );
}

export function ControlledSplitterExample() {
  const [size, setSize] = useState([30, 70]);

  return (
    <div className={styles.stack}>
      <Splitter
        panels={panels}
        size={size}
        onResize={(details) => setSize(details.size)}
        className={styles.demo}
      >
        <Splitter.Panel id="a" className={styles.panel}>
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className={styles.panel}>
          B
        </Splitter.Panel>
      </Splitter>
      <output className={styles.status}>Sizes: {size.join(' / ')}</output>
    </div>
  );
}

export function CollapsibleSplitterExample() {
  return (
    <Splitter
      panels={[
        { id: 'sidebar', minSize: 15, maxSize: 40, collapsible: true, collapsedSize: 5 },
        { id: 'content', minSize: 40 },
      ]}
      defaultSize={[28, 72]}
      className={styles.demo}
    >
      <Splitter.Panel id="sidebar" className={styles.panel}>
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" className={styles.panel}>
        Content
      </Splitter.Panel>
    </Splitter>
  );
}

export function MultiplePanelsSplitterExample() {
  return (
    <Splitter panels={threePanels} defaultSize={[25, 45, 30]} className={styles.demo}>
      <Splitter.Panel id="a" className={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <Splitter.Panel id="b" className={styles.panel}>
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <Splitter.Panel id="c" className={styles.panel}>
        C
      </Splitter.Panel>
    </Splitter>
  );
}

export function RootProviderSplitterExample() {
  const splitter = useSplitter({ panels, defaultSize: [50, 50] });

  return (
    <div className={styles.stack}>
      <div className={styles.toolbar}>
        <Button onClick={() => splitter.resetSizes()}>Reset</Button>
        <Button onClick={() => splitter.resizePanel('a', 25)}>Set A to 25%</Button>
      </div>
      <Splitter.RootProvider value={splitter} className={styles.demo}>
        <Splitter.Panel id="a" className={styles.panel}>
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className={styles.panel}>
          B
        </Splitter.Panel>
      </Splitter.RootProvider>
      <output className={styles.status}>Sizes: {splitter.getSizes().join(' / ')}</output>
    </div>
  );
}

export function DynamicCollapsibleSplitterExample() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootSize, setRootSize] = useState<number | null>(null);
  const isCompact = rootSize != null && rootSize < 520;
  const splitter = useSplitter({
    panels: [
      { id: 'sidebar', collapsible: isCompact, collapsedSize: 5, minSize: 18, maxSize: 40 },
      { id: 'content', minSize: 40 },
    ],
    defaultSize: [30, 70],
  });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => setRootSize(entry.contentRect.width));
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isCompact) {
      splitter.collapsePanel('sidebar');
    } else {
      splitter.expandPanel('sidebar');
    }
  }, [isCompact, splitter]);

  return (
    <Splitter.RootProvider ref={rootRef} value={splitter} className={styles.demo}>
      <Splitter.Panel id="sidebar" className={styles.mutedPanel}>
        <span>Sidebar</span>
        <span className={styles.status}>{isCompact ? 'Collapsed' : 'Expanded'}</span>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" className={styles.panel}>
        Content
      </Splitter.Panel>
    </Splitter.RootProvider>
  );
}

export function NestedSplitterExample() {
  const [registry] = useState(() => createSplitterRegistry());

  return (
    <Splitter
      panels={[
        { id: 'left', minSize: 20 },
        { id: 'right', minSize: 20 },
      ]}
      defaultSize={[35, 65]}
      registry={registry}
      className={styles.nested}
    >
      <Splitter.Panel id="left" className={styles.panel}>
        Left
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels" />
      <Splitter.Panel id="right">
        <Splitter
          orientation="vertical"
          panels={[
            { id: 'top', minSize: 20 },
            { id: 'bottom', minSize: 20 },
          ]}
          defaultSize={[50, 50]}
          registry={registry}
        >
          <Splitter.Panel id="top" className={styles.panel}>
            Top
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
          <Splitter.Panel id="bottom" className={styles.panel}>
            Bottom
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
}

export function SplitterCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={splitterOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}