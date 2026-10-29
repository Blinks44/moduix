import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { type CSSProperties } from 'react';
import { Select, SelectField } from '@/index';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

test('reserves trigger room from the action size variable', async () => {
  const style = { '--moduix-select-action-size': '32px' } as CSSProperties;
  render(
    <>
      <Select collection={fruits} defaultValue={['apple']} style={style}>
        <SelectField />
      </Select>
      <Select collection={fruits} defaultValue={['apple']} style={style}>
        <SelectField clearLabel="Clear fruit" />
      </Select>
    </>,
  );

  const [withoutClear, withClear] = [
    ...document.querySelectorAll<HTMLElement>('[data-slot="select-trigger"]'),
  ];
  await expect.poll(() => getComputedStyle(withClear!).paddingInlineEnd).toBe('84px');
  expect(getComputedStyle(withoutClear!).paddingInlineEnd).toBe('54px');
  const indicator = document.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;
  expect(indicator.offsetWidth).toBe(32);
});