import { expect, test, rs } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
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

const components = {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
} as unknown as Record<string, Component>;

test('keeps the Input slot that drives grouped field state styling', () => {
  render({
    components,
    template: `
      <Field disabled id="workspace" invalid read-only>
        <FieldLabel>Workspace</FieldLabel>
        <InputGroup
          class="consumer-root"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-size="xs"
          data-slot="consumer-slot"
          data-testid="input-group"
          size="lg"
        >
          <InputGroupAddon
            class="consumer-addon"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >@</InputGroupAddon>
          <InputGroupInput />
          <InputGroupText
            class="consumer-text"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >.com</InputGroupText>
          <InputGroupButton class="consumer-button" data-slot="consumer-slot">Copy</InputGroupButton>
        </InputGroup>
      </Field>
    `,
  });

  const group = screen.getByTestId('input-group');
  const addon = screen.getByText('@');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-slot', 'input-group-root');
  expect(group).toHaveAttribute('data-scope', 'input-group');
  expect(group).toHaveAttribute('data-part', 'root');
  expect(group).toHaveAttribute('data-size', 'lg');
  expect(group).toHaveClass(
    'flex',
    'w-full',
    'max-w-none',
    'min-h-control-lg',
    'items-stretch',
    'overflow-hidden',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'text-foreground',
    'consumer-root',
  );
  expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  expect(addon).toHaveAttribute('data-scope', 'input-group');
  expect(addon).toHaveAttribute('data-part', 'addon');
  expect(addon).toHaveClass('consumer-addon');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-size', 'lg');
  expect(input).toHaveAttribute('data-invalid');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(text).toHaveAttribute('data-slot', 'input-group-text');
  expect(text).toHaveAttribute('data-scope', 'input-group');
  expect(text).toHaveAttribute('data-part', 'text');
  expect(text).toHaveClass('consumer-text');
  expect(button).toHaveAttribute('data-slot', 'input-group-button');
  expect(button).toHaveAttribute('data-size', 'lg');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass(
    'h-auto',
    'self-stretch',
    'rounded-none',
    'border-0',
    'consumer-button',
  );
  expect(button).toBeEnabled();
});

test('keeps the group size context reactive and allows a local input size', async () => {
  const size = ref<'sm' | 'xl'>('sm');
  const Harness = defineComponent({
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

  render(Harness);
  const group = screen.getByTestId('responsive-group');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const localInput = screen.getByRole('textbox', { name: 'Small workspace' });
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-size', 'sm');
  expect(input).toHaveAttribute('data-size', 'sm');
  expect(localInput).toHaveAttribute('data-size', 'xs');
  expect(button).toHaveAttribute('data-size', 'sm');

  size.value = 'xl';
  await nextTick();

  expect(group).toHaveAttribute('data-size', 'xl');
  expect(input).toHaveAttribute('data-size', 'xl');
  expect(localInput).toHaveAttribute('data-size', 'xs');
  expect(button).toHaveAttribute('data-size', 'xl');
});

test('forwards refs to ordinary parts', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components,
    setup() {
      return { addonRef, buttonRef, inputRef, rootRef, textRef };
    },
    template: `
      <InputGroup ref="rootRef" data-testid="ordinary-root">
        <InputGroupAddon ref="addonRef">@</InputGroupAddon>
        <InputGroupInput ref="inputRef" aria-label="Workspace" />
        <InputGroupText ref="textRef">.com</InputGroupText>
        <InputGroupButton ref="buttonRef">Copy</InputGroupButton>
      </InputGroup>
    `,
  });

  render(Harness);

  expect(rootRef.value?.$el).toBe(screen.getByTestId('ordinary-root'));
  expect(addonRef.value?.$el).toBe(screen.getByText('@'));
  expect(inputRef.value?.$el).toBe(screen.getByRole('textbox', { name: 'Workspace' }));
  expect(textRef.value?.$el).toBe(screen.getByText('.com'));
  expect(buttonRef.value?.$el).toBe(screen.getByRole('button', { name: 'Copy' }));
});

test('preserves semantic hosts with asChild composition', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);
  const root = screen.getByTestId('as-child-root');
  const addon = screen.getByText('@');
  const text = screen.getByText('.com');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'input-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(addon.tagName).toBe('STRONG');
  expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  expect(addonRef.value?.$el).toBe(addon);
  expect(text.tagName).toBe('EM');
  expect(text).toHaveAttribute('data-slot', 'input-group-text');
  expect(textRef.value?.$el).toBe(text);
});

