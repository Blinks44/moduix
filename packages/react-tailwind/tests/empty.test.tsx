import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '../src';

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

test('applies native utilities to every component-owned visual part', () => {
  render(
    <Empty data-testid="empty">
      <EmptyIcon data-testid="empty-icon" />
      <EmptyContent data-testid="empty-content">
        <EmptyTitle data-testid="empty-title">No projects</EmptyTitle>
        <EmptyDescription data-testid="empty-description">
          Start by creating a project.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions data-testid="empty-actions" />
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