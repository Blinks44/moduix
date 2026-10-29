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

  expect(statusAlert.dataset).toMatchObject({
    scope: 'alert',
    part: 'root',
    slot: 'alert-root',
    status: 'info',
  });
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
});

test('lets consumer utilities override default classes', async () => {
  render({
    components: alertComponents,
    template: `<Alert class="w-auto" role="status" />`,
  });

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const root = screen.getByRole('status');

  expect(root.classList.contains('w-auto')).toBe(true);
});

test('lets a consumer color utility override the status indicator color', async () => {
  render({
    components: alertComponents,
    template: `
      <div>
        <span class="text-primary" data-testid="reference" />
        <Alert status="error">
          <AlertIndicator data-testid="status-indicator">!</AlertIndicator>
          <AlertIndicator class="text-primary" data-testid="custom-indicator">!</AlertIndicator>
        </Alert>
      </div>
    `,
  });

  await expect.element(page.getByTestId('custom-indicator')).toHaveCount(1);
  const reference = getComputedStyle(screen.getByTestId('reference')).color;

  expect(getComputedStyle(screen.getByTestId('status-indicator')).color).not.toBe(reference);
  expect(getComputedStyle(screen.getByTestId('custom-indicator')).color).toBe(reference);
});

test('lets a size utility on the icon resize the icon and the indicator', async () => {
  render({
    components: alertComponents,
    template: `
      <Alert>
        <AlertIndicator><svg data-testid="default-icon" /></AlertIndicator>
        <AlertIndicator><svg class="size-6" data-testid="custom-icon" /></AlertIndicator>
      </Alert>
    `,
  });

  await expect.element(page.getByTestId('default-icon')).toHaveCount(1);

  expect(screen.getByTestId('default-icon').getBoundingClientRect().width).toBe(16);
  expect(screen.getByTestId('custom-icon').getBoundingClientRect().width).toBe(24);
  expect(screen.getByTestId('custom-icon').parentElement?.offsetWidth).toBe(24);
  expect(screen.getByTestId('custom-icon').parentElement?.offsetHeight).toBe(24);
});