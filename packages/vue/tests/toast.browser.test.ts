import {
  Toaster as ArkToaster,
  ToastRoot as ArkToastRoot,
  ToastTitle as ArkToastTitle,
} from '@ark-ui/vue/toast';
import type { CreateToasterReturn } from '@ark-ui/vue/toast';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import type { ComponentPublicInstance, VNodeChild } from 'vue';
import {
  Toast,
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
  useToastContext,
} from '../src';
import SsrToast from './fixtures/SsrToast.vue';

const toastComponents = {
  Toast,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
};

test('keeps rendered VNode content and context fallbacks reactive across store updates', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  renderToaster(toaster, false);
  const id = toaster.create({
    title: h('strong', { 'data-testid': 'rich-title' }, 'Rich title'),
    description: h('em', {}, 'Rich description'),
    action: { label: 'Rich action', onClick: () => {} },
  });
  const title = await screen.findByTestId('rich-title');
  const root = title.closest('[data-slot="toast-root"]');
  expect(title.tagName).toBe('STRONG');
  expect(screen.getByText('Rich description').tagName).toBe('EM');
  await expect
    .element(page.getByRole('button', { name: 'Rich action', exact: true }))
    .toBeVisible();

  toaster.update(id, {
    title: 'Updated title',
    description: null,
    action: undefined,
    closable: false,
  });
  await expect.element(page.getByText('Updated title')).toBeVisible();
  expect(screen.getByText('Updated title').closest('[data-slot="toast-root"]')).toBe(root);
  expect(root?.querySelector('[data-slot="toast-description"]')).toBeNull();
  expect(root?.querySelector('[data-slot="toast-action-trigger"]')).toBeNull();
  expect(root?.querySelector('[data-slot="toast-close-trigger"]')).toBeNull();
});

test('preserves explicit slot content and semantic asChild title, description, and action hosts', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const titleRef = ref<ComponentPublicInstance>();
  const descriptionRef = ref<ComponentPublicInstance>();
  const actionRef = ref<ComponentPublicInstance>();
  const handleAction = rs.fn();
  const handleClick = rs.fn();
  render(
    defineComponent({
      components: toastComponents,
      setup: () => ({ toaster, titleRef, descriptionRef, actionRef, handleClick }),
      template: `
      <ToastToaster :toaster="toaster" :portalled="false">
        <template #default="item">
          <Toast :data-toast-id="item.id">
            <ToastTitle ref="titleRef" as-child><h2>Consumer title</h2></ToastTitle>
            <ToastDescription ref="descriptionRef" as-child><p>Consumer description</p></ToastDescription>
            <ToastActionTrigger ref="actionRef" as-child class="consumer-action" @click="handleClick">
              <button type="button">Consumer action</button>
            </ToastActionTrigger>
            <ToastCloseTrigger />
          </Toast>
        </template>
      </ToastToaster>
    `,
    }),
  );
  const id = toaster.create({
    title: 'Store title',
    description: 'Store description',
    action: { label: 'Store action', onClick: handleAction },
  });
  const title = await screen.findByRole('heading', { name: 'Consumer title' });
  const description = screen.getByText('Consumer description');
  const action = screen.getByRole('button', { name: 'Consumer action' });
  expect(title.closest('[data-slot="toast-root"]')!.getAttribute('data-toast-id')).toBe(id);
  expect(titleRef.value?.$el).toBe(title);
  expect(descriptionRef.value?.$el).toBe(description);
  expect(description.tagName).toBe('P');
  expect(actionRef.value?.$el).toBe(action);
  expect(action.className).toBe('consumer-action');
  expect(screen.queryByText('Store title')).toBeNull();
  expect(screen.queryByText('Store description')).toBeNull();
  await page.getByRole('button', { name: 'Consumer action', exact: true }).click();
  expect(handleAction).toHaveBeenCalledTimes(1);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('updates close accessible names reactively and forwards listeners once', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const label = ref<string | undefined>('Dismiss first');
  const labelledby = ref<string>();
  const handleClick = rs.fn();
  render(
    defineComponent({
      components: toastComponents,
      setup: () => ({ toaster, label, labelledby, handleClick }),
      template: `
      <span id="close-label">Dismiss by reference</span>
      <ToastToaster :toaster="toaster" :portalled="false">
        <template #default>
          <Toast>
            <ToastTitle />
            <ToastCloseTrigger :aria-label="label" :aria-labelledby="labelledby" @click="handleClick" />
            <ToastCloseTrigger as-child :aria-label="label" :aria-labelledby="labelledby">
              <button type="button">Custom close content</button>
            </ToastCloseTrigger>
          </Toast>
        </template>
      </ToastToaster>
    `,
    }),
  );
  toaster.create({ title: 'Reactive labels' });
  await screen.findByText('Reactive labels');
  expect(screen.getAllByRole('button', { name: 'Dismiss first' })).toHaveLength(2);
  label.value = 'Dismiss second';
  await nextTick();
  expect(screen.getAllByRole('button', { name: 'Dismiss second' })).toHaveLength(2);
  label.value = undefined;
  labelledby.value = 'close-label';
  await nextTick();
  const buttons = screen.getAllByRole('button', { name: 'Dismiss by reference' });
  for (const button of buttons) {
    expect(button!.getAttribute('aria-labelledby')).toBe('close-label');
    expect(button!.getAttribute('aria-label')).not.toBe('Close toast');
  }
  labelledby.value = undefined;
  await nextTick();
  expect(screen.getAllByRole('button', { name: 'Close toast' })).toHaveLength(2);
  await page.locator('[data-slot="toast-close-trigger"]').first().click();
  expect(handleClick).toHaveBeenCalledTimes(1);
  await expect.poll(() => screen.queryByText('Reactive labels')).toBeNull();
});

