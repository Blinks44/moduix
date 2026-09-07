import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Alert } from '../src';

test('applies status semantics and stable data hooks', () => {
  const { container } = render(() => (
    <>
      <Alert>
        <Alert.Content>
          <Alert.Title>Update available</Alert.Title>
          <Alert.Description>Install the latest version.</Alert.Description>
        </Alert.Content>
      </Alert>
      <Alert status="error">
        <Alert.Indicator>!</Alert.Indicator>
        <Alert.Content>
          <Alert.Title>Payment failed</Alert.Title>
        </Alert.Content>
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
    <Alert asChild={(props) => <section {...props()} aria-label="Release notes" />}>
      <Alert.Content>
        <Alert.Title asChild={(props) => <h2 {...props()}>Update available</h2>} />
      </Alert.Content>
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
      <Alert.Indicator ref={(element) => (indicatorRef = element)} aria-hidden={false}>
        i
      </Alert.Indicator>
      <Alert.Content ref={(element) => (contentRef = element)}>
        <Alert.Description ref={(element) => (descriptionRef = element)}>
          Scheduled maintenance
        </Alert.Description>
        <Alert.Actions ref={(element) => (actionsRef = element)}>No action required</Alert.Actions>
      </Alert.Content>
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
  render(() => (
    <Alert status="error" class="w-auto">
      <Alert.Indicator class="text-primary" data-testid="override-indicator" />
      <Alert status="info">
        <Alert.Indicator data-testid="nested-indicator" />
      </Alert>
    </Alert>
  ));

  const root = screen.getByRole('alert');
  const overrideIndicator = screen.getByTestId('override-indicator');
  const nestedIndicator = screen.getByTestId('nested-indicator');

  expect(root).toHaveClass('w-auto');
  expect(root).not.toHaveClass('w-full');
  expect(overrideIndicator).toHaveClass('text-primary');
  expect(overrideIndicator).not.toHaveClass('text-destructive');
  expect(nestedIndicator).toHaveClass('text-muted-foreground');
  expect(nestedIndicator).not.toHaveClass('text-destructive');
});

test('reactively updates indicator styles from the nearest alert', () => {
  const [status, setStatus] = createSignal<'info' | 'success'>('info');

  render(() => (
    <>
      <button type="button" onClick={() => setStatus('success')}>
        Succeed
      </button>
      <Alert status={status()}>
        <Alert.Indicator data-testid="indicator" />
      </Alert>
    </>
  ));

  const indicator = screen.getByTestId('indicator');
  expect(indicator).toHaveClass('text-muted-foreground');

  fireEvent.click(screen.getByRole('button', { name: 'Succeed' }));

  expect(indicator).toHaveClass('text-success');
  expect(indicator).not.toHaveClass('text-muted-foreground');
});