import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@/index';

const alertComponents = {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
};

test('applies status semantics and stable data hooks', async () => {
  const { container } = render({
    components: alertComponents,
    template: `
      <div>
        <Alert id="storage-alert" data-probe="root" class="consumer-class" role="status">
          <AlertContent>
            <AlertTitle>Update available</AlertTitle>
            <AlertDescription>Install the latest version.</AlertDescription>
          </AlertContent>
        </Alert>
        <Alert status="error" role="alert">
          <AlertIndicator>!</AlertIndicator>
          <AlertContent>
            <AlertTitle>Payment failed</AlertTitle>
          </AlertContent>
        </Alert>
      </div>
    `,
  });

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');
  expect(statusAlert.id).toBe('storage-alert');
  expect(statusAlert.getAttribute('data-probe')).toBe('root');
  expect(statusAlert.classList.contains('consumer-class')).toBe(true);

  expect(statusAlert.getAttribute('data-scope')).toBe('alert');
  expect(statusAlert.getAttribute('data-part')).toBe('root');
  expect(statusAlert.getAttribute('data-slot')).toBe('alert-root');
  expect(statusAlert.getAttribute('data-status')).toBe('info');
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
});