test('keeps queue limits, toast status details, dismissal, and replacement content', async () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    duration: Infinity,
    removeDelay: 0,
    max: 1,
  });
  const handleStatus = rs.fn();
  renderToaster(toaster, false);
  const id = toaster.create({ title: 'First notification', onStatusChange: handleStatus });
  toaster.create({ title: 'Queued notification' });
  const first = await screen.findByText('First notification');
  expect(screen.queryByText('Queued notification')).toBeNull();
  expect(first.closest('[data-slot="toast-root"]')!.getAttribute('data-placement')).toBe(
    'bottom-end',
  );
  await expect.poll(() => handleStatus).toHaveBeenCalledWith({ status: 'visible' });
  toaster.dismiss(id);
  await expect.poll(() => screen.queryByText('First notification')).toBeNull();
  await expect.element(page.getByText('Queued notification')).toBeVisible();
  expect(handleStatus).toHaveBeenCalledWith({ status: 'dismissing', src: 'programmatic' });
  expect(handleStatus).toHaveBeenCalledWith({ status: 'unmounted' });
});

// Ark Vue 5.39.2 applies root attrs to its leading ghost DIV instead of the provided child.
test.skip('preserves the native Ark root asChild host', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  render(
    defineComponent({
      components: { ArkToaster, ArkToastRoot, ArkToastTitle },
      setup: () => ({ toaster }),
      template: `
      <ArkToaster :toaster="toaster">
        <template #default>
          <ArkToastRoot as-child><article data-testid="native-toast"><ArkToastTitle>Native root</ArkToastTitle></article></ArkToastRoot>
        </template>
      </ArkToaster>
    `,
    }),
  );
  toaster.create({ title: 'Native root' });
  const root = await screen.findByTestId('native-toast');
  await expect.element(page.getByTestId('native-toast')).toHaveAttribute('data-part', 'root');
  expect(root.parentElement!.getAttribute('data-part')).toBe('group');
});

// Ark Vue 5.39.2 declares asChild on Toaster but never forwards it to ark.div.
test.skip('forwards native Ark toaster asChild to the group host', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  render(
    defineComponent({
      components: { ArkToaster },
      setup: () => ({ toaster }),
      template: `
      <ArkToaster :toaster="toaster" as-child>
        <template #default><section data-testid="native-group">Custom group</section></template>
      </ArkToaster>
    `,
    }),
  );
  toaster.create({ title: 'Native group' });
  await expect.element(page.getByTestId('native-group')).toHaveAttribute('data-part', 'group');
});

function renderToaster(toaster: CreateToasterReturn<VNodeChild>, portalled?: boolean) {
  const Harness = defineComponent({
    components: { ToastToaster },
    setup() {
      return { portalled, toaster };
    },
    template:
      portalled === undefined
        ? '<ToastToaster :toaster="toaster" />'
        : '<ToastToaster :toaster="toaster" :portalled="portalled" />',
  });

  return render(Harness);
}

test('renders default content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  let actionCount = 0;

  renderToaster(toaster);

  toaster.create({
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    action: { label: 'Undo', onClick: () => actionCount++ },
  });

  await expect.element(page.getByText('Changes saved')).toBeVisible();
  await expect.element(page.getByText('Your workspace is up to date.')).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'Undo', exact: true })).toBeVisible();
  expect(
    Boolean(screen.getByRole('button', { name: 'Close toast' }).querySelector('svg')?.isConnected),
  ).toBe(true);

  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  expect(actionCount).toBe(1);
  await expect.element(page.getByText('Changes saved')).toHaveCount(0);

  toaster.create({ title: 'Persistent notice', closable: false });
  await expect.element(page.getByText('Persistent notice')).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toHaveCount(0);
});

