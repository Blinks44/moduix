import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContext,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  useDrawer,
} from '../src';
import styles from '../src/components/drawer/Drawer.module.css';

const drawerComponents = {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContext,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
};

test('keeps page interaction available for a non-modal drawer', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open :modal="false" :portalled="false"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerCloseTrigger>Close drawer</DrawerCloseTrigger></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });

  await fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      return { onOpenChange: (detail: { open: boolean }) => details.push(detail) };
    },
    template:
      '<Drawer @open-change="onOpenChange"><DrawerTrigger>Open drawer</DrawerTrigger><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
  await waitFor(() => expect(details).toEqual([{ open: true }]));
  await fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('closes on Escape and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer><DrawerTrigger>Open drawer</DrawerTrigger><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  trigger.focus();
  await fireEvent.click(trigger);
  await fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('supports controlled open state and v-model', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      const open = ref(false);
      return {
        onOpenChange: (detail: { open: boolean }) => details.push(detail),
        open,
      };
    },
    template:
      '<Drawer v-model:open="open" :portalled="false" @open-change="onOpenChange"><DrawerTrigger>Open drawer</DrawerTrigger><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerCloseTrigger>Close drawer</DrawerCloseTrigger></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
  await screen.findByRole('dialog');
  await fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
});

test('renders overlays inline and portals by default', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<div data-testid="drawer-host"><Drawer default-open :portalled="false"><DrawerPositioner><DrawerContent><DrawerTitle>Inline</DrawerTitle></DrawerContent></DrawerPositioner></Drawer><Drawer default-open><DrawerPositioner><DrawerContent><DrawerTitle>Portalled</DrawerTitle></DrawerContent></DrawerPositioner></Drawer></div>',
  });
  const { container } = render(Harness);
  expect(
    within(screen.getByTestId('drawer-host')).getByRole('dialog', { name: 'Inline' }),
  ).toBeInTheDocument();
  expect(
    within(container as HTMLElement).getByRole('dialog', { name: 'Inline' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('dialog', { name: 'Portalled' })).toBeInTheDocument();
});

test('portals overlays into portalRef when provided', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      return { portalTarget, getPortal: () => portalTarget.value };
    },
    template:
      '<div><div ref="portalTarget" data-testid="drawer-portal"></div><Drawer default-open :portal-ref="getPortal"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent></DrawerPositioner></Drawer></div>',
  });
  render(Harness);
  await waitFor(() =>
    expect(screen.getByTestId('drawer-portal')).toContainElement(screen.getByRole('dialog')),
  );
});

test('exposes the current state through DrawerContext', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open :portalled="false"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerContext v-slot="drawer"><output>Open: {{ String(drawer.open) }}</output></DrawerContext></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('opens a RootProvider drawer from external state', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      return { drawer: useDrawer() };
    },
    template:
      '<div><button type="button" @click="drawer.setOpen(true)">Open via API</button><DrawerRootProvider :value="drawer"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent></DrawerPositioner></DrawerRootProvider></div>',
  });
  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('starts content dragging outside the grabber by default', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><div data-testid="drawer-body">Body</div></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);

  const content = await screen.findByRole('dialog');
  const body = screen.getByTestId('drawer-body');

  await fireEvent.pointerDown(body, {
    button: 0,
    clientX: 100,
    clientY: 100,
    pointerId: 1,
    pointerType: 'touch',
  });
  await fireEvent.pointerMove(body, {
    clientX: 100,
    clientY: 160,
    pointerId: 1,
    pointerType: 'touch',
  });

  await waitFor(() => expect(content).toHaveAttribute('data-dragging'));
});

test('forwards a ref through native asChild composition', () => {
  const contentRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: drawerComponents,
    setup: () => ({ contentRef }),
    template:
      '<Drawer default-open :portalled="false"><DrawerPositioner><DrawerContent ref="contentRef" as-child><section><DrawerTitle>Preferences</DrawerTitle></section></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);

  expect(contentRef.value?.$el).toBe(screen.getByRole('dialog'));
  expect(contentRef.value?.$el).toHaveProperty('tagName', 'SECTION');
});

