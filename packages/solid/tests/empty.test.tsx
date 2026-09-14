import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Empty } from '../src';

test('renders presentational anatomy with stable hooks and forwarded refs', () => {
  let rootRef!: HTMLDivElement;
  let titleRef!: HTMLHeadingElement;

  render(() => (
    <Empty ref={(element) => (rootRef = element)} data-testid="empty">
      <Empty.Icon data-testid="empty-icon">⌘</Empty.Icon>
      <Empty.Content>
        <Empty.Title ref={(element) => (titleRef = element)}>No projects</Empty.Title>
        <Empty.Description>Start by creating a project.</Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <button type="button">Create project</button>
      </Empty.Actions>
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
      <Empty.Icon
        asChild={(props) => (
          <span {...props()} data-testid="empty-icon">
            ⌘
          </span>
        )}
      />
      <Empty.Content asChild={(props) => <div {...props()} data-testid="empty-content" />}>
        <Empty.Title asChild={(props) => <h2 {...props()}>No projects</h2>} />
        <Empty.Description asChild={(props) => <p {...props()}>Start by creating a project.</p>} />
      </Empty.Content>
      <Empty.Actions asChild={(props) => <nav {...props()} aria-label="Project actions" />}>
        <button type="button">Create project</button>
      </Empty.Actions>
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
      <Empty.Title
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