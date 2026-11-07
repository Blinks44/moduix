import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import TestTree from '../../../svelte/tests/tree-view/TestTree.svelte';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(TestTree, { props: { class: 'w-96' } });
  const root = container.firstElementChild;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-96']));
  await expect.element(page.locator('[data-slot="tree-view-root"]')).toHaveCSS('width', '384px');
});