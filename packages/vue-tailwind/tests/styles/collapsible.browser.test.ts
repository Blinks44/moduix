import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
} from '@/index';

const collapsibleComponents = {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
};

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
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['gap-6', 'py-4', 'text-lg']));
  expect(indicator?.classList.contains('size-5')).toBe(true);
  expect(content?.classList.contains('text-lg')).toBe(true);
  expect([...body!.classList]).toEqual(expect.arrayContaining(['gap-6', 'p-6']));
});