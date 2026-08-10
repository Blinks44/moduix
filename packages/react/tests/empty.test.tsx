import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Empty } from '../src';

test('renders presentational anatomy with stable hooks and forwarded refs', () => {
  const rootRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();

  render(
    <Empty ref={rootRef} data-testid="empty">
      <Empty.Icon data-testid="empty-icon">⌘</Empty.Icon>
      <Empty.Content>
        <Empty.Title ref={titleRef}>No projects</Empty.Title>
        <Empty.Description>Start by creating a project.</Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <button type="button">Create project</button>
      </Empty.Actions>
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
        <Empty.Icon ref={iconRef} asChild>
          <span data-testid="empty-icon">⌘</span>
        </Empty.Icon>
        <Empty.Content ref={contentRef} asChild>
          <div data-testid="empty-content">
            <Empty.Title ref={titleRef} asChild>
              <h2>No projects</h2>
            </Empty.Title>
            <Empty.Description ref={descriptionRef} asChild>
              <p>Start by creating a project.</p>
            </Empty.Description>
          </div>
        </Empty.Content>
        <Empty.Actions ref={actionsRef} asChild>
          <nav aria-label="Project actions">
            <button type="button">Create project</button>
          </nav>
        </Empty.Actions>
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