import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '../src';

test('renders presentational anatomy with stable hooks and forwarded refs', async () => {
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

  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });

  const actions = screen
    .getByRole('button', { name: 'Create project' })
    .closest<HTMLElement>('[data-slot="empty-actions"]')!;

  expect(rootRef.current).toBe(root);
  expect(titleRef.current).toBe(title);
  await expect.element(page.getByTestId('empty')).not.toHaveAttribute('role');
  expect(root.getAttribute('data-slot')).toBe('empty-root');
  expect(screen.getByTestId('empty-icon').getAttribute('data-part')).toBe('icon');
  expect(title.getAttribute('data-slot')).toBe('empty-title');
  expect(screen.getByText('Start by creating a project.').getAttribute('data-part')).toBe(
    'description',
  );
  expect(actions?.getAttribute('data-slot')).toBe('empty-actions');
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
  expect(root.getAttribute('data-scope')).toBe('empty');
  expect(icon.getAttribute('data-slot')).toBe('empty-icon');
  expect(content.getAttribute('data-part')).toBe('content');
  expect(title.getAttribute('data-part')).toBe('title');
  expect(description.getAttribute('data-slot')).toBe('empty-description');
  expect(actions.getAttribute('data-part')).toBe('actions');
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

  expect(screen.getByTestId('root').getAttribute('data-part')).toBe('root');
  expect(screen.getByTestId('icon').getAttribute('data-part')).toBe('icon');
  expect(screen.getByTestId('content').getAttribute('data-part')).toBe('content');
  expect(screen.getByTestId('title').getAttribute('data-part')).toBe('title');
  expect(screen.getByTestId('description').getAttribute('data-part')).toBe('description');
  expect(screen.getByTestId('actions').getAttribute('data-part')).toBe('actions');
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

  expect([...screen.getByTestId('empty')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'w-full', 'min-w-0', 'gap-4', 'rounded-xl', 'border-border']),
  );
  expect(
    screen
      .getByTestId('empty')
      ?.classList.contains('bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))]'),
  ).toBe(true);
  expect([...screen.getByTestId('empty')!.classList]).toEqual(
    expect.arrayContaining(['p-8', 'text-card-foreground']),
  );
  expect([...screen.getByTestId('empty-icon')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'min-w-0',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-muted',
      'p-3',
      'text-muted-foreground',
    ]),
  );
  expect([...screen.getByTestId('empty-content')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'min-w-0', 'justify-items-center', 'gap-1', 'max-w-md']),
  );
  expect([...screen.getByTestId('empty-title')!.classList]).toEqual(
    expect.arrayContaining(['min-w-0', 'text-xl', 'font-semibold']),
  );
  expect([...screen.getByTestId('empty-description')!.classList]).toEqual(
    expect.arrayContaining(['min-w-0', 'text-sm', 'text-muted-foreground']),
  );
  expect([...screen.getByTestId('empty-actions')!.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'min-w-0',
      'max-w-full',
      'flex-wrap',
      'items-center',
      'justify-center',
      'gap-2',
    ]),
  );
});

test('lets consumer utilities override default classes', () => {
  render(<Empty className="w-auto bg-background p-2" data-testid="empty" />);

  const root = screen.getByTestId('empty');
  expect([...root.classList]).toEqual(expect.arrayContaining(['w-auto', 'bg-background', 'p-2']));
  for (const utility of ['w-full', 'bg-card', 'p-8']) {
    expect(root.classList.contains(utility)).toBe(false);
  }
  expect(getComputedStyle(root)).toMatchObject({
    paddingTop: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
  });
});