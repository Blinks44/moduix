import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
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
import TestPopover from './fixtures/TestPopover.vue';

// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.
test.skip('labels lazily mounted content with its title', async () => {
  render({
    components: { Popover, PopoverTrigger, PopoverPositioner, PopoverContent, PopoverTitle },
    template: `
      <Popover :portalled="false">
        <PopoverTrigger>Open preferences</PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent><PopoverTitle>Preferences</PopoverTitle></PopoverContent>
        </PopoverPositioner>
      </Popover>
    `,
  });
  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
});

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
  const trigger = page.getByRole('button', { name: 'Open popover' });
  await trigger.click();
  await expect.element(page.getByTestId('content')).toBeVisible();
  await page.locator('[data-slot="popover-close-trigger"]').click();
  await expect.element(page.getByTestId('content')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
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

test('portals overlays outside the root tree by default', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<Popover default-open><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover>`,
  });

  const { container } = render(Harness);
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  await expect.element(page.getByTestId('content')).toBeAttached();
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
  const first = page.getByRole('button', { name: 'First' });
  const second = page.getByRole('button', { name: 'Second' });
  await second.click();
  await expect.element(page.getByText('second', { exact: true })).toBeAttached();
  await expect.element(second).toHaveAttribute('data-current');
  await expect.element(first).not.toHaveAttribute('data-current');
  await first.click();
  await expect.element(page.getByText('first', { exact: true })).toBeAttached();
  await expect.element(first).toHaveAttribute('data-current');
  await expect.element(second).not.toHaveAttribute('data-current');
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
  expect(Array.from(trigger.classList)).not.toContain('bg-background');
  expect(Array.from(trigger.classList)).not.toContain('px-3.5');
  expect(Array.from(content.classList)).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
  expect(Array.from(content.classList)).not.toContain('bg-popover');
  expect(Array.from(content.classList)).not.toContain('p-6');
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

test('hydrates the open popover without replacing hosts or generated IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestPopover));
  document.body.append(host);
  const trigger = host.querySelector('[data-slot="popover-trigger"]')!;
  const content = host.querySelector('[data-slot="popover-content"]')!;
  const titleId = host.querySelector('[data-slot="popover-title"]')!.id;
  const app = createSSRApp(TestPopover);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="popover-trigger"]')).toBe(trigger);
    expect(host.querySelector('[data-slot="popover-content"]')).toBe(content);
    expect(titleId).not.toBe('');
    expect(host.querySelector('[data-slot="popover-title"]')!.id).toBe(titleId);
    await expect.element(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close popover' }).click();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
    await expect.element(page.getByRole('button', { name: 'Open popover' })).toBeFocused();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
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
  const button = page.getByTestId('close');
  await expect.element(button).toHaveJSProperty('tagName', 'BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect(Array.from(document.querySelector('[data-testid="close"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-close']),
  );
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toBeAttached();
  label.value = 'Dismiss second';
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close popover');
  label.value = '';
  await expect.element(button).toHaveAttribute('aria-label', '');
  custom.value = true;
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  custom.value = false;
  await expect.element(button.locator('svg')).toBeAttached();
});