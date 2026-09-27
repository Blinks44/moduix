import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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
} as unknown as Record<string, Component>;

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

const radioGroupTestComponents: Record<string, Component> = {
  ...radioGroupComponents,
  RadioOptions,
};

const ControlledRadioGroup = defineComponent({
  components: radioGroupTestComponents,
  setup() {
    const value = ref<string | null>('React');
    return { value };
  },
  template: `
    <RadioGroup v-model="value">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioOptions />
    </RadioGroup>
  `,
});

const ProviderRadioGroup = defineComponent({
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
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  await fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('keeps asChild composition semantic with an explicit item input', () => {
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: radioGroupComponents,
    setup() {
      return { itemRef };
    },
    template: `
      <RadioGroup default-value="React">
        <RadioGroupItem ref="itemRef" as-child class="grid w-56" value="React">
          <label data-testid="custom-item">
            <RadioGroupItemControl />
            <RadioGroupItemHiddenInput />
            <RadioGroupItemText>React</RadioGroupItemText>
          </label>
        </RadioGroupItem>
      </RadioGroup>
    `,
  });

  render(Harness);
  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item).toHaveAttribute('data-slot', 'radio-group-item');
  expect(item).toHaveClass('grid', 'w-56');
  expect(item).not.toHaveClass('inline-flex');
  expect(itemRef.value?.$el).toBe(item);
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('preserves Ark value details and Vue v-model listeners', async () => {
  const details: string[] = [];
  const Harness = defineComponent({
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

  render(Harness);
  const solid = screen.getByRole('radio', { name: 'Solid' });
  await fireEvent.click(solid);

  await waitFor(() => expect(solid).toBeChecked());
  expect(screen.getByText('Current value: Solid')).toBeInTheDocument();
  expect(details).toEqual(['Solid']);
});

test('preserves controlled and provider composition paths', async () => {
  const { unmount } = render(ControlledRadioGroup);
  const solid = screen.getByRole('radio', { name: 'Solid' });

  await fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());

  unmount();
  render(ProviderRadioGroup);
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
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

  const disabled = screen.getByRole('radio', { name: 'Disabled option' });
  const readOnly = screen.getByRole('radio', { name: 'Read-only option' });
  const required = screen.getByRole('radio', { name: 'Required option' });

  fireEvent.click(readOnly);

  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(readOnly).toBeDisabled();
  expect(screen.getByRole('radiogroup', { name: 'Read-only framework' })).toHaveAttribute(
    'aria-readonly',
    'true',
  );
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const textRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'radio-group-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveAttribute('data-orientation', 'horizontal');
  expect(labelRef.value?.$el).toHaveAttribute('data-slot', 'radio-group-label');
  expect(itemRef.value?.$el).toHaveAttribute('data-slot', 'radio-group-item');
  expect(controlRef.value?.$el).toHaveAttribute('data-slot', 'radio-group-item-control');
  expect(textRef.value?.$el).toHaveAttribute('data-slot', 'radio-group-item-text');
  expect(indicatorRef.value?.$el).toHaveAttribute('data-slot', 'radio-group-indicator');
  expect(screen.getByRole('radio', { name: 'React' })).toHaveAttribute('type', 'radio');
});

test('connects public context slots to the provider state', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  expect(screen.getByText('Selected: React')).toBeInTheDocument();
  expect(screen.getByText('Checked')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Set Solid' }));
  await waitFor(() => expect(screen.getByText('Selected: Solid')).toBeInTheDocument());
  expect(screen.getByText('Unchecked')).toBeInTheDocument();
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: radioGroupComponents,
    template: `
      <RadioGroup default-value="React">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioGroupOption value="React">React</RadioGroupOption>
      </RadioGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="radio-group-root"');
  expect(html).toContain('data-slot="radio-group-item-control"');
  expect(html).toContain('checked');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: radioGroupComponents,
    template: `
      <RadioGroup class="gap-4 text-primary" data-testid="root">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioGroupItem class="grid w-56" value="React" data-testid="item">
          <RadioGroupItemControl class="size-6 border-primary bg-muted before:size-3" data-testid="control" />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </RadioGroupItem>
      </RadioGroup>
    `,
  });

  const root = screen.getByTestId('root');
  const item = screen.getByTestId('item');
  const control = screen.getByTestId('control');

  expect(root).toHaveClass('gap-4', 'text-primary');
  expect(root).not.toHaveClass('gap-2', 'text-foreground');
  expect(item).toHaveClass('grid', 'w-56');
  expect(item).not.toHaveClass('inline-flex');
  expect(control).toHaveClass('size-6', 'border-primary', 'bg-muted', 'before:size-3');
  expect(control).not.toHaveClass('size-5', 'border-border', 'bg-background', 'before:size-2');
});