test('forwards refs through every public part and supports asChild', () => {
  const refs = {
    trigger: ref<ComponentPublicInstance>(),
    backdrop: ref<ComponentPublicInstance>(),
    positioner: ref<ComponentPublicInstance>(),
    content: ref<ComponentPublicInstance>(),
    grabber: ref<ComponentPublicInstance>(),
    indicator: ref<ComponentPublicInstance>(),
    title: ref<ComponentPublicInstance>(),
    description: ref<ComponentPublicInstance>(),
    closeTrigger: ref<ComponentPublicInstance>(),
    closeIcon: ref<ComponentPublicInstance>(),
    swipeArea: ref<ComponentPublicInstance>(),
    indent: ref<ComponentPublicInstance>(),
    indentBackground: ref<ComponentPublicInstance>(),
    header: ref<ComponentPublicInstance>(),
    body: ref<ComponentPublicInstance>(),
    footer: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      return refs;
    },
    template:
      '<DrawerStack><DrawerIndentBackground ref="indentBackground" /><Drawer default-open :portalled="false"><DrawerTrigger ref="trigger">Open</DrawerTrigger><DrawerTrigger as-child><button>Composed</button></DrawerTrigger><DrawerIndent ref="indent"><span>Indent</span></DrawerIndent><DrawerBackdrop ref="backdrop" /><DrawerPositioner ref="positioner"><DrawerContent ref="content"><DrawerGrabber ref="grabber"><DrawerGrabberIndicator ref="indicator" /></DrawerGrabber><DrawerHeader ref="header"><DrawerTitle ref="title">Title</DrawerTitle><DrawerDescription ref="description">Description</DrawerDescription><DrawerCloseTrigger ref="closeTrigger">Close</DrawerCloseTrigger><DrawerCloseIcon ref="closeIcon" /></DrawerHeader><DrawerBody ref="body">Body</DrawerBody><DrawerFooter ref="footer">Footer</DrawerFooter></DrawerContent></DrawerPositioner><DrawerSwipeArea ref="swipeArea" /></Drawer></DrawerStack>',
  });
  render(Harness);
  for (const [name, slot] of Object.entries({
    trigger: 'drawer-trigger',
    backdrop: 'drawer-backdrop',
    positioner: 'drawer-positioner',
    content: 'drawer-content',
    grabber: 'drawer-grabber',
    indicator: 'drawer-grabber-indicator',
    title: 'drawer-title',
    description: 'drawer-description',
    closeTrigger: 'drawer-close-trigger',
    closeIcon: 'drawer-close-icon',
    swipeArea: 'drawer-swipe-area',
    indent: 'drawer-indent',
    indentBackground: 'drawer-indent-background',
    header: 'drawer-header',
    body: 'drawer-body',
    footer: 'drawer-footer',
  })) {
    expect(refs[name as keyof typeof refs].value?.$el).toHaveAttribute('data-slot', slot);
  }
  expect(screen.getByRole('button', { name: 'Composed' })).toHaveAttribute(
    'data-slot',
    'drawer-trigger',
  );
});

test('applies consumer classes after CSS Module defaults', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open :portalled="false"><DrawerTrigger class="consumer-trigger">Open drawer</DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent class="consumer-content"><DrawerHeader><DrawerTitle>Preferences</DrawerTitle><DrawerCloseIcon class="consumer-close" /><DrawerDescription>Description</DrawerDescription></DrawerHeader><DrawerBody class="consumer-body">Body</DrawerBody><DrawerFooter class="consumer-footer">Footer</DrawerFooter></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  expect(screen.getByRole('button', { name: 'Open drawer' })).toHaveClass(
    'consumer-trigger',
    styles.trigger,
  );
  expect(screen.getByRole('dialog')).toHaveClass('consumer-content', styles.content);
  expect(screen.getByRole('heading', { name: 'Preferences' })).toHaveClass(styles.title);
  expect(screen.getByText('Description')).toHaveClass(styles.description);
  expect(screen.getByText('Body')).toHaveClass('consumer-body', styles.body);
  expect(screen.getByText('Footer')).toHaveClass('consumer-footer', styles.footer);
  expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveClass(
    'consumer-close',
    styles.closeIcon,
  );
});

test('uses island defaults while preserving explicit snap points', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer variant="island" default-open :portalled="false"><DrawerPositioner><DrawerContent><DrawerTitle>Island</DrawerTitle><DrawerContext v-slot="drawer"><output>Snap: {{ String(drawer.snapPoint) }}</output></DrawerContext></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  expect(screen.getByRole('dialog')).toHaveAttribute('data-variant', 'island');
  expect(screen.getByText('Snap: 1')).toBeInTheDocument();
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer variant="island"><DrawerTrigger as-child><button type="button">Open drawer</button></DrawerTrigger><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerCloseIcon /></DrawerContent></DrawerPositioner><DrawerContext v-slot="drawer"><output data-testid="drawer-state">{{ drawer.swipeDirection }}:{{ drawer.snapPoints.join(",") }}:{{ String(drawer.snapPoint) }}</output></DrawerContext></Drawer>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  trigger.focus();
  await fireEvent.click(trigger);

  expect(await screen.findByRole('dialog')).toHaveAttribute('data-variant', 'island');
  expect(screen.getByTestId('drawer-state')).toHaveTextContent('down:1:1');
  expect(screen.getByRole('dialog').parentElement).toHaveAttribute('data-swipe-direction', 'down');
  await fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const SsrDrawer = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open :portalled="false"><DrawerTrigger>Open drawer</DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerDescription>Description</DrawerDescription></DrawerContent></DrawerPositioner></Drawer>',
  });
  const markup = await renderToString(createSSRApp(SsrDrawer));
  expect(markup).toContain('data-slot="drawer-trigger"');
  expect(markup).toContain('data-slot="drawer-content"');
  const container = document.createElement('div');
  container.innerHTML = markup;
  document.body.append(container);
  const app = createSSRApp(SsrDrawer);
  app.mount(container);
  expect(container.querySelector('[data-slot="drawer-content"]')).toBeInTheDocument();
  expect(container.querySelector('[data-slot="drawer-title"]')).toHaveAttribute(
    'id',
    expect.any(String),
  );
  app.unmount();
  container.remove();
});