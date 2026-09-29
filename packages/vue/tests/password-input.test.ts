import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import type { ComponentPublicInstance, VNodeChild } from 'vue';
import {
  PasswordInput,
  PasswordInputContext,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
} from '../src/components/password-input';
import styles from '../src/components/password-input/PasswordInput.module.css';

const passwordInputComponents = {
  PasswordInput,
  PasswordInputContext,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
};

function label(text = 'Password') {
  return h(PasswordInputLabel, null, { default: () => text });
}

function field() {
  return h(PasswordInputField);
}

function basicSlots(): VNodeChild[] {
  return [label(), field()];
}

function basicApp(props: Record<string, unknown> = {}) {
  return defineComponent({
    setup() {
      return () => h(PasswordInput, props, { default: basicSlots });
    },
  });
}

test('renders the default Field composition with Ark anatomy and moduix slots', () => {
  render(basicApp({ name: 'password', required: true, class: 'consumer-root' }));

  const root = screen.getByText('Password').parentElement;
  const input = screen.getByLabelText('Password');
  const trigger = screen.getByRole('button', { name: /show password/i });

  expect(root).toHaveAttribute('data-scope', 'password-input');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'password-input-root');
  expect(root).toHaveClass(styles.root, 'consumer-root');
  expect(root?.className.endsWith('consumer-root')).toBe(true);
  expect(screen.getByText('Password')).toHaveAttribute('data-slot', 'password-input-label');
  expect(input).toHaveAttribute('data-scope', 'password-input');
  expect(input).toHaveAttribute('data-part', 'input');
  expect(input).toHaveAttribute('data-slot', 'password-input-input');
  expect(input).toHaveAttribute('name', 'password');
  expect(input).toHaveAttribute('type', 'password');
  expect(input).toHaveAttribute('data-state', 'hidden');
  expect(trigger).toHaveAttribute('data-slot', 'password-input-visibility-trigger');
  expect(
    screen.getByRole('button').querySelector('[data-slot="password-input-indicator"] svg'),
  ).toBeInTheDocument();
});

test('supports controlled visibility, v-model, and one visibility event', async () => {
  const visible = ref(false);
  const changes: boolean[] = [];
  const Harness = defineComponent({
    components: passwordInputComponents,
    setup: () => ({ visible, changes }),
    template: `
      <PasswordInput v-model:visible="visible" @visibility-change="changes.push($event.visible)">
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputField />
      </PasswordInput>
    `,
  });

  render(Harness);

  const input = screen.getByLabelText('Password');
  await fireEvent.pointerDown(screen.getByRole('button', { name: /show password/i }), {
    button: 0,
  });

  await waitFor(() => {
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });
  expect(visible.value).toBe(true);
  expect(changes).toEqual([true]);
});

test('preserves disabled and read-only interaction contracts', async () => {
  const { unmount } = render(basicApp({ disabled: true }));

  expect(screen.getByLabelText('Password')).toBeDisabled();
  expect(screen.getByRole('button')).toBeDisabled();
  unmount();

  render(basicApp({ readOnly: true }));

  const input = screen.getByLabelText('Password');
  const trigger = screen.getByRole('button', { name: /show password/i });
  await fireEvent.pointerDown(trigger, { button: 0 });

  expect(input).toHaveAttribute('readonly');
  expect(trigger).toHaveAttribute('data-readonly');
  expect(input).toHaveAttribute('type', 'password');
});

test('uses the native input for form submission and reset', async () => {
  const App = defineComponent({
    setup() {
      return () =>
        h('form', { 'data-testid': 'form' }, [
          h(
            PasswordInput,
            { name: 'password', id: 'form-password' },
            {
              default: () => [
                label(),
                h(PasswordInputControl, null, {
                  default: () => [
                    h(PasswordInputInput, { defaultValue: 'initial-password' }),
                    h(PasswordInputVisibilityTrigger, null, {
                      default: () => h(PasswordInputIndicator),
                    }),
                  ],
                }),
              ],
            },
          ),
        ]);
    },
  });
  render(App);

  const form = screen.getByTestId('form') as HTMLFormElement;
  const input = screen.getByLabelText('Password');

  expect(new FormData(form).get('password')).toBe('initial-password');

  await fireEvent.update(input, 'updated-password');
  expect(new FormData(form).get('password')).toBe('updated-password');

  form.reset();
  await nextTick();
  expect(input).toHaveValue('initial-password');
});

