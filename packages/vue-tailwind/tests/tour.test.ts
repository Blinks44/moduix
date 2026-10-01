import {
  TourContent as ArkTourContent,
  TourDescription as ArkTourDescription,
  TourPositioner as ArkTourPositioner,
  TourRoot as ArkTourRoot,
  TourTitle as ArkTourTitle,
} from '@ark-ui/vue/tour';
import type { TourStepDetails } from '@ark-ui/vue/tour';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Tour,
  TourActionList,
  TourActionTrigger,
  TourActions,
  TourArrow,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourContent,
  TourControl,
  TourContext,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
  useTour,
} from '../src';

Object.defineProperty(globalThis, 'visualViewport', {
  value: {
    width: 1024,
    addEventListener: () => {},
    removeEventListener: () => {},
  },
});

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Start the tour.',
    actions: [
      { label: 'Continue', action: 'next' },
      { label: 'Continue', action: 'dismiss' },
    ],
    arrow: true,
    backdrop: true,
  },
] satisfies TourStepDetails[];

const tourComponents = {
  Tour,
  TourActionList,
  TourActionTrigger,
  TourActions,
  TourArrow,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourContent,
  TourControl,
  TourContext,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
};

const StyledTourExample = defineComponent({
  components: tourComponents,
  setup() {
    return { tour: useTour({ steps }) };
  },
  template: `
    <button type="button" @click="tour.start()">Start styled tour</button>
    <Tour :tour="tour" :portalled="false" lazy-mount unmount-on-exit>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
          <TourContent class="w-96 bg-card p-4">
          <TourArrow />
          <TourCloseIcon class="size-8 rounded-full bg-primary" />
          <TourBody>
            <TourTitle class="text-xl">Welcome</TourTitle>
            <TourDescription class="text-base">Start the tour.</TourDescription>
            <TourProgressText />
          </TourBody>
          <TourControl><TourActionList /></TourControl>
        </TourContent>
      </TourPositioner>
    </Tour>
  `,
});

test('renders the inline anatomy, fallback content, refs, and Tailwind classes', async () => {
  const positionerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { contentRef, positionerRef, tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start tour</button>
      <Tour :tour="tour" :portalled="false">
        <TourBackdrop />
        <TourPositioner ref="positionerRef">
          <TourContent ref="contentRef" class="consumer-content">
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </TourBody>
            <TourControl><TourActionList class="consumer-action" /></TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));

  const content = await screen.findByRole('alertdialog', { name: 'Welcome' });
  expect(content).toHaveAttribute('data-slot', 'tour-content');
  expect(content).toHaveClass('consumer-content');
  expect(content).toHaveClass('rounded-lg');
  expect(content.querySelector('[data-slot="tour-body"]')).toHaveClass('overflow-auto');
  expect(document.querySelector('[data-slot="tour-backdrop"]')).toBeInTheDocument();
  const action = screen.getAllByText('Continue')[0];
  expect(action).toHaveClass('consumer-action');
  expect(action.className.trim().endsWith('consumer-action')).toBe(true);
  expect(positionerRef.value?.$el).toHaveAttribute('data-slot', 'tour-positioner');
  expect(contentRef.value?.$el).toBe(content);
});

test('portals overlay parts by default and keeps duplicate actions distinct', async () => {
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { tour: useTour({ steps }) };
    },
    template: `
      <div data-testid="tour-host">
        <button type="button" @click="tour.start()">Start tour</button>
        <Tour :tour="tour" lazy-mount unmount-on-exit>
          <TourBackdrop />
          <TourPositioner><TourContent><TourTitle /><TourActionList /></TourContent></TourPositioner>
        </Tour>
      </div>
    `,
  });

  const { container } = render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));
  const content = await screen.findByRole('alertdialog', { name: 'Welcome' });
  expect(container).not.toContainElement(content);
  const actions = screen.getAllByText('Continue');
  expect(actions).toHaveLength(2);
  expect(actions[0]).toBeDisabled();
  expect(actions[1]).not.toBeDisabled();
});

