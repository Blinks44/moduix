import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Field,
  Fieldset,
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '../src';

const segmentGroupComponents = {
  Field,
  Fieldset,
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
};

const SegmentOptions = defineComponent({
  components: { SegmentGroupItems },
  setup() {
    return {
      items: ['React', 'Solid', 'Svelte', 'Vue'].map((value) => ({ value, label: value })),
    };
  },
  template: '<SegmentGroupItems :items="items" />',
});

const testComponents = { ...segmentGroupComponents, SegmentOptions };

test('submits through convenience inputs and preserves checked radio semantics', async () => {
  render({
    components: testComponents,
    template: `
      <form data-testid="form">
        <SegmentGroup default-value="React" name="framework" aria-label="Framework">
          <SegmentGroupIndicator /><SegmentOptions />
        </SegmentGroup>
      </form>
    `,
  });

  const form = screen.getByTestId('form') as HTMLFormElement;

  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('React');

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('supports v-model and emits one value-change detail per selection', async () => {
  const details: string[] = [];

  render({
    components: testComponents,
    setup() {
      return { details, value: ref<string | null>('React') };
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

test('reacts to external v-model changes', async () => {
  render({
    components: testComponents,
    setup() {
      return { value: ref<string | null>('React') };
    },
    template: `
      <button type="button" @click="value = 'Solid'">Set Solid</button>
      <SegmentGroup v-model="value" aria-label="Framework">
        <SegmentGroupItems :items="[
          { value: 'React', label: 'React' },
          { value: 'Solid', label: 'Solid' }
        ]" />
      </SegmentGroup>
    `,
  });
  await page.getByRole('button', { name: 'Set Solid', exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required states', async () => {
  render({
    components: segmentGroupComponents,
    template: `
      <SegmentGroup disabled aria-label="Disabled framework">
        <SegmentGroupItem value="React"><SegmentGroupItemText>Disabled option</SegmentGroupItemText><SegmentGroupItemControl /><SegmentGroupItemHiddenInput /></SegmentGroupItem>
      </SegmentGroup>
      <SegmentGroup read-only aria-label="Read-only framework">
        <SegmentGroupItem value="React"><SegmentGroupItemText>Read-only option</SegmentGroupItemText><SegmentGroupItemControl /><SegmentGroupItemHiddenInput /></SegmentGroupItem>
      </SegmentGroup>
      <SegmentGroup invalid required aria-label="Required framework">
        <SegmentGroupItem value="React"><SegmentGroupItemText>Required option</SegmentGroupItemText><SegmentGroupItemControl /><SegmentGroupItemHiddenInput /></SegmentGroupItem>
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
});

test('applies native utilities before consumer classes and forwards refs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();

  render({
    components: segmentGroupComponents,
    setup() {
      return { itemRef, rootRef };
    },
    template: `
      <SegmentGroup ref="rootRef" default-value="React" aria-label="Framework" class="border-primary gap-4">
        <SegmentGroupLabel>Framework</SegmentGroupLabel>
        <SegmentGroupIndicator class="bg-primary" />
        <SegmentGroupItem ref="itemRef" value="React" class="data-[state=checked]:text-primary-foreground">
          <SegmentGroupItemText>React</SegmentGroupItemText>
          <SegmentGroupItemControl /><SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      </SegmentGroup>
    `,
  });
  const root = rootRef.value?.$el as HTMLElement;
  const item = screen.getByText('React').closest('[data-slot="segment-group-item"]') as HTMLElement;
  const indicator = screen
    .getByRole('radiogroup')
    .querySelector('[data-slot="segment-group-indicator"]');
  expect(root.className).toContain('group/segment-group');
  expect([...root.classList]).toEqual(expect.arrayContaining(['border-primary']));
  expect(item.className).toContain('font-medium');
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['data-[state=checked]:text-primary-foreground']),
  );
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['bg-primary']));
  expect(rootRef.value?.$el).toBe(root);
  expect(itemRef.value?.$el).toBe(item);
  await expect.element(page.getByRole('radiogroup')).toHaveCSS('gap', '16px');
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
              <SegmentGroupItemControl /><SegmentGroupItemHiddenInput />
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
  expect(item.tagName).toBe('LABEL');
  await expect
    .element(page.getByTestId('custom-item'))
    .toHaveAttribute('data-slot', 'segment-group-item');
  expect(item.querySelector('input[type="radio"]')?.isConnected).toBe(true);
  expect(rootRef.value?.$el).toBe(root);
  expect(itemRef.value?.$el).toBe(item);
});

test('keeps as-child item state and indicator geometry reactive', async () => {
  render({
    components: segmentGroupComponents,
    template: `
      <SegmentGroup default-value="Monthly" aria-label="Billing cycle">
        <SegmentGroupIndicator data-testid="indicator" />
        <SegmentGroupItem value="Monthly" as-child>
          <label data-testid="monthly">
            <SegmentGroupItemText>Monthly</SegmentGroupItemText>
            <SegmentGroupItemControl />
            <SegmentGroupItemHiddenInput />
          </label>
        </SegmentGroupItem>
        <SegmentGroupItem value="Annual" as-child>
          <label data-testid="annual">
            <SegmentGroupItemText>Annual</SegmentGroupItemText>
            <SegmentGroupItemControl />
            <SegmentGroupItemHiddenInput />
          </label>
        </SegmentGroupItem>
      </SegmentGroup>
    `,
  });

  const annual = screen.getByTestId('annual');
  const indicator = screen.getByTestId('indicator');

  await expect.element(page.getByTestId('monthly')).toHaveAttribute('data-state', 'checked');
  await page.getByTestId('annual').click();

  await expect.element(page.getByTestId('annual')).toHaveAttribute('data-state', 'checked');
  await expect.element(page.getByTestId('monthly')).not.toHaveAttribute('data-state', 'checked');
  await expect
    .poll(() => parseFloat(indicator!.style.getPropertyValue('--left')))
    .toBe(annual.offsetLeft);
  await expect
    .poll(() => parseFloat(indicator!.style.getPropertyValue('--width')))
    .toBe(annual.offsetWidth);
});

test('connects root and item contexts through the provider', async () => {
  const RootState = defineComponent({
    setup() {
      const segmentGroup = useSegmentGroupContext();
      const selectSolid = () => segmentGroup.value.setValue('Solid');
      return { selectSolid };
    },
    template: '<button type="button" @click="selectSolid">Select</button>',
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
        <RootState /><SegmentGroupIndicator />
        <SegmentGroupItem value="React">
          <SegmentGroupItemText>React <ItemState /></SegmentGroupItemText>
          <SegmentGroupItemControl /><SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
        <SegmentGroupItem value="Solid">
          <SegmentGroupItemText>Solid</SegmentGroupItemText>
          <SegmentGroupItemControl /><SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      </SegmentGroupRootProvider>
    `,
  });
  await expect.element(page.getByText('checked')).toBeAttached();
  await page.getByRole('button', { name: 'Select', exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  await expect.element(page.getByText('unchecked')).toBeAttached();
});

test('inherits Field and Fieldset state', async () => {
  render({
    components: segmentGroupComponents,
    template: `
      <Field invalid required>
        <SegmentGroup aria-label="Field framework">
          <SegmentGroupItem value="React"><SegmentGroupItemText>Field option</SegmentGroupItemText><SegmentGroupItemControl /><SegmentGroupItemHiddenInput /></SegmentGroupItem>
        </SegmentGroup>
      </Field>
      <Fieldset disabled invalid>
        <SegmentGroup aria-label="Fieldset framework">
          <SegmentGroupItem value="React"><SegmentGroupItemText>Fieldset option</SegmentGroupItemText><SegmentGroupItemControl /><SegmentGroupItemHiddenInput /></SegmentGroupItem>
        </SegmentGroup>
      </Fieldset>
    `,
  });

  await expect
    .element(page.getByRole('radiogroup', { name: 'Field framework', exact: true }))
    .toHaveAttribute('data-invalid');
  await expect
    .element(page.getByRole('radiogroup', { name: 'Field framework', exact: true }))
    .toHaveAttribute('data-required');
  await expect
    .element(page.getByRole('radio', { name: 'Fieldset option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radiogroup', { name: 'Fieldset framework', exact: true }))
    .toHaveAttribute('data-invalid');
});

test('preserves vertical orientation and native selection behavior', async () => {
  render({
    components: testComponents,
    template: `
      <SegmentGroup orientation="vertical" default-value="React" aria-label="Framework">
        <SegmentOptions />
      </SegmentGroup>
    `,
  });

  await expect
    .element(page.getByRole('radiogroup'))
    .toHaveAttribute('aria-orientation', 'vertical');
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
});

test('hydrates without replacing hosts or ids and responds to selection', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrSegmentGroup));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="segment-group-root"]');
  const serverInputs = [...host.querySelectorAll('input')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrSegmentGroup);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="segment-group-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('input')]).toEqual(serverInputs);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
    await page.getByText('Solid', { exact: true }).click();
    await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
import SsrSegmentGroup from './fixtures/SsrSegmentGroup.vue';