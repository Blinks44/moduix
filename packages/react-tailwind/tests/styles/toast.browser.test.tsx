import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Toast, ToastDescription, ToastTitle, ToastToaster, createToaster } from '@/index';

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ duration: Infinity });
  const portalled = render(<ToastToaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ duration: Infinity });
  const inline = render(<ToastToaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
  inline.unmount();

  const customToaster = createToaster({ duration: Infinity });
  const portalRef = { current: document.createElement('div') };
  portalRef.current.dataset.testid = 'toast-portal';
  document.body.append(portalRef.current);
  const custom = render(<ToastToaster toaster={customToaster} portalRef={portalRef} />);
  customToaster.create({ title: 'Custom portal toast' });

  await expect
    .element(page.getByTestId('toast-portal').getByText('Custom portal toast'))
    .toBeAttached();
  custom.unmount();
  portalRef.current.remove();
});

test('lets consumer Tailwind utilities override conflicting defaults', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(
    <ToastToaster toaster={toaster} portalled={false}>
      {(toast) => (
        <Toast key={toast.id} className="w-full bg-primary p-6">
          <ToastTitle className="text-lg" />
          <ToastDescription />
        </Toast>
      )}
    </ToastToaster>,
  );

  toaster.create({ title: 'Custom styles', description: 'Consumer utilities win.' });

  const root = (await screen.findByText('Custom styles')).closest('[data-slot="toast-root"]');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-primary', 'p-6']));
  expect([...screen.getByText('Custom styles').classList]).toEqual(
    expect.arrayContaining(['text-lg']),
  );

  await expect.element(page.locator('[data-slot="toast-root"]')).toHaveCSS('padding', '24px');
});