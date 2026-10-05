import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
  useCollapsibleContext,
} from '../src';
import SsrCollapsible from './fixtures/SsrCollapsible.vue';

const collapsibleComponents = {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
};

test('preserves Ark trigger semantics and lazy unmounting', async () => {
  render({
    components: collapsibleComponents,
    template:
      '<Collapsible lazy-mount unmount-on-exit><CollapsibleTrigger>Recovery details</CollapsibleTrigger><CollapsibleContent>Keep this safe.</CollapsibleContent></Collapsible>',
  });

  const trigger = page.getByRole('button', { name: 'Recovery details' });

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByText('Keep this safe.')).toHaveCount(0);

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByText('Keep this safe.')).toBeAttached();

  await trigger.click();

  await expect.element(page.getByText('Keep this safe.')).toHaveCount(0);
});

test('supports v-model:open and forwards the controlled callback details object', async () => {
  const details: boolean[] = [];

  render({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
    setup() {
      const open = ref(false);
      return { details, open };
    },
    template: `
      <Collapsible v-model:open="open" @open-change="details.push($event.open)">
        <CollapsibleTrigger>Controlled details</CollapsibleTrigger>
        <CollapsibleContent>Controlled content.</CollapsibleContent>
      </Collapsible>
      <output>Open: {{ open }}</output>
    `,
  });

  await page.getByRole('button', { name: 'Controlled details' }).click();

  await expect.element(page.getByText('Open: true')).toBeAttached();
  expect(details).toEqual([true]);
});

test('does not toggle or emit changes while disabled', async () => {
  const changes = rs.fn();
  render({
    components: collapsibleComponents,
    setup: () => ({ changes }),
    template:
      '<Collapsible disabled @open-change="changes"><CollapsibleTrigger>Recovery details</CollapsibleTrigger><CollapsibleContent>Keep this safe.</CollapsibleContent></Collapsible>',
  });
  const trigger = page.getByRole('button', { name: 'Recovery details' });
  await expect.element(trigger).toHaveAttribute('data-disabled');
  await trigger.click();
  await trigger.press('Enter');
  await trigger.press('Space');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(changes).not.toHaveBeenCalled();
});

test('keeps interactive content inert while partially collapsed', async () => {
  render({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
    template: `
      <Collapsible collapsed-height="2rem">
        <CollapsibleTrigger>Partial details</CollapsibleTrigger>
        <CollapsibleContent data-testid="partial-content">
          <button type="button">Nested action</button>
        </CollapsibleContent>
      </Collapsible>
    `,
  });

  const content = screen.getByTestId('partial-content');

  expect(content.hasAttribute('data-has-collapsed-size')).toBe(true);
  await expect.element(page.getByTestId('partial-content')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Nested action')).toHaveAttribute('inert');

  await page.getByRole('button', { name: 'Partial details' }).click();

  await expect.element(page.getByText('Nested action')).not.toHaveAttribute('inert');
});

test('preserves consumer-owned trigger refs and behavior with asChild', async () => {
  const triggerRef = ref<ComponentPublicInstance>();

  render({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
    setup() {
      return { triggerRef };
    },
    template: `
      <Collapsible>
        <CollapsibleTrigger ref="triggerRef" as-child>
          <button type="button" class="consumer-trigger">Composed details</button>
        </CollapsibleTrigger>
        <CollapsibleContent>Composed content.</CollapsibleContent>
      </Collapsible>
    `,
  });

  const trigger = screen.getByRole('button', { name: 'Composed details' });

  expect(triggerRef.value?.$el).toBe(trigger);
  expect(trigger?.classList.contains('consumer-trigger')).toBe(true);
  expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger');
  const triggerLocator = page.getByRole('button', { name: 'Composed details' });

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'false');

  await triggerLocator.click();

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
});

