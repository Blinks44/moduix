import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
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
import styles from '../src/components/dialog/Dialog.module.css';
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

test('keeps page interaction available for a non-modal dialog', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :modal="false" :portalled="false"><DialogTrigger>Toggle dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogContext v-slot="dialog"><output>Open: {{ String(dialog.open) }}</output></DialogContext></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  await expect.element(page.getByRole('dialog')).toHaveCSS('pointer-events', 'auto');
  await expect
    .element(page.locator('[data-slot="dialog-positioner"]'))
    .toHaveCSS('pointer-events', 'none');
  await expect.element(page.getByText('Open: true')).toBeAttached();
  await page.getByRole('button', { name: 'Toggle dialog' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('closes on Escape, preserves open-change details, and restores focus to its trigger', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: dialogComponents,
    setup: () => ({ onOpenChange: (detail: { open: boolean }) => details.push(detail) }),
    template:
      '<Dialog @open-change="onOpenChange"><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await expect.poll(() => details).toEqual([{ open: true }]);
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('supports controlled open state and v-model', async () => {
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
      '<Dialog v-model:open="open" :portalled="false" @open-change="onOpenChange"><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogCloseTrigger>Close dialog</DialogCloseTrigger></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
});

test('renders overlays inline when portalled is false', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<div data-testid="dialog-host"><Dialog default-open :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog></div>',
  });
  render(Harness);
  await expect.element(page.getByTestId('dialog-host').getByRole('dialog')).toBeAttached();
});

test('portals overlays outside the root tree by default', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  const { container } = render(Harness);
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test.each(['element', 'getter'] as const)(
  'portals overlays into portalRef when provided (%s)',
  async (targetType) => {
    const portalTarget = ref<HTMLElement>();
    const Harness = defineComponent({
      components: dialogComponents,
      setup() {
        return { portalTarget, getPortal: () => portalTarget.value };
      },
      template: `<div><div ref="portalTarget" data-testid="dialog-portal"></div><Dialog default-open :portal-ref="${targetType === 'getter' ? 'getPortal' : 'portalTarget'}"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog></div>`,
    });
    render(Harness);
    await expect.element(page.getByTestId('dialog-portal').getByRole('dialog')).toBeAttached();
  },
);

test('opens a RootProvider dialog from external state and updates context', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    setup() {
      return { dialog: useDialog() };
    },
    template:
      '<div><button type="button" @click="dialog.setOpen(true)">Open via API</button><DialogRootProvider :value="dialog"><DialogContext v-slot="context"><output>Open: {{ String(context.open) }}</output></DialogContext><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></DialogRootProvider></div>',
  });
  render(Harness);
  await expect.element(page.getByText('Open: false')).toBeAttached();
  await page.getByRole('button', { name: 'Open via API' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogCloseIcon /></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('forwards refs through native parts and keeps asChild composition native', async () => {
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
      '<Dialog default-open :portalled="false"><DialogTrigger ref="trigger">Open dialog</DialogTrigger><DialogTrigger as-child><button>Composed trigger</button></DialogTrigger><DialogBackdrop ref="backdrop" /><DialogPositioner ref="positioner"><DialogContent ref="content"><DialogTitle ref="title">Preferences</DialogTitle><DialogDescription ref="description">Description</DialogDescription><DialogCloseTrigger ref="closeTrigger">Close</DialogCloseTrigger><DialogCloseIcon ref="closeIcon" /></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  expect(refs.trigger.value?.$el?.getAttribute('data-slot')).toBe('dialog-trigger');
  expect(refs.backdrop.value?.$el?.getAttribute('data-slot')).toBe('dialog-backdrop');
  expect(refs.positioner.value?.$el?.getAttribute('data-slot')).toBe('dialog-positioner');
  expect(refs.content.value?.$el?.getAttribute('data-slot')).toBe('dialog-content');
  expect(refs.title.value?.$el?.getAttribute('data-slot')).toBe('dialog-title');
  expect(refs.description.value?.$el?.getAttribute('data-slot')).toBe('dialog-description');
  expect(refs.closeTrigger.value?.$el?.getAttribute('data-slot')).toBe('dialog-close-trigger');
  await expect
    .element(page.getByRole('button', { name: 'Composed trigger', includeHidden: true }))
    .toHaveAttribute('data-slot', 'dialog-trigger');
  expect(refs.closeIcon.value?.$el?.getAttribute('data-slot')).toBe('dialog-close-icon');
});

test('applies consumer classes after CSS Module defaults', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogTrigger class="consumer-trigger">Open dialog</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent class="consumer-content"><DialogHeader><DialogTitle>Preferences</DialogTitle><DialogCloseIcon class="consumer-close" /><DialogDescription>Description</DialogDescription></DialogHeader><DialogBody class="consumer-body">Body</DialogBody><DialogFooter class="consumer-footer">Footer</DialogFooter></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  expect(Array.from(document.querySelector('[data-slot="dialog-trigger"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-trigger', styles.trigger]),
  );
  expect(Array.from(document.querySelector('[role="dialog"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-content', styles.content]),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-title"]')!.classList)).toEqual(
    expect.arrayContaining([styles.title]),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-description"]')!.classList)).toEqual(
    expect.arrayContaining([styles.description]),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-body"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-body', styles.body]),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-footer"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-footer', styles.footer]),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-close-icon"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-close', styles.closeIcon]),
  );
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
  await expect.element(button).toHaveAttribute('aria-label', 'Close dialog');
  label.value = '';
  await expect.element(button).toHaveAttribute('aria-label', '');
  custom.value = true;
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  custom.value = false;
  await expect.element(button.locator('svg')).toBeAttached();
});