import { page } from '@rstest/browser';
import { expect, test, rs } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
} from '../src';
import styles from '../src/components/input-group/InputGroup.module.css';

const components = {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
};

test('preserves grouped field state, owned hooks, and native refs', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);
  const buttonRef = ref<ComponentPublicInstance | null>(null);

  render({
    components,
    setup: () => ({ rootRef, addonRef, inputRef, textRef, buttonRef }),
    template: `
      <Field disabled id="workspace" invalid read-only>
        <FieldLabel>Workspace</FieldLabel>
        <InputGroup ref="rootRef"
          class="consumer-root"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-size="xs"
          data-slot="consumer-slot"
          data-testid="input-group"
          size="lg"
        >
          <InputGroupAddon ref="addonRef"
            class="consumer-addon"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >@</InputGroupAddon>
          <InputGroupInput ref="inputRef" />
          <InputGroupText ref="textRef"
            class="consumer-text"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >.com</InputGroupText>
          <InputGroupButton ref="buttonRef" class="consumer-button" data-slot="consumer-slot">Copy</InputGroupButton>
        </InputGroup>
      </Field>
    `,
  });

  const group = screen.getByTestId('input-group');
  const addon = screen.getByText('@');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  const groupLocator = page.getByTestId('input-group');
  await expect.element(groupLocator).toHaveAttribute('data-slot', 'input-group-root');
  await expect.element(groupLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(groupLocator).toHaveAttribute('data-part', 'root');
  await expect.element(groupLocator).toHaveAttribute('data-size', 'lg');
  expect([...group.classList]).toEqual(expect.arrayContaining([styles.root, 'consumer-root']));
  const textLocator = page.getByText('@', { exact: true });
  await expect.element(textLocator).toHaveAttribute('data-slot', 'input-group-addon');
  await expect.element(textLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(textLocator).toHaveAttribute('data-part', 'addon');
  expect([...addon.classList]).toEqual(expect.arrayContaining([styles.addon, 'consumer-addon']));
  const inputLocator = page.getByRole('textbox', { name: 'Workspace', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'input-root');
  await expect.element(inputLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(inputLocator).toHaveAttribute('data-invalid');
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('readonly');
  const textLocator2 = page.getByText('.com', { exact: true });
  await expect.element(textLocator2).toHaveAttribute('data-slot', 'input-group-text');
  await expect.element(textLocator2).toHaveAttribute('data-scope', 'input-group');
  await expect.element(textLocator2).toHaveAttribute('data-part', 'text');
  expect([...text.classList]).toEqual(expect.arrayContaining([styles.text, 'consumer-text']));
  const buttonLocator = page.getByRole('button', { name: 'Copy', exact: true });
  await expect.element(buttonLocator).toHaveAttribute('data-slot', 'input-group-button');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  expect([...button.classList]).toEqual(expect.arrayContaining([styles.button, 'consumer-button']));
  await expect.element(buttonLocator).toBeEnabled();
  expect(rootRef.value?.$el).toBe(group);
  expect(addonRef.value?.$el).toBe(addon);
  expect(inputRef.value?.$el).toBe(input);
  expect(textRef.value?.$el).toBe(text);
  expect(buttonRef.value?.$el).toBe(button);
});

test('keeps the group size context reactive and allows a local input size', async () => {
  const size = ref<'sm' | 'xl'>('sm');

  render({
    components,
    setup() {
      return { size };
    },
    template: `
      <InputGroup :size="size" data-testid="responsive-group">
        <InputGroupInput aria-label="Workspace" />
        <InputGroupInput aria-label="Small workspace" size="xs" />
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroup>
    `,
  });

  await expect.element(page.getByTestId('responsive-group')).toHaveAttribute('data-size', 'sm');
  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'sm');
  await expect
    .element(page.getByRole('textbox', { name: 'Small workspace', exact: true }))
    .toHaveAttribute('data-size', 'xs');
  await expect
    .element(page.getByRole('button', { name: 'Copy', exact: true }))
    .toHaveAttribute('data-size', 'sm');

  size.value = 'xl';
  await nextTick();

  await expect.element(page.getByTestId('responsive-group')).toHaveAttribute('data-size', 'xl');
  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'xl');
  await expect
    .element(page.getByRole('textbox', { name: 'Small workspace', exact: true }))
    .toHaveAttribute('data-size', 'xs');
  await expect
    .element(page.getByRole('button', { name: 'Copy', exact: true }))
    .toHaveAttribute('data-size', 'xl');
});

test('preserves semantic hosts with asChild composition', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);

  render({
    components,
    setup() {
      return { addonRef, rootRef, textRef };
    },
    template: `
      <InputGroup ref="rootRef" data-testid="as-child-root" as-child>
        <section aria-label="Workspace group">
          <InputGroupAddon ref="addonRef" as-child><strong>@</strong></InputGroupAddon>
          <InputGroupInput aria-label="Workspace" />
          <InputGroupText ref="textRef" as-child><em>.com</em></InputGroupText>
        </section>
      </InputGroup>
    `,
  });
  const root = screen.getByTestId('as-child-root');
  const addon = screen.getByText('@');
  const text = screen.getByText('.com');

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByTestId('as-child-root'))
    .toHaveAttribute('data-slot', 'input-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(addon.tagName).toBe('STRONG');
  await expect
    .element(page.getByText('@', { exact: true }))
    .toHaveAttribute('data-slot', 'input-group-addon');
  expect(addonRef.value?.$el).toBe(addon);
  expect(text.tagName).toBe('EM');
  await expect
    .element(page.getByText('.com', { exact: true }))
    .toHaveAttribute('data-slot', 'input-group-text');
  expect(textRef.value?.$el).toBe(text);
});

