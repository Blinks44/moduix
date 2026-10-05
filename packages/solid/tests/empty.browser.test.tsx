import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '../src';

test('renders presentational anatomy with stable hooks and forwarded refs', async () => {
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

  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });

  const actions = screen
    .getByRole('button', { name: 'Create project' })
    .closest<HTMLElement>('[data-slot="empty-actions"]')!;

  expect(rootRef).toBe(root);
  expect(titleRef).toBe(title);
  await expect.element(page.getByTestId('empty')).not.toHaveAttribute('role');
  expect(root.getAttribute('data-slot')).toBe('empty-root');
  expect(screen.getByTestId('empty-icon').getAttribute('data-part')).toBe('icon');
  expect(title.getAttribute('data-slot')).toBe('empty-title');
  expect(screen.getByText('Start by creating a project.').getAttribute('data-part')).toBe(
    'description',
  );
  expect(actions?.getAttribute('data-slot')).toBe('empty-actions');
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
  expect(root.getAttribute('data-scope')).toBe('empty');
  expect(icon.getAttribute('data-slot')).toBe('empty-icon');
  expect(content.getAttribute('data-part')).toBe('content');
  expect(title.getAttribute('data-part')).toBe('title');
  expect(description.getAttribute('data-slot')).toBe('empty-description');
  expect(actions.getAttribute('data-part')).toBe('actions');
});

test('does not forward refs through native Ark Solid asChild composition', async () => {
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

  await expect.element(page.getByRole('region', { name: 'Projects' })).toBeAttached();
  await expect.element(page.getByRole('heading', { name: 'No projects', level: 2 })).toBeAttached();
  expect(rootRef).toBeUndefined();
  expect(titleRef).toBeUndefined();
});