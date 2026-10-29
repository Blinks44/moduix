import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from '@/index';

test('keeps asChild composition semantic with an explicit item input', () => {
  render(
    <RadioGroup defaultValue="React">
      <RadioGroupItem asChild value="React">
        <label data-testid="custom-item">
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </label>
      </RadioGroupItem>
    </RadioGroup>,
  );

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});