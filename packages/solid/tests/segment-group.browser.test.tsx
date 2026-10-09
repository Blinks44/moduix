import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Field,
  Fieldset,
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
  SegmentGroupItems,
  SegmentGroupRootProvider,
  useSegmentGroup,
} from '../src';

const frameworks = ['React', 'Solid', 'Vue'];
const frameworkItems = frameworks.map((value) => ({ value, label: value }));

function SegmentItems() {
  return (
    <>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </>
  );
}

function ControlledSegmentGroup() {
  const [value, setValue] = createSignal<string | null>('React');

  return (
    <SegmentGroup value={value()} onValueChange={(details) => setValue(details.value)}>
      <SegmentItems />
    </SegmentGroup>
  );
}

function ProviderSegmentGroup() {
  const segmentGroup = useSegmentGroup({ defaultValue: 'Solid' });

  return (
    <SegmentGroupRootProvider value={segmentGroup}>
      <SegmentItems />
    </SegmentGroupRootProvider>
  );
}

test('submits through explicit Ark item inputs', async () => {
  const changes: (string | null)[] = [];
  const { container } = render(() => (
    <form>
      <SegmentGroup
        defaultValue="React"
        name="framework"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SegmentItems />
      </SegmentGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;

  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
  expect(changes).toEqual(['Solid']);
});

test('keeps asChild composition semantic with an explicit item input', () => {
  render(() => (
    <SegmentGroup defaultValue="React">
      <SegmentGroupItem
        asChild={(props) => <label data-testid="custom-item" {...props()} />}
        value="React"
      >
        <>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </>
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('keeps asChild item state reactive after selection changes', async () => {
  render(() => (
    <SegmentGroup defaultValue="Monthly">
      <SegmentGroupIndicator data-testid="indicator" />
      <SegmentGroupItem
        value="Monthly"
        asChild={(props) => <label data-testid="monthly" {...props()} />}
      >
        <>
          <SegmentGroupItemText>Monthly</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </>
      </SegmentGroupItem>
      <SegmentGroupItem
        value="Annual"
        asChild={(props) => <label data-testid="annual" {...props()} />}
      >
        <>
          <SegmentGroupItemText>Annual</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </>
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const annual = screen.getByTestId('annual');

  await expect.element(page.getByTestId('monthly')).toHaveAttribute('data-state', 'checked');
  await page.getByTestId('annual').click();

  await expect.element(page.getByTestId('annual')).toHaveAttribute('data-state', 'checked');
  await expect.element(page.getByTestId('monthly')).not.toHaveAttribute('data-state', 'checked');
  await expect
    .poll(() => parseFloat(screen.getByTestId('indicator').style.getPropertyValue('--left')))
    .toBe(annual.offsetLeft);
  await expect
    .poll(() => parseFloat(screen.getByTestId('indicator').style.getPropertyValue('--width')))
    .toBe(annual.offsetWidth);
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let itemRef: HTMLLabelElement | undefined;

  render(() => (
    <SegmentGroup>
      <SegmentGroupItem
        ref={(element) => (itemRef = element)}
        asChild={(props) => <label {...props()} />}
        value="React"
      >
        <>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </>
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  expect(itemRef).toBeUndefined();
});

test('preserves native radio semantics and disabled items', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" name="framework">
      <SegmentGroupIndicator />
      <SegmentGroupItem value="React">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
      <SegmentGroupItem value="Solid" disabled>
        <SegmentGroupItemText>Solid</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
      <SegmentGroupItem value="Vue">
        <SegmentGroupItemText>Vue</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const reactRadio = page.getByRole('radio', { name: 'React', exact: true });
  await expect.element(reactRadio).toHaveAttribute('type', 'radio');
  await expect.element(reactRadio).toHaveAttribute('name', 'framework');
  await expect.element(reactRadio).toBeChecked();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeDisabled();

  await expect.element(reactRadio).toBeChecked();

  await page.getByText('Vue', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Vue', exact: true })).toBeChecked();
});

test('propagates group disabled state to every native input', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" disabled>
      <SegmentItems />
    </SegmentGroup>
  ));

  await expect.element(page.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  for (const radio of screen.getAllByRole('radio')) {
    expect((radio as HTMLInputElement).disabled).toBe(true);
  }
});

test('forwards refs through the root, item, and indicator wrappers', () => {
  let rootRef!: HTMLDivElement;
  let itemRef!: HTMLLabelElement;
  let indicatorRef!: HTMLDivElement;

  render(() => (
    <SegmentGroup ref={(element) => (rootRef = element)} defaultValue="React">
      <SegmentGroupIndicator ref={(element) => (indicatorRef = element)} />
      <SegmentGroupItem ref={(element) => (itemRef = element)} value="React">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  expect(rootRef).toBe(screen.getByRole('radiogroup'));
  expect(itemRef?.tagName).toBe('LABEL');
  expect(indicatorRef.getAttribute('data-slot')).toBe('segment-group-indicator');
});

test('keeps read-only inputs checked and outside keyboard navigation', async () => {
  render(() => (
    <>
      <button type="button">Before group</button>
      <SegmentGroup defaultValue="React" readOnly>
        <SegmentItems />
      </SegmentGroup>
      <button type="button">After group</button>
    </>
  ));
  const react = page.getByRole('radio', { name: 'React', exact: true });
  const solid = page.getByRole('radio', { name: 'Solid', exact: true });
  await expect.element(react).toBeDisabled();
  await expect.element(solid).toBeDisabled();
  await page.getByRole('button', { name: 'Before group', exact: true }).click();
  await page.getByRole('button', { name: 'Before group', exact: true }).press('Tab');
  await expect
    .element(page.getByRole('button', { name: 'After group', exact: true }))
    .toBeFocused();
  await expect.element(react).toBeChecked();
  await expect.element(solid).not.toBeChecked();
});
test('preserves controlled and provider composition paths', async () => {
  const { unmount } = render(() => <ControlledSegmentGroup />);

  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();

  unmount();
  render(() => <ProviderSegmentGroup />);
  await expect.element(solidRadio).toBeChecked();
});

test('preserves hook defaults, Field inheritance, and reactive explicit overrides', async () => {
  const [override, setOverride] = createSignal<boolean | undefined>(undefined);
  const [orientation, setOrientation] = createSignal<'horizontal' | 'vertical' | undefined>(
    undefined,
  );

  function Provider() {
    const group = useSegmentGroup(() => ({
      id: undefined,
      orientation: orientation(),
      disabled: override(),
      invalid: override(),
      readOnly: override(),
      required: override(),
    }));
    return (
      <SegmentGroupRootProvider value={group}>
        <SegmentItems />
      </SegmentGroupRootProvider>
    );
  }

  render(() => (
    <Field disabled invalid readOnly required>
      <Provider />
    </Field>
  ));

  const group = screen.getByRole('radiogroup');

  const id = group.id;
  expect(id).not.toBe('');
  expect(id).not.toContain('undefined');
  const groupLocator = page.getByRole('radiogroup');
  await expect.element(groupLocator).toHaveAttribute('data-orientation', 'horizontal');
  await expect.element(groupLocator).toHaveAttribute('data-invalid');
  await expect.element(groupLocator).toHaveAttribute('aria-readonly', 'true');
  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await expect.element(solidRadio).toBeDisabled();
  await expect.element(solidRadio).toHaveAttribute('required');

  setOverride(false);
  setOrientation('vertical');
  expect(screen.getByRole('radiogroup')).toBe(group);
  expect(group.id).toBe(id);
  await expect.element(groupLocator).toHaveAttribute('data-orientation', 'vertical');
  await expect.element(groupLocator).not.toHaveAttribute('data-invalid');
  await expect.element(groupLocator).not.toHaveAttribute('aria-readonly');
  await expect.element(solidRadio).not.toBeDisabled();
  await expect.element(solidRadio).not.toHaveAttribute('required');
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();

  setOverride(undefined);
  setOrientation(undefined);
  await expect.element(groupLocator).toHaveAttribute('data-orientation', 'horizontal');
  await expect.element(groupLocator).toHaveAttribute('data-invalid');
  await expect.element(groupLocator).toHaveAttribute('aria-readonly', 'true');
  await expect.element(solidRadio).toBeDisabled();
  await expect.element(solidRadio).toHaveAttribute('required');
});

test('inherits Fieldset disabled and invalid state', async () => {
  render(() => (
    <Fieldset disabled invalid>
      <SegmentGroup defaultValue="React">
        <SegmentGroupItem value="React">
          <SegmentGroupItemControl data-testid="fieldset-invalid-control" />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </SegmentGroupItem>
      </SegmentGroup>
    </Fieldset>
  ));

  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeDisabled();
  await expect
    .element(page.getByTestId('fieldset-invalid-control'))
    .toHaveAttribute('data-invalid');
});

test('preserves vertical orientation for Ark navigation', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" orientation="vertical">
      <SegmentItems />
    </SegmentGroup>
  ));

  await expect
    .element(page.getByRole('radiogroup'))
    .toHaveAttribute('data-orientation', 'vertical');
  expect(
    screen.getByRole('radio', { name: 'React' }).parentElement!.getAttribute('data-orientation'),
  ).toBe('vertical');
});

test('preserves defaults and generated ids when machine props are undefined', async () => {
  render(() => (
    <Field disabled invalid readOnly required>
      <SegmentGroup id={undefined} orientation={undefined} disabled={undefined}>
        <SegmentItems />
      </SegmentGroup>
    </Field>
  ));
  const group = screen.getByRole('radiogroup');
  expect(group.id).not.toBe('');
  expect(group.id).not.toContain('undefined');
  const groupLocator = page.getByRole('radiogroup');
  await expect.element(groupLocator).toHaveAttribute('data-orientation', 'horizontal');
  await expect.element(groupLocator).toHaveAttribute('data-disabled');
  await expect.element(groupLocator).toHaveAttribute('data-invalid');
  await expect.element(groupLocator).toHaveAttribute('aria-readonly', 'true');
  await expect.element(groupLocator).toHaveAttribute('data-required');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeDisabled();
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('required');
  expect(
    screen.getByRole('radio', { name: 'React' }).parentElement!.hasAttribute('data-readonly'),
  ).toBe(true);
  await expect
    .element(page.locator('[data-slot="segment-group-item-control"]').nth(0))
    .toHaveAttribute('data-invalid');
});

test('keeps state overrides and orientation reactive through the native Root', async () => {
  const [override, setOverride] = createSignal<boolean | undefined>(undefined);
  const [orientation, setOrientation] = createSignal<'horizontal' | 'vertical'>('horizontal');
  render(() => (
    <Field disabled invalid readOnly required>
      <SegmentGroup
        disabled={override()}
        invalid={override()}
        readOnly={override()}
        required={override()}
        orientation={orientation()}
      >
        <SegmentItems />
      </SegmentGroup>
    </Field>
  ));
  const solidLocator = page.getByRole('radio', { name: 'Solid', exact: true });
  await expect.element(solidLocator).toBeDisabled();
  setOverride(false);
  setOrientation('vertical');

  const groupLocator = page.getByRole('radiogroup');
  await expect.element(groupLocator).not.toHaveAttribute('data-disabled');
  await expect.element(groupLocator).not.toHaveAttribute('data-invalid');
  await expect.element(groupLocator).not.toHaveAttribute('aria-readonly');
  await expect.element(groupLocator).not.toHaveAttribute('data-required');
  await expect.element(groupLocator).toHaveAttribute('data-orientation', 'vertical');
  const solid = screen.getByRole('radio', { name: 'Solid' });
  await expect.element(solidLocator).not.toBeDisabled();
  await expect.element(solidLocator).not.toHaveAttribute('required');
  expect(solid.parentElement?.hasAttribute('data-readonly')).toBe(false);
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidLocator).toBeChecked();
});

test('preserves the native Root asChild host without emulating ref forwarding', async () => {
  let rootRef: HTMLDivElement | undefined;
  render(() => (
    <SegmentGroup
      defaultValue="React"
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} data-testid="custom-root" />}
    >
      <SegmentItems />
    </SegmentGroup>
  ));
  await expect
    .element(page.getByTestId('custom-root'))
    .toHaveAttribute('data-slot', 'segment-group-root');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(rootRef).toBeUndefined();
});