import type { TourStepDetails } from '@ark-ui/vue/tour';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref, shallowRef } from 'vue';
import type { ComponentPublicInstance, HTMLAttributes } from 'vue';
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
  TourTitle,
  useTour,
} from '../src';
import SsrTour from './fixtures/SsrTour.vue';

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
  TourTitle,
};

function TourExample({ portalled = true }: { portalled?: boolean }) {
  return defineComponent({
    components: tourComponents,
    setup() {
      return { tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start tour</button>
      <Tour :tour="tour" :portalled="${portalled}" lazy-mount unmount-on-exit>
        <TourBackdrop />
        <TourPositioner>
          <TourContent>
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </TourBody>
            <TourControl>
              <TourActionList class="consumer-action" />
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });
}

test('renders the inline anatomy, fallback content, refs, and consumer classes', async () => {
  const positionerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const actionClass = shallowRef<HTMLAttributes['class']>('consumer-action');
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { actionClass, contentRef, positionerRef, tour: useTour({ steps }) };
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
            <TourControl><TourActionList :class="actionClass" /></TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await page.getByRole('button', { name: 'Start tour', exact: true }).click();

  const content = screen.getByRole('alertdialog', { name: 'Welcome' });
  await expect
    .element(page.getByRole('alertdialog', { name: 'Welcome', exact: true }))
    .toHaveAttribute('data-slot', 'tour-content');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['consumer-content']));
  expect(Boolean(content.querySelector('[data-slot="tour-body"]')?.isConnected)).toBe(true);
  await expect.element(page.locator('[data-slot="tour-backdrop"]')).toBeAttached();
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveAttribute('data-slot', 'tour-close-icon');
  expect(screen.getAllByText('Continue')).toHaveLength(2);
  const action = screen.getAllByText('Continue')[0];
  expect([...action!.classList]).toEqual(expect.arrayContaining(['consumer-action']));
  expect(action.className.trim().endsWith('consumer-action')).toBe(true);
  expect(positionerRef.value!.$el.getAttribute('data-slot')).toBe('tour-positioner');
  expect(contentRef.value?.$el).toBe(content);

  const actions = screen.getAllByText('Continue');
  actionClass.value = ['consumer-array', 'px-6', { 'font-normal': true }];
  await nextTick();
  for (const button of actions) {
    expect([...button!.classList]).toEqual(
      expect.arrayContaining(['consumer-array', 'px-6', 'font-normal']),
    );
    expect(button!.classList.contains('consumer-action')).toBe(false);
    expect(button!.classList.contains('px-3')).toBe(false);
    expect(button!.classList.contains('font-medium')).toBe(false);
  }

  actionClass.value = { 'consumer-object': true, 'px-4': true };
  await nextTick();
  for (const button of actions) {
    expect([...button!.classList]).toEqual(expect.arrayContaining(['consumer-object', 'px-4']));
    expect(button!.classList.contains('consumer-array')).toBe(false);
    expect(button!.classList.contains('px-6')).toBe(false);
    expect(button!.classList.contains('font-normal')).toBe(false);
  }
});

test('portals overlay parts by default and supports duplicate action labels', async () => {
  const App = TourExample({});
  const { container } = render(App);

  await page.getByRole('button', { name: 'Start tour', exact: true }).click();

  const content = screen.getByRole('alertdialog', { name: 'Welcome' });
  expect(container!.contains(content)).not.toBe(true);

  const actions = screen.getAllByText('Continue');
  expect(actions).toHaveLength(2);
  await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
  await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
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
  await page.getByRole('button', { name: 'Start custom action tour', exact: true }).click();

  await expect
    .element(page.getByText('Continue').nth(0))
    .toHaveAttribute('data-slot', 'tour-action-trigger');
  await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
  await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
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
  await page.getByRole('button', { name: 'Start events tour', exact: true }).click();
  await expect.element(page.getByTestId('action-count')).toContainText('2');
  expect(statuses).toEqual(['started']);
  expect(changes.at(-1)).toEqual(expect.objectContaining({ stepId: 'welcome' }));
});

