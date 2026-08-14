import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Toast, Toaster, createToaster, useToastContext } from '../src';

test('renders the default toaster content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ duration: Infinity });
  let actionCount = 0;

  render(<Toaster toaster={toaster} />);

  toaster.create({
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    action: { label: 'Undo', onClick: () => actionCount++ },
  });

  expect(await screen.findByText('Changes saved')).toBeVisible();
  expect(screen.getByText('Your workspace is up to date.')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Undo' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Close toast' })).toBeVisible();

  fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
  expect(actionCount).toBe(1);
  await waitFor(() => expect(screen.queryByText('Changes saved')).not.toBeInTheDocument());

  toaster.create({ title: 'Persistent notice', closable: false });
  expect(await screen.findByText('Persistent notice')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Close toast' })).not.toBeInTheDocument();
});

test('uses info for implicit and explicit info toast types', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(<Toaster toaster={toaster} />);

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
  const toaster = createToaster({ duration: Infinity });

  function ContextTitle() {
    const toast = useToastContext();
    return <Toast.Title>{toast.title}</Toast.Title>;
  }

  render(
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast key={toast.id}>
          <ContextTitle />
          <Toast.CloseTrigger asChild aria-label="Dismiss custom toast">
            <button type="button">Dismiss</button>
          </Toast.CloseTrigger>
        </Toast>
      )}
    </Toaster>,
  );

  toaster.create({ title: 'Custom toast' });

  expect(await screen.findByText('Custom toast')).toBeVisible();
  expect(document.querySelector('[data-slot="toast-root"]')).toHaveAttribute('data-part', 'root');

  fireEvent.click(screen.getByRole('button', { name: 'Dismiss custom toast' }));
  await waitFor(() => expect(screen.queryByText('Custom toast')).not.toBeInTheDocument());
});

test('portals by default and supports inline rendering', async () => {
  const portalledToaster = createToaster({ duration: Infinity });
  const portalled = render(<Toaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container).not.toContainElement(portalledTitle);
  portalled.unmount();

  const inlineToaster = createToaster({ duration: Infinity });
  const inline = render(<Toaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container).toContainElement(inlineTitle);
});