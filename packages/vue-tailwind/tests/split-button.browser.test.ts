import { page } from '@rstest/browser';
import { expect, test, rs } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref, type ComponentPublicInstance } from 'vue';
import {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '../src';
import TestSplitButton from './fixtures/TestSplitButton.vue';

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
test('preserves a native positioner asChild host and exposes the Vue Teleport anchor on its component ref', async () => {
  const positionerRef = ref<ComponentPublicInstance>();
  render({
    components,
    template:
      '<SplitButton default-open><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger /><SplitButtonPositioner ref="positionerRef" as-child data-probe="positioner"><section><SplitButtonContent><MenuItem value="edit">Edit</MenuItem></SplitButtonContent></section></SplitButtonPositioner></SplitButton>',
    setup: () => ({ positionerRef }),
  });
  await expect.element(page.getByRole('menu')).toBeVisible();
  const menu = screen.getByRole('menu');
  const positionerHost = menu.parentElement;
  expect(positionerHost?.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('menu').locator('..'))
    .toHaveAttribute('data-slot', 'split-button-positioner');
  await expect
    .element(page.getByRole('menu').locator('..'))
    .toHaveAttribute('data-probe', 'positioner');
  expect(positionerRef.value?.$el.nodeType).toBe(Node.COMMENT_NODE);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
});

test('preserves native form submission on the action while keeping the trigger a button', async () => {
  const submit = rs.fn();
  render({
    components,
    template: `<form @submit.prevent="submit"><SplitButton :portalled="false"><SplitButtonAction type="submit" name="intent" value="save">Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton></form>`,
    setup: () => ({ submit }),
  });

  const action = page.getByRole('button', { name: 'Save' });
  await expect.element(action).toHaveAttribute('type', 'submit');
  await expect.element(action).toHaveAttribute('name', 'intent');
  await expect.element(action).toHaveAttribute('value', 'save');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveAttribute('type', 'button');
  await page.getByRole('button', { name: 'More actions' }).click();
  expect(submit).not.toHaveBeenCalled();
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
  await action.click();
  expect(submit).toHaveBeenCalledTimes(1);
});

test('forwards persistent menu options and emits item selection once without closing', async () => {
  const select = rs.fn();
  render({
    components,
    template: `<SplitButton :portalled="false" :close-on-select="false" :lazy-mount="false" :unmount-on-exit="false" @select="select"><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
    setup: () => ({ select }),
  });
  const content = document.querySelector('[data-slot="split-button-content"]');
  await expect.element(page.locator('[data-slot="split-button-content"]')).toBeAttached();
  const menu = page.getByRole('menu');
  await expect.element(menu).toHaveCount(0);

  const trigger = page.getByRole('button', { name: 'More actions' });
  await trigger.click();

  await page.getByRole('menuitem', { name: 'Save as Draft' }).click();
  await expect.poll(() => select).toHaveBeenCalledTimes(1);
  expect(select).toHaveBeenCalledWith({ value: 'save-draft' });
  expect(screen.getByRole('menu')).toBe(content);
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(menu).toHaveCount(0);
  expect(document.querySelector('[data-slot="split-button-content"]')).toBe(content);
});

test('keeps the default trigger accessible and restores focus after Escape', async () => {
  const openChanges: boolean[] = [];
  render({
    components,
    template: `<SplitButton aria-label="Save actions" :portalled="false" @open-change="onOpenChange"><SplitButtonAction>Save Changes</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
    setup: () => ({ onOpenChange: (details: { open: boolean }) => openChanges.push(details.open) }),
  });
  await expect
    .element(page.getByRole('group', { name: 'Save actions' }))
    .toHaveAttribute('data-slot', 'split-button-root');

  const trigger = page.getByRole('button', { name: 'More actions' });
  await expect.element(trigger).toHaveAttribute('data-slot', 'split-button-trigger');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

  await trigger.click();
  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(openChanges).toEqual([true]);
  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(menu).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(openChanges).toEqual([true, false]);
});

test('keeps the menu trigger available when only the primary action is disabled', async () => {
  render({
    components,
    template: `<SplitButton aria-label="Save actions" :portalled="false"><SplitButtonAction disabled>Save Changes</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
  });
  await expect.element(page.getByRole('button', { name: 'Save Changes' })).toBeDisabled();

  await expect.element(page.getByRole('button', { name: 'More actions' })).not.toBeDisabled();
  await page.getByRole('button', { name: 'More actions' }).click();
  await expect.element(page.getByRole('menuitem', { name: 'Save as Draft' })).toBeVisible();
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
});

test('keeps the menu closed when its trigger is disabled', async () => {
  render({
    components,
    template: `<SplitButton aria-label="Save actions"><SplitButtonAction>Save Changes</SplitButtonAction><SplitButtonTrigger disabled />${popup}</SplitButton>`,
  });

  await expect.element(page.getByRole('button', { name: 'More actions' })).toBeDisabled();

  await expect.element(page.getByRole('menu')).toHaveCount(0);
});

test('preserves native refs and reactive root and part size and variant defaults', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const actionRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const size = ref<'lg' | 'sm'>('lg');
  render({
    components,
    template: `<SplitButton ref="rootRef" aria-label="Project actions" :size="size" variant="destructive"><SplitButtonAction ref="actionRef">Delete project</SplitButtonAction><SplitButtonTrigger ref="triggerRef" aria-label="More project actions" />${popup}</SplitButton>`,
    setup: () => ({ rootRef, actionRef, triggerRef, size }),
  });
  expect(rootRef.value?.$el).toBe(screen.getByRole('group', { name: 'Project actions' }));
  expect(rootRef.value?.$el?.getAttribute('data-scope')).toBe('split-button');
  const action = screen.getByRole('button', { name: 'Delete project' });
  const trigger = screen.getByRole('button', { name: 'More project actions' });
  expect(actionRef.value?.$el).toBe(action);
  expect(triggerRef.value?.$el).toBe(trigger);
  for (const part of [action, trigger]) {
    expect(part?.getAttribute('data-size')).toBe('lg');
    expect(part?.getAttribute('data-variant')).toBe('destructive');
  }
  size.value = 'sm';
  await nextTick();
  for (const part of [action, trigger]) expect(part?.getAttribute('data-size')).toBe('sm');
});

test('keeps the primary action independent and exposes stable popup slots and selection details', async () => {
  const actions: string[] = [];
  render({
    components,
    template: `<SplitButton aria-labelledby="document-actions-label" :portalled="false" @select="onSelect"><span id="document-actions-label">Document actions</span><SplitButtonAction @click="actions.push('save')">Save</SplitButtonAction><SplitButtonTrigger>Options</SplitButtonTrigger><SplitButtonPositioner><SplitButtonContent><MenuItem value="duplicate">Duplicate</MenuItem></SplitButtonContent></SplitButtonPositioner></SplitButton>`,
    setup: () => ({
      actions,
      onSelect: (details: { value: string }) => actions.push(details.value),
    }),
  });
  await expect
    .element(page.getByRole('group', { name: 'Document actions' }))
    .toHaveAttribute('aria-labelledby', 'document-actions-label');

  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-slot', 'split-button-action');
  await page.getByRole('button', { name: 'Save' }).click();
  expect(actions).toEqual(['save']);
  const menu = page.getByRole('menu');
  await expect.element(menu).toHaveCount(0);

  await expect
    .element(page.getByRole('button', { name: 'Options' }))
    .not.toHaveAttribute('aria-label');
  await page.getByRole('button', { name: 'Options' }).click();
  await expect.element(menu).toBeVisible();

  await expect.element(menu).toHaveAttribute('data-slot', 'split-button-content');
  await expect.element(menu.locator('..')).toHaveAttribute('data-slot', 'split-button-positioner');
  await expect
    .element(menu.locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-viewport');

  await page.getByRole('menuitem', { name: 'Duplicate' }).click();
  await expect.poll(() => actions).toEqual(['save', 'duplicate']);
  await expect.element(menu).toHaveCount(0);
});

test('preserves v-model:open without local state and honours part overrides', async () => {
  const open = ref(false);
  render({
    components,
    template: `<SplitButton v-model:open="open" :portalled="false" size="lg" variant="destructive"><SplitButtonAction size="xs" variant="outline">Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
    setup: () => ({ open }),
  });
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-size', 'xs');
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-variant', 'outline');
  await page.getByRole('button', { name: 'More actions' }).click();
  await expect.poll(() => open.value).toBe(true);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
  await expect.poll(() => open.value).toBe(false);
});

test('preserves action and content asChild hosts, attrs, listeners and native refs', async () => {
  const actionRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const click = rs.fn();
  render({
    components,
    template:
      '<SplitButton default-open :portalled="false"><SplitButtonAction ref="actionRef" as-child data-probe="action" @click="click"><a href="#docs">Docs</a></SplitButtonAction><SplitButtonTrigger /><SplitButtonPositioner><SplitButtonContent ref="contentRef" as-child data-probe="content"><section><MenuItem value="edit">Edit</MenuItem></section></SplitButtonContent></SplitButtonPositioner></SplitButton>',
    setup: () => ({ actionRef, contentRef, click }),
  });
  const action = screen.getByRole('link', { name: 'Docs' });
  expect(actionRef.value?.$el).toBe(action);
  await expect
    .element(page.getByRole('link', { name: 'Docs' }))
    .toHaveAttribute('data-slot', 'split-button-action');
  await expect
    .element(page.getByRole('link', { name: 'Docs' }))
    .toHaveAttribute('data-probe', 'action');
  const menu = screen.getByRole('menu');
  expect(menu.tagName).toBe('SECTION');
  expect(contentRef.value?.$el).toBe(menu);
  await expect.element(page.getByRole('menu')).toHaveAttribute('data-probe', 'content');
  expect(menu.querySelector('[data-slot="menu-viewport"]')).toBeNull();
  await page.getByRole('link', { name: 'Docs' }).click();
  expect(click).toHaveBeenCalledTimes(1);
  await expect.element(page.getByRole('menu')).toHaveCount(0);
});

test('portals by default and accepts a custom portal target', async () => {
  const target = document.createElement('div');
  document.body.append(target);
  const { container, unmount } = render({
    components,
    template: `<SplitButton default-open :portal-ref="target"><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger />${popup}</SplitButton>`,
    setup: () => ({ target }),
  });
  expect(container.querySelector('[role="menu"]')).toBeNull();
  expect(target.querySelector('[role="menu"]')?.isConnected ?? false).toBe(true);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
  unmount();
  target.remove();
});

test('matches CSS Modules trigger padding and preserves all joined utilities with consumer overrides last', async () => {
  render({
    components,
    template:
      '<SplitButton aria-label="Project actions"><SplitButtonAction class="rounded-md p-0 text-xs">Save</SplitButtonAction><SplitButtonTrigger /></SplitButton>',
  });
  const action = screen.getByRole('button', { name: 'Save' });
  const trigger = screen.getByRole('button', { name: 'More actions' });
  const pressReset = "motion-safe:[&:not([data-variant='link']):active]:[translate:none]";
  expect(trigger?.classList.contains('px-3')).toBe(true);
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-left', '12px');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-right', '12px');
  expect(
    trigger?.classList.contains(
      'ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)]',
    ),
  ).toBe(true);
  expect(trigger?.classList.contains(pressReset)).toBe(true);
  expect(
    trigger?.classList.contains(
      '-ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)]',
    ),
  ).toBe(false);
  expect(trigger.classList.contains('px-4')).toBe(false);
  for (const utility of [
    'inline-flex',
    'items-center',
    'rounded-md',
    'p-0',
    'text-xs',
    pressReset,
  ]) {
    expect(action.classList.contains(utility)).toBe(true);
  }
  for (const utility of ['rounded-e-none', 'px-4', 'text-sm']) {
    expect(action.classList.contains(utility)).toBe(false);
  }
});