test('switches optional content slots without changing native fallback semantics', async () => {
  const custom = ref(false);
  const emptyArrow = ref(false);
  const titleRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { custom, emptyArrow, titleRef, tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start slot tour</button>
      <Tour :tour="tour" :portalled="false">
        <TourPositioner><TourContent>
          <TourTitle ref="titleRef" class="consumer-title" style="color: red" data-testid="title">
            <template v-if="custom" #default>Custom title</template>
          </TourTitle>
          <TourDescription data-testid="description">
            <template v-if="custom" #default>Custom description</template>
          </TourDescription>
          <TourProgressText data-testid="progress">
            <template v-if="custom" #default>Custom progress</template>
          </TourProgressText>
          <TourArrow data-testid="arrow">
            <template v-if="custom" #default><span v-if="!emptyArrow">Custom arrow</span></template>
          </TourArrow>
          <TourCloseIcon />
        </TourContent></TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await page.getByRole('button', { name: 'Start slot tour', exact: true }).click();
  screen.getByRole('alertdialog', { name: 'Welcome' });
  const hosts = ['title', 'description', 'progress', 'arrow'].map((id) => screen.getByTestId(id));
  await expect.element(page.getByTestId('description')).toContainText('Start the tour.');
  const progress = screen.getByTestId('progress').textContent;
  expect(progress).toBeTruthy();
  expect(
    Boolean(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')?.isConnected),
  ).toBe(true);

  custom.value = true;
  await expect.element(page.getByTestId('title')).toContainText('Custom title');
  ['title', 'description', 'progress', 'arrow'].forEach((id, index) => {
    expect(screen.getByTestId(id)).toBe(hosts[index]);
  });
  expect(titleRef.value?.$el).toBe(hosts[0]);
  await expect.element(page.getByTestId('description')).toContainText('Custom description');
  await expect.element(page.getByTestId('progress')).toContainText('Custom progress');
  await expect.element(page.getByTestId('arrow')).toContainText('Custom arrow');
  expect(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')).toBeNull();
  emptyArrow.value = true;
  await expect.poll(() => screen.getByTestId('arrow').textContent?.trim()).toBe('');
  expect(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')).toBeNull();

  custom.value = false;
  await expect.element(page.getByTestId('title')).toContainText('Welcome');
  ['title', 'description', 'progress', 'arrow'].forEach((id, index) => {
    expect(screen.getByTestId(id)).toBe(hosts[index]);
  });
  await expect.element(page.getByTestId('description')).toContainText('Start the tour.');
  expect(screen.getByTestId('progress').textContent).toBe(progress);
  expect(
    Boolean(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')?.isConnected),
  ).toBe(true);
  const title = screen.getByTestId('title');
  await expect.element(page.getByTestId('title')).toHaveAttribute('data-slot', 'tour-title');
  expect([...title!.classList]).toEqual(expect.arrayContaining(['consumer-title']));
  await expect.element(page.getByTestId('title')).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(titleRef.value?.$el).toBe(title);
});

test('preserves close-icon fallback, reactive labels, native refs, and a single exit event', async () => {
  const label = ref<string>();
  const labelledby = ref<string>();
  const customIcon = ref(false);
  const closeRef = ref<ComponentPublicInstance>();
  const exitComplete = rs.fn();
  const click = rs.fn();
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return {
        label,
        labelledby,
        customIcon,
        closeRef,
        exitComplete,
        click,
        tour: useTour({ steps }),
      };
    },
    template: `
      <button type="button" @click="tour.start()">Start dismiss tour</button>
      <Tour :tour="tour" :portalled="false" @exit-complete="exitComplete">
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <span id="dismiss-label">Dismiss with label</span>
            <TourCloseIcon ref="closeRef" :aria-label="label" :aria-labelledby="labelledby"
              class="consumer-close" style="color: red" title="Dismiss walkthrough" @click="click">
              <template v-if="customIcon" #default><span>Custom close</span></template>
            </TourCloseIcon>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await expect.element(page.getByRole('alertdialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Start dismiss tour', exact: true }).click();
  const close = screen.getByRole('button', { name: 'Close tour' });
  expect(Boolean(close.querySelector('svg')?.isConnected)).toBe(true);
  expect(closeRef.value?.$el).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveAttribute('data-slot', 'tour-close-icon');
  expect([...close!.classList]).toEqual(expect.arrayContaining(['consumer-close']));
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveAttribute('title', 'Dismiss walkthrough');

  label.value = 'Dismiss walkthrough';
  await expect
    .element(page.getByRole('button', { name: 'Dismiss walkthrough', exact: true }))
    .toBeAttached();
  label.value = '';
  await expect
    .element(page.locator('[data-slot="tour-close-icon"]'))
    .toHaveAttribute('aria-label', '');
  label.value = undefined;
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toBeAttached();
  labelledby.value = 'dismiss-label';
  await expect
    .element(page.getByRole('button', { name: 'Dismiss with label', exact: true }))
    .toBeAttached();
  labelledby.value = undefined;
  customIcon.value = true;
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toContainText('Custom close');
  expect(close.querySelector('svg')).toBeNull();
  customIcon.value = false;
  await expect.poll(() => Boolean(close.querySelector('svg')?.isConnected)).toBe(true);
  expect(closeRef.value?.$el).toBe(close);
  await page.getByRole('button', { name: 'Close tour', exact: true }).click();
  await expect.element(page.getByRole('alertdialog')).toHaveCount(0);
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
  await page.getByRole('button', { name: 'Start controlled tour', exact: true }).click();
  screen.getByRole('alertdialog', { name: 'Welcome' });
  await expect.element(page.getByText('Custom progress')).toBeAttached();
  expect(actionRef.value?.[0]?.$el).toBe(screen.getByTestId('custom-action'));
  await expect.element(page.getByTestId('current-step')).toContainText('welcome');
  await page.getByRole('button', { name: 'next step', exact: true }).click();
  screen.getByRole('alertdialog', { name: 'Complete' });
  expect(stepId.value).toBe('finish');
  await expect.element(page.getByTestId('current-step')).toContainText('finish');
  await expect
    .element(page.getByTestId('custom-action'))
    .toHaveAttribute('data-slot', 'tour-action-trigger');
  expect(changes.mock.calls.map(([details]) => details.stepId)).toEqual([
    null,
    'welcome',
    'finish',
  ]);
});

test('renders and hydrates inline and portalled Tour anatomy without replacing server nodes', async () => {
  const App = SsrTour;
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
    await page.getByRole('button', { name: 'Start hydrated tour', exact: true }).click();
    screen.getByRole('alertdialog', { name: 'Welcome' });
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