import { DrawerRootProvider as ArkDrawerRootProvider } from '@ark-ui/vue/drawer';
import { expect, rs, test } from '@rstest/core';
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

test('keeps non-modal drawers interactive and renders inline', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<div data-testid="host"><Drawer default-open :modal="false" :portalled="false"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerCloseTrigger>Close drawer</DrawerCloseTrigger></DrawerContent></DrawerPositioner></Drawer></div>',
  });
  render(Harness);
  expect(within(screen.getByTestId('host')).getByRole('dialog')).toHaveStyle({
    pointerEvents: 'auto',
  });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });

  await fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
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

test.each([
  ['moduix', DrawerRootProvider],
  ['Ark', ArkDrawerRootProvider],
] as const)('preserves native RootProvider presence callbacks (%s)', async (_name, Provider) => {
  const enterComplete = rs.fn();
  const exitComplete = rs.fn();
  const Harness = defineComponent({
    components: { ...drawerComponents, Provider },
    setup: () => ({ drawer: useDrawer(), enterComplete, exitComplete }),
    template: `
      <button type="button" @click="drawer.setOpen(true)">Open via API</button>
      <Provider
        :value="drawer"
        @enter-complete="enterComplete"
        @exit-complete="exitComplete"
      >
        <DrawerPositioner>
          <DrawerContent>
            <DrawerTitle>Provider lifecycle</DrawerTitle>
            <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
          </DrawerContent>
        </DrawerPositioner>
      </Provider>
    `,
  });

  render(Harness);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(enterComplete).not.toHaveBeenCalled();
  expect(exitComplete).not.toHaveBeenCalled();

  for (const count of [1, 2]) {
    await fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));
    await screen.findByRole('dialog', { name: 'Provider lifecycle' });
    // Ark Presence skips enter completion for its first mount.
    if (count > 1) {
      await waitFor(() => expect(enterComplete).toHaveBeenCalledTimes(count - 1));
    } else {
      expect(enterComplete).not.toHaveBeenCalled();
    }

    await fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(exitComplete).toHaveBeenCalledTimes(count);
    });
  }
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
  expect(screen.getByRole('dialog')).toHaveClass(
    '[--drawer-island-translate-distance:0px]',
    '[--_drawer-bleed:var(--moduix-size-xl)]',
    'data-[swipe-direction=left]:after:inset-y-0',
    'data-[swipe-direction=right]:after:inset-y-0',
    '[transition:transform_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_cubic-bezier(0,0,0.2,1),scale_var(--moduix-duration-slower)_cubic-bezier(0.32,0.72,0,1),translate_var(--moduix-duration-slower)_cubic-bezier(0.32,0.72,0,1)]',
  );
  expect(screen.getByRole('dialog')).not.toHaveClass('bg-popover', 'p-6');
  expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveClass(
    'size-8',
    'rounded-full',
    'bg-primary',
  );
  expect(document.querySelector('[data-slot="drawer-backdrop"]')).toHaveClass('fixed', 'inset-0');
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

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const label = ref<string | undefined>('Dismiss first');
  const labelledby = ref<string | undefined>();
  const custom = ref(false);
  render({
    components: drawerComponents,
    setup: () => ({ label, labelledby, custom }),
    template: `
      <Drawer default-open :portalled="false">
        <DrawerPositioner><DrawerContent>
          <DrawerTitle>Preview</DrawerTitle>
          <DrawerCloseIcon :aria-label="label" :aria-labelledby="labelledby"
            class="consumer-close" style="color: red" title="Dismiss preview" data-testid="close">
            <template v-if="custom" #default><span>Custom close</span></template>
          </DrawerCloseIcon>
        </DrawerContent></DrawerPositioner>
      </Drawer>
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
    expect(button).toHaveAttribute('aria-label', 'Close drawer');
  });
  label.value = '';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', ''));
  custom.value = true;
  await waitFor(() => expect(screen.getByTestId('close')).toHaveTextContent('Custom close'));
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await waitFor(() => expect(screen.getByTestId('close').querySelector('svg')).toBeInTheDocument());
});