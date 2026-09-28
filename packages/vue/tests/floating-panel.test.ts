import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
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
import styles from '../src/components/floating-panel/FloatingPanel.module.css';

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
  await fireEvent.click(screen.getByRole('button', { name: 'Minimize window' }));

  await waitFor(() => expect(screen.getByTestId('footer')).toHaveAttribute('data-minimized'));
});

test('keeps Ark translations for default stage controls', () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template: `
      <FloatingPanel default-open :portalled="false" :default-size="{ width: 360, height: 260 }"
        :translations="{ minimize: 'Minimieren', maximize: 'Maximieren', restore: 'Wiederherstellen' }">
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger stage="minimized" />
              <FloatingPanelStageTrigger stage="maximized" />
            </FloatingPanelControl>
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });

  render(Harness);
  expect(screen.getByRole('button', { name: 'Minimieren' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Maximieren' })).toBeInTheDocument();
});

test('lazily mounts, closes on Escape, and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: rootComponents,
    template:
      '<FloatingPanel :portalled="false"><FloatingPanelTrigger as-child><button type="button">Open inspector</button></FloatingPanelTrigger><PanelContent /></FloatingPanel>',
  });

  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open inspector' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await fireEvent.click(trigger);
  const dialog = await screen.findByRole('dialog');
  expect(dialog).toHaveAttribute('data-slot', 'floating-panel-content');
  await fireEvent.keyDown(dialog, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
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
  await fireEvent.click(screen.getByRole('button', { name: 'Open controlled inspector' }));
  await screen.findByRole('dialog');
  await fireEvent.click(screen.getByRole('button', { name: 'Close Window' }));
  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
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
  await fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
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

  const { container } = render(Harness);
  expect(
    within(screen.getByTestId('inline-host')).getByRole('dialog', { name: 'Inline' }),
  ).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTestId('portal-host')).toContainElement(
      screen.getByRole('dialog', { name: 'Portalled' }),
    ),
  );
  expect(container).toBeInTheDocument();
});

test('exposes the current state through FloatingPanelContext', () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template:
      '<FloatingPanel default-open :portalled="false"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelContext v-slot="panel"><output>Open: {{ String(panel.open) }}</output></FloatingPanelContext></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>',
  });

  render(Harness);
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('preserves refs, anatomy hooks, default icons, and consumer classes', () => {
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
  expect(refs.trigger.value?.$el).toHaveAttribute('data-slot', 'floating-panel-trigger');
  expect(refs.positioner.value?.$el).toHaveAttribute('data-slot', 'floating-panel-positioner');
  expect(refs.content.value?.$el).toHaveAttribute('data-slot', 'floating-panel-content');
  expect(refs.header.value?.$el).toHaveAttribute('data-slot', 'floating-panel-header');
  expect(refs.title.value?.$el).toHaveAttribute('data-slot', 'floating-panel-title');
  expect(refs.footer.value?.$el).toHaveAttribute('data-slot', 'floating-panel-footer');
  expect(refs.indicator.value?.$el).toHaveAttribute('data-slot', 'floating-panel-drag-indicator');
  expect(refs.close.value?.$el).toHaveAttribute('data-slot', 'floating-panel-close-icon');
  expect(refs.close.value?.$el).toHaveClass(styles.controlButton);
  expect(refs.close.value?.$el.querySelector('svg')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Minimize window' })).toHaveClass(styles.controlButton);
  expect(screen.getByRole('button', { name: 'Open' })).toHaveClass('consumer-trigger');
  expect(screen.getByRole('dialog')).toHaveClass('consumer-content', styles.content);
});

test('renders and hydrates an open floating panel through Vue SSR', async () => {
  const App = defineComponent({
    components: floatingPanelComponents,
    template:
      '<FloatingPanel default-open :portalled="false"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelTitle>Hydrated panel</FloatingPanelTitle></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>',
  });

  const markup = await renderToString(createSSRApp(App));
  document.body.innerHTML = `<div id="floating-panel-app">${markup}</div>`;
  const host = document.querySelector('#floating-panel-app') as HTMLElement;
  const serverDialog = host.querySelector('[data-slot="floating-panel-content"]');
  const serverId = serverDialog?.getAttribute('id');
  const app = createSSRApp(App);
  app.mount(host, true);

  expect(host.querySelector('[data-slot="floating-panel-content"]')).toBe(serverDialog);
  expect(host.querySelector('[data-slot="floating-panel-content"]')).toHaveAttribute(
    'id',
    serverId,
  );
  app.unmount();
});