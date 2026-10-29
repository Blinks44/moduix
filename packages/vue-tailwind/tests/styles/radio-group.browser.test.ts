import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  RadioGroup,
  RadioGroupContext,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemContext,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
} from '@/index';

const radioGroupComponents = {
  RadioGroup,
  RadioGroupContext,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemContext,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
} as Record<string, Component>;

test('keeps asChild composition semantic with an explicit item input', async () => {
  const itemRef = ref<ComponentPublicInstance>();

  render({
    components: radioGroupComponents,
    setup() {
      return { itemRef };
    },
    template: `
      <RadioGroup default-value="React">
        <RadioGroupItem ref="itemRef" as-child class="grid w-56" value="React">
          <label data-testid="custom-item">
            <RadioGroupItemControl />
            <RadioGroupItemHiddenInput />
            <RadioGroupItemText>React</RadioGroupItemText>
          </label>
        </RadioGroupItem>
      </RadioGroup>
    `,
  });
  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  await expect
    .element(page.getByTestId('custom-item'))
    .toHaveAttribute('data-slot', 'radio-group-item');
  expect([...item!.classList]).toEqual(expect.arrayContaining(['grid', 'w-56']));
  expect(itemRef.value?.$el).toBe(item);
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render({
    components: radioGroupComponents,
    template: `
      <RadioGroup class="gap-4 text-primary" data-testid="root">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioGroupItem class="grid w-56" value="React" data-testid="item">
          <RadioGroupItemControl class="size-6 border-primary bg-muted before:size-3" data-testid="control" />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </RadioGroupItem>
      </RadioGroup>
    `,
  });

  const root = screen.getByTestId('root');
  const item = screen.getByTestId('item');
  const control = screen.getByTestId('control');

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...item!.classList]).toEqual(expect.arrayContaining(['grid', 'w-56']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['size-6', 'border-primary', 'bg-muted', 'before:size-3']),
  );
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.getByTestId('control')).toHaveCSS('width', '24px');
});