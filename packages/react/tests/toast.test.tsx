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

  toaster.create({ title: 'Persistent notice', closable: false });
  expect(await screen.findByText('Persistent notice')).toBeVisible();
  expect(screen.getAllByRole('button', { name: 'Close toast' })).toHaveLength(1);
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
          <Toast.CloseTrigger />
        </Toast>
      )}
    </Toaster>,
  );

  toaster.create({ title: 'Custom toast' });

  expect(await screen.findByText('Custom toast')).toBeVisible();
  expect(document.querySelector('[data-slot="toast-root"]')).toHaveAttribute('data-part', 'root');

  fireEvent.click(screen.getByRole('button', { name: 'Close toast' }));
  await waitFor(() => expect(screen.queryByText('Custom toast')).not.toBeInTheDocument());
});