import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  render(
    <form data-testid="form">
      <SegmentGroup defaultValue="React" name="framework">
        <SegmentItems />
      </SegmentGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');
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

test('preserves Ark value change callback details', async () => {
  const changes: string[] = [];
  render(
    <SegmentGroup
      defaultValue="React"
      onValueChange={(details) => changes.push(details.value ?? '')}
    >
      <SegmentItems />
    </SegmentGroup>,
  );

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);

  await waitFor(() => expect(solid).toBeChecked());
  expect(changes).toEqual(['Solid']);
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

  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });
  const vue = screen.getByRole('radio', { name: 'Vue' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(react).toHaveAttribute('name', 'framework');
  expect(react).toBeChecked();
  expect(solid).toBeDisabled();

  solid.click();
  expect(react).toBeChecked();

  vue.click();
  await waitFor(() => expect(vue).toBeChecked());
});

test('propagates group disabled state to every native input', () => {
  render(
    <SegmentGroup defaultValue="React" disabled>
      <SegmentItems />
    </SegmentGroup>,
  );

  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toBeDisabled();
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
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'segment-group-indicator');
});

test('keeps read-only native inputs from changing value', async () => {
  render(
    <SegmentGroup defaultValue="React" readOnly>
      <SegmentItems />
    </SegmentGroup>,
  );

  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  fireEvent.click(solid);

  await waitFor(() => expect(react).toBeChecked());
  expect(solid).not.toBeChecked();
});

test('preserves controlled and provider composition paths', async () => {
  const { rerender } = render(<ControlledSegmentGroup />);

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());

  rerender(<ProviderSegmentGroup />);
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked();
});

test('inherits Field state on Ark item parts', () => {
  render(
    <Field disabled invalid readOnly required>
      <SegmentGroup defaultValue="React">
        <SegmentGroupItem value="React">
          <SegmentGroupItemControl data-testid="invalid-control" />
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </SegmentGroupItem>
      </SegmentGroup>
    </Field>,
  );

  expect(screen.getByRole('radio', { name: 'React' })).toBeDisabled();
  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
});

test('inherits Fieldset disabled and invalid state', () => {
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

  expect(screen.getByRole('radio', { name: 'React' })).toBeDisabled();
  expect(screen.getByTestId('fieldset-invalid-control')).toHaveAttribute('data-invalid');
});

test('preserves vertical orientation for Ark navigation', () => {
  render(
    <SegmentGroup defaultValue="React" orientation="vertical">
      <SegmentItems />
    </SegmentGroup>,
  );

  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-orientation', 'vertical');
  expect(screen.getByRole('radio', { name: 'React' }).parentElement).toHaveAttribute(
    'data-orientation',
    'vertical',
  );
});