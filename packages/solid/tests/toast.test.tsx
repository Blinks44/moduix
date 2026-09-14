import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
import { Toast, Toaster, createToaster, useToastContext } from '../src';

test('renders the default toaster content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  let actionCount = 0;

  render(() => <Toaster toaster={toaster} />);

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
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(() => <Toaster toaster={toaster} />);

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
    return <Toast.Title>{toast().title}</Toast.Title>;
  }

  render(() => (
    <Toaster toaster={toaster} portalled={false}>
      {() => (
        <Toast>
          <ContextTitle />
          <Toast.CloseTrigger
            asChild={(props) => (
              <button {...props()} type="button">
                Dismiss
              </button>
            )}
            aria-label="Dismiss custom toast"
          >
            Dismiss
          </Toast.CloseTrigger>
        </Toast>
      )}
    </Toaster>
  ));

  toaster.create({ title: 'Custom toast' });

  expect(await screen.findByText('Custom toast')).toBeVisible();
  expect(document.querySelector('[data-slot="toast-root"]')).toHaveAttribute('data-part', 'root');

  fireEvent.click(screen.getByRole('button', { name: 'Dismiss custom toast' }));
  await waitFor(() => expect(screen.queryByText('Custom toast')).not.toBeInTheDocument());
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalled = render(() => <Toaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container).not.toContainElement(portalledTitle);
  portalled.unmount();

  const inlineToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const inline = render(() => <Toaster toaster={inlineToaster} portalled={false} />);

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
        <Toaster toaster={customToaster} portalRef={() => portalRef} />
      </>
    );
  }

  render(() => <CustomPortalToaster />);
  customToaster.create({ title: 'Custom portal toast' });

  expect(
    within(screen.getByTestId('toast-portal')).getByText('Custom portal toast'),
  ).toBeInTheDocument();
});

test('forwards refs on native parts and keeps Solid asChild composition native', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  let rootRef!: HTMLDivElement;
  let titleRef!: HTMLDivElement;
  let descriptionRef!: HTMLDivElement;
  let actionRef!: HTMLButtonElement;
  let closeRef: HTMLButtonElement | undefined;
  let composedCloseRef: HTMLButtonElement | undefined;

  render(() => (
    <Toaster toaster={toaster} portalled={false}>
      {() => (
        <Toast.Root ref={(element) => (rootRef = element)}>
          <Toast.Title ref={(element) => (titleRef = element)} />
          <Toast.Description ref={(element) => (descriptionRef = element)} />
          <Toast.ActionTrigger ref={(element) => (actionRef = element)}>Undo</Toast.ActionTrigger>
          <Toast.CloseTrigger ref={(element) => (closeRef = element)} />
          <Toast.CloseTrigger
            ref={(element) => (composedCloseRef = element)}
            asChild={(props) => (
              <button {...props()} type="button">
                Custom close
              </button>
            )}
            aria-label="Custom close"
          >
            Custom close
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </Toaster>
  ));

  toaster.create({
    title: 'Native parts',
    description: 'Description',
    action: { label: 'Undo', onClick: () => undefined },
  });

  await screen.findByText('Native parts');

  expect(rootRef).toHaveAttribute('data-slot', 'toast-root');
  expect(titleRef).toHaveAttribute('data-slot', 'toast-title');
  expect(descriptionRef).toHaveAttribute('data-slot', 'toast-description');
  expect(actionRef).toHaveAttribute('data-slot', 'toast-action-trigger');
  expect(closeRef).toBeUndefined();
  expect(composedCloseRef).toBeUndefined();
  expect(screen.getByRole('button', { name: 'Custom close' })).toHaveAttribute(
    'data-slot',
    'toast-close-trigger',
  );
});