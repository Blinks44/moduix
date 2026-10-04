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
import styles from '../src/components/dialog/Dialog.module.css';

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

test('keeps page interaction available for a non-modal dialog', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :modal="false" :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: dialogComponents,
    setup() {
      return { onOpenChange: (detail: { open: boolean }) => details.push(detail) };
    },
    template:
      '<Dialog @open-change="onOpenChange"><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
  await waitFor(() => expect(details).toEqual([{ open: true }]));
  await fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('closes on Escape and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  trigger.focus();
  await fireEvent.click(trigger);
  await fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
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
  await fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
  await screen.findByRole('dialog');
  await fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
});

test('renders overlays inline when portalled is false', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<div data-testid="dialog-host"><Dialog default-open :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog></div>',
  });
  render(Harness);
  expect(within(screen.getByTestId('dialog-host')).getByRole('dialog')).toBeInTheDocument();
});

test('portals overlays outside the root tree by default', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog>',
  });
  const { container } = render(Harness);
  expect(within(container as HTMLElement).queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
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
    await waitFor(() =>
      expect(screen.getByTestId('dialog-portal')).toContainElement(screen.getByRole('dialog')),
    );
  },
);

test('exposes the current state through DialogContext', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogContext v-slot="dialog"><output>Open: {{ String(dialog.open) }}</output></DialogContext></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('opens a RootProvider dialog from external state', async () => {
  const Harness = defineComponent({
    components: { ...dialogComponents },
    setup() {
      return { dialog: useDialog() };
    },
    template:
      '<div><button type="button" @click="dialog.setOpen(true)">Open via API</button><DialogRootProvider :value="dialog"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></DialogRootProvider></div>',
  });
  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog><DialogTrigger>Open dialog</DialogTrigger><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle><DialogCloseIcon /></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  trigger.focus();
  await fireEvent.click(trigger);
  await fireEvent.click(await screen.findByRole('button', { name: 'Close dialog' }));
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('forwards refs through native parts and keeps asChild composition native', () => {
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
  expect(refs.trigger.value?.$el).toHaveAttribute('data-slot', 'dialog-trigger');
  expect(refs.backdrop.value?.$el).toHaveAttribute('data-slot', 'dialog-backdrop');
  expect(refs.positioner.value?.$el).toHaveAttribute('data-slot', 'dialog-positioner');
  expect(refs.content.value?.$el).toHaveAttribute('data-slot', 'dialog-content');
  expect(refs.title.value?.$el).toHaveAttribute('data-slot', 'dialog-title');
  expect(refs.description.value?.$el).toHaveAttribute('data-slot', 'dialog-description');
  expect(refs.closeTrigger.value?.$el).toHaveAttribute('data-slot', 'dialog-close-trigger');
  expect(screen.getByRole('button', { name: 'Composed trigger' })).toHaveAttribute(
    'data-slot',
    'dialog-trigger',
  );
  expect(refs.closeIcon.value?.$el).toHaveAttribute('data-slot', 'dialog-close-icon');
});

test('applies consumer classes after CSS Module defaults', () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogTrigger class="consumer-trigger">Open dialog</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent class="consumer-content"><DialogHeader><DialogTitle>Preferences</DialogTitle><DialogCloseIcon class="consumer-close" /><DialogDescription>Description</DialogDescription></DialogHeader><DialogBody class="consumer-body">Body</DialogBody><DialogFooter class="consumer-footer">Footer</DialogFooter></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  expect(trigger).toHaveClass('consumer-trigger', styles.trigger);
  expect(screen.getByRole('dialog')).toHaveClass('consumer-content', styles.content);
  expect(screen.getByRole('heading', { name: 'Preferences' })).toHaveClass(styles.title);
  expect(screen.getByText('Description')).toHaveClass(styles.description);
  expect(screen.getByText('Body')).toHaveClass('consumer-body', styles.body);
  expect(screen.getByText('Footer')).toHaveClass('consumer-footer', styles.footer);
  expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveClass(
    'consumer-close',
    styles.closeIcon,
  );
});

test('renders and hydrates an open dialog through Vue SSR', async () => {
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
  expect(container.querySelector('[data-slot="dialog-trigger"]')).toBeInTheDocument();
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