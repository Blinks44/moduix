import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
  useFloatingPanel,
} from '@/index';
import SsrFloatingPanel from './fixtures/SsrFloatingPanel.vue';

const floatingPanelComponents = {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} as unknown as Record<string, Component>;

const PanelContent = defineComponent({
  components: floatingPanelComponents,
  template: `
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader>
            <FloatingPanelTitle>Inspector</FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger stage="minimized" />
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
        <FloatingPanelBody>Panel content</FloatingPanelBody>
        <slot />
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  `,
});

const rootComponents = { ...floatingPanelComponents, PanelContent };

test('preserves Ark open-change detail objects and supports v-model', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: rootComponents,
    setup() {
      const open = ref(false);
      return { open, onOpenChange: (detail: { open: boolean }) => details.push(detail) };
    },
    template:
      '<FloatingPanel v-model:open="open" :portalled="false" @open-change="onOpenChange"><FloatingPanelTrigger>Open controlled inspector</FloatingPanelTrigger><PanelContent><FloatingPanelCloseTrigger>Close inspector</FloatingPanelCloseTrigger></PanelContent></FloatingPanel>',
  });

  render(Harness);
  await page.getByRole('button', { name: 'Open controlled inspector', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close Window', exact: true }).click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
});

test('opens a RootProvider panel through the public state hook', async () => {
  const Harness = defineComponent({
    components: rootComponents,
    setup() {
      return { panel: useFloatingPanel({ defaultSize: { width: 360, height: 260 } }) };
    },
    template:
      '<div><button type="button" @click="panel.setOpen(true)">Open via API</button><FloatingPanelRootProvider :value="panel" :portalled="false"><PanelContent /></FloatingPanelRootProvider></div>',
  });

  render(Harness);
  await page.getByRole('button', { name: 'Open via API', exact: true }).click();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test('renders only the requested resize handles through ResizeTriggerGroup', () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template:
      '<FloatingPanel default-open :portalled="false" :default-size="{ width: 360, height: 260 }"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelResizeTriggerGroup :axes="[\'e\', \'s\', \'se\']" /></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>',
  });

  render(Harness);
  expect(
    Array.from(document.querySelectorAll('[data-slot="floating-panel-resize-trigger"]')).map(
      (handle) => handle.getAttribute('data-axis'),
    ),
  ).toEqual(['e', 's', 'se']);
});

