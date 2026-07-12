import type { TourStepDetails, UseTourReturn } from '@ark-ui/react/tour';
import type { ReactNode } from 'react';
import { Button, Tour, useTour, waitForElement, waitForEvent, waitForPromise } from '@moduix/react';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
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

export function TourExample() {
  const tour = useTour({ steps: createBasicSteps('tour-basic-upload') });

  return (
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <div className={styles.toolbar}>
        <Button id="tour-basic-upload" variant="outline">
          Upload
        </Button>
        <Button variant="outline">Save</Button>
      </div>
      <TourOverlay tour={tour} />
    </div>
  );
}

export function AdvancedCustomizationTourExample() {
  const tour = useTour({ steps: createBasicSteps('tour-advanced-upload') });

  return (
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start custom tour</Button>
      <Button id="tour-advanced-upload" variant="outline">
        Upload
      </Button>
      <Tour tour={tour} lazyMount unmountOnExit>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow />
            <Tour.CloseIcon />
            <Tour.Title />
            <Tour.Description />
            <Tour.ProgressText />
            <Tour.Control>
              <Tour.Actions>
                {(actions) =>
                  actions.map((action) => <Tour.ActionTrigger key={action.label} action={action} />)
                }
              </Tour.Actions>
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>
    </div>
  );
}

export function MixedTypesTourExample() {
  const tour = useTour({ steps: mixedSteps });

  return (
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start mixed tour</Button>
      <div id="tour-mixed-target" className={styles.target}>
        Target card
      </div>
      <TourOverlay tour={tour} />
    </div>
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
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start event tour</Button>
      <Button id="tour-events-upload" variant="outline">
        Upload
      </Button>
      <div className={styles.log} aria-live="polite">
        {logs.length ? logs.map((log) => <div key={log}>{log}</div>) : 'No events yet'}
      </div>
      <TourOverlay tour={tour} />
    </div>
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
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start keyboard tour</Button>
      <Button id="tour-keyboard-upload" variant="outline">
        Upload
      </Button>
      <p className={styles.note}>Use Left and Right arrow keys while the tour content has focus.</p>
      <TourOverlay tour={tour} />
    </div>
  );
}

export function ProgressTourExample() {
  const tour = useTour({ steps: progressSteps });

  return (
    <div className={styles.demo}>
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
    </div>
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
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start optional tour</Button>
      <div id="tour-skip-feature" className={styles.target}>
        Optional feature
      </div>
      <output className={styles.note}>Status: {status}</output>
      <TourOverlay tour={tour} />
    </div>
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
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start input tour</Button>
      <label className={styles.field}>
        Name
        <input id="tour-wait-name" className={styles.input} />
      </label>
      <TourOverlay tour={tour} />
    </div>
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
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start click tour</Button>
      <Button id="tour-wait-click" variant="outline">
        Confirm action
      </Button>
      <TourOverlay tour={tour} />
    </div>
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
    <div className={styles.demo}>
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
    </div>
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
    <div className={styles.demo}>
      <Button onClick={() => tour.start()}>Start async tour</Button>
      <div id="tour-async-target" className={styles.target}>
        Async target
      </div>
      <TourOverlay tour={tour} />
    </div>
  );
}

