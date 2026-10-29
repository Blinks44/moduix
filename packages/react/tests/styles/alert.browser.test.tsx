import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Alert, AlertContent, AlertDescription, AlertIndicator, AlertTitle } from '@/index';

test('applies status semantics and stable data hooks', async () => {
  const { container } = render(
    <>
      <Alert role="status">
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
    </>,
  );

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');

  expect(statusAlert.getAttribute('data-scope')).toBe('alert');
  expect(statusAlert.getAttribute('data-part')).toBe('root');
  expect(statusAlert.getAttribute('data-slot')).toBe('alert-root');
  expect(statusAlert.getAttribute('data-status')).toBe('info');
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
});