import { createListCollection } from '@ark-ui/react/collection';
import { parseColor } from '@ark-ui/react/color-picker';
import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  FileUpload,
  FileUploadHiddenInput,
} from '../src';

const collection = createListCollection({ items: [{ label: 'React', value: 'react' }] });
const cases = [
  {
    name: 'AngleSlider',
    value: '90',
    render: (input: boolean) => (
      <AngleSlider name="value" defaultValue={90}>
        {input && <AngleSliderHiddenInput form="native-form" data-testid="native-input" />}
      </AngleSlider>
    ),
  },
  {
    name: 'Checkbox',
    value: 'on',
    render: (input: boolean) => (
      <Checkbox name="value" form="native-form" defaultChecked>
        <CheckboxControl />
        {input && <CheckboxHiddenInput data-testid="native-input" />}
      </Checkbox>
    ),
  },
  {
    name: 'ColorPicker',
    value: 'rgba(255, 0, 0, 1)',
    render: (input: boolean) => (
      <ColorPicker name="value" defaultValue={parseColor('#ff0000')}>
        {input && <ColorPickerHiddenInput form="native-form" data-testid="native-input" />}
      </ColorPicker>
    ),
  },
  {
    name: 'DateInput',
    value: '6/22/2026',
    render: (input: boolean) => (
      <DateInput
        name="value"
        form="native-form"
        locale="en-US"
        defaultValue={[new CalendarDate(2026, 6, 22)]}
      >
        {input && <DateInputHiddenInput name="value" data-testid="native-input" />}
      </DateInput>
    ),
  },
  {
    name: 'FileUpload',
    value: null,
    render: (input: boolean) => (
      <FileUpload name="value">
        {input && <FileUploadHiddenInput form="native-form" data-testid="native-input" />}
      </FileUpload>
    ),
  },
  {
    name: 'PinInput',
    value: '1234',
    render: (input: boolean) => (
      <PinInput name="value" form="native-form" count={4} defaultValue={['1', '2', '3', '4']}>
        {input && <PinInput.HiddenInput data-testid="native-input" />}
      </PinInput>
    ),
  },
  {
    name: 'RadioGroup',
    value: 'react',
    render: (input: boolean) => (
      <RadioGroup name="value" form="native-form" defaultValue="react">
        <RadioGroup.Item value="react">
          <RadioGroup.ItemText>React</RadioGroup.ItemText>
          {input && <RadioGroup.ItemHiddenInput data-testid="native-input" />}
        </RadioGroup.Item>
      </RadioGroup>
    ),
  },
  {
    name: 'RatingGroup',
    value: '3',
    render: (input: boolean) => (
      <RatingGroup name="value" form="native-form" defaultValue={3}>
        {input && <RatingGroup.HiddenInput data-testid="native-input" />}
      </RatingGroup>
    ),
  },
  {
    name: 'SegmentGroup',
    value: 'react',
    render: (input: boolean) => (
      <SegmentGroup name="value" form="native-form" defaultValue="react">
        <SegmentGroup.Item value="react">
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
          {input && <SegmentGroup.ItemHiddenInput data-testid="native-input" />}
        </SegmentGroup.Item>
      </SegmentGroup>
    ),
  },
  {
    name: 'Select',
    value: 'react',
    render: (input: boolean) => (
      <Select collection={collection} name="value" form="native-form" defaultValue={['react']}>
        {input && <Select.HiddenSelect data-testid="native-input" />}
      </Select>
    ),
  },
  {
    name: 'SignaturePad',
    value: '["M1,1 L2,2"]',
    render: (input: boolean) => (
      <SignaturePad name="value" defaultPaths={['M1,1 L2,2']}>
        {input && (
          <SignaturePad.HiddenInput
            value={JSON.stringify(['M1,1 L2,2'])}
            form="native-form"
            data-testid="native-input"
          />
        )}
      </SignaturePad>
    ),
  },
  {
    name: 'Slider',
    value: '40',
    render: (input: boolean) => (
      <Slider name="value" form="native-form" defaultValue={[40]}>
        <Slider.Control>
          <Slider.Thumb index={0}>
            {input && <Slider.HiddenInput data-testid="native-input" />}
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
    ),
  },
  {
    name: 'Switch',
    value: 'on',
    render: (input: boolean) => (
      <Switch name="value" form="native-form" defaultChecked>
        <Switch.Control />
        {input && <Switch.HiddenInput data-testid="native-input" />}
      </Switch>
    ),
  },
  {
    name: 'TagsInput',
    value: 'react, solid',
    render: (input: boolean) => (
      <TagsInput name="value" form="native-form" defaultValue={['react', 'solid']}>
        {input && <TagsInput.HiddenInput data-testid="native-input" />}
      </TagsInput>
    ),
  },
];

test.each(cases)(
  '$name does not insert a native control into explicit composition',
  ({ render: control }) => {
    const { container } = render(<form>{control(false)}</form>);
    expect(container.querySelectorAll('input, select')).toHaveLength(0);
    expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([]);
  },
);

test.each(cases)(
  '$name preserves one explicit control and external form association',
  ({ render: control, value }) => {
    const { container } = render(
      <>
        <form id="native-form" />
        {control(true)}
      </>,
    );
    const form = container.querySelector('form')!;
    const inputs = container.querySelectorAll('input, select');
    expect(inputs).toHaveLength(1);
    expect(inputs[0]).toHaveAttribute('data-testid', 'native-input');
    expect((inputs[0] as HTMLInputElement | HTMLSelectElement).form).toBe(form);
    const entries = Array.from(new FormData(form).entries());
    expect(entries).toHaveLength(1);
    expect(entries[0]![0]).toBe('value');
    if (value === null) {
      expect(entries[0]![1]).toBeInstanceOf(File);
    } else {
      expect(entries[0]![1]).toBe(value);
    }
  },
);

test('explicit controls synchronize interaction and the form reset event with FormData', async () => {
  const { container } = render(
    <form>
      <Checkbox name="notifications" defaultChecked>
        <CheckboxControl />
        <CheckboxLabel>Notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <Slider name="volume" defaultValue={[40]} thumbAlignment="center">
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
    </form>,
  );
  const form = container.querySelector('form')!;
  const checkbox = screen.getByRole('checkbox', { name: 'Notifications' });
  const thumb = screen.getByRole('slider', { name: 'Volume' });
  await act(async () => {
    fireEvent.click(checkbox);
    fireEvent.focus(thumb);
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
  });
  await waitFor(() => expect(Array.from(new FormData(form).entries())).toEqual([['volume', '41']]));
  await act(async () => form.reset());
  await waitFor(() => {
    expect(checkbox).toBeChecked();
    expect(thumb).toHaveAttribute('aria-valuenow', '40');
    expect(Array.from(new FormData(form).entries())).toEqual([
      ['notifications', 'on'],
      ['volume', '40'],
    ]);
  });
});

test('fixed compositions include exactly one native control per generated item', () => {
  const { container } = render(
    <form>
      <RadioGroup name="framework" defaultValue="react">
        <RadioGroup.Option value="react">React</RadioGroup.Option>
      </RadioGroup>
      <SegmentGroup name="view" defaultValue="list">
        <SegmentGroup.Items items={[{ label: 'List', value: 'list' }]} />
      </SegmentGroup>
      <Slider name="range" defaultValue={[20, 80]}>
        <Slider.Control>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
    </form>,
  );
  expect(container.querySelectorAll('input')).toHaveLength(4);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['framework', 'react'],
    ['view', 'list'],
    ['range[]', '20'],
    ['range[]', '80'],
  ]);
});