test('preserves Ark action behavior for custom Vue markup with asChild', async () => {
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start custom action tour</button>
        <Tour :tour="tour" :portalled="false">
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <TourControl>
              <TourActions v-slot="actions">
                <TourActionTrigger
                  v-for="(action, index) in actions"
                  :key="action.label + index"
                  :action="action"
                  as-child
                >
                  <button type="button">{{ action.label }}</button>
                </TourActionTrigger>
              </TourActions>
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Start custom action tour' }));
  const actions = await screen.findAllByText('Continue');
  expect(actions[0]).toHaveAttribute('data-slot', 'tour-action-trigger');
  expect(actions[0]).toBeDisabled();
  expect(actions[1]).not.toBeDisabled();
});

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  render(StyledTourExample);
  await fireEvent.click(screen.getByRole('button', { name: 'Start styled tour' }));

  const content = await screen.findByRole('alertdialog', { name: 'Welcome' });
  const backdrop = document.querySelector('[data-slot="tour-backdrop"]');
  const spotlight = document.querySelector('[data-slot="tour-spotlight"]');
  const positioner = document.querySelector('[data-slot="tour-positioner"]');
  const arrow = document.querySelector('[data-slot="tour-arrow"]');
  const closeIcon = screen.getByRole('button', { name: 'Close tour' });

  expect(backdrop).toHaveClass('bg-overlay', 'backdrop-blur-xs');
  expect(spotlight).toHaveClass('ring-2', 'ring-ring');
  expect(positioner).toHaveClass(
    '[--tour-z-index:var(--moduix-tour-z-index,var(--moduix-z-modal))]',
    'max-w-[var(--available-width)]',
    'data-[type=floating]:data-[placement=left-end]:start-6',
    'data-[type=floating]:data-[placement=left-end]:bottom-6',
    'data-[type=floating]:data-[placement=left-start]:start-6',
    'data-[type=floating]:data-[placement=left-start]:top-6',
  );
  expect(arrow).toHaveClass(
    '[--arrow-background:var(--color-popover)]',
    '[--arrow-size:var(--spacing-2_5)]',
  );
  expect(content).toHaveClass('w-96', 'bg-card', 'p-4');
  expect(content).not.toHaveClass('w-80', 'bg-popover', 'p-5');
  expect(screen.getByRole('heading', { name: 'Welcome' })).toHaveClass('text-xl');
  expect(screen.getByText('Start the tour.')).toHaveClass('text-base');
  expect(closeIcon).toHaveClass('size-8', 'rounded-full', 'bg-primary');
  expect(closeIcon).not.toHaveClass('rounded-md', 'bg-transparent');
});

test('preserves hook lifecycle callbacks and keeps the public actions slot connected', async () => {
  const statuses: string[] = [];
  const changes: Array<{ stepId: string | null }> = [];
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return {
        changes,
        statuses,
        tour: useTour({
          steps,
          onStatusChange: (details) => statuses.push(details.status),
          onStepChange: (details) => changes.push(details),
        }),
      };
    },
    template: `
      <output>{{ statuses.join(',') }}</output>
      <Tour
        :tour="tour"
        :portalled="false"
      >
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourActions v-slot="actions">
              <output data-testid="action-count">{{ actions.length }}</output>
            </TourActions>
          </TourContent>
        </TourPositioner>
      </Tour>
      <button type="button" @click="tour.start()">Start events tour</button>
    `,
  });

  render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Start events tour' }));
  await waitFor(() => expect(screen.getByTestId('action-count')).toHaveTextContent('2'));
  expect(statuses).toEqual(['started']);
  expect(changes.at(-1)).toEqual(expect.objectContaining({ stepId: 'welcome' }));
});

test('preserves close-icon fallback, reactive labels, native refs, and a single exit event', async () => {
  const label = ref<string>();
  const closeRef = ref<ComponentPublicInstance>();
  const exitComplete = rs.fn();
  const click = rs.fn();
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { label, closeRef, exitComplete, click, tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start dismiss tour</button>
      <Tour :tour="tour" :portalled="false" @exit-complete="exitComplete">
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <TourCloseIcon ref="closeRef" :aria-label="label" @click="click" />
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: 'Start dismiss tour' }));
  const close = await screen.findByRole('button', { name: 'Close tour' });
  expect(close.querySelector('svg')).toBeInTheDocument();
  expect(closeRef.value?.$el).toBe(close);

  label.value = 'Dismiss walkthrough';
  await waitFor(() => expect(close).toHaveAccessibleName('Dismiss walkthrough'));
  await fireEvent.click(close);
  await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  expect(click).toHaveBeenCalledTimes(1);
  expect(exitComplete).toHaveBeenCalledTimes(1);
});

