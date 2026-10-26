import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
} from '../src';
import TestDialog from './fixtures/TestDialog.vue';

const dialogComponents = {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
};

test('preserves dialog behavior and Vue composition', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: dialogComponents,
    setup() {
      const open = ref(false);
      return {
        onOpenChange: (detail: { open: boolean }) => details.push(detail),
        open,
      };
    },
    template:
      '<Dialog v-model:open="open" :portalled="false" @open-change="onOpenChange"><DialogTrigger>Open dialog</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent><DialogHeader><DialogTitle>Preferences</DialogTitle><DialogCloseIcon /><DialogDescription>Description</DialogDescription></DialogHeader><DialogBody>Body</DialogBody><DialogFooter><DialogCloseTrigger>Close dialog</DialogCloseTrigger></DialogFooter></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.locator('[data-slot="dialog-close-trigger"]').click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(trigger).toBeFocused();
  await trigger.click();
  const closeIcon = page.locator('[data-slot="dialog-close-icon"]');
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }, { open: true }, { open: false }]);
});

test('keeps non-modal dialogs interactive and renders inline', async () => {
  const clicks: string[] = [];
  const Harness = defineComponent({
    components: dialogComponents,
    setup: () => ({ click: (target: string) => clicks.push(target) }),
    template:
      '<button type="button" @click="click(\'outside\')">Outside</button><div data-testid="host"><Dialog default-open :modal="false" :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><button type="button" @click="click(\'inside\')">Inside</button></DialogContent></DialogPositioner></Dialog></div>',
  });
  render(Harness);
  await expect.element(page.getByTestId('host').getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Inside' }).click();
  await page.getByRole('button', { name: 'Outside' }).click();
  expect(clicks).toEqual(['inside', 'outside']);
});

test.each(['element', 'getter'] as const)(
  'supports portalRef, context, RootProvider, refs, and asChild (%s)',
  async (targetType) => {
    const contentRef = ref<ComponentPublicInstance>();
    const portalTarget = ref<HTMLElement>();
    const Harness = defineComponent({
      components: dialogComponents,
      setup() {
        const dialog = useDialog({ defaultOpen: true });
        return { contentRef, dialog, getPortal: () => portalTarget.value, portalTarget };
      },
      template: `<div><div ref="portalTarget" data-testid="portal"></div><DialogRootProvider :value="dialog" :portal-ref="${targetType === 'getter' ? 'getPortal' : 'portalTarget'}"><DialogBackdrop /><DialogPositioner><DialogContent ref="contentRef"><DialogTitle>Preferences</DialogTitle><DialogContext v-slot="context"><output>Open: {{ context.open ? "true" : "false" }}</output></DialogContext></DialogContent></DialogPositioner></DialogRootProvider></div>`,
    });
    render(Harness);
    await expect.element(page.getByTestId('portal').getByRole('dialog')).toBeAttached();
    await expect.element(page.getByText('Open: true')).toBeAttached();
    expect(contentRef.value?.$el).toBe(document.querySelector('[role="dialog"]'));
  },
);

test('forwards refs through every public part and supports asChild', async () => {
  const refs = {
    trigger: ref<ComponentPublicInstance>(),
    backdrop: ref<ComponentPublicInstance>(),
    positioner: ref<ComponentPublicInstance>(),
    content: ref<ComponentPublicInstance>(),
    title: ref<ComponentPublicInstance>(),
    description: ref<ComponentPublicInstance>(),
    closeTrigger: ref<ComponentPublicInstance>(),
    closeIcon: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: dialogComponents,
    setup() {
      return refs;
    },
    template:
      '<Dialog default-open :portalled="false"><DialogTrigger ref="trigger">Open</DialogTrigger><DialogTrigger as-child><button>Composed</button></DialogTrigger><DialogBackdrop ref="backdrop" /><DialogPositioner ref="positioner"><DialogContent ref="content"><DialogTitle ref="title">Title</DialogTitle><DialogDescription ref="description">Description</DialogDescription><DialogCloseTrigger ref="closeTrigger">Close</DialogCloseTrigger><DialogCloseIcon ref="closeIcon" /></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  for (const [name, slot] of Object.entries({
    trigger: 'dialog-trigger',
    backdrop: 'dialog-backdrop',
    positioner: 'dialog-positioner',
    content: 'dialog-content',
    title: 'dialog-title',
    description: 'dialog-description',
    closeTrigger: 'dialog-close-trigger',
    closeIcon: 'dialog-close-icon',
  })) {
    expect(refs[name as keyof typeof refs].value?.$el?.getAttribute('data-slot')).toBe(slot);
  }
  await expect
    .element(page.getByRole('button', { name: 'Composed', includeHidden: true }))
    .toHaveAttribute('data-slot', 'dialog-trigger');
});

