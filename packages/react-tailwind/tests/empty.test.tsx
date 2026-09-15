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

test('keeps owned anatomy attributes when consumer props conflict', () => {
  render(
    <Empty data-part="consumer" data-scope="consumer" data-testid="root">
      <Empty.Icon data-part="consumer" data-scope="consumer" data-testid="icon" />
      <Empty.Content data-part="consumer" data-scope="consumer" data-testid="content">
        <Empty.Title data-part="consumer" data-scope="consumer" data-testid="title">
          No projects
        </Empty.Title>
        <Empty.Description data-part="consumer" data-scope="consumer" data-testid="description" />
      </Empty.Content>
      <Empty.Actions data-part="consumer" data-scope="consumer" data-testid="actions" />
    </Empty>,
  );

  expect(screen.getByTestId('root')).toHaveAttribute('data-part', 'root');
  expect(screen.getByTestId('icon')).toHaveAttribute('data-part', 'icon');
  expect(screen.getByTestId('content')).toHaveAttribute('data-part', 'content');
  expect(screen.getByTestId('title')).toHaveAttribute('data-part', 'title');
  expect(screen.getByTestId('description')).toHaveAttribute('data-part', 'description');
  expect(screen.getByTestId('actions')).toHaveAttribute('data-part', 'actions');
});

test('applies native utilities to every component-owned visual part', () => {
  render(
    <Empty data-testid="empty">
      <Empty.Icon data-testid="empty-icon" />
      <Empty.Content data-testid="empty-content">
        <Empty.Title data-testid="empty-title">No projects</Empty.Title>
        <Empty.Description data-testid="empty-description">
          Start by creating a project.
        </Empty.Description>
      </Empty.Content>
      <Empty.Actions data-testid="empty-actions" />
    </Empty>,
  );

  expect(screen.getByTestId('empty')).toHaveClass(
    'grid',
    'w-full',
    'min-w-0',
    'gap-4',
    'rounded-xl',
    'border-border',
    'bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))]',
    'p-8',
    'text-card-foreground',
  );
  expect(screen.getByTestId('empty-icon')).toHaveClass(
    'inline-flex',
    'min-w-0',
    'items-center',
    'justify-center',
    'rounded-full',
    'bg-muted',
    'p-3',
    'text-muted-foreground',
  );
  expect(screen.getByTestId('empty-content')).toHaveClass(
    'grid',
    'min-w-0',
    'justify-items-center',
    'gap-1',
    'max-w-md',
  );
  expect(screen.getByTestId('empty-title')).toHaveClass('min-w-0', 'text-xl', 'font-semibold');
  expect(screen.getByTestId('empty-description')).toHaveClass(
    'min-w-0',
    'text-sm',
    'text-muted-foreground',
  );
  expect(screen.getByTestId('empty-actions')).toHaveClass(
    'flex',
    'min-w-0',
    'max-w-full',
    'flex-wrap',
    'items-center',
    'justify-center',
    'gap-2',
  );
});

test('lets consumer utilities override default classes', () => {
  render(<Empty className="w-auto bg-background p-2" data-testid="empty" />);

  const root = screen.getByTestId('empty');

  expect(root).toHaveClass('w-auto', 'bg-background', 'p-2');
  expect(root).not.toHaveClass('w-full', 'bg-card', 'p-8');
});