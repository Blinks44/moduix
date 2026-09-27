import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '../src';
import styles from '../src/components/empty/Empty.module.css';

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
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByTestId('empty-icon').parentElement;
  const icon = screen.getByTestId('empty-icon');
  const title = screen.getByRole('heading', { name: 'No projects', level: 3 });
  const description = screen.getByText('Start by creating a project.');
  const actions = screen.getByRole('button', { name: 'Create project' }).parentElement;

  expect(rootRef.value?.$el).toBe(root);
  expect(titleRef.value?.$el).toBe(title);
  expect(root).toHaveAttribute('id', 'empty-state');
  expect(root).toHaveAttribute('data-scope', 'empty');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'empty-root');
  expect(root).toHaveClass(styles.root, 'consumer-root');
  expect(root).not.toHaveAttribute('role');
  expect(icon).toHaveAttribute('data-part', 'icon');
  expect(icon).toHaveAttribute('data-slot', 'empty-icon');
  expect(title).toHaveAttribute('data-part', 'title');
  expect(title).toHaveAttribute('data-slot', 'empty-title');
  expect(description.tagName).toBe('DIV');
  expect(description).toHaveAttribute('data-part', 'description');
  expect(actions).toHaveAttribute('data-part', 'actions');
  expect(actions).toHaveAttribute('data-slot', 'empty-actions');
});

test('preserves semantic elements and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const iconRef = ref<ComponentPublicInstance | null>(null);
  const contentRef = ref<ComponentPublicInstance | null>(null);
  const titleRef = ref<ComponentPublicInstance | null>(null);
  const descriptionRef = ref<ComponentPublicInstance | null>(null);
  const actionsRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

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
  expect(root).toHaveAttribute('data-part', 'root');
  expect(icon).toHaveAttribute('data-slot', 'empty-icon');
  expect(content).toHaveAttribute('data-part', 'content');
  expect(title).toHaveAttribute('data-part', 'title');
  expect(description).toHaveAttribute('data-slot', 'empty-description');
  expect(actions).toHaveAttribute('data-part', 'actions');
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

  const root = screen.getByTestId('root');
  expect(root).toHaveAttribute('data-scope', 'empty');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(screen.getByTestId('icon')).toHaveAttribute('data-part', 'icon');
  expect(screen.getByTestId('content')).toHaveAttribute('data-part', 'content');
  expect(screen.getByTestId('title')).toHaveAttribute('data-part', 'title');
  expect(screen.getByTestId('description')).toHaveAttribute('data-part', 'description');
  expect(screen.getByTestId('actions')).toHaveAttribute('data-part', 'actions');

  await fireEvent.click(root);
  expect(state.clicks).toBe(1);
});

test('renders and hydrates an asChild host on the server', async () => {
  const App = defineComponent({
    components: emptyComponents,
    template: `
      <Empty as-child class="consumer-empty">
        <section aria-label="Projects"><EmptyTitle>No projects</EmptyTitle></section>
      </Empty>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toMatch(/^<section/);
  expect(html).toContain('data-scope="empty"');
  expect(html).toContain('data-slot="empty-root"');
  expect(html).toContain('data-slot="empty-title"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const hydratedRoot = host.querySelector('[data-slot="empty-root"]');
  expect(host.querySelectorAll('[data-slot="empty-root"]')).toHaveLength(1);
  expect(hydratedRoot).toHaveAttribute('aria-label', 'Projects');
  expect(hydratedRoot).toHaveClass('consumer-empty');

  app.unmount();
  host.remove();
});