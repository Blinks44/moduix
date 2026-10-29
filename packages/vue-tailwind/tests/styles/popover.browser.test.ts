import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
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
} from '@/index';

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

test('closes on Escape and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<Popover><PopoverTrigger>Open popover</PopoverTrigger><PopoverSurface /></Popover>`,
  });

  render(Harness);
  const trigger = page.getByRole('button', { name: 'Open popover' });
  await trigger.click();
  const closeIcon = page.getByRole('button', { name: 'Close popover' });
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.press('Escape');
  await expect.element(page.getByTestId('content')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
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
  await expect.element(page.getByTestId('portal').getByTestId('content')).toBeAttached();
  unmount();

  const Inline = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<div data-testid="host"><Popover default-open :portalled="false"><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover></div>`,
  });
  render(Inline);
  await expect.element(page.getByTestId('host').getByTestId('content')).toBeAttached();
});

test('keeps modal popovers portalled and exposes modal accessibility state', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<div data-testid="host"><Popover default-open modal :portalled="false"><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover></div>`,
  });

  const { container } = render(Harness);
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  await expect.element(page.getByTestId('content')).toHaveAttribute('aria-modal', 'true');
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
  await expect.element(page.getByText('Slot: closed')).toBeAttached();
  await expect.element(page.getByText('Hook: closed')).toBeAttached();
  await page.getByRole('button', { name: 'Open from API' }).click();
  await expect.element(page.getByText('Slot: open')).toBeAttached();
  await expect.element(page.getByText('Hook: open')).toBeAttached();
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('forwards refs, attrs, classes, and native asChild hosts across the anatomy', async () => {
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
    expect(refs[name as keyof typeof refs].value?.$el?.getAttribute('data-slot')).toBe(slot);
  }
  await expect
    .element(page.getByRole('link', { name: 'Composed trigger' }))
    .toHaveAttribute('data-slot', 'popover-trigger');
});

test('lets consumer Tailwind utilities win', async () => {
  const Harness = defineComponent({
    components: popoverComponents,
    template: `
      <Popover default-open :portalled="false"><PopoverTrigger class="bg-primary px-2">Open</PopoverTrigger><PopoverPositioner><PopoverContent class="w-96 bg-card p-4" data-testid="content"><PopoverHeader><PopoverTitle>Title</PopoverTitle><PopoverDescription>Description</PopoverDescription><PopoverCloseIcon class="size-8 rounded-full bg-primary" /></PopoverHeader><PopoverBody>Body</PopoverBody><PopoverFooter>Footer</PopoverFooter></PopoverContent></PopoverPositioner></Popover>
    `,
  });

  render(Harness);
  const trigger = document.querySelector('[data-slot="popover-trigger"]')!;
  const content = document.querySelector('[data-slot="popover-content"]')!;
  const closeIcon = document.querySelector('[data-slot="popover-close-icon"]')!;
  expect(Array.from(trigger.classList)).toEqual(expect.arrayContaining(['bg-primary', 'px-2']));
  expect(Array.from(content.classList)).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
  expect(Array.from(closeIcon.classList)).toEqual(
    expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
  );
  await expect.element(page.getByTestId('content')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Open', exact: true }))
    .toHaveCSS('padding-left', '8px');
  await expect
    .element(page.getByRole('button', { name: 'Close popover' }))
    .toHaveCSS('width', '32px');
});