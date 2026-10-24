import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type CSSProperties } from 'react';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '../src';

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

  expect(statusAlert.dataset).toMatchObject({
    scope: 'alert',
    part: 'root',
    slot: 'alert-root',
    status: 'info',
  });
  expect(statusAlert.classList.contains('border-border')).toBe(true);
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(errorAlert.classList.contains('border-destructive/35')).toBe(true);
  expect(errorAlert.classList.contains('border-border')).toBe(false);
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
  await expect.element(page.getByRole('status')).toHaveCSS('display', 'flex');
  await expect.element(page.getByRole('alert')).toHaveCSS('border-top-width', '1px');
  expect(getComputedStyle(errorAlert).borderTopColor).not.toBe(
    getComputedStyle(statusAlert).borderTopColor,
  );
});

test('preserves semantic children and refs with asChild', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();

  render(
    <Alert ref={rootRef} asChild role="status">
      <section aria-label="Release notes">
        <AlertContent>
          <AlertTitle ref={titleRef} asChild>
            <h2>Update available</h2>
          </AlertTitle>
        </AlertContent>
      </section>
    </Alert>,
  );

  await expect.element(page.getByRole('status', { name: 'Release notes' })).toHaveCount(1);
  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.current).toBe(root);
  expect(titleRef.current).toBe(title);
  expect(title.getAttribute('data-part')).toBe('title');
});

test('forwards refs and data hooks for every optional part', async () => {
  const indicatorRef = createRef<HTMLSpanElement>();
  const contentRef = createRef<HTMLDivElement>();
  const descriptionRef = createRef<HTMLDivElement>();
  const actionsRef = createRef<HTMLDivElement>();

  render(
    <Alert role="note">
      <AlertIndicator ref={indicatorRef} aria-hidden={false}>
        i
      </AlertIndicator>
      <AlertContent ref={contentRef}>
        <AlertDescription ref={descriptionRef}>Scheduled maintenance</AlertDescription>
        <AlertActions ref={actionsRef}>No action required</AlertActions>
      </AlertContent>
    </Alert>,
  );

  await expect.element(page.getByRole('note')).toHaveCount(1);
  expect(screen.getByRole('note').getAttribute('data-status')).toBe('info');
  expect(indicatorRef.current?.getAttribute('data-slot')).toBe('alert-indicator');
  expect(indicatorRef.current?.getAttribute('aria-hidden')).toBe('false');
  expect(contentRef.current?.getAttribute('data-slot')).toBe('alert-content');
  expect(descriptionRef.current?.getAttribute('data-slot')).toBe('alert-description');
  expect(actionsRef.current?.getAttribute('data-slot')).toBe('alert-actions');
});

test('lets consumer utilities override default classes', async () => {
  render(<Alert className="w-auto" role="status" />);

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const root = screen.getByRole('status');

  expect(root.classList.contains('w-auto')).toBe(true);
  expect(root.classList.contains('w-full')).toBe(false);
});

test('does not add a live-region role by default', async () => {
  render(
    <Alert status="error" data-testid="plain-alert">
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
      </AlertContent>
    </Alert>,
  );

  await expect.element(page.getByTestId('plain-alert')).toHaveAttribute('data-status', 'error');
  expect(screen.getByTestId('plain-alert').hasAttribute('role')).toBe(false);
});

test('lets a consumer color utility override the status indicator color', async () => {
  render(
    <>
      <span className="text-primary" data-testid="reference" />
      <Alert status="error">
        <AlertIndicator data-testid="status-indicator">!</AlertIndicator>
        <AlertIndicator className="text-primary" data-testid="custom-indicator">
          !
        </AlertIndicator>
      </Alert>
    </>,
  );

  await expect.element(page.getByTestId('custom-indicator')).toHaveCount(1);
  const reference = getComputedStyle(screen.getByTestId('reference')).color;

  expect(getComputedStyle(screen.getByTestId('status-indicator')).color).not.toBe(reference);
  expect(getComputedStyle(screen.getByTestId('custom-indicator')).color).toBe(reference);
});

test('lets a size utility on the icon resize the icon and the indicator', async () => {
  render(
    <Alert>
      <AlertIndicator>
        <svg data-testid="default-icon" />
      </AlertIndicator>
      <AlertIndicator>
        <svg className="size-6" data-testid="custom-icon" />
      </AlertIndicator>
    </Alert>,
  );

  await expect.element(page.getByTestId('default-icon')).toHaveCount(1);

  expect(screen.getByTestId('default-icon').getBoundingClientRect().width).toBe(16);
  expect(screen.getByTestId('custom-icon').getBoundingClientRect().width).toBe(24);
  expect(screen.getByTestId('custom-icon').parentElement?.offsetWidth).toBe(24);
  expect(screen.getByTestId('custom-icon').parentElement?.offsetHeight).toBe(24);
});

test('reads the border width from the foundation token', async () => {
  render(
    <Alert data-testid="alert" style={{ '--moduix-border-width-sm': '3px' } as CSSProperties} />,
  );

  await expect.element(page.getByTestId('alert')).toHaveCSS('border-top-width', '3px');
});