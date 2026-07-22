import type { TourStepDetails, UseTourReturn } from '@ark-ui/react/tour';
import { Button, Tour, useTour, waitForElement, waitForEvent, waitForPromise } from '@moduix/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';
import styles from './tour.module.css';

const baseActions = [
  { label: 'Back', action: 'prev' as const },
  { label: 'Next', action: 'next' as const },
];

const createBasicSteps = (targetId: string): TourStepDetails[] => [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome to the workspace',
    description: 'Start with a dialog step, then move to a highlighted page control.',
    actions: [{ label: 'Start', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Upload files',
    description: 'Tooltip steps are anchored to target elements and can render an arrow.',
    target: () => document.querySelector<HTMLElement>(`#${targetId}`),
    actions: baseActions,
    backdrop: true,
    arrow: true,
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'You are ready',
    description: 'Dismiss the tour when the walkthrough is complete.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
    backdrop: true,
  },
];

const mixedSteps: TourStepDetails[] = [
  {
    id: 'dialog',
    type: 'dialog',
    title: 'Mixed step types',
    description: 'Tours can combine dialog, tooltip, and floating steps.',
    actions: [{ label: 'Next', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'tooltip',
    type: 'tooltip',
    title: 'Anchored tooltip',
    description: 'This step follows the target card.',
    target: () => document.querySelector<HTMLElement>('#tour-mixed-target'),
    actions: baseActions,
    arrow: true,
  },
  {
    id: 'floating',
    type: 'floating',
    placement: 'bottom-end',
    title: 'Floating note',
    description: 'Floating steps sit in the viewport without a target.',
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Done', action: 'dismiss' },
    ],
  },
];

const progressSteps: TourStepDetails[] = ['plan', 'review', 'ship'].map((id, index) => ({
  id,
  type: 'tooltip',
  title: `Step ${index + 1}`,
  description: 'Progress can be rendered from the tour API.',
  target: () => document.querySelector<HTMLElement>(`#tour-progress-${id}`),
  actions:
    index === 0
      ? [{ label: 'Next', action: 'next' }]
      : index === 2
        ? [
            { label: 'Back', action: 'prev' },
            { label: 'Finish', action: 'dismiss' },
          ]
        : baseActions,
  arrow: true,
}));

const skipSteps: TourStepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Optional walkthrough',
    description: 'Use a dismiss action when the tour is helpful but not required.',
    actions: [
      { label: 'Skip tour', action: 'dismiss' },
      { label: 'Continue', action: 'next' },
    ],
    backdrop: true,
  },
  {
    id: 'feature',
    type: 'tooltip',
    title: 'Primary feature',
    description: 'The second step is only shown when the user continues.',
    target: () => document.querySelector<HTMLElement>('#tour-skip-feature'),
    actions: [{ label: 'Done', action: 'dismiss' }],
    arrow: true,
  },
];

function TourOverlay({ children, tour }: { children?: ReactNode; tour: UseTourReturn }) {
  return (
    <Tour tour={tour} lazyMount unmountOnExit>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow />
          <Tour.CloseIcon />
          <Tour.Title />
          <Tour.Description />
          {children}
          <Tour.ProgressText />
          <Tour.Control>
            <Tour.ActionList />
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Tour>
  );
}