test('uses info for implicit and explicit info toast types', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  renderToaster(toaster);

  toaster.create({ title: 'Implicit info toast' });
  expect(
    (await screen.findByText('Implicit info toast'))
      .closest('[data-slot="toast-root"]')!
      .getAttribute('data-type'),
  ).toBe('info');

  toaster.create({ title: 'Explicit info toast', type: 'info' });
  expect(
    (await screen.findByText('Explicit info toast'))
      .closest('[data-slot="toast-root"]')!
      .getAttribute('data-type'),
  ).toBe('info');
});

test('keeps custom composition connected to the Vue context hook', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const ContextTitle = defineComponent({
    components: { ToastTitle },
    setup() {
      return { toast: useToastContext() };
    },
    template: '<ToastTitle>{{ toast.title }}</ToastTitle>',
  });
  const Harness = defineComponent({
    components: { ...toastComponents, ContextTitle },
    setup() {
      return { toaster };
    },
    template: `
      <ToastToaster :toaster="toaster" :portalled="false">
        <template #default>
          <Toast>
            <ContextTitle />
            <ToastCloseTrigger as-child aria-label="Dismiss custom toast">
              <button type="button">Dismiss</button>
            </ToastCloseTrigger>
          </Toast>
        </template>
      </ToastToaster>
    `,
  });

  render(Harness);
  toaster.create({ title: 'Custom toast' });

  await expect.element(page.getByText('Custom toast')).toBeVisible();
  await expect
    .element(page.locator('[data-slot="toast-root"]'))
    .toHaveAttribute('data-part', 'root');

  await page.getByRole('button', { name: 'Dismiss custom toast', exact: true }).click();
  await expect.element(page.getByText('Custom toast')).toHaveCount(0);
});

test('preserves anatomy, attrs, refs, and native asChild hosts', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const rootRef = ref<ComponentPublicInstance>();
  const titleRef = ref<ComponentPublicInstance>();
  const descriptionRef = ref<ComponentPublicInstance>();
  const actionRef = ref<ComponentPublicInstance>();
  const closeRef = ref<ComponentPublicInstance>();
  const composedCloseRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: toastComponents,
    setup() {
      return {
        actionRef,
        closeRef,
        composedCloseRef,
        descriptionRef,
        rootRef,
        titleRef,
        toaster,
      };
    },
    template: `
      <ToastToaster :toaster="toaster" :portalled="false">
        <template #default>
          <Toast ref="rootRef" data-probe="root">
            <article aria-label="Notification">
              <ToastTitle ref="titleRef" />
              <ToastDescription ref="descriptionRef" />
              <ToastActionTrigger ref="actionRef">Undo</ToastActionTrigger>
              <ToastCloseTrigger ref="closeRef" />
              <ToastCloseTrigger
                ref="composedCloseRef"
                as-child
                aria-label="Custom close"
              >
                <button type="button">Custom close</button>
              </ToastCloseTrigger>
            </article>
          </Toast>
        </template>
      </ToastToaster>
    `,
  });

  render(Harness);
  toaster.create({ title: 'Native parts', description: 'Description' });

  const title = await screen.findByText('Native parts');
  const root = title.closest('[data-slot="toast-root"]');
  const description = screen.getByText('Description');
  const action = screen.getByRole('button', { name: 'Undo' });
  const close = screen.getByRole('button', { name: 'Close toast' });
  const composedClose = screen.getByRole('button', { name: 'Custom close' });
  expect(root?.tagName).toBe('DIV');
  expect(root!.getAttribute('data-slot')).toBe('toast-root');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(rootRef.value?.$el).toBe(root);
  await expect.element(page.getByText('Native parts')).toHaveAttribute('data-slot', 'toast-title');
  expect(titleRef.value?.$el).toBe(title);
  await expect
    .element(page.getByText('Description'))
    .toHaveAttribute('data-slot', 'toast-description');
  expect(descriptionRef.value?.$el).toBe(description);
  await expect
    .element(page.getByRole('button', { name: 'Undo', exact: true }))
    .toHaveAttribute('data-slot', 'toast-action-trigger');
  expect(actionRef.value?.$el).toBe(action);
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toHaveAttribute('data-slot', 'toast-close-trigger');
  expect(closeRef.value?.$el).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Custom close', exact: true }))
    .toHaveAttribute('data-slot', 'toast-close-trigger');
  expect(composedCloseRef.value?.$el).toBe(composedClose);
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalled = renderToaster(portalledToaster);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const inline = renderToaster(inlineToaster, false);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
  inline.unmount();

  const customToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalTarget = document.createElement('div');
  portalTarget.dataset.testid = 'toast-portal';
  document.body.append(portalTarget);
  const Harness = defineComponent({
    components: { ToastToaster },
    setup() {
      return { customToaster, getPortal: () => portalTarget };
    },
    template: '<ToastToaster :toaster="customToaster" :portal-ref="getPortal" />',
  });

  render(Harness);
  customToaster.create({ title: 'Custom portal toast' });

  expect(Boolean((await within(portalTarget).findByText('Custom portal toast'))?.isConnected)).toBe(
    true,
  );
  portalTarget.remove();
});

