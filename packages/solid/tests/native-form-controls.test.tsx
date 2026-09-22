import { createListCollection } from '@ark-ui/solid/collection';
import { parseColor } from '@ark-ui/solid/color-picker';
import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import {
  FileUpload,
  FileUploadHiddenInput,
  PinInput,
  PinInputHiddenInput,
} from '../src';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupOption,
} from '../src';
import { RatingGroup, RatingGroupHiddenInput } from '../src';
import {
  SegmentGroup,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
  SegmentGroupItems,
} from '../src';
import { Select, SelectHiddenSelect } from '../src';
import { Switch, SwitchControl, SwitchHiddenInput } from '../src';
import { SignaturePad, SignaturePadHiddenInput } from '../src';
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderThumb,
  SliderThumbs,
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
        {input && <PinInputHiddenInput data-testid="native-input" />}
      </PinInput>
    ),
  },
  {
    name: 'RadioGroup',
    value: 'react',
    render: (input: boolean) => (
      <RadioGroup name="value" form="native-form" defaultValue="react">
        <RadioGroupItem value="react">
          <RadioGroupItemText>React</RadioGroupItemText>
          {input && <RadioGroupItemHiddenInput data-testid="native-input" />}
        </RadioGroupItem>
      </RadioGroup>
    ),
  },
  {
    name: 'RatingGroup',
    value: '3',
    render: (input: boolean) => (
      <RatingGroup name="value" form="native-form" defaultValue={3}>
        {input && <RatingGroupHiddenInput data-testid="native-input" />}
      </RatingGroup>
    ),
  },
  {
    name: 'SegmentGroup',
    value: 'react',
    render: (input: boolean) => (
      <SegmentGroup name="value" form="native-form" defaultValue="react">
        <SegmentGroupItem value="react">
          <SegmentGroupItemText>React</SegmentGroupItemText>
          {input && <SegmentGroupItemHiddenInput data-testid="native-input" />}
        </SegmentGroupItem>
      </SegmentGroup>
    ),
  },
  {
    name: 'Select',
    value: 'react',
    render: (input: boolean) => (
      <Select collection={collection} name="value" form="native-form" defaultValue={['react']}>
        {input && <SelectHiddenSelect data-testid="native-input" />}
      </Select>
    ),
  },
  {
    name: 'SignaturePad',
    value: '["M1,1 L2,2"]',
    render: (input: boolean) => (
      <SignaturePad name="value" defaultPaths={['M1,1 L2,2']}>
        {input && (
          <SignaturePadHiddenInput
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
        <SliderControl>
          <SliderThumb index={0}>
            {input && <SliderHiddenInput data-testid="native-input" />}
          </SliderThumb>
        </SliderControl>
      </Slider>
    ),
  },
  {
    name: 'Switch',
    value: 'on',
    render: (input: boolean) => (
      <Switch name="value" form="native-form" defaultChecked>
        <SwitchControl />
        {input && <SwitchHiddenInput data-testid="native-input" />}
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
    const { container } = render(() => <form>{control(false)}</form>);
    expect(container.querySelectorAll('input, select')).toHaveLength(0);
    expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([]);
  },
);

test.each(cases)(
  '$name preserves one explicit control and external form association',
  ({ render: control, value }) => {
    const { container } = render(() => (
      <>
        <form id="native-form" />
        {control(true)}
      </>
    ));
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

test('explicit controls synchronize interaction and native reset with FormData', async () => {
  const { container } = render(() => (
    <form>
      <Checkbox name="notifications" defaultChecked>
        <CheckboxControl />
        <CheckboxLabel>Notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <Slider name="volume" defaultValue={[40]} thumbAlignment="center">
        <SliderLabel>Volume</SliderLabel>
        <SliderControl>
          <SliderThumb index={0}>
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    </form>
  ));
  const form = container.querySelector('form')!;
  const checkbox = screen.getByRole('checkbox', { name: 'Notifications' });
  const thumb = screen.getByRole('slider', { name: 'Volume' });
  fireEvent.click(checkbox);
  thumb.focus();
  fireEvent.focusIn(thumb);
  fireEvent.keyDown(thumb, { key: 'ArrowRight' });
  await waitFor(() => expect(Array.from(new FormData(form).entries())).toEqual([['volume', '41']]));
  form.reset();
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
  const { container } = render(() => (
    <form>
      <RadioGroup name="framework" defaultValue="react">
        <RadioGroupOption value="react">React</RadioGroupOption>
      </RadioGroup>
      <SegmentGroup name="view" defaultValue="list">
        <SegmentGroupItems items={[{ label: 'List', value: 'list' }]} />
      </SegmentGroup>
      <Slider name="range" defaultValue={[20, 80]}>
        <SliderControl>
          <SliderThumbs />
        </SliderControl>
      </Slider>
    </form>
  ));
  expect(container.querySelectorAll('input')).toHaveLength(4);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['framework', 'react'],
    ['view', 'list'],
    ['range[]', '20'],
    ['range[]', '80'],
  ]);
});
