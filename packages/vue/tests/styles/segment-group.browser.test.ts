import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@/index';

const segmentGroupComponents = {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
};

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

const SegmentOptions = defineComponent({
  components: { SegmentGroupItems },
  setup() {
    return {
      items: frameworks.map((value) => ({ value, label: value })),
    };
  },
  template: '<SegmentGroupItems :items="items" />',
});

const testComponents = {
  ...segmentGroupComponents,
  SegmentOptions,
};

test('supports v-model and emits one value-change detail per selection', async () => {
  const details: string[] = [];

  render({
    components: testComponents,
    setup() {
      const value = ref<string | null>('React');
      return { details, value };
    },
    template: `
      <SegmentGroup v-model="value" aria-label="Framework" @value-change="details.push($event.value)">
        <SegmentGroupItems :items="[
          { value: 'React', label: 'React' },
          { value: 'Solid', label: 'Solid' }
        ]" />
      </SegmentGroup>
      <output>Current value: {{ value }}</output>
    `,
  });
  await page.getByText('Solid', { exact: true }).click();

  await expect.element(page.getByText('Current value: Solid')).toBeAttached();
  expect(details).toEqual(['Solid']);
});

test('preserves disabled, read-only, invalid, and required states', async () => {
  render({
    components: segmentGroupComponents,
    template: `
      <SegmentGroup disabled aria-label="Disabled framework">
        <SegmentGroupItem value="React"><SegmentGroupItemText>Disabled option</SegmentGroupItemText><SegmentGroupItemHiddenInput /></SegmentGroupItem>
      </SegmentGroup>
      <SegmentGroup read-only aria-label="Read-only framework">
        <SegmentGroupItem value="React"><SegmentGroupItemText>Read-only option</SegmentGroupItemText><SegmentGroupItemHiddenInput /></SegmentGroupItem>
      </SegmentGroup>
      <SegmentGroup invalid required aria-label="Required framework">
        <SegmentGroupItem value="React"><SegmentGroupItemText>Required option</SegmentGroupItemText><SegmentGroupItemHiddenInput /></SegmentGroupItem>
      </SegmentGroup>
    `,
  });

  await expect
    .element(page.getByRole('radio', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radiogroup', { name: 'Read-only framework', exact: true }))
    .toHaveAttribute('aria-readonly', 'true');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByRole('radiogroup', { name: 'Required framework', exact: true }))
    .toHaveAttribute('data-invalid');
});

test('keeps as-child composition semantic and forwards item inputs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();

  render({
    components: segmentGroupComponents,
    setup() {
      return { itemRef, rootRef };
    },
    template: `
      <SegmentGroup ref="rootRef" as-child default-value="React" aria-label="Framework">
        <section aria-label="Framework choices">
          <SegmentGroupItem ref="itemRef" as-child value="React">
            <label data-testid="custom-item">
              <SegmentGroupItemText>React</SegmentGroupItemText>
              <SegmentGroupItemHiddenInput />
            </label>
          </SegmentGroupItem>
        </section>
      </SegmentGroup>
    `,
  });
  const root = screen.getByRole('radiogroup', { name: 'Framework choices' });
  const item = screen.getByTestId('custom-item');

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('radiogroup', { name: 'Framework choices', exact: true }))
    .toHaveAttribute('data-slot', 'segment-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(item.tagName).toBe('LABEL');
  await expect
    .element(page.getByTestId('custom-item'))
    .toHaveAttribute('data-slot', 'segment-group-item');
  expect(itemRef.value?.$el).toBe(item);
  expect(item.querySelector('input[type="radio"]')?.isConnected).toBe(true);
});

test('connects root and item contexts through the provider', async () => {
  const RootState = defineComponent({
    setup() {
      const segmentGroup = useSegmentGroupContext();
      const selectSolid = () => segmentGroup.value.setValue('Solid');
      return { segmentGroup, selectSolid };
    },
    template:
      '<button type="button" @click="selectSolid">Select {{ segmentGroup.value.value }}</button>',
  });
  const ItemState = defineComponent({
    setup() {
      return { item: useSegmentGroupItemContext() };
    },
    template: '<span>{{ item.checked ? "checked" : "unchecked" }}</span>',
  });

  render({
    components: { ...segmentGroupComponents, ItemState, RootState },
    setup() {
      return { segmentGroup: useSegmentGroup({ defaultValue: 'React' }) };
    },
    template: `
      <SegmentGroupRootProvider :value="segmentGroup" aria-label="Framework">
        <RootState />
        <SegmentGroupIndicator />
        <SegmentGroupItem value="React">
          <SegmentGroupItemText>React <ItemState /></SegmentGroupItemText>
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
        <SegmentGroupItem value="Solid">
          <SegmentGroupItemText>Solid</SegmentGroupItemText>
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      </SegmentGroupRootProvider>
    `,
  });
  await expect.element(page.getByText('checked')).toBeAttached();
  await page.getByRole('button', { name: 'Select', exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  await expect.element(page.getByText('unchecked')).toBeAttached();
});