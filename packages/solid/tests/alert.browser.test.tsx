import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@/index';

test('preserves semantic children with Ark Solid asChild composition', async () => {
  render(() => (
    <Alert asChild={(props) => <section {...props()} aria-label="Release notes" />} role="status">
      <AlertContent>
        <AlertTitle asChild={(props) => <h2 {...props()}>Update available</h2>} />
      </AlertContent>
    </Alert>
  ));

  await expect.element(page.getByRole('status', { name: 'Release notes' })).toHaveCount(1);
  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('alert-root');
  expect(title.getAttribute('data-part')).toBe('title');
});

test('forwards refs and data hooks for ordinary rendered parts', async () => {
  let rootRef!: HTMLElement;
  let indicatorRef!: HTMLElement;
  let contentRef!: HTMLElement;
  let descriptionRef!: HTMLElement;
  let actionsRef!: HTMLElement;

  render(() => (
    <Alert ref={(element) => (rootRef = element)} role="note">
      <AlertIndicator ref={(element) => (indicatorRef = element)} aria-hidden={false}>
        i
      </AlertIndicator>
      <AlertContent ref={(element) => (contentRef = element)}>
        <AlertDescription ref={(element) => (descriptionRef = element)}>
          Scheduled maintenance
        </AlertDescription>
        <AlertActions ref={(element) => (actionsRef = element)}>No action required</AlertActions>
      </AlertContent>
    </Alert>
  ));

  await expect.element(page.getByRole('note')).toHaveCount(1);
  const root = screen.getByRole('note');

  expect(rootRef).toBe(root);
  expect(root.getAttribute('data-status')).toBe('info');
  expect(indicatorRef?.getAttribute('data-slot')).toBe('alert-indicator');
  expect(indicatorRef?.getAttribute('aria-hidden')).toBe('false');
  expect(contentRef?.getAttribute('data-slot')).toBe('alert-content');
  expect(descriptionRef?.getAttribute('data-slot')).toBe('alert-description');
  expect(actionsRef?.getAttribute('data-slot')).toBe('alert-actions');
});

test('does not add a live-region role by default', async () => {
  render(() => (
    <Alert status="error" data-testid="plain-alert">
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
      </AlertContent>
    </Alert>
  ));

  await expect.element(page.getByTestId('plain-alert')).toHaveAttribute('data-status', 'error');
  expect(screen.getByTestId('plain-alert').hasAttribute('role')).toBe(false);
});