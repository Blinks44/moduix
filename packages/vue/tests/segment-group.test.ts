import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Field,
  Fieldset,
  SegmentGroup,
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
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
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
} as unknown as Record<string, Component>;

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

test('submits through the convenience item inputs and preserves radio semantics', async () => {
  render({
    components: testComponents,
    template: `
      <form data-testid="form">
        <SegmentGroup default-value="React" name="framework" aria-label="Framework">
          <SegmentGroupIndicator />
          <SegmentOptions />
        </SegmentGroup>
      </form>
    `,
  });

  const form = screen.getByTestId('form') as HTMLFormElement;
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(react).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('React');

  await fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('supports v-model and emits one value-change detail per selection', async () => {
  const details: string[] = [];
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('radio', { name: 'Solid' }));

  await waitFor(() => expect(screen.getByText('Current value: Solid')).toBeInTheDocument());
  expect(details).toEqual(['Solid']);
});

test('reacts to external v-model changes', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Set Solid' }));
  await waitFor(() => expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked());
});

test('preserves disabled, read-only, invalid, and required states', () => {
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

  const disabled = screen.getByRole('radio', { name: 'Disabled option' });
  const readOnly = screen.getByRole('radio', { name: 'Read-only option' });
  const required = screen.getByRole('radio', { name: 'Required option' });

  expect(disabled).toBeDisabled();
  expect(readOnly).toBeDisabled();
  expect(screen.getByRole('radiogroup', { name: 'Read-only framework' })).toHaveAttribute(
    'aria-readonly',
    'true',
  );
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('radiogroup', { name: 'Required framework' })).toHaveAttribute(
    'data-invalid',
  );
});

test('forwards refs, attrs, anatomy, and consumer classes on public parts', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const textRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: segmentGroupComponents,
    setup() {
      return { controlRef, indicatorRef, itemRef, labelRef, rootRef, textRef };
    },
    template: `
      <SegmentGroup ref="rootRef" default-value="React" aria-label="Framework" data-probe="root" class="custom-root">
        <SegmentGroupLabel ref="labelRef">Framework</SegmentGroupLabel>
        <SegmentGroupIndicator ref="indicatorRef" class="custom-indicator" />
        <SegmentGroupItem ref="itemRef" value="React" class="custom-item">
          <SegmentGroupItemControl ref="controlRef" />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText ref="textRef">React</SegmentGroupItemText>
        </SegmentGroupItem>
      </SegmentGroup>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const label = screen.getByText('Framework');
  const radio = screen.getByRole('radio', { name: 'React' });
  const item = screen.getByText('React').closest('[data-slot="segment-group-item"]') as HTMLElement;
  const text = screen.getByText('React');
  const indicator = screen
    .getByRole('radiogroup')
    .querySelector('[data-slot="segment-group-indicator"]');

  expect(root).toHaveAttribute('data-slot', 'segment-group-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveClass('custom-root');
  expect(label).toHaveAttribute('data-slot', 'segment-group-label');
  expect(radio).toBeChecked();
  expect(item).toHaveAttribute('data-slot', 'segment-group-item');
  expect(item).toHaveClass('custom-item');
  expect(text).toHaveAttribute('data-slot', 'segment-group-item-text');
  expect(indicator).toHaveAttribute('data-slot', 'segment-group-indicator');
  expect(indicator).toHaveClass('custom-indicator');
  expect(rootRef.value?.$el).toBe(root);
  expect(labelRef.value?.$el).toBe(label);
  expect(itemRef.value?.$el).toBe(item);
  expect(controlRef.value?.$el).toHaveAttribute('data-slot', 'segment-group-item-control');
  expect(textRef.value?.$el).toBe(text);
  expect(indicatorRef.value?.$el).toBe(indicator);
});

test('keeps as-child composition semantic and forwards item inputs', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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
              <SegmentGroupItemControl />
              <SegmentGroupItemHiddenInput />
            </label>
          </SegmentGroupItem>
        </section>
      </SegmentGroup>
    `,
  });

  render(Harness);
  const root = screen.getByRole('radiogroup', { name: 'Framework choices' });
  const item = screen.getByTestId('custom-item');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'segment-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(item.tagName).toBe('LABEL');
  expect(item).toHaveAttribute('data-slot', 'segment-group-item');
  expect(itemRef.value?.$el).toBe(item);
  expect(item.querySelector('input[type="radio"]')).toBeInTheDocument();
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

  const monthly = screen.getByTestId('monthly');
  const annual = screen.getByTestId('annual');
  const indicator = screen.getByTestId('indicator');

  Object.defineProperties(monthly, {
    offsetLeft: { configurable: true, value: 0 },
    offsetTop: { configurable: true, value: 0 },
    offsetWidth: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 40 },
  });
  Object.defineProperties(annual, {
    offsetLeft: { configurable: true, value: 100 },
    offsetTop: { configurable: true, value: 0 },
    offsetWidth: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 40 },
  });

  expect(monthly).toHaveAttribute('data-state', 'checked');
  await fireEvent.click(annual);

  await waitFor(() => expect(annual).toHaveAttribute('data-state', 'checked'));
  expect(monthly).not.toHaveAttribute('data-state', 'checked');
  expect(indicator.style.getPropertyValue('--left')).toBe('100px');
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
  const Harness = defineComponent({
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
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
        <SegmentGroupItem value="Solid">
          <SegmentGroupItemText>Solid</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      </SegmentGroupRootProvider>
    `,
  });

  render(Harness);
  expect(screen.getByText('checked')).toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: 'Select' }));
  await waitFor(() => expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked());
  expect(screen.getByText('unchecked')).toBeInTheDocument();
});

test('inherits Field and Fieldset state without duplicating selection state', () => {
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

  const fieldGroup = screen.getByRole('radiogroup', { name: 'Field framework' });
  const fieldsetGroup = screen.getByRole('radiogroup', { name: 'Fieldset framework' });
  expect(fieldGroup).toHaveAttribute('data-invalid');
  expect(fieldGroup).toHaveAttribute('data-required');
  expect(screen.getByRole('radio', { name: 'Fieldset option' })).toBeDisabled();
  expect(fieldsetGroup).toHaveAttribute('data-disabled');
  expect(screen.getByRole('radio', { name: 'Fieldset option' }).closest('label')).toHaveAttribute(
    'data-invalid',
  );
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

  const second = screen.getByRole('radio', { name: 'Solid' });
  expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'vertical');
  await fireEvent.click(second);
  await waitFor(() => expect(second).toBeChecked());
});

test('renders stable anatomy through SSR and hydration', async () => {
  const App = defineComponent({
    components: testComponents,
    template: `
      <SegmentGroup default-value="React" aria-label="Framework">
        <SegmentOptions />
      </SegmentGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="segment-group-root"');
  expect(html).toContain('data-slot="segment-group-item"');
  expect(html).toContain('data-state="checked"');

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