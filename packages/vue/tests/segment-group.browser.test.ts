import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
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
} from '@/index';
import SsrSegmentGroup from './fixtures/SsrSegmentGroup.vue';

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

  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('React');

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
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

test('forwards refs, attrs, anatomy, and consumer classes on public parts', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const textRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();

  render({
    components: segmentGroupComponents,
    setup() {
      return { indicatorRef, itemRef, labelRef, rootRef, textRef };
    },
    template: `
      <SegmentGroup ref="rootRef" default-value="React" aria-label="Framework" data-probe="root" class="custom-root">
        <SegmentGroupLabel ref="labelRef">Framework</SegmentGroupLabel>
        <SegmentGroupIndicator ref="indicatorRef" class="custom-indicator" />
        <SegmentGroupItem ref="itemRef" value="React" class="custom-item">
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText ref="textRef">React</SegmentGroupItemText>
        </SegmentGroupItem>
      </SegmentGroup>
    `,
  });

  const root = rootRef.value?.$el as HTMLElement;
  const label = screen.getByText('Framework');

  const item = screen.getByText('React').closest('[data-slot="segment-group-item"]') as HTMLElement;
  const text = screen.getByText('React');
  const indicator = screen
    .getByRole('radiogroup')
    .querySelector('[data-slot="segment-group-indicator"]');

  expect(root.getAttribute('data-slot')).toBe('segment-group-root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect([...root.classList]).toEqual(expect.arrayContaining(['custom-root']));
  await expect
    .element(page.getByText('Framework'))
    .toHaveAttribute('data-slot', 'segment-group-label');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(item.getAttribute('data-slot')).toBe('segment-group-item');
  expect([...item!.classList]).toEqual(expect.arrayContaining(['custom-item']));
  await expect
    .element(page.getByText('React'))
    .toHaveAttribute('data-slot', 'segment-group-item-text');
  expect(indicator?.getAttribute('data-slot')).toBe('segment-group-indicator');
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['custom-indicator']));
  expect(rootRef.value?.$el).toBe(root);
  expect(labelRef.value?.$el).toBe(label);
  expect(itemRef.value?.$el).toBe(item);
  expect(textRef.value?.$el).toBe(text);
  expect(indicatorRef.value?.$el).toBe(indicator);
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
            <SegmentGroupItemHiddenInput />
          </label>
        </SegmentGroupItem>
        <SegmentGroupItem value="Annual" as-child>
          <label data-testid="annual">
            <SegmentGroupItemText>Annual</SegmentGroupItemText>
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

test('defaults the root and the hook to horizontal orientation', async () => {
  render({
    components: testComponents,
    setup() {
      return { segmentGroup: useSegmentGroup({ defaultValue: 'React' }) };
    },
    template: `
      <SegmentGroup default-value="React" aria-label="Root" data-testid="root">
        <SegmentOptions />
      </SegmentGroup>
      <SegmentGroupRootProvider :value="segmentGroup" aria-label="Provider" data-testid="provider">
        <SegmentOptions />
      </SegmentGroupRootProvider>
    `,
  });

  await expect.element(page.getByTestId('root')).toHaveAttribute('data-orientation', 'horizontal');
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-orientation', 'horizontal');
});

test('renders string items with the string as value and label', async () => {
  render({
    components: testComponents,
    template: `
      <form data-testid="form">
        <SegmentGroup name="framework" default-value="Solid" aria-label="Framework">
          <SegmentGroupItems :items="['React', 'Solid']" />
        </SegmentGroup>
      </form>
    `,
  });

  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('framework')).toBe(
    'Solid',
  );
});

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