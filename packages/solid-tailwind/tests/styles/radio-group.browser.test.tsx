import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from '@/index';

test('keeps asChild composition semantic with an explicit item input', () => {
  render(() => (
    <RadioGroup defaultValue="React">
      <RadioGroupItem
        class="grid w-56"
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
  expect([...item!.classList]).toEqual(expect.arrayContaining(['grid', 'w-56']));
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <RadioGroup class="gap-4 text-primary" data-testid="root">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupItem value="React">
        <RadioGroupItemControl
          class="size-6 border-primary bg-muted before:size-3"
          data-testid="control"
        />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText>React</RadioGroupItemText>
      </RadioGroupItem>
    </RadioGroup>
  ));

  const root = screen.getByTestId('root');
  const control = screen.getByTestId('control');

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['size-6', 'border-primary', 'bg-muted', 'before:size-3']),
  );
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.getByTestId('control')).toHaveCSS('width', '24px');
});