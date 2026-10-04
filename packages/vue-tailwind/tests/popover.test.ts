import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
  usePopoverContext,
} from '../src';

const popoverComponents = {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
};

const PopoverSurface = defineComponent({
  components: popoverComponents,
  template: `
    <PopoverPositioner>
      <PopoverContent data-testid="content">
        <PopoverArrow />
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>Latest updates</PopoverDescription>
          <PopoverCloseIcon />
        </PopoverHeader>
        <PopoverBody>Updates are ready.</PopoverBody>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  `,
});

test('preserves open-change details, v-model, and focus restoration', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup() {
      const open = ref(false);
      return {
        details,
        onOpenChange: (detail: { open: boolean }) => details.push(detail),
        open,
      };
    },
    template: `
      <Popover v-model:open="open" :portalled="false" @open-change="onOpenChange">
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverSurface />
      </Popover>
    `,
  });

  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open popover' });
  trigger.focus();
  await fireEvent.click(trigger);
  await screen.findByTestId('content');
  await fireEvent.click(
    document.querySelector('[data-slot="popover-close-trigger"]') as HTMLElement,
  );
  await waitFor(() => {
    expect(details).toEqual([{ open: true }, { open: false }]);
    expect(trigger).toHaveFocus();
  });
});

test('closes on Escape and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<Popover><PopoverTrigger>Open popover</PopoverTrigger><PopoverSurface /></Popover>`,
  });

  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open popover' });
  trigger.focus();
  await fireEvent.click(trigger);
  await screen.findByTestId('content');
  await fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('portals overlays outside the root tree by default', () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<Popover default-open><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover>`,
  });

  const { container } = render(Harness);
  expect(within(container as HTMLElement).queryByTestId('content')).not.toBeInTheDocument();
  expect(screen.getByTestId('content')).toBeInTheDocument();
});

test('supports a custom portal target and renders inline when disabled', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      return { getPortal: () => portalTarget.value, portalTarget };
    },
    template: `
      <div><div ref="portalTarget" data-testid="portal"></div><Popover default-open :portal-ref="getPortal"><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover></div>
    `,
  });

  const { unmount } = render(Harness);
  await waitFor(() =>
    expect(screen.getByTestId('portal')).toContainElement(screen.getByTestId('content')),
  );
  unmount();

  const Inline = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<div data-testid="host"><Popover default-open :portalled="false"><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover></div>`,
  });
  render(Inline);
  expect(within(screen.getByTestId('host')).getByTestId('content')).toBeInTheDocument();
});

test('keeps modal popovers portalled and exposes modal accessibility state', () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<div data-testid="host"><Popover default-open modal :portalled="false"><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover></div>`,
  });

  const { container } = render(Harness);
  expect(within(container as HTMLElement).queryByTestId('content')).not.toBeInTheDocument();
  expect(screen.getByTestId('content')).toHaveAttribute('aria-modal', 'true');
});

test('connects RootProvider, hook state, and Context slots', async () => {
  const StateFromHook = defineComponent({
    setup() {
      return { popover: usePopoverContext() };
    },
    template: '<output>Hook: {{ popover.open ? "open" : "closed" }}</output>',
  });
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface, StateFromHook },
    setup() {
      return { popover: usePopover({ portalled: false }) };
    },
    template: `
      <PopoverRootProvider :value="popover">
        <button type="button" @click="popover.setOpen(true)">Open from API</button>
        <PopoverContext v-slot="context"><output>Slot: {{ context.open ? 'open' : 'closed' }}</output></PopoverContext>
        <PopoverTrigger>Open popover</PopoverTrigger><PopoverSurface /><StateFromHook />
      </PopoverRootProvider>
    `,
  });

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open from API' }));
  await waitFor(() => {
    expect(screen.getByText('Slot: open')).toBeInTheDocument();
    expect(screen.getByText('Hook: open')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});

test('reports trigger value details and current trigger state', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <Popover :portalled="false" @trigger-value-change="value = $event.value ?? ''">
        <PopoverTrigger value="first">First</PopoverTrigger><PopoverTrigger value="second">Second</PopoverTrigger><PopoverSurface />
      </Popover><output>{{ value }}</output>
    `,
  });

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Second' }));
  await waitFor(() => expect(screen.getByText('second')).toBeInTheDocument());
  expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('data-current');
});

