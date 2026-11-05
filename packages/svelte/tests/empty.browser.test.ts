import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AnatomyEmpty from './empty/AnatomyEmpty.svelte';
import AsChildEmpty from './empty/AsChildEmpty.svelte';
import HooksEmpty from './empty/HooksEmpty.svelte';

test('renders presentational anatomy, attrs, consumer classes, and forwarded refs', () => {
  const { component } = render(AnatomyEmpty, {
    props: { id: 'empty-state', 'data-probe': 'root', class: 'consumer-root' },
  });

  const root = screen.getByTestId('empty-icon').closest<HTMLElement>('[data-slot="empty-root"]')!;

  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen
    .getByRole('button', { name: 'Create project' })
    .closest<HTMLElement>('[data-slot="empty-actions"]')!;
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  expect(refs.titleRef).toBe(title);
  expect(root?.getAttribute('id')).toBe('empty-state');
  expect(root.dataset).toMatchObject({ scope: 'empty', part: 'root', slot: 'empty-root' });
  expect(root?.hasAttribute('role')).not.toBe(true);
  expect(screen.getByTestId('empty-icon').dataset).toMatchObject({
    part: 'icon',
    slot: 'empty-icon',
  });
  expect(title.dataset).toMatchObject({ part: 'title', slot: 'empty-title' });
  expect(description.tagName).toBe('DIV');
  expect(description.getAttribute('data-part')).toBe('description');
  expect(actions.dataset).toMatchObject({ part: 'actions', slot: 'empty-actions' });
});

test('preserves semantic elements and refs with asChild', async () => {
  const { component } = render(AsChildEmpty);

  const root = screen.getByRole('region', { name: 'Projects' });
  const icon = screen.getByTestId('empty-icon');
  const content = screen.getByTestId('empty-content');
  const title = screen.getByRole('heading', { name: 'No projects', level: 2 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen.getByRole('navigation', { name: 'Project actions' });
  const refs = component.getRefs();

  expect(root.tagName).toBe('SECTION');
  expect(icon.tagName).toBe('SPAN');
  expect(content.tagName).toBe('DIV');
  expect(title.tagName).toBe('H2');
  expect(description.tagName).toBe('P');
  expect(actions.tagName).toBe('NAV');
  expect(refs.rootRef).toBe(root);
  expect(refs.iconRef).toBe(icon);
  expect(refs.contentRef).toBe(content);
  expect(refs.titleRef).toBe(title);
  expect(refs.descriptionRef).toBe(description);
  expect(refs.actionsRef).toBe(actions);
  expect(root.getAttribute('data-part')).toBe('root');
  expect(icon.getAttribute('data-slot')).toBe('empty-icon');
  expect(content.getAttribute('data-part')).toBe('content');
  expect(title.getAttribute('data-part')).toBe('title');
  expect(description.getAttribute('data-slot')).toBe('empty-description');
  expect(actions.getAttribute('data-part')).toBe('actions');
});

test('keeps owned anatomy attributes and forwards native listeners', async () => {
  const state = { clicks: 0 };
  render(HooksEmpty, {
    props: {
      onclick: () => {
        state.clicks += 1;
      },
    },
  });

  expect(screen.getByTestId('root').dataset).toMatchObject({ scope: 'empty', part: 'root' });
  expect(screen.getByTestId('icon').getAttribute('data-part')).toBe('icon');
  expect(screen.getByTestId('content').getAttribute('data-part')).toBe('content');
  expect(screen.getByTestId('title').getAttribute('data-part')).toBe('title');
  expect(screen.getByTestId('description').getAttribute('data-part')).toBe('description');
  expect(screen.getByTestId('actions').getAttribute('data-part')).toBe('actions');

  await page.getByTestId('root').click();
  expect(state.clicks).toBe(1);
});