test('forwards refs, attributes, and consumer classes to the Ark elements', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const fieldRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    setup() {
      return () =>
        h(
          PasswordInput,
          { ref: rootRef, 'data-probe': 'root' },
          {
            default: () => [
              label(),
              h(PasswordInputField, {
                ref: fieldRef,
                class: 'consumer-control',
                title: 'password control',
              }),
            ],
          },
        );
    },
  });

  render(App);

  const root = rootRef.value?.$el;
  const control = screen.getByTitle('password control');

  expect(root).toHaveAttribute('data-slot', 'password-input-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(fieldRef.value?.$el).toBe(control);
  expect(control).toHaveAttribute('data-slot', 'password-input-control');
  expect(control).toHaveClass(styles.control, 'consumer-control');
  expect(control.className.endsWith('consumer-control')).toBe(true);
});

test('renders the fixed Field composition through RootProvider and exposes its context', async () => {
  const App = defineComponent({
    setup() {
      const passwordInput = usePasswordInput();
      return () =>
        h(
          PasswordInputRootProvider,
          { value: passwordInput.value },
          {
            default: () => [
              label(),
              field(),
              h(PasswordInputContext, null, {
                default: (context: { visible: boolean }) =>
                  h('output', `Visibility: ${context.visible ? 'visible' : 'hidden'}`),
              }),
            ],
          },
        );
    },
  });

  render(App);

  expect(screen.getByLabelText('Password')).toHaveAttribute('data-slot', 'password-input-input');
  expect(screen.getByText('Visibility: hidden')).toBeInTheDocument();
  await fireEvent.pointerDown(screen.getByRole('button', { name: /show password/i }), {
    button: 0,
  });
  await waitFor(() => expect(screen.getByText('Visibility: visible')).toBeInTheDocument());
});

test('supports a native fallback slot and default indicator content', async () => {
  const App = defineComponent({
    setup() {
      return () =>
        h(PasswordInput, null, {
          default: () => [
            label(),
            h(PasswordInputControl, null, {
              default: () => [
                h(PasswordInputInput),
                h(PasswordInputVisibilityTrigger, null, {
                  default: () =>
                    h(PasswordInputIndicator, null, {
                      default: () => 'Visible icon',
                      fallback: () => 'Hidden icon',
                    }),
                }),
              ],
            }),
          ],
        });
    },
  });
  render(App);

  expect(screen.getByText('Hidden icon')).toBeInTheDocument();
  await fireEvent.pointerDown(screen.getByRole('button', { name: /show password/i }), {
    button: 0,
  });
  expect(screen.getByText('Visible icon')).toBeInTheDocument();
});

test('renders and hydrates generated input ids consistently', async () => {
  const App = defineComponent({
    setup() {
      return () => h(PasswordInput, null, { default: basicSlots });
    },
  });
  const html = await renderToString(createSSRApp(App));
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.append(container);

  const serverInput = container.querySelector('input');
  const serverLabel = container.querySelector('label');
  expect(serverInput?.id).not.toBe('');
  expect(serverLabel?.htmlFor).toBe(serverInput?.id);

  const app = createSSRApp(App);
  try {
    app.mount(container);
    await nextTick();

    const hydratedInput = container.querySelector('input');
    const hydratedLabel = container.querySelector('label');
    expect(hydratedInput?.id).toBe(serverInput?.id);
    expect(hydratedLabel?.htmlFor).toBe(hydratedInput?.id);
    expect(container.querySelector('[data-slot="password-input-root"]')).toBeInTheDocument();
  } finally {
    app.unmount();
    container.remove();
  }
});

test('preserves asChild root composition on the consumer host', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    setup() {
      return () =>
        h(
          PasswordInput,
          { ref: rootRef, asChild: true, class: 'consumer-root' },
          {
            default: () => h('section', { 'aria-label': 'Password input' }, [label(), field()]),
          },
        );
    },
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Password input' });
  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'password-input-root');
  expect(root).toHaveClass(styles.root, 'consumer-root');
  expect(rootRef.value?.$el).toBe(root);
});