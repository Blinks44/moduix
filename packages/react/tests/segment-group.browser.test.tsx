import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
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
  const [value, setValue] = useState<string | null>('React');

  return (
    <SegmentGroup value={value} onValueChange={(details) => setValue(details.value)}>
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
  render(
    <form data-testid="form">
      <SegmentGroup
        defaultValue="React"
        name="framework"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SegmentItems />
      </SegmentGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;

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
  render(
    <SegmentGroup defaultValue="React">
      <SegmentGroupItem asChild value="React">
        <label data-testid="custom-item">
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </label>
      </SegmentGroupItem>
    </SegmentGroup>,
  );

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('preserves native radio semantics and disabled items', async () => {
  render(
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
    </SegmentGroup>,
  );

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
  render(
    <SegmentGroup defaultValue="React" disabled>
      <SegmentItems />
    </SegmentGroup>,
  );

  await expect.element(page.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  for (const radio of screen.getAllByRole('radio')) {
    expect((radio as HTMLInputElement).disabled).toBe(true);
  }
});

test('forwards refs through the root, item, and indicator wrappers', () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLLabelElement>();
  const indicatorRef = createRef<HTMLDivElement>();

  render(
    <SegmentGroup ref={rootRef} defaultValue="React">
      <SegmentGroupIndicator ref={indicatorRef} />
      <SegmentGroupItem ref={itemRef} value="React">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>,
  );

  expect(rootRef.current).toBe(screen.getByRole('radiogroup'));
  expect(itemRef.current?.tagName).toBe('LABEL');
  expect(indicatorRef.current?.getAttribute('data-slot')).toBe('segment-group-indicator');
});

test('keeps read-only inputs checked and outside keyboard navigation', async () => {
  render(
    <>
      <button type="button">Before group</button>
      <SegmentGroup defaultValue="React" readOnly>
        <SegmentItems />
      </SegmentGroup>
      <button type="button">After group</button>
    </>,
  );
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
  const { rerender } = render(<ControlledSegmentGroup />);

  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();

  rerender(<ProviderSegmentGroup />);
  await expect.element(solidRadio).toBeChecked();
});

test('inherits Fieldset disabled and invalid state', async () => {
  render(
    <Fieldset disabled invalid>
      <SegmentGroup defaultValue="React">
        <SegmentGroupItem value="React">
          <SegmentGroupItemControl data-testid="fieldset-invalid-control" />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </SegmentGroupItem>
      </SegmentGroup>
    </Fieldset>,
  );

  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeDisabled();
  await expect
    .element(page.getByTestId('fieldset-invalid-control'))
    .toHaveAttribute('data-invalid');
});

test('preserves vertical orientation for Ark navigation', async () => {
  render(
    <SegmentGroup defaultValue="React" orientation="vertical">
      <SegmentItems />
    </SegmentGroup>,
  );

  await expect
    .element(page.getByRole('radiogroup'))
    .toHaveAttribute('data-orientation', 'vertical');
  expect(
    screen.getByRole('radio', { name: 'React' }).parentElement!.getAttribute('data-orientation'),
  ).toBe('vertical');
});

test('preserves generated IDs, inherited state and root asChild with undefined props', async () => {
  const rootRef = createRef<HTMLDivElement>();
  render(
    <Field disabled invalid readOnly required>
      <SegmentGroup
        ref={rootRef}
        asChild
        id={undefined}
        orientation={undefined}
        disabled={undefined}
        defaultValue="React"
      >
        <section data-testid="custom-group">
          <SegmentItems />
        </section>
      </SegmentGroup>
    </Field>,
  );
  const root = screen.getByTestId('custom-group');
  expect(rootRef.current).toBe(root);
  expect(root.id).not.toMatch(/undefined|^$/);
  const customGroupLocator = page.getByTestId('custom-group');
  await expect.element(customGroupLocator).toHaveAttribute('data-orientation', 'horizontal');
  await expect.element(customGroupLocator).toHaveAttribute('data-disabled');
  await expect.element(customGroupLocator).toHaveAttribute('data-invalid');
  await expect.element(customGroupLocator).toHaveAttribute('data-required');
  for (const radio of screen.getAllByRole('radio'))
    expect((radio as HTMLInputElement).disabled).toBe(true);
  await expect
    .element(page.locator('[data-slot="segment-group-item-control"]').nth(0))
    .toHaveAttribute('data-invalid');
});

test('lets explicit false override inherited Field state', async () => {
  render(
    <Field disabled invalid readOnly required>
      <SegmentGroup
        disabled={false}
        invalid={false}
        readOnly={false}
        required={false}
        defaultValue="React"
      >
        <SegmentItems />
      </SegmentGroup>
    </Field>,
  );

  const groupLocator = page.getByRole('radiogroup');
  await expect.element(groupLocator).not.toHaveAttribute('data-disabled');
  await expect.element(groupLocator).not.toHaveAttribute('data-invalid');
  await expect.element(groupLocator).not.toHaveAttribute('data-required');

  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await expect.element(solidRadio).not.toBeDisabled();
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();
});