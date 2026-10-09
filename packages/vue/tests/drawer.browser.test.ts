import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
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
import TestDrawer from './fixtures/TestDrawer.vue';

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
      '<Drawer default-open :modal="false" :portalled="false"><DrawerTrigger>Toggle drawer</DrawerTrigger><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerCloseTrigger>Close drawer</DrawerCloseTrigger></DrawerContent></DrawerPositioner></Drawer>',
  });
  const { container } = render(Harness);
  expect(container.querySelector('[role="dialog"]')).not.toBeNull();
  await expect.element(page.getByRole('dialog')).toHaveCSS('pointer-events', 'auto');
  await expect
    .element(page.locator('[data-slot="drawer-positioner"]'))
    .toHaveCSS('pointer-events', 'none');

  await page.getByRole('button', { name: 'Toggle drawer' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Toggle drawer' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close drawer' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('lazily mounts in the default portal, preserves open-change details, and restores focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: drawerComponents,
    setup: () => ({ details }),
    template: `
      <Drawer @open-change="details.push($event)">
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent></DrawerPositioner>
      </Drawer>
    `,
  });
  const { container } = render(Harness);
  const trigger = page.getByRole('button', { name: 'Open drawer' });
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toBeFocused();
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  expect(details).toEqual([{ open: true }]);
  await page.getByRole('dialog').press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
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
  await page.getByRole('button', { name: 'Open drawer' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.poll(() => details).toEqual([{ open: true }]);
  const close = page.getByRole('button', { name: 'Close drawer' });
  await expect.element(close).toBeFocused();
  await close.click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
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
  await expect.element(page.getByTestId('drawer-portal').getByRole('dialog')).toBeVisible();
});

test('opens a RootProvider drawer through its API and preserves context/presence callbacks', async () => {
  const enterComplete = rs.fn();
  const exitComplete = rs.fn();
  const Harness = defineComponent({
    components: drawerComponents,
    setup: () => ({ drawer: useDrawer(), enterComplete, exitComplete }),
    template: `
      <button type="button" @click="drawer.setOpen(true)">Open via API</button>
      <DrawerRootProvider :value="drawer" @enter-complete="enterComplete" @exit-complete="exitComplete">
        <DrawerPositioner><DrawerContent>
          <DrawerTitle>Provider lifecycle</DrawerTitle>
          <DrawerContext v-slot="drawer"><output>Open: {{ String(drawer.open) }}</output></DrawerContext>
          <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
        </DrawerContent></DrawerPositioner>
      </DrawerRootProvider>
    `,
  });
  render(Harness);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  expect(enterComplete).not.toHaveBeenCalled();
  expect(exitComplete).not.toHaveBeenCalled();
  for (const count of [1, 2]) {
    await page.getByRole('button', { name: 'Open via API' }).click();
    await expect.element(page.getByRole('dialog', { name: 'Provider lifecycle' })).toBeVisible();
    await expect.element(page.getByText('Open: true')).toBeVisible();
    // Ark Presence skips enter completion for its first mount.
    if (count > 1) {
      await expect.poll(() => enterComplete.mock.calls.length).toBe(count - 1);
    } else {
      expect(enterComplete).not.toHaveBeenCalled();
    }
    await page.getByRole('button', { name: 'Close drawer' }).click();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
    await expect.poll(() => exitComplete.mock.calls.length).toBe(count);
  }
});

test.each(['touch', 'mouse'])(
  'drags content outside the grabber and dismisses it (%s)',
  async (pointerType) => {
    const details: Array<{ open: boolean }> = [];
    const Harness = defineComponent({
      components: drawerComponents,
      setup: () => ({ details }),
      template: `
      <Drawer default-open @open-change="details.push($event)">
        <DrawerPositioner><DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle><div data-testid="drawer-body">Body</div>
        </DrawerContent></DrawerPositioner>
      </Drawer>
    `,
    });
    render(Harness);
    await expect.element(page.getByRole('dialog')).toBeFocused();
    const content = document.querySelector('[role="dialog"]')!;
    const body = document.querySelector('[data-testid="drawer-body"]')!;
    const { left, top, width } = body.getBoundingClientRect();
    const y = top + 2;
    const height = content.getBoundingClientRect().height;
    expect(height).toBeGreaterThan(0);
    // Rstest locators do not expose a pointer sequence with an explicit pointerType.
    const pointer = {
      bubbles: true,
      cancelable: true,
      button: 0,
      buttons: 1,
      pointerId: 1,
      pointerType,
      clientX: left + width / 2,
    };
    body.dispatchEvent(new PointerEvent('pointerdown', { ...pointer, clientY: y }));
    body.dispatchEvent(new PointerEvent('pointermove', { ...pointer, clientY: y + 60 }));
    await expect.element(page.getByRole('dialog')).toHaveAttribute('data-dragging', '');
    body.dispatchEvent(new PointerEvent('pointermove', { ...pointer, clientY: y + height }));
    body.dispatchEvent(
      new PointerEvent('pointerup', { ...pointer, buttons: 0, clientY: y + height }),
    );
    await expect.poll(() => details).toEqual([{ open: false }]);
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
  },
);

test('forwards a ref through native asChild composition', () => {
  const contentRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: drawerComponents,
    setup: () => ({ contentRef }),
    template:
      '<Drawer default-open :portalled="false"><DrawerPositioner><DrawerContent ref="contentRef" as-child><section><DrawerTitle>Preferences</DrawerTitle></section></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);

  expect(contentRef.value?.$el).toBe(document.querySelector('[role="dialog"]'));
  expect(contentRef.value?.$el.tagName).toBe('SECTION');
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
      '<DrawerStack><DrawerIndentBackground ref="indentBackground" /><Drawer default-open :portalled="false"><DrawerTrigger ref="trigger">Open</DrawerTrigger><DrawerTrigger as-child><button data-testid="composed">Composed</button></DrawerTrigger><DrawerIndent ref="indent"><span>Indent</span></DrawerIndent><DrawerBackdrop ref="backdrop" /><DrawerPositioner ref="positioner"><DrawerContent ref="content"><DrawerGrabber ref="grabber"><DrawerGrabberIndicator ref="indicator" /></DrawerGrabber><DrawerHeader ref="header"><DrawerTitle ref="title">Title</DrawerTitle><DrawerDescription ref="description">Description</DrawerDescription><DrawerCloseTrigger ref="closeTrigger">Close</DrawerCloseTrigger><DrawerCloseIcon ref="closeIcon" /></DrawerHeader><DrawerBody ref="body">Body</DrawerBody><DrawerFooter ref="footer">Footer</DrawerFooter></DrawerContent></DrawerPositioner><DrawerSwipeArea ref="swipeArea" /></Drawer></DrawerStack>',
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
    expect(refs[name as keyof typeof refs].value?.$el.getAttribute('data-slot')).toBe(slot);
  }
  expect(document.querySelector('[data-testid="composed"]')?.getAttribute('data-slot')).toBe(
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
  expect([...document.querySelector('[data-slot="drawer-trigger"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-trigger', styles.trigger]),
  );
  expect([...document.querySelector('[role="dialog"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-content', styles.content]),
  );
  expect([...document.querySelector('[data-slot="drawer-title"]')!.classList]).toEqual(
    expect.arrayContaining([styles.title]),
  );
  expect([...document.querySelector('[data-slot="drawer-description"]')!.classList]).toEqual(
    expect.arrayContaining([styles.description]),
  );
  expect([...document.querySelector('[data-slot="drawer-body"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-body', styles.body]),
  );
  expect([...document.querySelector('[data-slot="drawer-footer"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-footer', styles.footer]),
  );
  expect([...document.querySelector('[data-slot="drawer-close-icon"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-close', styles.closeIcon]),
  );
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer variant="island"><DrawerTrigger as-child><button type="button">Open drawer</button></DrawerTrigger><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><DrawerCloseIcon /></DrawerContent></DrawerPositioner><DrawerContext v-slot="drawer"><output data-testid="drawer-state">{{ drawer.swipeDirection }}:{{ drawer.snapPoints.join(",") }}:{{ String(drawer.snapPoint) }}</output></DrawerContext></Drawer>',
  });
  render(Harness);
  const trigger = page.getByRole('button', { name: 'Open drawer' });
  await trigger.click();

  await expect.element(page.getByRole('dialog')).toHaveAttribute('data-variant', 'island');
  expect(document.querySelector('[data-testid="drawer-state"]')?.textContent).toBe('down:1:1');
  await expect
    .element(page.locator('[data-slot="drawer-positioner"]'))
    .toHaveAttribute('data-swipe-direction', 'down');
  await page.getByRole('button', { name: 'Close drawer' }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('hydrates public anatomy without replacing server hosts or ids', async () => {
  const markup = await renderToString(createSSRApp(TestDrawer));
  const host = document.createElement('div');
  host.innerHTML = markup;
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-scope="drawer"]')];
  const serverIds = parts.map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestDrawer);
  try {
    app.mount(host);
    await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
    const hydratedParts = [...host.querySelectorAll('[data-scope="drawer"]')];
    expect(hydratedParts.map((element) => element.id)).toEqual(serverIds);
    hydratedParts.forEach((element, index) => expect(element).toBe(parts[index]));
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    await page.getByRole('button', { name: 'Close drawer' }).click();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', { name: 'Open drawer' }).click();
    await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
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
  const button = page.getByTestId('close');
  await expect.element(button).toBeVisible();
  const host = document.querySelector('[data-testid="close"]')!;
  expect(host.tagName).toBe('BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect([...host.classList]).toContain('consumer-close');
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toHaveCount(1);
  label.value = 'Dismiss second';
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close drawer');
  label.value = '';
  await expect.element(button).toHaveAttribute('aria-label', '');
  custom.value = true;
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  custom.value = false;
  await expect.element(button.locator('svg')).toHaveCount(1);
});