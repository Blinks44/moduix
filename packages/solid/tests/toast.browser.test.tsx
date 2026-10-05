import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Toast,
  ToastActionTrigger,
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

  await expect.element(page.getByText('Changes saved')).toBeVisible();
  await expect.element(page.getByText('Your workspace is up to date.')).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'Undo', exact: true })).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toBeVisible();

  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  expect(actionCount).toBe(1);
  await expect.element(page.getByText('Changes saved')).toHaveCount(0);

  toaster.create({ title: 'Persistent notice', closable: false });
  await expect.element(page.getByText('Persistent notice')).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toHaveCount(0);
});

test('uses info for implicit and explicit info toast types', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(() => <ToastToaster toaster={toaster} />);

  toaster.create({ title: 'Implicit info toast' });
  expect(
    (await screen.findByText('Implicit info toast'))
      .closest('[data-slot="toast-root"]')!
      .getAttribute('data-type'),
  ).toBe('info');

  toaster.create({ title: 'Explicit info toast', type: 'info' });
  expect(
    (await screen.findByText('Explicit info toast'))
      .closest('[data-slot="toast-root"]')!
      .getAttribute('data-type'),
  ).toBe('info');
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

  await expect.element(page.getByText('Custom toast')).toBeVisible();
  await expect
    .element(page.locator('[data-slot="toast-root"]'))
    .toHaveAttribute('data-part', 'root');

  await page.getByRole('button', { name: 'Dismiss custom toast', exact: true }).click();
  await expect.element(page.getByText('Custom toast')).toHaveCount(0);
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalled = render(() => <ToastToaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const inline = render(() => <ToastToaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
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

  await expect
    .element(page.getByTestId('toast-portal').getByText('Custom portal toast'))
    .toBeAttached();
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
    <ToastToaster toaster={toaster} portalled={false}>
      {() => (
        <Toast ref={(element) => (rootRef = element)}>
          <ToastTitle ref={(element) => (titleRef = element)} />
          <ToastDescription ref={(element) => (descriptionRef = element)} />
          <ToastActionTrigger ref={(element) => (actionRef = element)}>Undo</ToastActionTrigger>
          <ToastCloseTrigger ref={(element) => (closeRef = element)} />
          <ToastCloseTrigger
            ref={(element) => (composedCloseRef = element)}
            asChild={(props) => (
              <button {...props()} type="button">
                Custom close
              </button>
            )}
            aria-label="Custom close"
          >
            Custom close
          </ToastCloseTrigger>
        </Toast>
      )}
    </ToastToaster>
  ));

  toaster.create({
    title: 'Native parts',
    description: 'Description',
    action: { label: 'Undo', onClick: () => undefined },
  });

  await screen.findByText('Native parts');

  expect(rootRef.getAttribute('data-slot')).toBe('toast-root');
  expect(titleRef.getAttribute('data-slot')).toBe('toast-title');
  expect(descriptionRef.getAttribute('data-slot')).toBe('toast-description');
  expect(actionRef.getAttribute('data-slot')).toBe('toast-action-trigger');
  expect(closeRef).toBeUndefined();
  expect(composedCloseRef).toBeUndefined();
  await expect
    .element(page.getByRole('button', { name: 'Custom close', exact: true }))
    .toHaveAttribute('data-slot', 'toast-close-trigger');
});

test.each([false, true])(
  'updates the close trigger accessible name (asChild=%s)',
  async (asChild) => {
    const toaster = createToaster({ placement: 'bottom', duration: Infinity });
    const [label, setLabel] = createSignal<string | undefined>();
    render(() => (
      <ToastToaster toaster={toaster} portalled={false}>
        {() => (
          <Toast>
            <ToastTitle />
            <ToastCloseTrigger
              aria-label={label()}
              asChild={asChild ? (props) => <button {...props()}>Clear</button> : undefined}
            />
          </Toast>
        )}
      </ToastToaster>
    ));
    toaster.create({ title: 'Reactive label' });
    const trigger = await screen.findByRole('button', { name: 'Close toast' });

    setLabel('Dismiss notification');
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBe(trigger);
    setLabel(undefined);
    expect(screen.getByRole('button', { name: 'Close toast' })).toBe(trigger);
  },
);