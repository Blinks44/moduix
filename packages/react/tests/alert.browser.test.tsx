import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
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

  expect(statusAlert.getAttribute('data-scope')).toBe('alert');
  expect(statusAlert.getAttribute('data-part')).toBe('root');
  expect(statusAlert.getAttribute('data-slot')).toBe('alert-root');
  expect(statusAlert.getAttribute('data-status')).toBe('info');
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
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

test('applies status styles from the CSS module', async () => {
  render(
    <>
      <Alert data-testid="info">
        <AlertContent>
          <AlertTitle data-testid="title">Update available</AlertTitle>
          <AlertDescription data-testid="description">Install the latest version.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert status="error" data-testid="error" />
    </>,
  );

  await expect.element(page.getByTestId('info')).toHaveCSS('display', 'flex');
  const info = getComputedStyle(screen.getByTestId('info'));
  const error = getComputedStyle(screen.getByTestId('error'));

  expect(info.borderTopWidth).toBe('1px');
  expect(error.borderTopColor).not.toBe(info.borderTopColor);
  expect(error.backgroundColor).not.toBe(info.backgroundColor);
  expect(getComputedStyle(screen.getByTestId('description')).color).not.toBe(
    getComputedStyle(screen.getByTestId('title')).color,
  );
  expect(getComputedStyle(screen.getByTestId('title')).color).toBe(info.color);
});