test.each([false, true])(
  'supports controlled v-model through InputGroupInput (asChild=%s)',
  async (asChild) => {
    const changes: string[] = [];
    const value = ref('initial');

    render({
      components,
      setup() {
        return { asChild, changes, value };
      },
      template: `
      <InputGroup>
        <InputGroupInput
          v-model="value"
          :as-child="asChild"
          aria-label="Project key"
          @update:model-value="changes.push($event)"
        >${asChild ? '<input />' : ''}</InputGroupInput>
      </InputGroup>
      <output>{{ value }}</output>
    `,
    });

    const textbox = page.getByRole('textbox', { name: 'Project key', exact: true });
    await expect.element(textbox).toHaveValue('initial');
    await textbox.fill('next');

    await expect.element(textbox).toHaveValue('next');
    await expect.element(page.getByText('next', { exact: true })).toBeAttached();
    expect(changes).toEqual(['next']);
    value.value = 'from parent';
    await expect.element(textbox).toHaveValue('from parent');
    expect(changes).toEqual(['next']);
  },
);

test('hydrates without replacing hosts or generated ids', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrInputGroup));
  document.body.append(host);
  const serverRoot = host.querySelector('section');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrInputGroup);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('section')).toHaveLength(1);
    expect(host.querySelector('section')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(serverRoot?.classList.contains('hydrated-group')).toBe(true);
    await expect
      .element(page.locator('[data-slot="input-group-root"]'))
      .toHaveAttribute('data-slot', 'input-group-root');
    await page.getByRole('textbox', { name: 'Server input' }).fill('Hydrated value');
    await expect
      .element(page.getByRole('textbox', { name: 'Server input' }))
      .toHaveValue('Hydrated value');
    expect(serverRoot?.classList.contains(styles.root)).toBe(true);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
test('clear trigger forwards a single click, inherits size, and does not submit or reset a form', async () => {
  const clear = rs.fn();
  const submit = rs.fn();
  render({
    components,
    setup: () => ({ clear, submit, value: ref('moduix') }),
    template: `
    <form @submit.prevent="submit">
      <InputGroup size="lg">
        <InputGroupInput aria-label="Search" v-model="value" />
        <InputGroupClearTrigger class="consumer-clear" data-slot="override" @click="clear" />
      </InputGroup>
    </form>
  `,
  });
  const button = screen.getByRole('button', { name: 'Clear input' });
  const buttonLocator = page.getByRole('button', { name: 'Clear input', exact: true });
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(buttonLocator).toHaveAttribute('data-slot', 'input-group-clear-trigger');
  await expect.element(buttonLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(buttonLocator).toHaveAttribute('data-part', 'clear-trigger');
  expect([...button.classList]).toEqual(expect.arrayContaining(['consumer-clear']));
  expect(button.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  await buttonLocator.click();
  expect(clear).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
  await expect
    .element(page.getByRole('textbox', { name: 'Search', exact: true }))
    .toHaveValue('moduix');
});

test('clear trigger supports app-owned value, visibility, and focus', async () => {
  const value = ref('moduix');
  const input = ref<ComponentPublicInstance>();
  render({
    components,
    setup: () => ({ input, value }),
    template: `
    <InputGroup>
      <InputGroupInput ref="input" aria-label="Search" v-model="value" />
      <InputGroupClearTrigger v-if="value" @click="value = ''; input.$el.focus()" />
    </InputGroup>
  `,
  });
  await page.getByRole('button', { name: 'Clear input', exact: true }).click();
  expect(value.value).toBe('');
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toHaveValue('');
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toBeFocused();
  await expect.element(page.getByRole('button')).toHaveCount(0);
});

test('clear trigger preserves custom labels, children, asChild hosts, refs, and disabled behavior', async () => {
  const clear = rs.fn();
  const trigger = ref<ComponentPublicInstance>();
  render({
    components,
    setup: () => ({ clear, trigger }),
    template: `
    <span id="clear-label">Erase query</span>
    <InputGroupClearTrigger ref="trigger" as-child aria-labelledby="clear-label" size="sm" @click="clear">
      <button type="button">Custom icon</button>
    </InputGroupClearTrigger>
    <InputGroupClearTrigger aria-label="Disabled clear" disabled @click="clear" />
  `,
  });
  const button = screen.getByRole('button', { name: 'Erase query' });
  expect(trigger.value?.$el).toBe(button);
  const buttonLocator = page.getByRole('button', { name: 'Erase query', exact: true });
  await expect.element(buttonLocator).not.toHaveAttribute('aria-label');
  await expect.element(buttonLocator).toContainText('Custom icon');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'sm');
  await buttonLocator.click();
  expect(clear).toHaveBeenCalledTimes(1);

  await expect
    .element(page.getByRole('button', { name: 'Disabled clear', exact: true }))
    .toBeDisabled();
  expect(clear).toHaveBeenCalledTimes(1);
});
import SsrInputGroup from './fixtures/SsrInputGroup.vue';