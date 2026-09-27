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
  DrawerPositioner,
  DrawerRootProvider,
  DrawerTitle,
  DrawerTrigger,
  useDrawer,
} from '../src';

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
  DrawerPositioner,
  DrawerRootProvider,
  DrawerTitle,
  DrawerTrigger,
};

test('preserves drawer behavior and Vue composition', async () => {
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
      '<Drawer v-model:open="open" :portalled="false" @open-change="onOpenChange"><DrawerTrigger>Open drawer</DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerHeader><DrawerTitle>Preferences</DrawerTitle><DrawerCloseIcon /><DrawerDescription>Description</DrawerDescription></DrawerHeader><DrawerBody>Body</DrawerBody><DrawerFooter><DrawerCloseTrigger>Close drawer</DrawerCloseTrigger></DrawerFooter></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  trigger.focus();
  await fireEvent.click(trigger);
  await screen.findByRole('dialog');
  expect(screen.getByRole('heading', { name: 'Preferences' })).toHaveClass(
    'text-lg',
    'font-semibold',
  );
  expect(screen.getByText('Description')).toHaveClass('text-md', 'text-muted-foreground');
  expect(screen.getByText('Body')).toHaveClass('mt-4', 'text-md');
  expect(document.querySelector('[data-slot="drawer-footer"]')).toHaveClass('mt-6', 'gap-2');
  await fireEvent.click(
    document.querySelector('[data-slot="drawer-close-trigger"]') as HTMLElement,
  );
  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
  expect(trigger).toHaveFocus();
});

test('keeps non-modal drawers interactive and renders inline', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<div data-testid="host"><Drawer default-open :modal="false" :portalled="false"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent></DrawerPositioner></Drawer></div>',
  });
  render(Harness);
  expect(within(screen.getByTestId('host')).getByRole('dialog')).toHaveStyle({
    pointerEvents: 'auto',
  });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('supports portalRef, context, RootProvider, refs, and asChild', async () => {
  const contentRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      const drawer = useDrawer({ defaultOpen: true });
      return { contentRef, drawer, getPortal: () => portalTarget.value, portalTarget };
    },
    template:
      '<div><div ref="portalTarget" data-testid="portal"></div><DrawerRootProvider :value="drawer" :portal-ref="getPortal"><DrawerBackdrop /><DrawerPositioner><DrawerContent ref="contentRef"><DrawerTitle>Preferences</DrawerTitle><DrawerContext v-slot="context"><output>Open: {{ context.open ? "true" : "false" }}</output></DrawerContext></DrawerContent></DrawerPositioner></DrawerRootProvider></div>',
  });
  render(Harness);
  await waitFor(() =>
    expect(screen.getByTestId('portal')).toContainElement(screen.getByRole('dialog')),
  );
  expect(screen.getByText('Open: true')).toBeInTheDocument();
  expect(contentRef.value?.$el).toBe(screen.getByRole('dialog'));
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
  };
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      return refs;
    },
    template:
      '<Drawer default-open :portalled="false"><DrawerTrigger ref="trigger">Open</DrawerTrigger><DrawerTrigger as-child><button>Composed</button></DrawerTrigger><DrawerBackdrop ref="backdrop" /><DrawerPositioner ref="positioner"><DrawerContent ref="content"><DrawerGrabber ref="grabber"><DrawerGrabberIndicator ref="indicator" /></DrawerGrabber><DrawerHeader><DrawerTitle ref="title">Title</DrawerTitle><DrawerDescription ref="description">Description</DrawerDescription><DrawerCloseTrigger ref="closeTrigger">Close</DrawerCloseTrigger><DrawerCloseIcon ref="closeIcon" /></DrawerHeader></DrawerContent></DrawerPositioner></Drawer>',
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
  })) {
    expect(refs[name as keyof typeof refs].value?.$el).toHaveAttribute('data-slot', slot);
  }
  expect(screen.getByRole('button', { name: 'Composed' })).toHaveAttribute(
    'data-slot',
    'drawer-trigger',
  );
});

test('lets consumer Tailwind utilities win', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open :portalled="false"><DrawerTrigger class="bg-primary px-2">Open drawer</DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent class="w-96 bg-card p-4"><DrawerHeader><DrawerTitle>Preferences</DrawerTitle><DrawerCloseIcon class="size-8 rounded-full bg-primary" /><DrawerDescription>Description</DrawerDescription></DrawerHeader><DrawerBody>Body</DrawerBody><DrawerFooter>Footer</DrawerFooter></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  expect(screen.getByRole('button', { name: 'Open drawer' })).toHaveClass('bg-primary', 'px-2');
  expect(screen.getByRole('button', { name: 'Open drawer' })).not.toHaveClass(
    'bg-background',
    'px-3.5',
  );
  expect(screen.getByRole('dialog')).toHaveClass('w-96', 'bg-card', 'p-4');
  expect(screen.getByRole('dialog')).not.toHaveClass('bg-popover', 'p-6');
  expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveClass(
    'size-8',
    'rounded-full',
    'bg-primary',
  );
  expect(document.querySelector('[data-slot="drawer-backdrop"]')).toHaveClass('fixed', 'inset-0');
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