import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
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
import SsrPasswordInput from './fixtures/SsrPasswordInput.vue';

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

function label() {
  return h(PasswordInputLabel, null, { default: () => 'Password' });
}

const passwordInputSlots = { default: () => [label(), h(PasswordInputField)] };

test('renders the default Field composition with Ark anatomy and moduix slots', async () => {
  render(PasswordInput, {
    props: { name: 'password', required: true, class: 'consumer-root' },
    slots: passwordInputSlots,
  });

  const root = screen.getByText('Password').parentElement;

  expect(root?.getAttribute('data-scope')).toBe('password-input');
  expect(root?.getAttribute('data-part')).toBe('root');
  expect(root?.getAttribute('data-slot')).toBe('password-input-root');
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['flex', 'flex-col', 'consumer-root']),
  );
  expect(root?.className.endsWith('consumer-root')).toBe(true);
  await expect
    .element(page.getByText('Password'))
    .toHaveAttribute('data-slot', 'password-input-label');
  const input = page.getByLabel('Password', { exact: true });
  await expect.element(input).toHaveAttribute('data-scope', 'password-input');
  await expect.element(input).toHaveAttribute('data-part', 'input');
  await expect.element(input).toHaveAttribute('data-slot', 'password-input-input');
  await expect.element(input).toHaveAttribute('name', 'password');
  await expect.element(input).toHaveAttribute('type', 'password');
  await expect.element(input).toHaveAttribute('data-state', 'hidden');
  await expect
    .element(page.getByRole('button', { name: /show password/i, exact: true }))
    .toHaveAttribute('data-slot', 'password-input-visibility-trigger');
  expect(
    Boolean(
      screen.getByRole('button').querySelector('[data-slot="password-input-indicator"] svg')
        ?.isConnected,
    ),
  ).toBe(true);
});

test('applies native Tailwind utilities to component-owned parts', () => {
  const { container } = render(PasswordInput, { slots: passwordInputSlots });

  expect([...container.querySelector('[data-slot="password-input-root"]')!.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'w-full',
      'max-w-none',
      'flex-col',
      'gap-1',
      'text-foreground',
    ]),
  );
  expect([...screen.getByText('Password')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'gap-1',
      'text-sm',
      'font-medium',
      'text-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="password-input-control"]')!.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'min-h-control-md',
      'w-full',
      'rounded-md',
      'border',
      'border-border',
      'bg-background',
      'pr-2',
    ]),
  );
  expect([...screen.getByLabelText('Password')!.classList]).toEqual(
    expect.arrayContaining([
      'flex-auto',
      'min-h-0',
      'min-w-0',
      'bg-transparent',
      'px-3',
      'py-1',
      'text-md',
      'text-foreground',
    ]),
  );
  expect([...screen.getByRole('button')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'size-control-sm',
      'min-w-control-sm',
      'shrink-0',
      'rounded-sm',
      'text-muted-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="password-input-indicator"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-sm',
      'p-1',
      "[&>svg:not([class*='size-'])]:size-4",
    ]),
  );
});

