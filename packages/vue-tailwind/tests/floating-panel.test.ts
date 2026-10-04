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
        <FloatingPanelPositioner><FloatingPanelContent><FloatingPanelControl>
          <FloatingPanelStageTrigger stage="minimized" />
          <FloatingPanelStageTrigger stage="maximized" />
        </FloatingPanelControl></FloatingPanelContent></FloatingPanelPositioner>
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

  render(Harness);
  expect(
    within(screen.getByTestId('inline-host')).getByRole('dialog', { name: 'Inline' }),
  ).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTestId('portal-host')).toContainElement(
      screen.getByRole('dialog', { name: 'Portalled' }),
    ),
  );
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

test('keeps consumer classes last on component parts and utility classes on empty parts', () => {
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
  expect(content).toHaveClass('min-h-0', 'min-w-0');
  expect(content).not.toHaveClass('min-h-40', 'min-w-64');
  expect(screen.getByTestId('header')).toHaveClass('min-h-control-xl', 'bg-muted', 'border-b');
  expect(screen.getByTestId('control')).toHaveClass('inline-flex', 'gap-1');
  expect(screen.getByRole('button', { name: 'Minimize window' })).toHaveClass(
    'size-control-sm',
    'border',
  );
  expect(screen.getByTestId('drag-indicator')).toHaveClass('inline-flex', 'flex-none');
  expect(screen.getByTestId('body')).toHaveClass('p-4', 'text-sm');
  expect(screen.getByTestId('footer')).toHaveClass('border-t', 'px-3', 'py-1', 'text-xs');
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
  expect(refs.trigger.value?.$el).toHaveAttribute('data-slot', 'floating-panel-trigger');
  expect(refs.positioner.value?.$el).toHaveAttribute('data-slot', 'floating-panel-positioner');
  expect(refs.content.value?.$el).toHaveAttribute('data-slot', 'floating-panel-content');
  expect(refs.close.value?.$el).toHaveAttribute('data-slot', 'floating-panel-close-icon');
  expect(refs.close.value?.$el).toHaveClass('size-control-sm', 'border', 'bg-background');
  expect(refs.close.value?.$el.querySelector('svg')).toBeInTheDocument();
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
  const button = await screen.findByTestId('close');
  expect(button.tagName).toBe('BUTTON');
  expect(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect(button).toHaveClass('consumer-close');
  expect(button).toHaveStyle({ color: 'red' });
  expect(button).toHaveAttribute('title', 'Dismiss preview');
  expect(button.querySelector('svg')).toBeInTheDocument();
  label.value = 'Dismiss second';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', 'Dismiss second'));
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await waitFor(() => {
    expect(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
    expect(button).toHaveAttribute('aria-label', 'Close panel');
  });
  label.value = '';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', ''));
  button.focus();
  custom.value = true;
  await waitFor(() => expect(screen.getByTestId('close')).toHaveTextContent('Custom close'));
  expect(screen.getByTestId('close')).toBe(button);
  expect(button).toHaveFocus();
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await waitFor(() => expect(screen.getByTestId('close').querySelector('svg')).toBeInTheDocument());
  expect(screen.getByTestId('close')).toBe(button);
  expect(button).toHaveFocus();
});