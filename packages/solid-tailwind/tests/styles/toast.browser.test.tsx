import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Toast, ToastDescription, ToastTitle, ToastToaster, createToaster } from '@/index';

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
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-primary', 'p-6']));
  expect([...screen.getByText('Custom styles').classList]).toEqual(
    expect.arrayContaining(['text-lg']),
  );

  await expect.element(page.locator('[data-slot="toast-root"]')).toHaveCSS('padding', '24px');
});