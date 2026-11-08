import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import TocOverride from './TocOverride.svelte';

test('lets consumer Tailwind classes override defaults', () => {
  render(TocOverride);

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-auto']));
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['p-0']),
  );
});