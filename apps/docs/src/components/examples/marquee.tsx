import type { ComponentProps } from 'react';
import { Button, Marquee, useMarquee } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './marquee.module.css';

export const marqueeExampleCss = `
  .marquee-root {
    --marquee-width: 32rem;
    max-width: calc(100vw - 2rem);
  }

  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    min-width: max-content;
    padding: var(--spacing-2) var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-foreground);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    line-height: var(--line-height-text-sm);
    white-space: nowrap;
  }

  .marquee-stack {
    display: grid;
    gap: var(--spacing-3);
  }

  .marquee-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    justify-content: flex-end;
  }

  .marquee-status {
    display: flex;
    gap: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const marqueeVerticalCss = `
  .marquee-vertical {
    --marquee-width: 14rem;
    --marquee-vertical-height: 18rem;
    max-width: calc(100vw - 2rem);
  }

  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    min-width: max-content;
    padding: var(--spacing-2) var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-foreground);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    line-height: var(--line-height-text-sm);
    white-space: nowrap;
  }
`;

export const marqueeCustomStylingCss = `
  .marquee-custom {
    --marquee-width: 34rem;
    --marquee-edge-size: 25%;
    --marquee-edge-color: var(--color-card);
    padding-block: var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-card);
  }

  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    min-width: max-content;
    padding: var(--spacing-2) var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-foreground);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    line-height: var(--line-height-text-sm);
    white-space: nowrap;
  }

  .marquee-custom [data-slot="marquee-item"] {
    border-color: color-mix(in srgb, var(--color-primary) 30%, var(--color-border));
    background-color: color-mix(in srgb, var(--color-primary) 10%, var(--color-card));
  }
`;

export const marqueeData = `const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];`;

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

export const marqueeCssProperties: CssPropertyInput[] = [
  ['--marquee-color', 'var(--color-foreground)', 'Controls root text color.'],
  [
    '--marquee-delay',
    'computed from `delay` (default `0s`)',
    'Runtime value from Ark that controls animation start delay.',
  ],
  [
    '--marquee-duration',
    'computed from content size and `speed` (default `50`)',
    'Runtime value from Ark that controls animation duration.',
  ],
  ['--marquee-edge-color', 'var(--color-background)', 'Controls edge fade start color.'],
  ['--marquee-edge-size', '20%', 'Controls edge fade width or height.'],
  ['--marquee-edge-z-index', '1', 'Controls edge overlay stacking.'],
  ['--marquee-height', 'auto', 'Controls root height for horizontal marquees.'],
  [
    '--marquee-loop-count',
    'computed from `loopCount` (default `0` = infinite)',
    'Runtime value from Ark that controls animation iteration count.',
  ],
  [
    '--marquee-spacing',
    'computed from `spacing` (default `1rem`)',
    'Runtime value from Ark that spaces repeated content instances and items.',
  ],
  [
    '--marquee-translate',
    'computed from measured content size and `side`',
    'Runtime value from Ark that drives the keyframe translate distance.',
  ],
  ['--marquee-vertical-height', '15rem', 'Controls root height for vertical marquees.'],
  ['--marquee-width', '100%', 'Controls root width.'],
];

const marqueeCssPropertiesReference = marqueeCssProperties.map(normalizeCssProperty);

export function MarqueeCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={marqueeCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function MarqueeItems() {
  return (
    <>
      {partners.map((item) => (
        <Marquee.Item key={item.name} className={styles.item}>
          <span className={styles.mark}>{item.mark}</span>
          <span>{item.name}</span>
        </Marquee.Item>
      ))}
    </>
  );
}

export function MarqueeExample(props: ComponentProps<typeof Marquee.Root>) {
  return (
    <Marquee
      aria-label="Partner logos"
      translations={{ root: 'Partner logos' }}
      className={styles.root}
      {...props}
    >
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>
  );
}

export function AutoFillMarqueeExample() {
  return <MarqueeExample autoFill spacing="2rem" />;
}

export function ReverseMarqueeExample() {
  return <MarqueeExample reverse />;
}

export function VerticalMarqueeExample() {
  return (
    <Marquee
      aria-label="Partner logos"
      translations={{ root: 'Partner logos' }}
      side="bottom"
      className={styles.verticalRoot}
    >
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>
  );
}

export function SpeedMarqueeExample() {
  return (
    <div className={styles.stack}>
      <MarqueeExample speed={25} />
      <MarqueeExample speed={100} />
    </div>
  );
}

export function PauseOnInteractionMarqueeExample() {
  return <MarqueeExample pauseOnInteraction />;
}

export function ProgrammaticMarqueeExample() {
  const marquee = useMarquee({ translations: { root: 'Partner logos' } });

  return (
    <div className={styles.providerStack}>
      <div className={styles.actions}>
        <Button size="sm" variant="outline" onClick={() => marquee.pause()}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee.resume()}>
          Resume
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee.restart()}>
          Restart
        </Button>
      </div>
      <Marquee.RootProvider value={marquee} className={styles.root}>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>
    </div>
  );
}

export function FiniteLoopsMarqueeExample() {
  const [loopCount, setLoopCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);

  return (
    <div className={styles.providerStack}>
      <MarqueeExample
        loopCount={3}
        onLoopComplete={() => setLoopCount((value) => value + 1)}
        onComplete={() => setCompleteCount((value) => value + 1)}
      />
      <div className={styles.status}>
        <span>Loops: {loopCount}</span>
        <span>Completed: {completeCount}</span>
      </div>
    </div>
  );
}

export function EdgesMarqueeExample() {
  return (
    <Marquee
      aria-label="Partner logos"
      translations={{ root: 'Partner logos' }}
      className={styles.root}
    >
      <Marquee.Edge side="start" />
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" />
    </Marquee>
  );
}

export function CustomStylingMarqueeExample() {
  return (
    <Marquee
      aria-label="Partner logos"
      translations={{ root: 'Partner logos' }}
      autoFill
      pauseOnInteraction
      className={styles.customRoot}
    >
      <Marquee.Edge side="start" />
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" />
    </Marquee>
  );
}