test('renders and hydrates toast without replacing server hosts or IDs', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const html = await renderToString(createSSRApp(SsrToast, { toaster }));
  expect(html).toContain('data-slot="toast-toaster"');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const warn = rs.spyOn(console, 'warn');
  const app = createSSRApp(SsrToast, { toaster });
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    await expect
      .element(page.locator('[data-slot="toast-toaster"]'))
      .toHaveAttribute('role', 'region');
    await expect
      .element(page.locator('[data-slot="toast-toaster"]'))
      .toHaveAttribute('aria-live', 'polite');
    toaster.create({ title: 'Hydrated toast', description: 'Hydrated description' });
    await expect.element(page.getByText('Hydrated toast', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Hydrated description', { exact: true })).toBeVisible();
    expect(warn).not.toHaveBeenCalled();
  } finally {
    warn.mockRestore();
    app.unmount();
    host.remove();
  }
});

test.each(['element', 'getter'] as const)(
  'moves the same toaster host when portal options change reactively (%s)',
  async (targetType) => {
    const first = document.createElement('div');
    const second = document.createElement('div');
    document.body.append(first, second);
    const target = ref(first);
    const portalled = ref(true);
    const toaster = createToaster({ placement: 'bottom', duration: Infinity });
    const { container, unmount } = render(
      defineComponent({
        components: { ToastToaster },
        setup: () => ({ target, portalled, toaster }),
        template: `<ToastToaster :toaster="toaster" :portalled="portalled" :portal-ref="${targetType === 'getter' ? '() => target' : 'target'}" />`,
      }),
    );
    toaster.create({ title: 'Moving toast' });
    const title = await within(first).findByText('Moving toast');
    const group = title.closest('[data-slot="toast-toaster"]');
    target.value = second;
    await expect.poll(() => second!.contains(title)).toBe(true);
    expect(title.closest('[data-slot="toast-toaster"]')).toBe(group);
    portalled.value = false;
    await expect.poll(() => container!.contains(title)).toBe(true);
    portalled.value = true;
    await expect.poll(() => second!.contains(title)).toBe(true);
    expect(title.closest('[data-slot="toast-toaster"]')).toBe(group);
    unmount();
    first.remove();
    second.remove();
  },
);

test.each([false, true])(
  'keeps nested Popover portal independent (toaster portalled=%s)',
  async (portalled) => {
    const target = document.createElement('div');
    document.body.append(target);
    const toaster = createToaster({ placement: 'bottom', duration: Infinity });
    const { container, unmount } = render(
      defineComponent({
        components: {
          ...toastComponents,
          Popover,
          PopoverTrigger,
          PopoverPositioner,
          PopoverContent,
        },
        setup: () => ({ toaster, portalled, target }),
        template: `
      <ToastToaster :toaster="toaster" :portalled="portalled" :portal-ref="target">
        <template #default>
          <Toast>
            <ToastTitle />
            <Popover default-open>
              <PopoverTrigger>Popover trigger</PopoverTrigger>
              <PopoverPositioner><PopoverContent data-testid="nested-popover">Nested popover</PopoverContent></PopoverPositioner>
            </Popover>
          </Toast>
        </template>
      </ToastToaster>
    `,
      }),
    );
    toaster.create({ title: 'Toast with popover' });
    const title = await screen.findByText('Toast with popover');
    const popover = await screen.findByTestId('nested-popover');
    expect((portalled ? target : container)!.contains(title)).toBe(true);
    expect(target!.contains(popover)).not.toBe(true);
    expect(container!.contains(popover)).not.toBe(true);
    expect(document.body!.contains(popover)).toBe(true);
    unmount();
    target.remove();
  },
);