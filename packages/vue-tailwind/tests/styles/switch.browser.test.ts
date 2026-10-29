import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
} from '@/index';

const switchComponents = {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
};

test('forwards Vue refs and exposes stable slots on public parts', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    control: ref<ComponentPublicInstance | null>(null),
    thumb: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
  };

  render({
    components: switchComponents,
    setup() {
      return {
        rootRef: refs.root,
        controlRef: refs.control,
        thumbRef: refs.thumb,
        labelRef: refs.label,
      };
    },
    template: `
      <Switch ref="rootRef" size="lg">
        <SwitchControl ref="controlRef">
          <SwitchThumb ref="thumbRef" />
        </SwitchControl>
        <SwitchHiddenInput />
        <SwitchLabel ref="labelRef">Email notifications</SwitchLabel>
      </Switch>
    `,
  });

  expect(refs.root.value?.$el?.getAttribute('data-slot')).toBe('switch-root');
  expect(refs.root.value?.$el?.getAttribute('data-size')).toBe('lg');
  expect(refs.control.value?.$el?.getAttribute('data-slot')).toBe('switch-control');
  expect(refs.thumb.value?.$el?.getAttribute('data-slot')).toBe('switch-thumb');
  expect(refs.label.value?.$el?.getAttribute('data-slot')).toBe('switch-label');
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render({
    components: switchComponents,
    template: `
      <Switch class="gap-4" data-testid="root">
        <SwitchControl class="w-10 rounded-md bg-background">
          <SwitchThumb class="size-4 bg-muted-foreground" />
        </SwitchControl>
        <SwitchLabel class="text-lg">Notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    `,
  });

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['w-10', 'rounded-md', 'bg-background']),
  );
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['size-4', 'bg-muted-foreground']));
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-lg']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="switch-control"]')).toHaveCSS('width', '40px');
  await expect.element(page.locator('[data-slot="switch-thumb"]')).toHaveCSS('width', '16px');
});