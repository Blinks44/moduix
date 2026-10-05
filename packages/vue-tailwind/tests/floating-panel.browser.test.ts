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
} from '../src';
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

test('marks the footer as minimized with the panel', async () => {
  const Harness = defineComponent({
    components: rootComponents,
    template:
      '<FloatingPanel default-open :portalled="false" :default-size="{ width: 360, height: 260 }"><PanelContent><FloatingPanelFooter data-testid="footer">Status</FloatingPanelFooter></PanelContent></FloatingPanel>',
  });

  render(Harness);
  await page.getByRole('button', { name: 'Minimize window', exact: true }).click();
  await expect.element(page.getByTestId('footer')).toHaveAttribute('data-minimized');
});

test('keeps Ark translations for default stage controls', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template: `
      <FloatingPanel default-open :portalled="false" :default-size="{ width: 360, height: 260 }"
        :translations="{ minimize: 'Minimieren', maximize: 'Maximieren', restore: 'Wiederherstellen' }">
        <FloatingPanelPositioner><FloatingPanelContent><FloatingPanelControl>
          <FloatingPanelStageTrigger stage="minimized" />
          <FloatingPanelStageTrigger stage="maximized" />
        </FloatingPanelControl></FloatingPanelContent></FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });

  render(Harness);
  await expect
    .element(page.getByRole('button', { name: 'Minimieren', exact: true }))
    .toBeAttached();
  await expect
    .element(page.getByRole('button', { name: 'Maximieren', exact: true }))
    .toBeAttached();
});

test('lazily mounts, closes on Escape, and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: rootComponents,
    template:
      '<FloatingPanel :portalled="false"><FloatingPanelTrigger as-child><button type="button">Open inspector</button></FloatingPanelTrigger><PanelContent /></FloatingPanel>',
  });

  render(Harness);

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open inspector', exact: true }).click();

  await page.getByRole('dialog').press('Escape');

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open inspector', exact: true }))
    .toBeFocused();
});

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

test('portals overlays inline and into a custom portal target', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      return { portalTarget, getPortal: () => portalTarget.value };
    },
    template: `
      <div>
        <div data-testid="inline-host"><FloatingPanel default-open :portalled="false"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelTitle>Inline</FloatingPanelTitle></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel></div>
        <div ref="portalTarget" data-testid="portal-host"></div>
        <FloatingPanel default-open :portal-ref="getPortal"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelTitle>Portalled</FloatingPanelTitle></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>
      </div>
    `,
  });

  render(Harness);
  await expect
    .element(page.getByTestId('inline-host').getByRole('dialog', { name: 'Inline' }))
    .toBeAttached();
  await expect
    .poll(() =>
      screen.getByTestId('portal-host').contains(screen.getByRole('dialog', { name: 'Portalled' })),
    )
    .toBe(true);
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

test('keeps consumer classes last on component parts and utility classes on empty parts', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template: `
      <FloatingPanel default-open :portalled="false">
        <FloatingPanelPositioner><FloatingPanelContent class="min-h-0 min-w-0">
          <FloatingPanelHeader data-testid="header"><FloatingPanelTitle><FloatingPanelDragIndicator data-testid="drag-indicator" /></FloatingPanelTitle><FloatingPanelControl data-testid="control"><FloatingPanelStageTrigger stage="minimized" /></FloatingPanelControl></FloatingPanelHeader>
          <FloatingPanelBody data-testid="body" /><FloatingPanelFooter data-testid="footer" />
        </FloatingPanelContent></FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });

  render(Harness);
  const content = screen.getByRole('dialog');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['min-h-0', 'min-w-0']));
  expect(['min-h-40', 'min-w-64'].some((name) => content!.classList.contains(name))).toBe(false);
  expect([...screen.getByTestId('header').classList]).toEqual(
    expect.arrayContaining(['min-h-control-xl', 'bg-muted', 'border-b']),
  );
  expect([...screen.getByTestId('control').classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'gap-1']),
  );
  expect([...screen.getByRole('button', { name: 'Minimize window' }).classList]).toEqual(
    expect.arrayContaining(['size-control-sm', 'border']),
  );
  expect([...screen.getByTestId('drag-indicator').classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'flex-none']),
  );
  expect([...screen.getByTestId('body').classList]).toEqual(
    expect.arrayContaining(['p-4', 'text-sm']),
  );
  expect([...screen.getByTestId('footer').classList]).toEqual(
    expect.arrayContaining(['border-t', 'px-3', 'py-1', 'text-xs']),
  );

  await expect
    .element(page.locator('[data-slot="floating-panel-content"]'))
    .toHaveCSS('min-height', '0px');
  await expect
    .element(page.locator('[data-slot="floating-panel-content"]'))
    .toHaveCSS('min-width', '0px');
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
  expect([...refs.close.value!.$el.classList]).toEqual(
    expect.arrayContaining(['size-control-sm', 'border', 'bg-background']),
  );
  expect(Boolean(refs.close.value?.$el.querySelector('svg')?.isConnected)).toBe(true);
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