test('preserves Vue refs, anatomy, attrs, and Tailwind hooks', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();

  render({
    components: collapsibleComponents,
    setup() {
      return { bodyRef, contentRef, indicatorRef, rootRef, triggerRef };
    },
    template: `
      <Collapsible ref="rootRef" :default-open="true" data-probe="root">
        <CollapsibleTrigger ref="triggerRef">
          Details
          <CollapsibleIndicator ref="indicatorRef" />
        </CollapsibleTrigger>
        <CollapsibleContent ref="contentRef">
          <CollapsibleBody ref="bodyRef">Content</CollapsibleBody>
        </CollapsibleContent>
      </Collapsible>
    `,
  });

  const trigger = screen.getByRole('button', { name: 'Details' });
  const body = screen.getByText('Content');
  const content = body.parentElement;
  const root = rootRef.value?.$el as HTMLElement;

  expect(root.dataset).toMatchObject({
    slot: 'collapsible-root',
    scope: 'collapsible',
    probe: 'root',
  });
  expect(triggerRef.value?.$el).toBe(trigger);
  await expect
    .element(page.getByRole('button', { name: 'Details' }))
    .toHaveAttribute('type', 'button');
  expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger');
  await expect
    .element(page.getByRole('button', { name: 'Details' }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Details' }))
    .toHaveAttribute('aria-controls', content?.id);
  expect(
    trigger.querySelector('[data-slot="collapsible-indicator"] svg')?.isConnected ?? false,
  ).toBe(true);
  expect(indicatorRef.value?.$el?.getAttribute('data-slot')).toBe('collapsible-indicator');
  expect(contentRef.value?.$el).toBe(content);
  expect(content?.getAttribute('data-slot')).toBe('collapsible-content');
  expect(bodyRef.value?.$el).toBe(body);
  expect([...body!.classList]).toEqual(expect.arrayContaining(['grid', 'min-w-0', 'gap-2']));
  expect([...content!.classList]).toEqual(
    expect.arrayContaining(['box-border', 'overflow-hidden', 'text-sm']),
  );
});

test('keeps provider and descendant context composition connected', async () => {
  const RootState = {
    setup() {
      const collapsible = useCollapsibleContext();
      const close = () => collapsible.value.setOpen(false);
      return { close };
    },
    template: '<button type="button" @click="close">Close from context</button>',
  };

  render({
    components: { ...collapsibleComponents, RootState },
    setup() {
      return { collapsible: useCollapsible({ defaultOpen: true }) };
    },
    template: `
      <CollapsibleRootProvider :value="collapsible">
        <RootState />
        <CollapsibleTrigger>Provider details</CollapsibleTrigger>
        <CollapsibleContent><CollapsibleBody>Provider content.</CollapsibleBody></CollapsibleContent>
      </CollapsibleRootProvider>
    `,
  });

  const trigger = screen.getByRole('button', { name: 'Provider details' });
  await expect
    .element(page.getByRole('button', { name: 'Provider details' }))
    .toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('button', { name: 'Close from context' }).click();

  await expect
    .element(page.getByRole('button', { name: 'Provider details' }))
    .toHaveAttribute('aria-expanded', 'false');
  expect(trigger.closest('[data-slot="collapsible-root-provider"]')?.isConnected ?? false).toBe(
    true,
  );
});

test('hydrates collapsible without replacing server hosts or ids', async () => {
  const html = await renderToString(createSSRApp(SsrCollapsible));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrCollapsible);

  try {
    app.mount(host);
    await nextTick();
    const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(serverIds);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('exposes component-owned Tailwind defaults on every visual part', () => {
  render({
    components: collapsibleComponents,
    template: `
        <Collapsible :default-open="true" data-testid="collapsible-root">
          <CollapsibleTrigger>
            Recovery details
            <CollapsibleIndicator />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CollapsibleBody>Keep this safe.</CollapsibleBody>
          </CollapsibleContent>
        </Collapsible>
      `,
  });

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['box-border', 'flex', 'w-full', 'max-w-full', 'min-w-0', 'flex-col']),
  );
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'w-full',
      'gap-2',
      'bg-transparent',
      'px-0',
      'py-1',
      'text-sm',
    ]),
  );
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'size-3', 'shrink-0', 'transition-transform']),
  );
  expect([...content!.classList]).toEqual(
    expect.arrayContaining(['box-border', 'overflow-hidden', 'text-sm', 'text-muted-foreground']),
  );
  expect([...body!.classList]).toEqual(expect.arrayContaining(['grid', 'min-w-0', 'gap-2']));
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: collapsibleComponents,
    template: `
      <Collapsible class="w-1/2 text-primary" data-testid="collapsible-root">
        <CollapsibleTrigger class="gap-6 py-4 text-lg">
          Recovery details
          <CollapsibleIndicator class="size-5" />
        </CollapsibleTrigger>
        <CollapsibleContent class="text-lg">
          <CollapsibleBody class="gap-6 p-6">Keep this safe.</CollapsibleBody>
        </CollapsibleContent>
      </Collapsible>
    `,
  });

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  for (const utility of ['w-full', 'text-foreground']) {
    expect(root!.classList.contains(utility)).toBe(false);
  }
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['gap-6', 'py-4', 'text-lg']));
  for (const utility of ['gap-2', 'py-1', 'text-sm']) {
    expect(trigger!.classList.contains(utility)).toBe(false);
  }
  expect(indicator?.classList.contains('size-5')).toBe(true);
  expect(indicator?.classList.contains('size-3')).toBe(false);
  expect(content?.classList.contains('text-lg')).toBe(true);
  expect(content?.classList.contains('text-sm')).toBe(false);
  expect([...body!.classList]).toEqual(expect.arrayContaining(['gap-6', 'p-6']));
  expect(body?.classList.contains('gap-2')).toBe(false);
});