export const tourCssProperties: CssPropertyInput[] = [
  ['--tour-action-bg', 'var(--color-background)', 'Controls secondary action background.'],
  ['--tour-action-bg-hover', 'var(--color-accent)', 'Controls secondary action hover background.'],
  ['--tour-action-border-color', 'var(--color-border)', 'Controls secondary action border color.'],
  ['--tour-action-border-width', 'var(--border-width-sm)', 'Controls action border width.'],
  ['--tour-action-color', 'var(--color-foreground)', 'Controls secondary action text color.'],
  [
    '--tour-action-primary-bg',
    'var(--color-primary)',
    'Controls next and dismiss action background.',
  ],
  [
    '--tour-action-primary-color',
    'var(--color-primary-foreground)',
    'Controls next and dismiss action text color.',
  ],
  ['--tour-arrow-background', 'var(--tour-bg, var(--color-popover))', 'Controls arrow fill.'],
  ['--tour-arrow-size', '0.625rem', 'Controls Ark arrow size.'],
  ['--tour-arrow-stroke-color', 'var(--tour-border-color)', 'Controls arrow border color.'],
  ['--tour-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop color.'],
  ['--tour-bg', 'var(--color-popover)', 'Controls content background.'],
  ['--tour-border-color', 'var(--color-border)', 'Controls content border color.'],
  ['--tour-color', 'var(--color-popover-foreground)', 'Controls content foreground.'],
  ['--tour-dialog-width', '26rem', 'Controls dialog step width.'],
  ['--tour-floating-width', '22rem', 'Controls floating step width.'],
  ['--tour-max-height', '24rem', 'Controls content max height.'],
  ['--tour-max-width', 'calc(100vw - var(--spacing-8))', 'Controls content max width.'],
  ['--tour-padding', 'var(--spacing-5)', 'Controls content padding.'],
  ['--tour-radius', 'var(--radius-lg)', 'Controls content border radius.'],
  ['--tour-shadow', 'var(--shadow-lg)', 'Controls content shadow.'],
  ['--tour-title-font-size', 'var(--text-md)', 'Controls title font size.'],
  ['--tour-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--tour-progress-text-color', 'var(--color-muted-foreground)', 'Controls progress text color.'],
  ['--tour-z-index', 'var(--z-modal)', 'Controls tour layer z-index.'],
  ['--tour-action-font-size', 'var(--text-sm)', 'Controls action font size.'],
  ['--tour-action-font-weight', 'var(--weight-medium)', 'Controls action font weight.'],
  ['--tour-action-gap', 'var(--spacing-2)', 'Controls action content gap.'],
  ['--tour-action-height', '2rem', 'Controls action height.'],
  ['--tour-action-line-height', 'var(--line-height-text-sm)', 'Controls action line height.'],
  ['--tour-action-padding-x', '0.75rem', 'Controls action horizontal padding.'],
  ['--tour-action-padding-y', '0.375rem', 'Controls action vertical padding.'],
  [
    '--tour-action-primary-bg-hover',
    'color-mix(in oklab, var(--color-primary), black 12%)',
    'Controls primary action hover background.',
  ],
  [
    '--tour-action-primary-border-color',
    'var(--color-primary)',
    'Controls primary action border color.',
  ],
  [
    '--tour-action-primary-border-color-hover',
    'color-mix(in oklab, var(--color-primary), black 12%)',
    'Controls primary action hover border color.',
  ],
  ['--tour-action-radius', 'var(--radius-md)', 'Controls action border radius.'],
  ['--tour-action-transition', 'var(--transition-default)', 'Controls action transitions.'],
  ['--tour-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--tour-backdrop-ending-blur', 'none', 'Controls backdrop blur at the end of exit.'],
  ['--tour-backdrop-ending-opacity', '0', 'Controls backdrop opacity at the end of exit.'],
  ['--tour-backdrop-starting-blur', 'none', 'Controls backdrop blur at the start of enter.'],
  ['--tour-backdrop-starting-opacity', '0', 'Controls backdrop opacity at the start of enter.'],
  ['--tour-backdrop-transition', 'var(--transition-default)', 'Controls backdrop animation.'],
  ['--tour-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--tour-close-trigger-bg', 'transparent', 'Controls close trigger background.'],
  [
    '--tour-close-trigger-bg-hover',
    'var(--color-accent)',
    'Controls close trigger hover background.',
  ],
  ['--tour-close-trigger-color', 'var(--color-muted-foreground)', 'Controls close trigger color.'],
  [
    '--tour-close-trigger-color-hover',
    'var(--tour-color, var(--color-popover-foreground))',
    'Controls close trigger hover color.',
  ],
  ['--tour-close-trigger-icon-size', '0.875rem', 'Controls close trigger icon size.'],
  ['--tour-close-trigger-offset', 'var(--spacing-2)', 'Controls close trigger inset offset.'],
  ['--tour-close-trigger-radius', 'var(--radius-md)', 'Controls close trigger border radius.'],
  ['--tour-close-trigger-size', '1.75rem', 'Controls close trigger square size.'],
  ['--tour-content-ending-opacity', '0', 'Controls content opacity at the end of exit.'],
  [
    '--tour-content-ending-scale',
    'var(--scale-popup)',
    'Controls content scale at the end of exit.',
  ],
  ['--tour-content-ending-translate-x', '0', 'Controls content X offset at the end of exit.'],
  ['--tour-content-ending-translate-y', '0', 'Controls content Y offset at the end of exit.'],
  ['--tour-content-starting-opacity', '0', 'Controls content opacity at the start of enter.'],
  [
    '--tour-content-starting-scale',
    'var(--scale-popup)',
    'Controls content scale at the start of enter.',
  ],
  ['--tour-content-starting-translate-x', '0', 'Controls content X offset at the start of enter.'],
  ['--tour-content-starting-translate-y', '0', 'Controls content Y offset at the start of enter.'],
  ['--tour-control-gap', 'var(--spacing-2)', 'Controls action group gap.'],
  ['--tour-control-margin-top', 'var(--spacing-3)', 'Controls action group top margin.'],
  ['--tour-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--tour-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--tour-description-margin', '0', 'Controls description margin.'],
  ['--tour-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled action opacity.'],
  ['--tour-floating-offset', 'var(--spacing-6)', 'Controls floating step viewport offset.'],
  ['--tour-focus-ring-color', 'var(--color-ring)', 'Controls action and close focus ring color.'],
  [
    '--tour-focus-ring-width',
    'var(--border-width-sm)',
    'Controls action and close focus ring width.',
  ],
  ['--tour-gap', 'var(--spacing-1)', 'Controls content row gap.'],
  ['--tour-positioner-padding', 'var(--spacing-4)', 'Controls dialog positioner padding.'],
  ['--tour-progress-text-font-size', 'var(--text-xs)', 'Controls progress text font size.'],
  [
    '--tour-progress-text-line-height',
    'var(--line-height-text-xs)',
    'Controls progress text line height.',
  ],
  ['--tour-progress-text-margin-top', 'var(--spacing-2)', 'Controls progress text top margin.'],
  ['--tour-spotlight-ring-width', '2px', 'Controls spotlight ring width.'],
  [
    '--tour-spotlight-shadow',
    '0 0 0 var(--tour-spotlight-ring-width, 2px) var(--color-ring)',
    'Controls spotlight ring shadow.',
  ],
  [
    '--tour-title-color',
    'var(--tour-color, var(--color-popover-foreground))',
    'Controls title color.',
  ],
  ['--tour-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--tour-title-line-height', 'var(--line-height-text-md)', 'Controls title line height.'],
  ['--tour-title-margin', '0', 'Controls title margin.'],
  [
    '--tour-title-padding-inline-end',
    'var(--spacing-6)',
    'Reserves inline space for the close trigger.',
  ],
  ['--tour-transition', 'var(--transition-default)', 'Controls content animation duration.'],
  ['--tour-width', '20rem', 'Controls default content width.'],
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