test('keeps controlled hook state, scoped context, slots, and asChild refs reactive', async () => {
  const stepId = ref<string>();
  const changes = rs.fn((details: { stepId: string | null }) => {
    stepId.value = details.stepId ?? undefined;
  });
  const actionRef = ref<ComponentPublicInstance[]>();
  const controlledSteps: TourStepDetails[] = [
    { ...steps[0], actions: [{ label: 'Next', action: 'next' }] },
    {
      id: 'finish',
      type: 'dialog',
      title: 'Complete',
      description: 'Finished the walkthrough.',
      actions: [{ label: 'Done', action: 'dismiss' }],
    },
  ];
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return {
        actionRef,
        tour: useTour(
          computed(() => ({
            steps: controlledSteps,
            stepId: stepId.value,
            onStepChange: changes,
          })),
        ),
      };
    },
    template: `
      <button type="button" @click="tour.start()">Start controlled tour</button>
      <Tour :tour="tour" :portalled="false">
        <TourPositioner><TourContent>
          <TourTitle />
          <TourDescription />
          <TourProgressText><span>Custom progress</span></TourProgressText>
          <TourContext v-slot="context">
            <output data-testid="current-step">{{ context.step?.id }}</output>
          </TourContext>
          <TourActions v-slot="actions">
            <TourActionTrigger v-for="action in actions" :key="action.label"
              ref="actionRef" :action="action" as-child>
              <button type="button" data-testid="custom-action">{{ action.label }}</button>
            </TourActionTrigger>
          </TourActions>
        </TourContent></TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Start controlled tour' }));
  await screen.findByRole('alertdialog', { name: 'Welcome' });
  expect(screen.getByText('Custom progress')).toBeInTheDocument();
  expect(actionRef.value?.[0]?.$el).toBe(screen.getByTestId('custom-action'));
  expect(screen.getByTestId('current-step')).toHaveTextContent('welcome');
  await fireEvent.click(screen.getByRole('button', { name: 'next step' }));
  await screen.findByRole('alertdialog', { name: 'Complete' });
  expect(stepId.value).toBe('finish');
  expect(screen.getByTestId('current-step')).toHaveTextContent('finish');
  expect(screen.getByTestId('custom-action')).toHaveAttribute('data-slot', 'tour-action-trigger');
  expect(changes.mock.calls.map(([details]) => details.stepId)).toEqual([
    null,
    'welcome',
    'finish',
  ]);
});

// Ark Vue 5.39.2 declares machine emits on Root but only connects its presence exit event.
// Re-enable after upstream connects the declared events; keep the direct Ark reproduction.
test.skip('native Ark TourRoot emits its declared machine statusChange event', async () => {
  const statusChange = rs.fn();
  const App = defineComponent({
    components: {
      ArkTourContent,
      ArkTourDescription,
      ArkTourPositioner,
      ArkTourRoot,
      ArkTourTitle,
    },
    setup() {
      return { statusChange, tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start native tour</button>
      <ArkTourRoot :tour="tour" @status-change="statusChange">
        <ArkTourPositioner>
          <ArkTourContent><ArkTourTitle /><ArkTourDescription /></ArkTourContent>
        </ArkTourPositioner>
      </ArkTourRoot>
    `,
  });

  render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Start native tour' }));
  await waitFor(() =>
    expect(statusChange).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'started',
      }),
    ),
  );
});

test('renders and hydrates inline and portalled Tour anatomy without replacing server nodes', async () => {
  const App = defineComponent({
    components: tourComponents,
    setup() {
      const inlineTour = useTour({ steps });
      const portalledTour = useTour({ steps });
      return { inlineTour, portalledTour };
    },
    template: `
      <button type="button" @click="inlineTour.start()">Start hydrated tour</button>
      <Tour :tour="inlineTour" :portalled="false" :lazy-mount="false" :unmount-on-exit="false">
        <TourPositioner><TourContent><TourTitle /><TourDescription /></TourContent></TourPositioner>
      </Tour>
      <Tour :tour="portalledTour" :lazy-mount="false" :unmount-on-exit="false">
        <TourBackdrop />
        <TourPositioner><TourContent><TourTitle /><TourDescription /></TourContent></TourPositioner>
      </Tour>
    `,
  });

  const context: { teleports?: Record<string, string> } = {};
  const html = await renderToString(createSSRApp(App), context);
  expect(html).toContain('data-slot="tour-content"');
  expect(html).toContain('data-slot="tour-positioner"');

  const host = document.createElement('div');
  host.innerHTML = html;
  const teleportHost = document.createElement('div');
  teleportHost.innerHTML = context.teleports?.body ?? '';
  const teleportNodes = [...teleportHost.childNodes];
  document.body.prepend(...teleportNodes);
  document.body.append(host);
  const serverParts = [...document.querySelectorAll('[data-scope="tour"]')];
  const serverIds = serverParts.map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);

  try {
    app.mount(host);
    await nextTick();
    const hydratedParts = [...document.querySelectorAll('[data-scope="tour"]')];
    expect(hydratedParts.map((element) => element.id)).toEqual(serverIds);
    hydratedParts.forEach((element, index) => expect(element).toBe(serverParts[index]));
    await fireEvent.click(screen.getByRole('button', { name: 'Start hydrated tour' }));
    await screen.findByRole('alertdialog', { name: 'Welcome' });
    const openedParts = [...document.querySelectorAll('[data-scope="tour"]')];
    openedParts.forEach((element, index) => expect(element).toBe(serverParts[index]));
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    warn.mockRestore();
    error.mockRestore();
    app.unmount();
    host.remove();
    for (const node of teleportNodes) node.remove();
  }
});