test('supports controlled v-model updates through InputGroupInput', async () => {
  const changes: string[] = [];
  const Harness = defineComponent({
    components,
    setup() {
      return { changes, value: ref('initial') };
    },
    template: `
      <InputGroup>
        <InputGroupInput
          v-model="value"
          aria-label="Project key"
          @update:model-value="changes.push($event)"
        />
      </InputGroup>
      <output>{{ value }}</output>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Project key' });

  expect(input).toHaveValue('initial');
  await fireEvent.update(input, 'next');

  await waitFor(() => expect(input).toHaveValue('next'));
  expect(screen.getByText('next')).toBeInTheDocument();
  expect(changes).toEqual(['next']);
});

test('applies native utilities to the component-owned parts', () => {
  const { container } = render({
    components,
    template: `
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput aria-label="Workspace" />
        <InputGroupText>.com</InputGroupText>
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroup>
    `,
  });

  expect(container.querySelector('[data-slot="input-group-root"]')).toHaveClass(
    'flex',
    'w-full',
    'max-w-none',
    'min-h-control-md',
    'items-stretch',
    'overflow-hidden',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="input-group-addon"]')).toHaveClass(
    'inline-flex',
    'min-w-0',
    'items-center',
    'justify-center',
    'gap-2',
    'truncate',
    'bg-muted',
    'text-muted-foreground',
    'px-3.5',
    'text-md',
    'leading-6',
    'border-s',
    'border-e',
  );
  expect(container.querySelector('[data-slot="input-root"]')).toHaveClass(
    'min-h-0',
    'min-w-0',
    'grow',
    'basis-auto',
    'rounded-none',
    'border-0',
    'bg-transparent',
    'outline-0',
    'px-3.5',
    'py-1',
    'text-md',
    'leading-6',
  );
  expect(container.querySelector('[data-slot="input-group-text"]')).toHaveClass(
    'inline-flex',
    'min-w-0',
    'items-center',
    'justify-center',
    'gap-2',
    'truncate',
    'bg-transparent',
    'text-muted-foreground',
  );
  expect(container.querySelector('[data-slot="input-group-button"]')).toHaveClass(
    'h-auto',
    'self-stretch',
    'rounded-none',
    'border-0',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render({
    components,
    template: `
      <InputGroup size="lg" class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 text-primary">
        <InputGroupAddon class="bg-background px-0 text-primary">@</InputGroupAddon>
        <InputGroupInput class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5" />
        <InputGroupButton class="rounded-lg bg-muted px-2 text-primary">Copy</InputGroupButton>
      </InputGroup>
    `,
  });

  const root = container.querySelector('[data-slot="input-group-root"]');
  const addon = container.querySelector('[data-slot="input-group-addon"]');
  const input = container.querySelector('[data-slot="input-root"]');
  const button = container.querySelector('[data-slot="input-group-button"]');

  expect(root).toHaveClass('min-h-20', 'w-80', 'max-w-sm', 'rounded-lg', 'bg-muted', 'px-0');
  expect(root).not.toHaveClass(
    'min-h-control-lg',
    'w-full',
    'max-w-none',
    'rounded-md',
    'bg-background',
    'px-4',
  );
  expect(addon).toHaveClass('bg-background', 'px-0', 'text-primary');
  expect(addon).not.toHaveClass('bg-muted', 'px-4', 'text-lg');
  expect(input).toHaveClass(
    'min-h-20',
    'w-80',
    'max-w-sm',
    'rounded-lg',
    'bg-muted',
    'px-0',
    'py-0',
    'leading-5',
  );
  expect(input).not.toHaveClass(
    'min-h-control-lg',
    'w-full',
    'max-w-none',
    'rounded-none',
    'bg-transparent',
    'px-4',
    'py-1',
    'leading-7',
  );
  expect(button).toHaveClass('rounded-lg', 'bg-muted', 'px-2', 'text-primary');
  expect(button).not.toHaveClass('rounded-none', 'px-4', 'text-lg');
});

test('renders and hydrates a semantic asChild root without changing its anatomy', async () => {
  const App = defineComponent({
    components,
    template: `
      <InputGroup as-child class="hydrated-group">
        <section aria-label="Server group">
          <InputGroupInput aria-label="Server input" />
        </section>
      </InputGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<section');
  expect(html).toContain('data-slot="input-group-root"');
  expect(html).toContain('data-slot="input-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const section = host.querySelector('section');
  expect(host.querySelectorAll('section')).toHaveLength(1);
  expect(section).toHaveClass('hydrated-group');
  expect(section).toHaveAttribute('data-slot', 'input-group-root');
  expect(section?.querySelector('[data-slot="input-root"]')).toBeInTheDocument();

  app.unmount();
  host.remove();
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
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-size', 'lg');
  expect(button).toHaveAttribute('data-slot', 'input-group-clear-trigger');
  expect(button).toHaveAttribute('data-scope', 'input-group');
  expect(button).toHaveAttribute('data-part', 'clear-trigger');
  expect(button).toHaveClass('consumer-clear');
  expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  await fireEvent.click(button);
  expect(clear).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('moduix');
});

test('clear trigger supports app-owned value, visibility, and focus', async () => {
  const value = ref('moduix');
  render({
    components,
    setup: () => ({ value }),
    template: `
    <InputGroup>
      <InputGroupInput id="clear-search" aria-label="Search" v-model="value" />
      <InputGroupClearTrigger v-if="value" @click="value = ''; $el.querySelector('input').focus()" />
    </InputGroup>
  `,
  });
  await fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
  expect(value.value).toBe('');
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('');
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
  expect(button).not.toHaveAttribute('aria-label');
  expect(button).toHaveTextContent('Custom icon');
  expect(button).toHaveAttribute('data-size', 'sm');
  await fireEvent.click(button);
  expect(clear).toHaveBeenCalledTimes(1);
  const disabled = screen.getByRole('button', { name: 'Disabled clear' });
  expect(disabled).toBeDisabled();
  await fireEvent.click(disabled);
  expect(clear).toHaveBeenCalledTimes(1);
});