import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
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
  useRadioGroup,
} from '../src';

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

const frameworks = ['React', 'Solid', 'Vue'];

const RadioOptions = defineComponent({
  components: { RadioGroupOption },
  setup() {
    return { frameworks };
  },
  template: `
    <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
      {{ framework }}
    </RadioGroupOption>
  `,
});

const radioGroupTestComponents = {
  ...radioGroupComponents,
  RadioOptions,
};

test('submits through the convenience option input', async () => {
  render({
    components: radioGroupTestComponents,
    template: `
      <form data-testid="form">
        <RadioGroup default-value="React" name="framework">
          <RadioGroupLabel>Framework</RadioGroupLabel>
          <RadioOptions />
        </RadioGroup>
      </form>
    `,
  });

  const form = screen.getByTestId('form') as HTMLFormElement;

  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
});

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

test('preserves v-model, callback details and provider defaults', async () => {
  const details: string[] = [];

  const { unmount } = render({
    components: radioGroupTestComponents,
    setup() {
      const value = ref<string | null>('React');
      return { details, value };
    },
    template: `
      <RadioGroup v-model="value" @value-change="details.push($event.value)">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioOptions />
      </RadioGroup>
      <output>Current value: {{ value }}</output>
    `,
  });

  await page.getByText('Solid', { exact: true }).click();

  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  await expect.element(page.getByText('Current value: Solid')).toBeAttached();
  expect(details).toEqual(['Solid']);
  unmount();
  render({
    components: radioGroupTestComponents,
    setup() {
      return { radioGroup: useRadioGroup({ defaultValue: 'Solid' }) };
    },
    template: `
      <RadioGroupRootProvider :value="radioGroup">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioOptions />
      </RadioGroupRootProvider>
    `,
  });
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render({
    components: { ...radioGroupComponents },
    template: `
      <RadioGroup disabled>
        <RadioGroupLabel>Disabled framework</RadioGroupLabel>
        <RadioGroupOption value="React">Disabled option</RadioGroupOption>
      </RadioGroup>
      <RadioGroup read-only>
        <RadioGroupLabel>Read-only framework</RadioGroupLabel>
        <RadioGroupOption value="React">Read-only option</RadioGroupOption>
      </RadioGroup>
      <RadioGroup invalid required>
        <RadioGroupLabel>Required framework</RadioGroupLabel>
        <RadioGroupOption value="React">Required option</RadioGroupOption>
      </RadioGroup>
    `,
  });

  await expect
    .element(page.getByRole('radio', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
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

test('forwards refs and exposes stable slots on public parts', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const textRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();

  render({
    components: radioGroupComponents,
    setup() {
      return { controlRef, indicatorRef, itemRef, labelRef, rootRef, textRef };
    },
    template: `
      <RadioGroup ref="rootRef" default-value="React" orientation="horizontal" data-probe="root">
        <RadioGroupLabel ref="labelRef">Framework</RadioGroupLabel>
        <RadioGroupItem ref="itemRef" value="React">
          <RadioGroupItemControl ref="controlRef" />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText ref="textRef">React</RadioGroupItemText>
        </RadioGroupItem>
        <RadioGroupIndicator ref="indicatorRef" />
      </RadioGroup>
    `,
  });
  const root = rootRef.value?.$el as HTMLElement;

  expect(root.getAttribute('data-slot')).toBe('radio-group-root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.getAttribute('data-orientation')).toBe('horizontal');
  expect(labelRef.value?.$el?.getAttribute('data-slot')).toBe('radio-group-label');
  expect(itemRef.value?.$el?.getAttribute('data-slot')).toBe('radio-group-item');
  expect(controlRef.value?.$el?.getAttribute('data-slot')).toBe('radio-group-item-control');
  expect(textRef.value?.$el?.getAttribute('data-slot')).toBe('radio-group-item-text');
  expect(indicatorRef.value?.$el?.getAttribute('data-slot')).toBe('radio-group-indicator');
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
});

test('connects public context slots to the provider state', async () => {
  render({
    components: radioGroupComponents,
    setup() {
      const radioGroup = useRadioGroup({ defaultValue: 'React' });
      const setSolid = () => radioGroup.value.setValue('Solid');
      return { radioGroup, setSolid };
    },
    template: `
      <RadioGroupRootProvider :value="radioGroup">
        <RadioGroupContext v-slot="context">
          <output>Selected: {{ context.value }}</output>
        </RadioGroupContext>
        <RadioGroupItem value="React">
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
          <RadioGroupItemContext v-slot="context">
            <span>{{ context.checked ? 'Checked' : 'Unchecked' }}</span>
          </RadioGroupItemContext>
        </RadioGroupItem>
        <RadioGroupItem value="Solid">
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>Solid</RadioGroupItemText>
        </RadioGroupItem>
      </RadioGroupRootProvider>
      <button type="button" @click="setSolid">Set Solid</button>
    `,
  });
  await expect.element(page.getByText('Selected: React')).toBeAttached();
  await expect.element(page.getByText('Checked')).toBeAttached();

  await page.getByRole('button', { name: 'Set Solid', exact: true }).click();
  await expect.element(page.getByText('Selected: Solid')).toBeAttached();
  await expect.element(page.getByText('Unchecked')).toBeAttached();
});

test('hydrates without replacing hosts or ids and responds to selection', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrRadioGroup));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="radio-group-root"]');
  const serverInputs = [...host.querySelectorAll('input')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrRadioGroup);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="radio-group-root"]')).toBe(serverRoot);
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
import SsrRadioGroup from './fixtures/SsrRadioGroup.vue';