test('exposes the current state through FloatingPanelContext', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template:
      '<FloatingPanel default-open :portalled="false"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelContext v-slot="panel"><output>Open: {{ String(panel.open) }}</output></FloatingPanelContext></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>',
  });

  render(Harness);
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('preserves refs, anatomy hooks, default icons, and consumer classes', async () => {
  const refs = {
    trigger: ref<ComponentPublicInstance>(),
    positioner: ref<ComponentPublicInstance>(),
    content: ref<ComponentPublicInstance>(),
    header: ref<ComponentPublicInstance>(),
    title: ref<ComponentPublicInstance>(),
    footer: ref<ComponentPublicInstance>(),
    resize: ref<ComponentPublicInstance>(),
    indicator: ref<ComponentPublicInstance>(),
    close: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: floatingPanelComponents,
    setup() {
      return refs;
    },
    template: `
      <FloatingPanel default-open :portalled="false">
        <FloatingPanelTrigger ref="trigger" class="consumer-trigger">Open</FloatingPanelTrigger>
        <FloatingPanelPositioner ref="positioner">
          <FloatingPanelContent ref="content" class="consumer-content">
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader ref="header">
                <FloatingPanelTitle ref="title"><FloatingPanelDragIndicator ref="indicator" /></FloatingPanelTitle>
                <FloatingPanelControl><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelCloseIcon ref="close" /></FloatingPanelControl>
              </FloatingPanelHeader>
            </FloatingPanelDragTrigger>
            <FloatingPanelBody>Body</FloatingPanelBody>
            <FloatingPanelFooter ref="footer">Footer</FloatingPanelFooter>
            <FloatingPanelResizeTriggerGroup :axes="['e']" />
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });

  render(Harness);
  expect(refs.trigger.value!.$el.getAttribute('data-slot')).toBe('floating-panel-trigger');
  expect(refs.positioner.value!.$el.getAttribute('data-slot')).toBe('floating-panel-positioner');
  expect(refs.content.value!.$el.getAttribute('data-slot')).toBe('floating-panel-content');
  expect(refs.header.value!.$el.getAttribute('data-slot')).toBe('floating-panel-header');
  expect(refs.title.value!.$el.getAttribute('data-slot')).toBe('floating-panel-title');
  expect(refs.footer.value!.$el.getAttribute('data-slot')).toBe('floating-panel-footer');
  expect(refs.indicator.value!.$el.getAttribute('data-slot')).toBe('floating-panel-drag-indicator');
  expect(refs.close.value!.$el.getAttribute('data-slot')).toBe('floating-panel-close-icon');
  expect(Boolean(refs.close.value?.$el.querySelector('svg')?.isConnected)).toBe(true);
  expect([...screen.getByRole('button', { name: 'Open' }).classList]).toEqual(
    expect.arrayContaining(['consumer-trigger']),
  );
});

test('renders and hydrates an open floating panel through Vue SSR', async () => {
  const markup = await renderToString(createSSRApp(SsrFloatingPanel));
  const host = document.createElement('div');
  host.innerHTML = markup;
  document.body.append(host);
  const serverDialog = host.querySelector('[data-slot="floating-panel-content"]');
  const serverId = serverDialog?.id;
  expect(serverId).toBeTruthy();
  const app = createSSRApp(SsrFloatingPanel);
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="floating-panel-content"]')).toBe(serverDialog);
    await expect
      .element(page.getByRole('dialog', { name: 'Hydrated panel' }))
      .toHaveAttribute('id', serverId);
    await page.getByRole('dialog', { name: 'Hydrated panel' }).press('Escape');
    await expect.element(page.getByRole('dialog', { name: 'Hydrated panel' })).toHaveCount(0);
  } finally {
    app.unmount();
    host.remove();
  }
});

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const label = ref<string | undefined>('Dismiss first');
  const labelledby = ref<string | undefined>();
  const custom = ref(false);
  render({
    components: floatingPanelComponents,
    setup: () => ({ label, labelledby, custom }),
    template: `
      <FloatingPanel default-open :portalled="false">
        <FloatingPanelPositioner><FloatingPanelContent>
          <FloatingPanelTitle>Preview</FloatingPanelTitle>
          <FloatingPanelCloseIcon :aria-label="label" :aria-labelledby="labelledby"
            class="consumer-close" style="color: red" title="Dismiss preview" data-testid="close">
            <template v-if="custom" #default><span>Custom close</span></template>
          </FloatingPanelCloseIcon>
        </FloatingPanelContent></FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });
  const button = screen.getByTestId('close');
  expect(button.tagName).toBe('BUTTON');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss first');
  expect([...button!.classList]).toEqual(expect.arrayContaining(['consumer-close']));
  await expect.element(page.getByTestId('close')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(page.getByTestId('close')).toHaveAttribute('title', 'Dismiss preview');
  expect(Boolean(button.querySelector('svg')?.isConnected)).toBe(true);
  label.value = 'Dismiss second';
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss second');
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await expect
    .element(page.getByTestId('close'))
    .toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Close panel');
  label.value = '';
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', '');
  await page.getByTestId('close').focus();
  custom.value = true;
  await expect.element(page.getByTestId('close')).toContainText('Custom close');
  expect(screen.getByTestId('close')).toBe(button);
  await expect.element(page.getByTestId('close')).toBeFocused();
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await expect
    .poll(() => Boolean(screen.getByTestId('close').querySelector('svg')?.isConnected))
    .toBe(true);
  expect(screen.getByTestId('close')).toBe(button);
  await expect.element(page.getByTestId('close')).toBeFocused();
});

test('sizes the content from Ark state without a CSS minimum', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template: `
      <FloatingPanel default-open :default-size="{ width: 160, height: 96 }" :portalled="false">
        <FloatingPanelPositioner><FloatingPanelContent /></FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });

  render(Harness);
  await expect.element(page.getByRole('dialog')).toBeAttached();

  const content = document.querySelector<HTMLElement>('[data-slot="floating-panel-content"]')!;
  expect([content.offsetWidth, content.offsetHeight]).toEqual([160, 96]);
});

test('preserves refs through ordinary parts', () => {
  const refs = {
    trigger: ref<ComponentPublicInstance>(),
    positioner: ref<ComponentPublicInstance>(),
    content: ref<ComponentPublicInstance>(),
    close: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: floatingPanelComponents,
    setup() {
      return refs;
    },
    template:
      '<FloatingPanel default-open :portalled="false"><FloatingPanelTrigger ref="trigger">Open</FloatingPanelTrigger><FloatingPanelPositioner ref="positioner"><FloatingPanelContent ref="content"><FloatingPanelCloseIcon ref="close" /></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>',
  });

  render(Harness);
  expect(refs.trigger.value!.$el.getAttribute('data-slot')).toBe('floating-panel-trigger');
  expect(refs.positioner.value!.$el.getAttribute('data-slot')).toBe('floating-panel-positioner');
  expect(refs.content.value!.$el.getAttribute('data-slot')).toBe('floating-panel-content');
  expect(refs.close.value!.$el.getAttribute('data-slot')).toBe('floating-panel-close-icon');
  expect(Boolean(refs.close.value?.$el.querySelector('svg')?.isConnected)).toBe(true);
});