export function MixedTypesTourExample() {
  const tour = useTour({ steps: mixedSteps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start mixed tour</Button>
      <div id="tour-mixed-target" className={styles.target}>
        Target card
      </div>
      <TourOverlay tour={tour} />
    </>
  );
}

export function EventsTourExample() {
  const [logs, setLogs] = useState<string[]>([]);
  const tour = useTour({
    steps: createBasicSteps('tour-events-upload'),
    onStepChange: (details) => {
      setLogs((items) => [`step: ${details.stepId ?? 'none'}`, ...items].slice(0, 4));
    },
    onStatusChange: (details) => {
      setLogs((items) => [`status: ${details.status}`, ...items].slice(0, 4));
    },
  });

  return (
    <>
      <Button onClick={() => tour.start()}>Start event tour</Button>
      <Button id="tour-events-upload" variant="outline">
        Upload
      </Button>
      <div className={styles.log} aria-live="polite">
        {logs.length ? logs.map((log) => <div key={log}>{log}</div>) : 'No events yet'}
      </div>
      <TourOverlay tour={tour} />
    </>
  );
}

export function KeyboardTourExample() {
  const tour = useTour({
    steps: createBasicSteps('tour-keyboard-upload'),
    translations: {
      progressText: ({ current, total }) => `${current + 1} / ${total}`,
    },
  });

  return (
    <>
      <Button onClick={() => tour.start()}>Start keyboard tour</Button>
      <Button id="tour-keyboard-upload" variant="outline">
        Upload
      </Button>
      <p className={styles.note}>Use Left and Right arrow keys while the tour content has focus.</p>
      <TourOverlay tour={tour} />
    </>
  );
}

export function ProgressTourExample() {
  const tour = useTour({ steps: progressSteps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start progress tour</Button>
      <div className={styles.toolbar}>
        {['plan', 'review', 'ship'].map((item) => (
          <div key={item} id={`tour-progress-${item}`} className={styles.pill}>
            {item}
          </div>
        ))}
      </div>
      <TourOverlay tour={tour}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${tour.getProgressPercent()}%` }} />
        </div>
      </TourOverlay>
    </>
  );
}

export function SkipTourExample() {
  const [status, setStatus] = useState('idle');
  const tour = useTour({
    steps: skipSteps,
    onStatusChange: (details) => {
      setStatus(details.status);
    },
  });

  return (
    <>
      <Button onClick={() => tour.start()}>Start optional tour</Button>
      <div id="tour-skip-feature" className={styles.target}>
        Optional feature
      </div>
      <output className={styles.note}>Status: {status}</output>
      <TourOverlay tour={tour} />
    </>
  );
}

export function WaitForInputTourExample() {
  const tour = useTour({
    steps: [
      {
        id: 'name',
        type: 'tooltip',
        title: 'Enter a name',
        description: 'The next step starts after the input contains at least two characters.',
        target: () => document.querySelector<HTMLInputElement>('#tour-wait-name'),
        effect({ next, show, target }) {
          show();
          const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
            predicate: (element) => element.value.trim().length >= 2,
          });
          promise.then(() => next());
          return cancel;
        },
        arrow: true,
      },
      {
        id: 'done',
        type: 'dialog',
        title: 'Input complete',
        description: 'Wait helpers let tours react to real page interaction.',
        actions: [{ label: 'Done', action: 'dismiss' }],
        backdrop: true,
      },
    ],
  });

  return (
    <>
      <Button onClick={() => tour.start()}>Start input tour</Button>
      <label className={styles.field}>
        Name
        <input id="tour-wait-name" className={styles.input} />
      </label>
      <TourOverlay tour={tour} />
    </>
  );
}

export function WaitForClickTourExample() {
  const tour = useTour({
    steps: [
      {
        id: 'click-target',
        type: 'tooltip',
        title: 'Click the target',
        description: 'The tour advances after the highlighted button is clicked.',
        target: () => document.querySelector<HTMLButtonElement>('#tour-wait-click'),
        effect({ next, show, target }) {
          show();
          const [promise, cancel] = waitForEvent<HTMLButtonElement>(target, 'click');
          promise.then(() => next());
          return cancel;
        },
        arrow: true,
      },
      {
        id: 'done',
        type: 'dialog',
        title: 'Click captured',
        description: 'Use wait helpers when a step should react to page interaction.',
        actions: [{ label: 'Done', action: 'dismiss' }],
        backdrop: true,
      },
    ],
  });

  return (
    <>
      <Button onClick={() => tour.start()}>Start click tour</Button>
      <Button id="tour-wait-click" variant="outline">
        Confirm action
      </Button>
      <TourOverlay tour={tour} />
    </>
  );
}

export function WaitForElementTourExample() {
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  const tour = useTour({
    steps: [
      {
        id: 'add-item',
        type: 'tooltip',
        title: 'Add an item',
        description: 'Click the button to create a new list item.',
        target: () => document.querySelector<HTMLButtonElement>('#tour-add-item'),
        effect({ next, show, target }) {
          show();
          const [promise, cancel] = waitForEvent<HTMLButtonElement>(target, 'click');
          promise.then(() => next());
          return cancel;
        },
        arrow: true,
      },
      {
        id: 'new-item',
        type: 'tooltip',
        title: 'New item added',
        description: 'This step waits until the new item exists in the document.',
        target: () => document.querySelector<HTMLElement>('[data-tour-new-item]'),
        effect({ show }) {
          const [promise, cancel] = waitForElement(
            () => document.querySelector<HTMLElement>('[data-tour-new-item]'),
            { timeout: 5000 },
          );
          promise.then(() => show());
          return cancel;
        },
        actions: [{ label: 'Done', action: 'dismiss' }],
        arrow: true,
      },
    ],
  });

  return (
    <>
      <Button
        onClick={() => {
          setItems(['Item 1', 'Item 2']);
          tour.start();
        }}
      >
        Start element tour
      </Button>
      <Button
        id="tour-add-item"
        variant="outline"
        onClick={() => setItems((value) => [...value, `Item ${value.length + 1}`])}
      >
        Add item
      </Button>
      <div className={styles.list}>
        {items.map((item, index) => (
          <div
            key={item}
            className={styles.listItem}
            data-tour-new-item={index === items.length - 1 && items.length > 2 ? '' : undefined}
          >
            {item}
          </div>
        ))}
      </div>
      <TourOverlay tour={tour} />
    </>
  );
}

export function AsyncStepTourExample() {
  const tour = useTour({
    steps: [
      {
        id: 'intro',
        type: 'dialog',
        title: 'Async step',
        description: 'The next step waits for a promise before it appears.',
        actions: [{ label: 'Load details', action: 'next' }],
        backdrop: true,
      },
      {
        id: 'details',
        type: 'tooltip',
        title: 'Loading...',
        description: 'Preparing the step content.',
        target: () => document.querySelector<HTMLElement>('#tour-async-target'),
        effect({ show, update }) {
          const controller = new AbortController();
          const [promise, cancel] = waitForPromise(
            new Promise<{ title: string; description: string }>((resolve) => {
              window.setTimeout(
                () =>
                  resolve({
                    title: 'Async content ready',
                    description: 'The step was updated before being shown.',
                  }),
                500,
              );
            }),
            controller,
            1500,
          );
          promise.then((details) => {
            update(details);
            show();
          });
          return cancel;
        },
        actions: [{ label: 'Done', action: 'dismiss' }],
        arrow: true,
      },
    ],
  });

  return (
    <>
      <Button onClick={() => tour.start()}>Start async tour</Button>
      <div id="tour-async-target" className={styles.target}>
        Async target
      </div>
      <TourOverlay tour={tour} />
    </>
  );
}

const tourCssProperties: CssPropertyInput[] = [
  [
    '--moduix-tour-action-bg',
    'var(--moduix-color-background)',
    'Controls secondary action background.',
  ],
  [
    '--moduix-tour-action-bg-hover',
    'var(--moduix-color-accent)',
    'Controls secondary action hover background.',
  ],
  [
    '--moduix-tour-action-border-color',
    'var(--moduix-color-border)',
    'Controls secondary action border color.',
  ],
  [
    '--moduix-tour-action-border-width',
    'var(--moduix-border-width-sm)',
    'Controls action border width.',
  ],
  [
    '--moduix-tour-action-color',
    'var(--moduix-color-foreground)',
    'Controls secondary action text color.',
  ],
  [
    '--moduix-tour-action-primary-bg',
    'var(--moduix-color-primary)',
    'Controls next and dismiss action background.',
  ],
  [
    '--moduix-tour-action-primary-color',
    'var(--moduix-color-primary-foreground)',
    'Controls next and dismiss action text color.',
  ],
  [
    '--moduix-tour-arrow-background',
    'var(--moduix-tour-bg, var(--moduix-color-popover))',
    'Controls arrow fill.',
  ],
  ['--moduix-tour-arrow-size', 'var(--moduix-spacing-2-5)', 'Controls Ark arrow size.'],
  [
    '--moduix-tour-arrow-stroke-color',
    'var(--moduix-tour-border-color, var(--moduix-color-border))',
    'Controls arrow border color.',
  ],
  [
    '--moduix-tour-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Controls backdrop color.',
  ],
  ['--moduix-tour-bg', 'var(--moduix-color-popover)', 'Controls content background.'],
  ['--moduix-tour-border-color', 'var(--moduix-color-border)', 'Controls content border color.'],
  ['--moduix-tour-color', 'var(--moduix-color-popover-foreground)', 'Controls content foreground.'],
  ['--moduix-tour-dialog-width', '26rem', 'Controls dialog step width.'],
  ['--moduix-tour-floating-width', '22rem', 'Controls floating step width.'],
  ['--moduix-tour-max-height', '24rem', 'Controls content max height.'],
  [
    '--moduix-tour-max-width',
    'calc(100vw - var(--moduix-spacing-8))',
    'Controls content max width.',
  ],
  ['--moduix-tour-padding', 'var(--moduix-spacing-5)', 'Controls content padding.'],
  ['--moduix-tour-radius', 'var(--moduix-radius-lg)', 'Controls content border radius.'],
  ['--moduix-tour-shadow', 'var(--moduix-shadow-lg)', 'Controls content shadow.'],
  ['--moduix-tour-title-font-size', 'var(--moduix-text-md)', 'Controls title font size.'],
  [
    '--moduix-tour-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls description color.',
  ],
  [
    '--moduix-tour-progress-text-color',
    'var(--moduix-color-muted-foreground)',
    'Controls progress text color.',
  ],
  ['--moduix-tour-z-index', 'var(--moduix-z-modal)', 'Controls tour layer z-index.'],
  ['--moduix-tour-action-font-size', 'var(--moduix-text-sm)', 'Controls action font size.'],
  [
    '--moduix-tour-action-font-weight',
    'var(--moduix-weight-medium)',
    'Controls action font weight.',
  ],
  ['--moduix-tour-action-gap', 'var(--moduix-spacing-2)', 'Controls action content gap.'],
  ['--moduix-tour-action-height', 'var(--moduix-size-sm)', 'Controls action height.'],
  [
    '--moduix-tour-action-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls action line height.',
  ],
  [
    '--moduix-tour-action-padding-x',
    'var(--moduix-spacing-3)',
    'Controls action horizontal padding.',
  ],
  [
    '--moduix-tour-action-padding-y',
    'var(--moduix-spacing-1-5)',
    'Controls action vertical padding.',
  ],
  [
    '--moduix-tour-action-primary-bg-hover',
    'color-mix(in oklab, var(--moduix-color-primary), black 12%)',
    'Controls primary action hover background.',
  ],
  [
    '--moduix-tour-action-primary-border-color',
    'var(--moduix-color-primary)',
    'Controls primary action border color.',
  ],
  [
    '--moduix-tour-action-primary-border-color-hover',
    'color-mix(in oklab, var(--moduix-color-primary), black 12%)',
    'Controls primary action hover border color.',
  ],
  ['--moduix-tour-action-radius', 'var(--moduix-radius-md)', 'Controls action border radius.'],
  [
    '--moduix-tour-action-transition',
    'var(--moduix-transition-default)',
    'Controls action transitions.',
  ],
  ['--moduix-tour-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--moduix-tour-backdrop-ending-blur', 'none', 'Controls backdrop blur at the end of exit.'],
  ['--moduix-tour-backdrop-ending-opacity', '0', 'Controls backdrop opacity at the end of exit.'],
  ['--moduix-tour-backdrop-starting-blur', 'none', 'Controls backdrop blur at the start of enter.'],
  [
    '--moduix-tour-backdrop-starting-opacity',
    '0',
    'Controls backdrop opacity at the start of enter.',
  ],
  [
    '--moduix-tour-backdrop-transition',
    'var(--moduix-transition-default)',
    'Controls backdrop animation.',
  ],
  ['--moduix-tour-border-width', 'var(--moduix-border-width-sm)', 'Controls content border width.'],
  ['--moduix-tour-close-trigger-bg', 'transparent', 'Controls close trigger background.'],
  [
    '--moduix-tour-close-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls close trigger hover background.',
  ],
  [
    '--moduix-tour-close-trigger-color',
    'var(--moduix-color-muted-foreground)',
    'Controls close trigger color.',
  ],
  [
    '--moduix-tour-close-trigger-color-hover',
    'var(--moduix-tour-color, var(--moduix-color-popover-foreground))',
    'Controls close trigger hover color.',
  ],
  [
    '--moduix-tour-close-trigger-icon-size',
    'var(--moduix-spacing-3)',
    'Controls close trigger icon size.',
  ],
  [
    '--moduix-tour-close-trigger-offset',
    'var(--moduix-spacing-4)',
    'Controls close trigger inset offset.',
  ],
  [
    '--moduix-tour-close-trigger-radius',
    'var(--moduix-radius-md)',
    'Controls close trigger border radius.',
  ],
  [
    '--moduix-tour-close-trigger-size',
    'var(--moduix-spacing-7)',
    'Controls close trigger square size.',
  ],
  ['--moduix-tour-content-ending-opacity', '0', 'Controls content opacity at the end of exit.'],
  [
    '--moduix-tour-content-ending-scale',
    'var(--moduix-scale-popup)',
    'Controls content scale at the end of exit.',
  ],
  [
    '--moduix-tour-content-ending-translate-x',
    '0',
    'Controls content X offset at the end of exit.',
  ],
  [
    '--moduix-tour-content-ending-translate-y',
    '0',
    'Controls content Y offset at the end of exit.',
  ],
  [
    '--moduix-tour-content-starting-opacity',
    '0',
    'Controls content opacity at the start of enter.',
  ],
  [
    '--moduix-tour-content-starting-scale',
    'var(--moduix-scale-popup)',
    'Controls content scale at the start of enter.',
  ],
  [
    '--moduix-tour-content-starting-translate-x',
    '0',
    'Controls content X offset at the start of enter.',
  ],
  [
    '--moduix-tour-content-starting-translate-y',
    '0',
    'Controls content Y offset at the start of enter.',
  ],
  ['--moduix-tour-control-gap', 'var(--moduix-spacing-2)', 'Controls action group gap.'],
  [
    '--moduix-tour-control-margin-top',
    'var(--moduix-spacing-3)',
    'Controls action group top margin.',
  ],
  [
    '--moduix-tour-description-font-size',
    'var(--moduix-text-sm)',
    'Controls description font size.',
  ],
  [
    '--moduix-tour-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--moduix-tour-description-margin', '0', 'Controls description margin.'],
  [
    '--moduix-tour-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled action opacity.',
  ],
  [
    '--moduix-tour-floating-offset',
    'var(--moduix-spacing-6)',
    'Controls floating step viewport offset.',
  ],
  [
    '--moduix-tour-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls action and close focus ring color.',
  ],
  [
    '--moduix-tour-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls action and close focus ring width.',
  ],
  ['--moduix-tour-gap', 'var(--moduix-spacing-1)', 'Controls content row gap.'],
  [
    '--moduix-tour-positioner-padding',
    'var(--moduix-spacing-4)',
    'Controls dialog positioner padding.',
  ],
  [
    '--moduix-tour-progress-text-font-size',
    'var(--moduix-text-xs)',
    'Controls progress text font size.',
  ],
  [
    '--moduix-tour-progress-text-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls progress text line height.',
  ],
  [
    '--moduix-tour-progress-text-margin-top',
    'var(--moduix-spacing-2)',
    'Controls progress text top margin.',
  ],
  ['--moduix-tour-spotlight-ring-width', '2px', 'Controls spotlight ring width.'],
  [
    '--moduix-tour-spotlight-shadow',
    '0 0 0 var(--moduix-tour-spotlight-ring-width, 2px) var(--moduix-color-ring)',
    'Controls spotlight ring shadow.',
  ],
  [
    '--moduix-tour-title-color',
    'var(--moduix-tour-color, var(--moduix-color-popover-foreground))',
    'Controls title color.',
  ],
  [
    '--moduix-tour-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls title font weight.',
  ],
  [
    '--moduix-tour-title-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls title line height.',
  ],
  ['--moduix-tour-title-margin', '0', 'Controls title margin.'],
  [
    '--moduix-tour-title-padding-inline-end',
    'var(--moduix-spacing-6)',
    'Reserves inline space for the close trigger.',
  ],
  [
    '--moduix-tour-transition',
    'var(--moduix-transition-default)',
    'Controls content animation duration.',
  ],
  ['--moduix-tour-width', '20rem', 'Controls default content width.'],
];

export function TourCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={tourCssProperties.map((property) => {
        if (!('name' in property))
          return { name: property[0], defaultValue: property[1], description: property[2] };
        return property;
      })}
    />
  );
}