test('lets consumer utilities replace component defaults', () => {
  const App = defineComponent({
    setup() {
      return () =>
        h(
          PasswordInput,
          {
            class: 'w-80 max-w-sm gap-4 text-muted-foreground',
          },
          {
            default: () => [
              label(),
              h(
                PasswordInputControl,
                {
                  class: 'min-h-20 rounded-lg border-2 border-primary bg-muted pr-0',
                },
                {
                  default: () => [
                    h(PasswordInputInput),
                    h(PasswordInputVisibilityTrigger, null, {
                      default: () => h(PasswordInputIndicator),
                    }),
                  ],
                },
              ),
            ],
          },
        );
    },
  });
  const { container } = render(App);

  const root = container.querySelector('[data-slot="password-input-root"]');
  const control = container.querySelector('[data-slot="password-input-control"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-muted-foreground']),
  );
  expect(
    ['w-full', 'max-w-none', 'gap-1', 'text-foreground'].some((name) =>
      root?.classList.contains(name),
    ),
  ).toBe(false);
  expect([...control!.classList]).toEqual(
    expect.arrayContaining([
      'min-h-20',
      'rounded-lg',
      'border-2',
      'border-primary',
      'bg-muted',
      'pr-0',
    ]),
  );
  expect(
    ['min-h-control-md', 'rounded-md', 'border-border', 'bg-background', 'pr-2'].some((name) =>
      control?.classList.contains(name),
    ),
  ).toBe(false);
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(control!).minHeight).toBe('80px');
  expect(getComputedStyle(control!).paddingRight).toBe('0px');
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

  await page.getByRole('button', { name: /show password/i, exact: true }).click();

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'text');
  await expect
    .element(page.getByRole('button', { name: /hide password/i, exact: true }))
    .toBeAttached();
  expect(visible.value).toBe(true);
  expect(changes).toEqual([true]);
});

test('preserves disabled and read-only interaction contracts', async () => {
  const { unmount } = render(PasswordInput, {
    props: { disabled: true },
    slots: passwordInputSlots,
  });

  const input = page.getByLabel('Password', { exact: true });
  await expect.element(input).toBeDisabled();
  await expect.element(page.getByRole('button')).toBeDisabled();
  unmount();

  render(PasswordInput, { props: { readOnly: true }, slots: passwordInputSlots });

  await page.getByRole('button', { name: /show password/i, exact: true }).click();

  await expect.element(input).toHaveAttribute('readonly');
  await expect
    .element(page.getByRole('button', { name: /show password/i, exact: true }))
    .toHaveAttribute('data-readonly');
  await expect.element(input).toHaveAttribute('type', 'password');
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

  expect(new FormData(form).get('password')).toBe('initial-password');

  await page.getByLabel('Password', { exact: true }).fill('updated-password');
  expect(new FormData(form).get('password')).toBe('updated-password');

  form.reset();
  await nextTick();
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveValue('initial-password');
});

test('forwards refs, attributes, and consumer classes to the Ark elements', async () => {
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

  expect(root?.getAttribute('data-slot')).toBe('password-input-root');
  expect(root?.getAttribute('data-probe')).toBe('root');
  expect(fieldRef.value?.$el).toBe(control);
  await expect
    .element(page.getByTitle('password control'))
    .toHaveAttribute('data-slot', 'password-input-control');
  expect([...control!.classList]).toEqual(
    expect.arrayContaining(['flex', 'min-h-control-md', 'consumer-control']),
  );
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
              h(PasswordInputField),
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

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('data-slot', 'password-input-input');
  await expect.element(page.getByText('Visibility: hidden')).toBeAttached();
  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect.element(page.getByText('Visibility: visible')).toBeAttached();
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

  await expect.element(page.getByText('Hidden icon')).toBeAttached();
  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect.element(page.getByText('Visible icon')).toBeAttached();
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrPasswordInput));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverInput = host.querySelector('input');
  expect(serverInput).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrPasswordInput);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('input')).toBe(serverInput);
    await page.getByRole('button', { name: /show password/i }).click();
    await expect
      .element(page.getByLabel('Password', { exact: true }))
      .toHaveAttribute('type', 'text');
  } finally {
    app.unmount();
    host.remove();
  }
});

test('preserves asChild root composition on the consumer host', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    setup() {
      return () =>
        h(
          PasswordInput,
          { ref: rootRef, asChild: true, class: 'consumer-root' },
          {
            default: () =>
              h('section', { 'aria-label': 'Password input' }, [label(), h(PasswordInputField)]),
          },
        );
    },
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Password input' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Password input', exact: true }))
    .toHaveAttribute('data-slot', 'password-input-root');
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['flex', 'flex-col', 'consumer-root']),
  );
  expect(rootRef.value?.$el).toBe(root);
});