test('lets consumer Tailwind utilities override part defaults', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogPositioner><DialogContent class="p-4"><DialogTitle>Preferences</DialogTitle><DialogCloseIcon class="size-8" /></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  await expect.element(page.getByRole('dialog')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close dialog' }))
    .toHaveCSS('width', '32px');
});

test('hydrates the open dialog without replacing hosts or generated IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestDialog));
  document.body.append(host);
  const trigger = host.querySelector('[data-slot="dialog-trigger"]')!;
  const content = host.querySelector('[data-slot="dialog-content"]')!;
  const titleId = host.querySelector('[data-slot="dialog-title"]')!.id;
  const app = createSSRApp(TestDialog);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="dialog-trigger"]')).toBe(trigger);
    expect(host.querySelector('[data-slot="dialog-content"]')).toBe(content);
    expect(titleId).not.toBe('');
    expect(host.querySelector('[data-slot="dialog-title"]')!.id).toBe(titleId);
    await expect.element(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
    await expect.element(page.getByRole('button', { name: 'Open dialog' })).toBeFocused();
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
    components: dialogComponents,
    setup: () => ({ label, labelledby, custom }),
    template: `
      <Dialog default-open :portalled="false">
        <DialogPositioner><DialogContent>
          <DialogTitle>Preview</DialogTitle>
          <DialogCloseIcon :aria-label="label" :aria-labelledby="labelledby"
            class="consumer-close" style="color: red" title="Dismiss preview" data-testid="close">
            <template v-if="custom" #default><span>Custom close</span></template>
          </DialogCloseIcon>
        </DialogContent></DialogPositioner>
      </Dialog>
    `,
  });
  const button = page.getByTestId('close');
  await expect.element(button).toHaveJSProperty('tagName', 'BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toBeAttached();
  label.value = 'Dismiss second';
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close dialog');
  label.value = '';
  await expect.element(button).toHaveAttribute('aria-label', '');
  custom.value = true;
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  custom.value = false;
  await expect.element(button.locator('svg')).toBeAttached();
});
test('mounts the content lazily and unmounts it after closing by default', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);

  const content = page.locator('[data-slot="dialog-content"]');
  await expect.element(content).toHaveCount(0);
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(content).toHaveCount(1);
  // An Escape pressed before Ark moves focus into the dialog is lost.
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');
  await expect.element(content).toHaveCount(0);
});

test('keeps tall content inside the dialog surface and scrolls the positioner', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><div style="height: 200vh">Tall content</div><p data-testid="last-line">Last line</p></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const positioner = document.querySelector<HTMLElement>('[data-slot="dialog-positioner"]')!;
  const content = document.querySelector('[role="dialog"]')!.getBoundingClientRect();
  const lastLine = document.querySelector('[data-testid="last-line"]')!.getBoundingClientRect();

  expect(content.top).toBeGreaterThanOrEqual(0);
  expect(lastLine.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(positioner.scrollHeight).toBeGreaterThan(positioner.clientHeight);
});

test('exposes the default recipe values on the content', async () => {
  render(
    defineComponent({
      components: { ...dialogComponents, Button },
      template: `
          <Dialog default-open :portalled="false">
            <DialogPositioner>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Preferences</DialogTitle>
                  <DialogDescription>Description</DialogDescription>
                </DialogHeader>
                <DialogBody>Body</DialogBody>
              </DialogContent>
            </DialogPositioner>
          </Dialog>
      `,
    }),
  );

  const dialog = page.getByRole('dialog');
  await expect.element(dialog).toHaveAttribute('data-size', 'md');
  await expect.element(dialog).toHaveAttribute('data-placement', 'center');
  await expect.element(dialog).toHaveAttribute('data-scroll-behavior', 'outside');
});

test('scrolls the body inside and keeps the footer visible with scrollBehavior inside', async () => {
  render(
    defineComponent({
      components: { ...dialogComponents, Button },
      template: `
          <Dialog default-open :portalled="false">
            <DialogPositioner>
              <DialogContent scroll-behavior="inside">
                <DialogTitle>Terms</DialogTitle>
                <DialogBody>
                  <div style="height: 200vh">Tall content</div>
                </DialogBody>
                <DialogFooter>
                  <Button>Accept</Button>
                </DialogFooter>
              </DialogContent>
            </DialogPositioner>
          </Dialog>
      `,
    }),
  );

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const positioner = document.querySelector<HTMLElement>('[data-slot="dialog-positioner"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="dialog-body"]')!;
  const content = document.querySelector('[role="dialog"]')!.getBoundingClientRect();
  const footer = document.querySelector('[data-slot="dialog-footer"]')!.getBoundingClientRect();

  expect(content.bottom).toBeLessThanOrEqual(window.innerHeight + 1);
  expect(footer.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  expect(positioner.scrollHeight).toBeLessThanOrEqual(positioner.clientHeight + 1);
});