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

test('applies status semantics and stable data hooks', () => {
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
      <AlertIndicator ref={indicatorRef} aria-hidden={false}>
        i
      </AlertIndicator>
      <AlertContent ref={contentRef}>
        <AlertDescription ref={descriptionRef}>Scheduled maintenance</AlertDescription>
        <AlertActions ref={actionsRef}>No action required</AlertActions>
      </AlertContent>
    </Alert>,
  );

  expect(screen.getByRole('note')).toHaveAttribute('data-status', 'info');
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'alert-indicator');
  expect(indicatorRef.current).toHaveAttribute('aria-hidden', 'false');
  expect(contentRef.current).toHaveAttribute('data-slot', 'alert-content');
  expect(descriptionRef.current).toHaveAttribute('data-slot', 'alert-description');
  expect(actionsRef.current).toHaveAttribute('data-slot', 'alert-actions');
});