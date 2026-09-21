import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '../src';

test('renders presentational anatomy with stable hooks and forwarded refs', () => {
  const rootRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();

  render(
    <Empty ref={rootRef} data-testid="empty">
      <EmptyIcon data-testid="empty-icon">⌘</EmptyIcon>
      <EmptyContent>
        <EmptyTitle ref={titleRef}>No projects</EmptyTitle>
        <EmptyDescription>Start by creating a project.</EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <button type="button">Create project</button>
      </EmptyActions>
    </Empty>,
  );

  const root = screen.getByTestId('empty');
  const icon = screen.getByTestId('empty-icon');
  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen.getByRole('button', { name: 'Create project' }).parentElement;

  expect(rootRef.current).toBe(root);
  expect(titleRef.current).toBe(title);
  expect(root).not.toHaveAttribute('role');
  expect(root).toHaveAttribute('data-slot', 'empty-root');
  expect(icon).toHaveAttribute('data-part', 'icon');
  expect(title).toHaveAttribute('data-slot', 'empty-title');
  expect(description).toHaveAttribute('data-part', 'description');
  expect(actions).toHaveAttribute('data-slot', 'empty-actions');
});

test('preserves semantic elements and hooks with asChild', () => {
  const rootRef = createRef<HTMLDivElement>();
  const iconRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();
  const descriptionRef = createRef<HTMLDivElement>();
  const actionsRef = createRef<HTMLDivElement>();

  render(
    <Empty ref={rootRef} asChild>
      <section aria-label="Projects">
        <EmptyIcon ref={iconRef} asChild>
          <span data-testid="empty-icon">⌘</span>
        </EmptyIcon>
        <EmptyContent ref={contentRef} asChild>
          <div data-testid="empty-content">
            <EmptyTitle ref={titleRef} asChild>
              <h2>No projects</h2>
            </EmptyTitle>
            <EmptyDescription ref={descriptionRef} asChild>
              <p>Start by creating a project.</p>
            </EmptyDescription>
          </div>
        </EmptyContent>
        <EmptyActions ref={actionsRef} asChild>
          <nav aria-label="Project actions">
            <button type="button">Create project</button>
          </nav>
        </EmptyActions>
      </section>
    </Empty>,
  );

  const root = screen.getByRole('region', { name: 'Projects' });
  const icon = screen.getByTestId('empty-icon');
  const content = screen.getByTestId('empty-content');
  const title = screen.getByRole('heading', { name: 'No projects', level: 2 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen.getByRole('navigation', { name: 'Project actions' });

  expect(rootRef.current).toBe(root);
  expect(iconRef.current).toBe(icon);
  expect(contentRef.current).toBe(content);
  expect(titleRef.current).toBe(title);
  expect(descriptionRef.current).toBe(description);
  expect(actionsRef.current).toBe(actions);
  expect(root).toHaveAttribute('data-scope', 'empty');
  expect(icon).toHaveAttribute('data-slot', 'empty-icon');
  expect(content).toHaveAttribute('data-part', 'content');
  expect(title).toHaveAttribute('data-part', 'title');
  expect(description).toHaveAttribute('data-slot', 'empty-description');
  expect(actions).toHaveAttribute('data-part', 'actions');
});

test('keeps owned anatomy attributes when consumer props conflict', () => {
  render(
    <Empty data-part="consumer" data-scope="consumer" data-testid="root">
      <EmptyIcon data-part="consumer" data-scope="consumer" data-testid="icon" />
      <EmptyContent data-part="consumer" data-scope="consumer" data-testid="content">
        <EmptyTitle data-part="consumer" data-scope="consumer" data-testid="title">
          No projects
        </EmptyTitle>
        <EmptyDescription data-part="consumer" data-scope="consumer" data-testid="description" />
      </EmptyContent>
      <EmptyActions data-part="consumer" data-scope="consumer" data-testid="actions" />
    </Empty>,
  );

  expect(screen.getByTestId('root')).toHaveAttribute('data-part', 'root');
  expect(screen.getByTestId('icon')).toHaveAttribute('data-part', 'icon');
  expect(screen.getByTestId('content')).toHaveAttribute('data-part', 'content');
  expect(screen.getByTestId('title')).toHaveAttribute('data-part', 'title');
  expect(screen.getByTestId('description')).toHaveAttribute('data-part', 'description');
  expect(screen.getByTestId('actions')).toHaveAttribute('data-part', 'actions');
});