test('forwards refs, attrs, classes, and native asChild hosts across the anatomy', () => {
  const refs = {
    anchor: ref<ComponentPublicInstance>(),
    arrow: ref<ComponentPublicInstance>(),
    arrowTip: ref<ComponentPublicInstance>(),
    body: ref<ComponentPublicInstance>(),
    closeIcon: ref<ComponentPublicInstance>(),
    closeTrigger: ref<ComponentPublicInstance>(),
    content: ref<ComponentPublicInstance>(),
    description: ref<ComponentPublicInstance>(),
    footer: ref<ComponentPublicInstance>(),
    header: ref<ComponentPublicInstance>(),
    indicator: ref<ComponentPublicInstance>(),
    positioner: ref<ComponentPublicInstance>(),
    title: ref<ComponentPublicInstance>(),
    trigger: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: popoverComponents,
    setup() {
      return refs;
    },
    template: `
      <Popover default-open :portalled="false">
        <PopoverAnchor ref="anchor">Reference</PopoverAnchor><PopoverTrigger ref="trigger">Open</PopoverTrigger>
        <PopoverTrigger as-child><a href="/profile">Composed trigger</a></PopoverTrigger><PopoverIndicator ref="indicator">!</PopoverIndicator>
        <PopoverPositioner ref="positioner"><PopoverContent ref="content">
          <PopoverArrow ref="arrow"><PopoverArrowTip ref="arrowTip" /></PopoverArrow>
          <PopoverHeader ref="header"><PopoverTitle ref="title">Title</PopoverTitle><PopoverDescription ref="description">Description</PopoverDescription><PopoverCloseIcon ref="closeIcon" /></PopoverHeader>
          <PopoverBody ref="body">Body</PopoverBody><PopoverFooter ref="footer"><PopoverCloseTrigger ref="closeTrigger">Close</PopoverCloseTrigger></PopoverFooter>
        </PopoverContent></PopoverPositioner>
      </Popover>
    `,
  });

  render(Harness);
  const slots = {
    anchor: 'popover-anchor',
    arrow: 'popover-arrow',
    arrowTip: 'popover-arrow-tip',
    body: 'popover-body',
    closeIcon: 'popover-close-icon',
    closeTrigger: 'popover-close-trigger',
    content: 'popover-content',
    description: 'popover-description',
    footer: 'popover-footer',
    header: 'popover-header',
    indicator: 'popover-indicator',
    positioner: 'popover-positioner',
    title: 'popover-title',
    trigger: 'popover-trigger',
  } as const;
  for (const [name, slot] of Object.entries(slots)) {
    expect(refs[name as keyof typeof refs].value?.$el).toHaveAttribute('data-slot', slot);
  }
  expect(screen.getByRole('link', { name: 'Composed trigger' })).toHaveAttribute(
    'data-slot',
    'popover-trigger',
  );
});

test('lets consumer Tailwind utilities win', () => {
  const Harness = defineComponent({
    components: popoverComponents,
    template: `
      <Popover default-open :portalled="false"><PopoverTrigger class="bg-primary px-2">Open</PopoverTrigger><PopoverPositioner><PopoverContent class="w-96 bg-card p-4" data-testid="content"><PopoverHeader><PopoverTitle>Title</PopoverTitle><PopoverDescription>Description</PopoverDescription><PopoverCloseIcon class="size-8 rounded-full bg-primary" /></PopoverHeader><PopoverBody>Body</PopoverBody><PopoverFooter>Footer</PopoverFooter></PopoverContent></PopoverPositioner></Popover>
    `,
  });

  render(Harness);
  expect(screen.getByRole('button', { name: 'Open' })).toHaveClass('bg-primary', 'px-2');
  expect(screen.getByRole('button', { name: 'Open' })).not.toHaveClass('bg-background', 'px-3.5');
  expect(screen.getByTestId('content')).toHaveClass('w-96', 'bg-card', 'p-4');
  expect(screen.getByTestId('content')).not.toHaveClass('bg-popover', 'p-6');
  expect(screen.getByRole('button', { name: 'Close popover' })).toHaveClass(
    'size-8',
    'rounded-full',
    'bg-primary',
  );
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const SsrPopover = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<Popover default-open :portalled="false"><PopoverTrigger>Open popover</PopoverTrigger><PopoverSurface /></Popover>`,
  });
  const markup = await renderToString(createSSRApp(SsrPopover));
  expect(markup).toContain('data-slot="popover-trigger"');
  expect(markup).toContain('data-slot="popover-content"');
  const container = document.createElement('div');
  container.innerHTML = markup;
  document.body.append(container);
  const app = createSSRApp(SsrPopover);
  app.mount(container);
  expect(container.querySelector('[data-slot="popover-content"]')).toBeInTheDocument();
  expect(container.querySelector('[data-slot="popover-title"]')).toHaveAttribute(
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
    components: popoverComponents,
    setup: () => ({ label, labelledby, custom }),
    template: `
      <Popover default-open :portalled="false">
        <PopoverPositioner><PopoverContent>
          <PopoverTitle>Preview</PopoverTitle>
          <PopoverCloseIcon :aria-label="label" :aria-labelledby="labelledby"
            class="consumer-close" style="color: red" title="Dismiss preview" data-testid="close">
            <template v-if="custom" #default><span>Custom close</span></template>
          </PopoverCloseIcon>
        </PopoverContent></PopoverPositioner>
      </Popover>
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
    expect(button).toHaveAttribute('aria-label', 'Close popover');
  });
  label.value = '';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', ''));
  custom.value = true;
  await waitFor(() => expect(screen.getByTestId('close')).toHaveTextContent('Custom close'));
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await waitFor(() => expect(screen.getByTestId('close').querySelector('svg')).toBeInTheDocument());
});