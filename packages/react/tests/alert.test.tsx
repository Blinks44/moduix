import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Alert } from '../src';

test('applies status semantics and stable data hooks', () => {
  const { container } = render(
    <>
      <Alert>
        <Alert.Title>Update available</Alert.Title>
        <Alert.Description>Install the latest version.</Alert.Description>
      </Alert>
      <Alert status="error">
        <Alert.Indicator>!</Alert.Indicator>
        <Alert.Title>Payment failed</Alert.Title>
      </Alert>
    </>,
  );

  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');

  expect(statusAlert).toHaveAttribute('data-scope', 'alert');
  expect(statusAlert).toHaveAttribute('data-part', 'root');
  expect(statusAlert).toHaveAttribute('data-slot', 'alert-root');
  expect(statusAlert).toHaveAttribute('data-status', 'info');
  expect(errorAlert).toHaveAttribute('data-status', 'error');
  expect(container.querySelector('[data-part="indicator"]')).toHaveAttribute('aria-hidden', 'true');
});

test('preserves semantic children and refs with asChild', () => {
  const rootRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();

  render(
    <Alert ref={rootRef} asChild>
      <section aria-label="Release notes">
        <Alert.Title ref={titleRef} asChild>
          <h2>Update available</h2>
        </Alert.Title>
      </section>
    </Alert>,
  );

  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.current).toBe(root);
  expect(titleRef.current).toBe(title);
  expect(title).toHaveAttribute('data-part', 'title');
});

test('forwards refs and data hooks for every optional part', () => {
  const indicatorRef = createRef<HTMLSpanElement>();
  const contentRef = createRef<HTMLDivElement>();
  const descriptionRef = createRef<HTMLDivElement>();
  const actionsRef = createRef<HTMLDivElement>();

  render(
    <Alert role="note">
      <Alert.Indicator ref={indicatorRef} aria-hidden={false}>
        i
      </Alert.Indicator>
      <Alert.Content ref={contentRef}>
        <Alert.Description ref={descriptionRef}>Scheduled maintenance</Alert.Description>
        <Alert.Actions ref={actionsRef}>No action required</Alert.Actions>
      </Alert.Content>
    </Alert>,
  );

  expect(screen.getByRole('note')).toHaveAttribute('data-status', 'info');
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'alert-indicator');
  expect(indicatorRef.current).toHaveAttribute('aria-hidden', 'false');
  expect(contentRef.current).toHaveAttribute('data-slot', 'alert-content');
  expect(descriptionRef.current).toHaveAttribute('data-slot', 'alert-description');
  expect(actionsRef.current).toHaveAttribute('data-slot', 'alert-actions');
});