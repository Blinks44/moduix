import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
  useToastContext,
} from '../src';

test('renders the default toaster content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  let actionCount = 0;

  render(() => <ToastToaster toaster={toaster} />);

  toaster.create({
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    action: { label: 'Undo', onClick: () => actionCount++ },
  });

  const title = await screen.findByText('Changes saved');
  const root = title.closest('[data-slot="toast-root"]');
  expect(title).toBeVisible();
  expect(screen.getByText('Your workspace is up to date.')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Undo' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Close toast' })).toBeVisible();
  expect(root).toHaveClass('box-border', 'grid', 'w-80', 'gap-1', 'rounded-lg', 'bg-card', 'p-4');
  expect(title).toHaveClass('m-0', 'text-sm', 'leading-5', 'font-semibold');
  expect(screen.getByText('Your workspace is up to date.')).toHaveClass(
    'm-0',
    'text-sm',
    'leading-5',
    'text-muted-foreground',
  );
  expect(screen.getByRole('button', { name: 'Undo' })).toHaveClass(
    'mt-2',
    'min-h-control-xs',
    'border-border',
    'px-2',
    'py-1',
  );
  expect(screen.getByRole('button', { name: 'Close toast' })).toHaveClass(
    'absolute',
    'end-2',
    'top-2',
  );

  fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
  expect(actionCount).toBe(1);
  await waitFor(() => expect(screen.queryByText('Changes saved')).not.toBeInTheDocument());

  toaster.create({ title: 'Persistent notice', closable: false });
  expect(await screen.findByText('Persistent notice')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Close toast' })).not.toBeInTheDocument();
});

test('uses info for implicit and explicit info toast types', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(() => <ToastToaster toaster={toaster} />);

  toaster.create({ title: 'Implicit info toast' });
  expect(
    (await screen.findByText('Implicit info toast')).closest('[data-slot="toast-root"]'),
  ).toHaveAttribute('data-type', 'info');

  toaster.create({ title: 'Explicit info toast', type: 'info' });
  expect(
    (await screen.findByText('Explicit info toast')).closest('[data-slot="toast-root"]'),
  ).toHaveAttribute('data-type', 'info');
});

test('keeps the short Toast root form and exported context hook available for custom composition', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  function ContextTitle() {
    const toast = useToastContext();
    return <ToastTitle>{toast().title}</ToastTitle>;
  }

  render(() => (
    <ToastToaster toaster={toaster} portalled={false}>
      {() => (
        <Toast>
          <ContextTitle />
          <ToastCloseTrigger
            asChild={(props) => (
              <button {...props()} type="button">
                Dismiss
              </button>
            )}
            aria-label="Dismiss custom toast"
          >
            Dismiss
          </ToastCloseTrigger>
        </Toast>
      )}
    </ToastToaster>
  ));

  toaster.create({ title: 'Custom toast' });

  expect(await screen.findByText('Custom toast')).toBeVisible();
  expect(document.querySelector('[data-slot="toast-root"]')).toHaveAttribute('data-part', 'root');

  fireEvent.click(screen.getByRole('button', { name: 'Dismiss custom toast' }));
  await waitFor(() => expect(screen.queryByText('Custom toast')).not.toBeInTheDocument());
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalled = render(() => <ToastToaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container).not.toContainElement(portalledTitle);
  portalled.unmount();

  const inlineToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const inline = render(() => <ToastToaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container).toContainElement(inlineTitle);
  inline.unmount();

  const customToaster = createToaster({ placement: 'bottom', duration: Infinity });
  function CustomPortalToaster() {
    let portalRef!: HTMLDivElement;

    return (
      <>
        <div ref={(element) => (portalRef = element)} data-testid="toast-portal" />
        <ToastToaster toaster={customToaster} portalRef={() => portalRef} />
      </>
    );
  }

  render(() => <CustomPortalToaster />);
  customToaster.create({ title: 'Custom portal toast' });

  expect(
    within(screen.getByTestId('toast-portal')).getByText('Custom portal toast'),
  ).toBeInTheDocument();
});

test('lets consumer Tailwind utilities override conflicting defaults', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(() => (
    <ToastToaster toaster={toaster} portalled={false}>
      {() => (
        <Toast class="w-full bg-primary p-6">
          <ToastTitle class="text-lg" />
          <ToastDescription />
        </Toast>
      )}
    </ToastToaster>
  ));

  toaster.create({ title: 'Custom styles', description: 'Consumer utilities win.' });

  const root = (await screen.findByText('Custom styles')).closest('[data-slot="toast-root"]');
  expect(root).toHaveClass('w-full', 'bg-primary', 'p-6');
  expect(root).not.toHaveClass('w-80', 'bg-card', 'p-4');
  expect(screen.getByText('Custom styles')).toHaveClass('text-lg');
  expect(screen.getByText('Custom styles')).not.toHaveClass('text-sm');
});