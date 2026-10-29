import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent } from 'vue';
import { JsonTreeView, JsonTreeViewRootProvider, JsonTreeViewTree } from '@/index';

const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};

const jsonTreeViewComponents = {
  JsonTreeView,
  JsonTreeViewRootProvider,
  JsonTreeViewTree,
};

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  const Harness = defineComponent({
    components: jsonTreeViewComponents,
    setup() {
      return { data };
    },
    template: `
      <JsonTreeView :class="'w-1/2'" :data="data">
        <JsonTreeViewTree />
      </JsonTreeView>
    `,
  });

  render(Harness);

  const root = screen.getByRole('tree').parentElement;
  expect(root!.parentElement!.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(
    root!.getBoundingClientRect().width / root!.parentElement!.getBoundingClientRect().width,
  ).toBeCloseTo(0.5, 2);
});