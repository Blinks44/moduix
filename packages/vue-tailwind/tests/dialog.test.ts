import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
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
  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  trigger.focus();
  await fireEvent.click(trigger);
  await screen.findByRole('dialog');
  expect(screen.getByRole('heading', { name: 'Preferences' })).toHaveClass(
    'text-lg',
    'font-semibold',
  );
  expect(screen.getByText('Description')).toHaveClass('text-md', 'text-muted-foreground');
  expect(screen.getByText('Body')).toHaveClass('mt-4', 'text-md');
  expect(document.querySelector('[data-slot="dialog-footer"]')).toHaveClass('mt-6', 'gap-2');
  await fireEvent.click(
    document.querySelector('[data-slot="dialog-close-trigger"]') as HTMLElement,
  );
  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
  expect(trigger).toHaveFocus();
});

test('keeps non-modal dialogs interactive and renders inline', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<div data-testid="host"><Dialog default-open :modal="false" :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog></div>',
  });
  render(Harness);
  expect(within(screen.getByTestId('host')).getByRole('dialog')).toHaveStyle({
    pointerEvents: 'auto',
  });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
  expect(screen.getByRole('dialog')).toHaveClass(
    'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))]',
    "after:content-['']",
  );
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
    await waitFor(() =>
      expect(screen.getByTestId('portal')).toContainElement(screen.getByRole('dialog')),
    );
    expect(screen.getByText('Open: true')).toBeInTheDocument();
    expect(contentRef.value?.$el).toBe(screen.getByRole('dialog'));
  },
);

test('forwards refs through every public part and supports asChild', () => {
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
    expect(refs[name as keyof typeof refs].value?.$el).toHaveAttribute('data-slot', slot);
  }
  expect(screen.getByRole('button', { name: 'Composed' })).toHaveAttribute(
    'data-slot',
    'dialog-trigger',
  );
});

test('lets consumer Tailwind utilities win', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogTrigger class="bg-primary px-2">Open dialog</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent class="w-96 bg-card p-4"><DialogHeader><DialogTitle>Preferences</DialogTitle><DialogCloseIcon class="size-8 rounded-full bg-primary" /><DialogDescription>Description</DialogDescription></DialogHeader><DialogBody>Body</DialogBody><DialogFooter>Footer</DialogFooter></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  expect(screen.getByRole('button', { name: 'Open dialog' })).toHaveClass('bg-primary', 'px-2');
  expect(screen.getByRole('button', { name: 'Open dialog' })).not.toHaveClass(
    'bg-background',
    'px-3.5',
  );
  expect(screen.getByRole('dialog')).toHaveClass('w-96', 'bg-card', 'p-4');
  expect(screen.getByRole('dialog')).not.toHaveClass('bg-popover', 'p-6');
  expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveClass(
    'size-8',
    'rounded-full',
    'bg-primary',
  );
  expect(document.querySelector('[data-slot="dialog-backdrop"]')).toHaveClass('fixed', 'inset-0');
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const SsrDialog = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogTrigger>Open dialog</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogDescription>Description</DialogDescription></DialogContent></DialogPositioner></Dialog>',
  });
  const markup = await renderToString(createSSRApp(SsrDialog));
  expect(markup).toContain('data-slot="dialog-trigger"');
  expect(markup).toContain('data-slot="dialog-content"');
  const container = document.createElement('div');
  container.innerHTML = markup;
  document.body.append(container);
  const app = createSSRApp(SsrDialog);
  app.mount(container);
  expect(container.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();
  expect(container.querySelector('[data-slot="dialog-title"]')).toHaveAttribute(
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
    expect(button).toHaveAttribute('aria-label', 'Close dialog');
  });
  label.value = '';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', ''));
  custom.value = true;
  await waitFor(() => expect(screen.getByTestId('close')).toHaveTextContent('Custom close'));
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await waitFor(() => expect(screen.getByTestId('close').querySelector('svg')).toBeInTheDocument());
});