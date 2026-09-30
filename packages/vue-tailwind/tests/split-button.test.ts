import { expect, test, rs } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref, type ComponentPublicInstance } from 'vue';
import {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '../src';

const components = {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
};
const popup =
  '<SplitButtonPositioner><SplitButtonContent><MenuItem value="save-draft">Save as Draft</MenuItem></SplitButtonContent></SplitButtonPositioner>';
const harness = (template: string, setup?: () => Record<string, unknown>) =>
  defineComponent({ components, setup, template });

test('preserves a native positioner asChild host and exposes the Vue Teleport anchor on its component ref', async () => {
  const positionerRef = ref<ComponentPublicInstance>();
  render(
    harness(
      '<SplitButton default-open><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger /><SplitButtonPositioner ref="positionerRef" as-child data-probe="positioner"><section><SplitButtonContent><MenuItem value="edit">Edit</MenuItem></SplitButtonContent></section></SplitButtonPositioner></SplitButton>',
      () => ({ positionerRef }),
    ),
  );
  const menu = await screen.findByRole('menu');
  const positionerHost = menu.parentElement;
  expect(positionerHost?.tagName).toBe('SECTION');
  expect(positionerHost).toHaveAttribute('data-slot', 'split-button-positioner');
  expect(positionerHost).toHaveAttribute('data-probe', 'positioner');
  expect(positionerRef.value?.$el.nodeType).toBe(Node.COMMENT_NODE);
  await fireEvent.keyDown(menu, { key: 'Escape' });
});

test('preserves native form submission on the action while keeping the trigger a button', async () => {
  const submit = rs.fn();
  render(
    harness(
      `<form @submit.prevent="submit"><SplitButton :portalled="false"><SplitButtonAction type="submit" name="intent" value="save">Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton></form>`,
      () => ({ submit }),
    ),
  );
  const action = screen.getByRole('button', { name: 'Save' });
  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(action).toHaveAttribute('type', 'submit');
  expect(action).toHaveAttribute('name', 'intent');
  expect(action).toHaveAttribute('value', 'save');
  expect(trigger).toHaveAttribute('type', 'button');
  await fireEvent.click(trigger);
  expect(submit).not.toHaveBeenCalled();
  await fireEvent.keyDown(await screen.findByRole('menu'), { key: 'Escape' });
  await fireEvent.click(action);
  expect(submit).toHaveBeenCalledTimes(1);
});

test('forwards persistent menu options and emits item selection once without closing', async () => {
  const select = rs.fn();
  render(
    harness(
      `<SplitButton :portalled="false" :close-on-select="false" :lazy-mount="false" :unmount-on-exit="false" @select="select"><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
      () => ({ select }),
    ),
  );
  const content = document.querySelector('[data-slot="split-button-content"]');
  expect(content).toBeInTheDocument();
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  const trigger = screen.getByRole('button', { name: 'More actions' });
  await fireEvent.click(trigger);
  const item = await screen.findByRole('menuitem', { name: 'Save as Draft' });
  await fireEvent.pointerMove(item);
  await fireEvent.pointerDown(item);
  await fireEvent.pointerUp(item);
  await fireEvent.click(item);
  await waitFor(() => expect(select).toHaveBeenCalledTimes(1));
  expect(select).toHaveBeenCalledWith({ value: 'save-draft' });
  expect(screen.getByRole('menu')).toBe(content);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  expect(document.querySelector('[data-slot="split-button-content"]')).toBe(content);
});

test('keeps the default trigger accessible and restores focus after Escape', async () => {
  const openChanges: boolean[] = [];
  render(
    harness(
      `<SplitButton aria-label="Save actions" :portalled="false" @open-change="onOpenChange"><SplitButtonAction>Save Changes</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
      () => ({ onOpenChange: (details: { open: boolean }) => openChanges.push(details.open) }),
    ),
  );
  expect(screen.getByRole('group', { name: 'Save actions' })).toHaveAttribute(
    'data-slot',
    'split-button-root',
  );
  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toHaveAttribute('data-slot', 'split-button-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  trigger.focus();
  await fireEvent.click(trigger);
  const menu = await screen.findByRole('menu');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(openChanges).toEqual([true]);
  await waitFor(() => expect(menu).toHaveFocus());
  await fireEvent.keyDown(menu, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  expect(openChanges).toEqual([true, false]);
});

test('keeps the menu trigger available when only the primary action is disabled', async () => {
  render(
    harness(
      `<SplitButton aria-label="Save actions" :portalled="false"><SplitButtonAction disabled>Save Changes</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
    ),
  );
  expect(screen.getByRole('button', { name: 'Save Changes' })).toBeDisabled();
  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).not.toBeDisabled();
  await fireEvent.click(trigger);
  expect(await screen.findByRole('menuitem', { name: 'Save as Draft' })).toBeVisible();
  await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
});

test('keeps the menu closed when its trigger is disabled', async () => {
  render(
    harness(
      `<SplitButton aria-label="Save actions"><SplitButtonAction>Save Changes</SplitButtonAction><SplitButtonTrigger disabled />${popup}</SplitButton>`,
    ),
  );
  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toBeDisabled();
  await fireEvent.click(trigger);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('preserves native refs and reactive root and part size and variant defaults', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const actionRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const size = ref<'lg' | 'sm'>('lg');
  render(
    harness(
      `<SplitButton ref="rootRef" aria-label="Project actions" :size="size" variant="destructive"><SplitButtonAction ref="actionRef">Delete project</SplitButtonAction><SplitButtonTrigger ref="triggerRef" aria-label="More project actions" />${popup}</SplitButton>`,
      () => ({ rootRef, actionRef, triggerRef, size }),
    ),
  );
  expect(rootRef.value?.$el).toBe(screen.getByRole('group', { name: 'Project actions' }));
  expect(rootRef.value?.$el).toHaveAttribute('data-scope', 'split-button');
  const action = screen.getByRole('button', { name: 'Delete project' });
  const trigger = screen.getByRole('button', { name: 'More project actions' });
  expect(actionRef.value?.$el).toBe(action);
  expect(triggerRef.value?.$el).toBe(trigger);
  for (const part of [action, trigger]) {
    expect(part).toHaveAttribute('data-size', 'lg');
    expect(part).toHaveAttribute('data-variant', 'destructive');
  }
  size.value = 'sm';
  await nextTick();
  for (const part of [action, trigger]) expect(part).toHaveAttribute('data-size', 'sm');
});

test('keeps the primary action independent and exposes stable popup slots and selection details', async () => {
  const actions: string[] = [];
  render(
    harness(
      `<SplitButton aria-labelledby="document-actions-label" :portalled="false" @select="onSelect"><span id="document-actions-label">Document actions</span><SplitButtonAction @click="actions.push('save')">Save</SplitButtonAction><SplitButtonTrigger>Options</SplitButtonTrigger><SplitButtonPositioner><SplitButtonContent><MenuItem value="duplicate">Duplicate</MenuItem></SplitButtonContent></SplitButtonPositioner></SplitButton>`,
      () => ({ actions, onSelect: (details: { value: string }) => actions.push(details.value) }),
    ),
  );
  expect(screen.getByRole('group', { name: 'Document actions' })).toHaveAttribute(
    'aria-labelledby',
    'document-actions-label',
  );
  const primary = screen.getByRole('button', { name: 'Save' });
  expect(primary).toHaveAttribute('data-slot', 'split-button-action');
  await fireEvent.click(primary);
  expect(actions).toEqual(['save']);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  const trigger = screen.getByRole('button', { name: 'Options' });
  expect(trigger).not.toHaveAttribute('aria-label');
  await fireEvent.click(trigger);
  const menu = await screen.findByRole('menu');
  expect(menu).toHaveAttribute('data-slot', 'split-button-content');
  expect(menu.parentElement).toHaveAttribute('data-slot', 'split-button-positioner');
  expect(menu.firstElementChild).toHaveAttribute('data-slot', 'menu-viewport');
  const item = screen.getByRole('menuitem', { name: 'Duplicate' });
  await fireEvent.pointerMove(item);
  await fireEvent.pointerDown(item);
  await fireEvent.pointerUp(item);
  await fireEvent.click(item);
  await waitFor(() => expect(actions).toEqual(['save', 'duplicate']));
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
});

test('preserves v-model:open without local state and honours part overrides', async () => {
  const open = ref(false);
  render(
    harness(
      `<SplitButton v-model:open="open" :portalled="false" size="lg" variant="destructive"><SplitButtonAction size="xs" variant="outline">Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
      () => ({ open }),
    ),
  );
  expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', 'xs');
  expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-variant', 'outline');
  await fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
  await waitFor(() => expect(open.value).toBe(true));
  await fireEvent.keyDown(await screen.findByRole('menu'), { key: 'Escape' });
  await waitFor(() => expect(open.value).toBe(false));
});

test('preserves action and content asChild hosts, attrs, listeners and native refs', async () => {
  const actionRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const click = rs.fn();
  render(
    harness(
      '<SplitButton default-open :portalled="false"><SplitButtonAction ref="actionRef" as-child data-probe="action" @click="click"><a href="#docs">Docs</a></SplitButtonAction><SplitButtonTrigger /><SplitButtonPositioner><SplitButtonContent ref="contentRef" as-child data-probe="content"><section><MenuItem value="edit">Edit</MenuItem></section></SplitButtonContent></SplitButtonPositioner></SplitButton>',
      () => ({ actionRef, contentRef, click }),
    ),
  );
  const action = screen.getByRole('link', { name: 'Docs' });
  expect(actionRef.value?.$el).toBe(action);
  expect(action).toHaveAttribute('data-slot', 'split-button-action');
  expect(action).toHaveAttribute('data-probe', 'action');
  await fireEvent.click(action);
  expect(click).toHaveBeenCalledTimes(1);
  const menu = screen.getByRole('menu');
  expect(menu.tagName).toBe('SECTION');
  expect(contentRef.value?.$el).toBe(menu);
  expect(menu).toHaveAttribute('data-probe', 'content');
  expect(menu.querySelector('[data-slot="menu-viewport"]')).toBeNull();
  await fireEvent.keyDown(menu, { key: 'Escape' });
});

test('portals by default and accepts a custom portal target', async () => {
  const target = document.createElement('div');
  document.body.append(target);
  const { container, unmount } = render(
    harness(
      `<SplitButton default-open :portal-ref="target"><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
      () => ({ target }),
    ),
  );
  expect(container.querySelector('[role="menu"]')).toBeNull();
  expect(target.querySelector('[role="menu"]')).toBeInTheDocument();
  await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
  unmount();
  target.remove();
});

test('renders SSR and hydrates open and default portalled roots without mismatches', async () => {
  const Harness = harness(
    ['default-open :portalled="false"', '', 'default-open']
      .map(
        (props) =>
          `<SplitButton ${props} aria-label="Save actions"><SplitButtonAction as-child><a href="#docs">Docs</a></SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
      )
      .join(''),
  );
  const context: { teleports?: Record<string, string> } = {};
  const markup = await renderToString(createSSRApp(Harness), context);
  expect(markup).toContain('data-slot="split-button-root"');
  const container = document.createElement('div');
  container.innerHTML = markup;
  const teleportHost = document.createElement('div');
  teleportHost.innerHTML = context.teleports?.body ?? '';
  const teleportNodes = [...teleportHost.childNodes];
  document.body.prepend(...teleportNodes);
  document.body.append(container);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(Harness);
  app.mount(container);
  await nextTick();
  expect(container.querySelector('[data-slot="split-button-action"]')?.tagName).toBe('A');
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();
  warn.mockRestore();
  error.mockRestore();
  app.unmount();
  container.remove();
  for (const node of teleportNodes) node.remove();
});

test('matches CSS Modules trigger padding and preserves all joined utilities with consumer overrides last', () => {
  render(
    harness(
      '<SplitButton aria-label="Project actions"><SplitButtonAction class="rounded-md p-0 text-xs">Save</SplitButtonAction><SplitButtonTrigger /></SplitButton>',
    ),
  );
  const action = screen.getByRole('button', { name: 'Save' });
  const trigger = screen.getByRole('button', { name: 'More actions' });
  const pressReset = "motion-safe:[&:not([data-variant='link']):active]:[translate:none]";
  expect(trigger).toHaveClass('px-3');
  expect(trigger).toHaveClass(
    'ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)]',
    pressReset,
  );
  expect(trigger).not.toHaveClass(
    '-ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)]',
  );
  expect(trigger).not.toHaveClass('px-4');
  expect(action).toHaveClass(
    'inline-flex',
    'items-center',
    'rounded-md',
    'p-0',
    'text-xs',
    pressReset,
  );
  expect(action).not.toHaveClass('rounded-e-none', 'px-4', 'text-sm');
});

test('lets consumers replace trigger padding without losing separator utilities', () => {
  render(
    harness(
      '<SplitButton><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger size="lg" class="px-0 ms-0" /></SplitButton>',
    ),
  );
  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toHaveClass(
    'relative',
    'min-w-0',
    'rounded-s-none',
    'before:absolute',
    'before:w-px',
    'px-0',
    'ms-0',
  );
  expect(trigger).not.toHaveClass('px-3.5', 'px-5');
  expect(trigger).not.toHaveClass(
    'ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)]',
  );
});