test('lets consumers replace trigger padding without losing separator utilities', async () => {
  render({
    components,
    template:
      '<SplitButton><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger size="lg" class="px-0 ms-0" /></SplitButton>',
  });
  const trigger = screen.getByRole('button', { name: 'More actions' });
  for (const utility of [
    'relative',
    'min-w-0',
    'rounded-s-none',
    'before:absolute',
    'before:w-px',
    'px-0',
  ]) {
    expect(trigger.classList.contains(utility)).toBe(true);
  }
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-left', '0px');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-right', '0px');
  expect(trigger.classList.contains('ms-0')).toBe(true);
  expect(trigger.classList.contains('px-3.5')).toBe(false);
  expect(trigger.classList.contains('px-5')).toBe(false);
  expect(
    trigger?.classList.contains(
      'ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)]',
    ),
  ).toBe(false);
});

test('hydrates inline, closed and portalled roots without replacing hosts or ids', async () => {
  const context: { teleports?: Record<string, string> } = {};
  const html = await renderToString(createSSRApp(TestSplitButton), context);
  const host = document.createElement('div');
  host.innerHTML = html;
  const selector = '[data-slot="split-button-action"], [data-slot="split-button-trigger"]';
  const serverNodes = [...host.querySelectorAll(selector)];
  const ids = serverNodes.map((node) => node.id);
  const teleportHost = document.createElement('div');
  teleportHost.innerHTML = context.teleports?.body ?? '';
  const teleportNodes = [...teleportHost.childNodes];
  document.body.prepend(...teleportNodes);
  document.body.append(host);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSplitButton);
  try {
    app.mount(host);
    await nextTick();
    const hydratedNodes = [...host.querySelectorAll(selector)];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    for (const [index, node] of hydratedNodes.entries()) {
      expect(node).toBe(serverNodes[index]);
      expect(node.id).toBe(ids[index]);
    }
    for (const action of host.querySelectorAll('[data-slot="split-button-action"]')) {
      expect(action.tagName).toBe('A');
    }
    await expect
      .element(page.getByRole('button', { name: 'Inline options' }))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(page.getByRole('button', { name: 'Closed options' }))
      .toHaveAttribute('aria-expanded', 'false');
    const trigger = page.getByRole('button', { name: 'Portalled options' });
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = page.getByRole('menu', { name: 'Portalled options' });
    await expect.element(menu).toBeFocused();
    await menu.press('Escape');
    await expect.element(menu).toHaveCount(0);
    await expect.element(trigger).toBeFocused();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    for (const node of teleportNodes) node.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});