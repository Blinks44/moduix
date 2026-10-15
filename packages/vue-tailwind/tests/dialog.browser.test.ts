import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Button,
  CloseButton,
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

test('keeps a long title clear of the close icon', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    setup: () => ({ title: 'A very long dialog title that wraps '.repeat(4) }),
    template:
      '<Dialog default-open :portalled="false"><DialogPositioner><DialogContent><DialogHeader><DialogTitle>{{ title }}</DialogTitle><DialogCloseIcon /><DialogDescription>Description</DialogDescription></DialogHeader></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const title = document.querySelector<HTMLElement>('[data-slot="dialog-title"]')!;
  const icon = document.querySelector('[data-slot="dialog-close-icon"]')!.getBoundingClientRect();
  const titleTextEnd =
    title.getBoundingClientRect().right - parseFloat(getComputedStyle(title).paddingInlineEnd);

  expect(titleTextEnd).toBeLessThanOrEqual(icon.left + 1);
});

test('wraps footer actions that do not fit on one line', async () => {
  const Harness = defineComponent({
    components: { ...dialogComponents, Button },
    template:
      '<Dialog default-open :portalled="false"><DialogPositioner><DialogContent style="width: 18rem"><DialogTitle>Unsaved changes</DialogTitle><DialogFooter><Button>Discard changes</Button><Button>Keep editing</Button><Button>Save and close</Button></DialogFooter></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const footer = document.querySelector('[data-slot="dialog-footer"]')!.getBoundingClientRect();

  for (const button of document.querySelectorAll('[data-slot="dialog-footer"] > *')) {
    const rect = button.getBoundingClientRect();
    expect(rect.left).toBeGreaterThanOrEqual(footer.left - 1);
    expect(rect.right).toBeLessThanOrEqual(footer.right + 1);
  }
});

test('keeps the body in the content color and mutes only the description', async () => {
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

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const content = document.querySelector<HTMLElement>('[data-slot="dialog-content"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="dialog-body"]')!;
  const description = document.querySelector<HTMLElement>('[data-slot="dialog-description"]')!;

  expect(content.dataset.size).toBe('md');
  expect(content.dataset.placement).toBe('center');
  expect(content.dataset.scrollBehavior).toBe('outside');
  expect(getComputedStyle(body).color).toBe(getComputedStyle(content).color);
  expect(getComputedStyle(description).color).not.toBe(getComputedStyle(content).color);
});

test('applies width presets from the size prop', async () => {
  render(
    defineComponent({
      components: { ...dialogComponents, Button },
      template: `
            <Dialog default-open :portalled="false">
              <DialogPositioner>
                <DialogContent size="sm" data-testid="sm">
                  <DialogTitle>Small</DialogTitle>
                </DialogContent>
              </DialogPositioner>
            </Dialog>
            <Dialog default-open :portalled="false">
              <DialogPositioner data-testid="full-positioner">
                <DialogContent size="full" data-testid="full">
                  <DialogTitle>Full</DialogTitle>
                </DialogContent>
              </DialogPositioner>
            </Dialog>
      `,
    }),
  );

  await expect.element(page.getByTestId('sm')).toBeVisible();
  // offsetWidth ignores the scale Ark applies to a dialog that has a nested dialog open.
  const small = document.querySelector<HTMLElement>('[data-testid="sm"]')!;
  const full = document.querySelector<HTMLElement>('[data-testid="full"]')!;
  const fullPositioner = document.querySelector<HTMLElement>('[data-testid="full-positioner"]')!;

  expect(Math.abs(small.offsetWidth - Math.min(384, window.innerWidth - 32))).toBeLessThanOrEqual(
    1,
  );
  expect(Math.abs(full.offsetWidth - fullPositioner.clientWidth)).toBeLessThanOrEqual(1);
  expect(full.offsetHeight).toBeGreaterThanOrEqual(fullPositioner.clientHeight - 1);
});

test('places the content at the top and scrolls the body inside', async () => {
  render(
    defineComponent({
      components: { ...dialogComponents, Button },
      template: `
          <Dialog default-open :portalled="false">
            <DialogPositioner>
              <DialogContent placement="top" scroll-behavior="inside">
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

  expect(
    Math.abs(content.top - parseFloat(getComputedStyle(positioner).paddingTop)),
  ).toBeLessThanOrEqual(1);
  expect(content.bottom).toBeLessThanOrEqual(window.innerHeight + 1);
  expect(footer.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  expect(positioner.scrollHeight).toBeLessThanOrEqual(positioner.clientHeight + 1);
});

test('leaves a native trigger unstyled', async () => {
  render(
    defineComponent({
      components: { ...dialogComponents, Button },
      template: `
          <Dialog :portalled="false">
            <DialogTrigger>Open dialog</DialogTrigger>
          </Dialog>
      `,
    }),
  );

  await expect.element(page.getByRole('button', { name: 'Open dialog' })).toBeVisible();
  expect(document.querySelector('[data-slot="dialog-trigger"]')!.className).toBe('');
});

test('gives the close icon the CloseButton focus ring', async () => {
  render({
    components: { ...dialogComponents, CloseButton },
    template:
      '<CloseButton data-testid="reference" /><Dialog default-open :modal="false" :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogCloseIcon /></DialogContent></DialogPositioner></Dialog>',
  });

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const reference = document.querySelector<HTMLElement>('[data-testid="reference"]')!;
  const icon = document.querySelector<HTMLElement>('[data-slot="dialog-close-icon"]')!;
  reference.focus();
  const expected = getComputedStyle(reference);
  const ring = [expected.outlineWidth, expected.outlineOffset];
  icon.focus();
  const actual = getComputedStyle(icon);
  expect(ring).not.toEqual(['0px', '0px']);
  expect([actual.outlineWidth, actual.outlineOffset]).toEqual(ring);
});