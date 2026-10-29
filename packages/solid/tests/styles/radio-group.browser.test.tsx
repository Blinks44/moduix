import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from '@/index';

test('keeps asChild composition semantic with an explicit item input', () => {
  render(() => (
    <RadioGroup defaultValue="React">
      <RadioGroupItem
        asChild={(props) => <label data-testid="custom-item" {...props()} />}
        value="React"
      >
        <>
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </>
      </RadioGroupItem>
    </RadioGroup>
  ));

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});