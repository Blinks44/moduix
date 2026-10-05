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
  expect(Array.from(document.querySelector('[data-slot="dialog-title"]')!.classList)).toEqual(
    expect.arrayContaining(['text-lg', 'font-semibold']),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-description"]')!.classList)).toEqual(
    expect.arrayContaining(['text-md', 'text-muted-foreground']),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-body"]')!.classList)).toEqual(
    expect.arrayContaining(['mt-4', 'text-md']),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-footer"]')!.classList)).toEqual(
    expect.arrayContaining(['mt-6', 'gap-2']),
  );
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
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<div data-testid="host"><Dialog default-open :modal="false" :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog></div>',
  });
  render(Harness);
  await expect
    .element(page.getByTestId('host').getByRole('dialog'))
    .toHaveCSS('pointer-events', 'auto');
  await expect
    .element(page.locator('[data-slot="dialog-positioner"]'))
    .toHaveCSS('pointer-events', 'none');
  expect(Array.from(document.querySelector('[role="dialog"]')!.classList)).toEqual(
    expect.arrayContaining([
      'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))]',
      "after:content-['']",
    ]),
  );
  await expect.element(page.getByRole('dialog')).toHaveCSS('position', 'relative');
  await expect
    .poll(() => getComputedStyle(document.querySelector('[role="dialog"]')!, '::after').content)
    .toBe('""');
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

test('lets consumer Tailwind utilities win', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogTrigger class="bg-primary px-2">Open dialog</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent class="w-96 bg-card p-4"><DialogHeader><DialogTitle>Preferences</DialogTitle><DialogCloseIcon class="size-8 rounded-full bg-primary" /><DialogDescription>Description</DialogDescription></DialogHeader><DialogBody>Body</DialogBody><DialogFooter>Footer</DialogFooter></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  expect(Array.from(document.querySelector('[data-slot="dialog-trigger"]')!.classList)).toEqual(
    expect.arrayContaining(['bg-primary', 'px-2']),
  );
  expect(
    Array.from(document.querySelector('[data-slot="dialog-trigger"]')!.classList),
  ).not.toContain('bg-background');
  expect(
    Array.from(document.querySelector('[data-slot="dialog-trigger"]')!.classList),
  ).not.toContain('px-3.5');
  expect(Array.from(document.querySelector('[role="dialog"]')!.classList)).toEqual(
    expect.arrayContaining(['w-96', 'bg-card', 'p-4']),
  );
  expect(Array.from(document.querySelector('[role="dialog"]')!.classList)).not.toContain(
    'bg-popover',
  );
  expect(Array.from(document.querySelector('[role="dialog"]')!.classList)).not.toContain('p-6');
  expect(Array.from(document.querySelector('[data-slot="dialog-close-icon"]')!.classList)).toEqual(
    expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
  );
  expect(Array.from(document.querySelector('[data-slot="dialog-backdrop"]')!.classList)).toEqual(
    expect.arrayContaining(['fixed', 'inset-0']),
  );
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