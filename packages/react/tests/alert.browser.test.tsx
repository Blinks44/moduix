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
} from '@/index';

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