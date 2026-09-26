import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '../src';

test('renders presentational anatomy with stable hooks and forwarded refs', () => {
  let rootRef!: HTMLDivElement;
  let titleRef!: HTMLHeadingElement;

  render(() => (
    <Empty ref={(element) => (rootRef = element)} data-testid="empty">
      <EmptyIcon data-testid="empty-icon">⌘</EmptyIcon>
      <EmptyContent>
        <EmptyTitle ref={(element) => (titleRef = element)}>No projects</EmptyTitle>
        <EmptyDescription>Start by creating a project.</EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <button type="button">Create project</button>
      </EmptyActions>
    </Empty>
  ));

  const root = screen.getByTestId('empty');
  const icon = screen.getByTestId('empty-icon');
  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen.getByRole('button', { name: 'Create project' }).parentElement;

  expect(rootRef).toBe(root);
  expect(titleRef).toBe(title);
  expect(root).not.toHaveAttribute('role');
  expect(root).toHaveAttribute('data-slot', 'empty-root');
  expect(icon).toHaveAttribute('data-part', 'icon');
  expect(title).toHaveAttribute('data-slot', 'empty-title');
  expect(description).toHaveAttribute('data-part', 'description');
  expect(actions).toHaveAttribute('data-slot', 'empty-actions');
});

test('preserves semantic elements and hooks with native Ark Solid asChild composition', () => {
  render(() => (
    <Empty asChild={(props) => <section {...props()} aria-label="Projects" />}>
      <EmptyIcon
        asChild={(props) => (
          <span {...props()} data-testid="empty-icon">
            ⌘
          </span>
        )}
      />
      <EmptyContent asChild={(props) => <div {...props()} data-testid="empty-content" />}>
        <EmptyTitle asChild={(props) => <h2 {...props()}>No projects</h2>} />
        <EmptyDescription asChild={(props) => <p {...props()}>Start by creating a project.</p>} />
      </EmptyContent>
      <EmptyActions asChild={(props) => <nav {...props()} aria-label="Project actions" />}>
        <button type="button">Create project</button>
      </EmptyActions>
    </Empty>
  ));

  const root = screen.getByRole('region', { name: 'Projects' });
  const icon = screen.getByTestId('empty-icon');
  const content = screen.getByTestId('empty-content');
  const title = screen.getByRole('heading', { name: 'No projects', level: 2 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen.getByRole('navigation', { name: 'Project actions' });

  expect(root.tagName).toBe('SECTION');
  expect(icon.tagName).toBe('SPAN');
  expect(content.tagName).toBe('DIV');
  expect(title.tagName).toBe('H2');
  expect(description.tagName).toBe('P');
  expect(actions.tagName).toBe('NAV');
  expect(root).toHaveAttribute('data-scope', 'empty');
  expect(icon).toHaveAttribute('data-slot', 'empty-icon');
  expect(content).toHaveAttribute('data-part', 'content');
  expect(title).toHaveAttribute('data-part', 'title');
  expect(description).toHaveAttribute('data-slot', 'empty-description');
  expect(actions).toHaveAttribute('data-part', 'actions');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;
  let titleRef: HTMLHeadingElement | undefined;

  render(() => (
    <Empty
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Projects" />}
    >
      <EmptyTitle
        ref={(element) => (titleRef = element)}
        asChild={(props) => <h2 {...props()}>No projects</h2>}
      />
    </Empty>
  ));

  expect(screen.getByRole('region', { name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'No projects', level: 2 })).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
  expect(titleRef).toBeUndefined();
});

test('applies native utilities to every component-owned visual part', () => {
  render(() => (
    <Empty data-testid="empty">
      <EmptyIcon data-testid="empty-icon" />
      <EmptyContent data-testid="empty-content">
        <EmptyTitle data-testid="empty-title">No projects</EmptyTitle>
        <EmptyDescription data-testid="empty-description">
          Start by creating a project.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions data-testid="empty-actions" />
    </Empty>
  ));

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
  render(() => <Empty class="w-auto bg-background p-2" data-testid="empty" />);

  const root = screen.getByTestId('empty');

  expect(root).toHaveClass('w-auto', 'bg-background', 'p-2');
  expect(root).not.toHaveClass('w-full', 'bg-card', 'p-8');
});