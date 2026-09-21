import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '../src';

test('applies status semantics and stable data hooks', () => {
  const { container } = render(() => (
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
    </>
  ));

  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');

  expect(statusAlert).toHaveAttribute('data-scope', 'alert');
  expect(statusAlert).toHaveAttribute('data-part', 'root');
  expect(statusAlert).toHaveAttribute('data-slot', 'alert-root');
  expect(statusAlert).toHaveAttribute('data-status', 'info');
  expect(statusAlert).toHaveClass('border-border');
  expect(errorAlert).toHaveAttribute('data-status', 'error');
  expect(errorAlert).toHaveClass('border-destructive/35');
  expect(errorAlert).not.toHaveClass('border-border');
  expect(container.querySelector('[data-part="indicator"]')).toHaveAttribute('aria-hidden', 'true');
});

test('preserves semantic children with Ark Solid asChild composition', () => {
  render(() => (
    <Alert asChild={(props) => <section {...props()} aria-label="Release notes" />} role="status">
      <AlertContent>
        <AlertTitle asChild={(props) => <h2 {...props()}>Update available</h2>} />
      </AlertContent>
    </Alert>
  ));

  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'alert-root');
  expect(title).toHaveAttribute('data-part', 'title');
});

test('forwards refs and data hooks for ordinary rendered parts', () => {
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

  const root = screen.getByRole('note');

  expect(rootRef).toBe(root);
  expect(root).toHaveAttribute('data-status', 'info');
  expect(indicatorRef).toHaveAttribute('data-slot', 'alert-indicator');
  expect(indicatorRef).toHaveAttribute('aria-hidden', 'false');
  expect(contentRef).toHaveAttribute('data-slot', 'alert-content');
  expect(descriptionRef).toHaveAttribute('data-slot', 'alert-description');
  expect(actionsRef).toHaveAttribute('data-slot', 'alert-actions');
});

test('lets consumer utilities override default classes', () => {
  render(() => <Alert class="w-auto" role="status" />);

  const root = screen.getByRole('status');

  expect(root).toHaveClass('w-auto');
  expect(root).not.toHaveClass('w-full');
});