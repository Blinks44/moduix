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
        <RadioGroupItem ref="itemRef" as-child value="React">
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
  expect(itemRef.value?.$el).toBe(item);
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});