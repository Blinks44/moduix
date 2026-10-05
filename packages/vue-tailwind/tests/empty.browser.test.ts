import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '../src';
import SsrEmpty from './fixtures/SsrEmpty.vue';

const emptyComponents = {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
};

test('renders presentational anatomy, attrs, consumer classes, and forwarded refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const titleRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: emptyComponents,
    setup() {
      return { rootRef, titleRef };
    },
    template: `
      <Empty ref="rootRef" id="empty-state" data-probe="root" class="consumer-root">
        <EmptyIcon data-testid="empty-icon">⌘</EmptyIcon>
        <EmptyContent>
          <EmptyTitle ref="titleRef">No projects</EmptyTitle>
          <EmptyDescription>Start by creating a project.</EmptyDescription>
        </EmptyContent>
        <EmptyActions>
          <button type="button">Create project</button>
        </EmptyActions>
      </Empty>
    `,
  });

  const root = screen.getByTestId('empty-icon').closest<HTMLElement>('[data-slot="empty-root"]')!;

  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen
    .getByRole('button', { name: 'Create project' })
    .closest<HTMLElement>('[data-slot="empty-actions"]')!;

  expect(rootRef.value?.$el).toBe(root);
  expect(titleRef.value?.$el).toBe(title);
  expect(root?.getAttribute('id')).toBe('empty-state');
  expect(root.dataset).toMatchObject({ scope: 'empty', part: 'root', slot: 'empty-root' });
  expect([...root.classList]).toEqual(
    expect.arrayContaining(['grid', 'w-full', 'min-w-0', 'gap-4', 'rounded-xl', 'border-border']),
  );
  expect(
    root?.classList.contains('bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))]'),
  ).toBe(true);
  expect([...root.classList]).toEqual(
    expect.arrayContaining(['p-8', 'text-card-foreground', 'consumer-root']),
  );
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

test('preserves semantic elements and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const iconRef = ref<ComponentPublicInstance | null>(null);
  const contentRef = ref<ComponentPublicInstance | null>(null);
  const titleRef = ref<ComponentPublicInstance | null>(null);
  const descriptionRef = ref<ComponentPublicInstance | null>(null);
  const actionsRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: emptyComponents,
    setup() {
      return { rootRef, iconRef, contentRef, titleRef, descriptionRef, actionsRef };
    },
    template: `
      <Empty ref="rootRef" as-child>
        <section aria-label="Projects">
          <EmptyIcon ref="iconRef" as-child>
            <span data-testid="empty-icon">⌘</span>
          </EmptyIcon>
          <EmptyContent ref="contentRef" as-child>
            <div data-testid="empty-content">
              <EmptyTitle ref="titleRef" as-child>
                <h2>No projects</h2>
              </EmptyTitle>
              <EmptyDescription ref="descriptionRef" as-child>
                <p>Start by creating a project.</p>
              </EmptyDescription>
            </div>
          </EmptyContent>
          <EmptyActions ref="actionsRef" as-child>
            <nav aria-label="Project actions">
              <button type="button">Create project</button>
            </nav>
          </EmptyActions>
        </section>
      </Empty>
    `,
  });

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
  expect(rootRef.value?.$el).toBe(root);
  expect(iconRef.value?.$el).toBe(icon);
  expect(contentRef.value?.$el).toBe(content);
  expect(titleRef.value?.$el).toBe(title);
  expect(descriptionRef.value?.$el).toBe(description);
  expect(actionsRef.value?.$el).toBe(actions);
  expect(root.getAttribute('data-part')).toBe('root');
  expect(icon.getAttribute('data-slot')).toBe('empty-icon');
  expect(content.getAttribute('data-part')).toBe('content');
  expect(title.getAttribute('data-part')).toBe('title');
  expect(description.getAttribute('data-slot')).toBe('empty-description');
  expect(actions.getAttribute('data-part')).toBe('actions');
});

test('keeps owned anatomy attributes and forwards native listeners', async () => {
  const state = { clicks: 0 };
  render({
    components: emptyComponents,
    setup() {
      return {
        handleClick: () => {
          state.clicks += 1;
        },
      };
    },
    template: `
      <Empty data-part="consumer" data-scope="consumer" data-testid="root" @click="handleClick">
        <EmptyIcon data-part="consumer" data-scope="consumer" data-testid="icon" />
        <EmptyContent data-part="consumer" data-scope="consumer" data-testid="content">
          <EmptyTitle data-part="consumer" data-scope="consumer" data-testid="title">No projects</EmptyTitle>
          <EmptyDescription data-part="consumer" data-scope="consumer" data-testid="description" />
        </EmptyContent>
        <EmptyActions data-part="consumer" data-scope="consumer" data-testid="actions" />
      </Empty>
    `,
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

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: emptyComponents,
    template: '<Empty class="w-auto bg-background p-2" data-testid="empty" />',
  });

  const root = screen.getByTestId('empty');
  expect([...root.classList]).toEqual(expect.arrayContaining(['w-auto', 'bg-background', 'p-2']));
  for (const utility of [
    'w-full',
    'bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))]',
    'p-8',
  ]) {
    expect(root!.classList.contains(utility)).toBe(false);
  }
  expect(getComputedStyle(root)).toMatchObject({
    paddingTop: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
  });
});

test('renders and hydrates an asChild host', async () => {
  const html = await renderToString(createSSRApp(SsrEmpty));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrEmpty);
  try {
    app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[data-slot]')]).toHaveLength(serverHosts.length);
    [...host.querySelectorAll('[data-slot]')].forEach((element, index) =>
      expect(element).toBe(serverHosts[index]),
    );
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelectorAll('[data-slot="empty-root"]')).toHaveLength(1);
    expect(host.querySelector('[data-slot="empty-root"]')?.getAttribute('aria-label')).toBe(
      'Projects',
    );
    expect(
      host.querySelector('[data-slot="empty-root"]')?.classList.contains('consumer-empty'),
    ).toBe(true);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});