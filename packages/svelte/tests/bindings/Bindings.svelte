<script lang="ts">
  import {
    AngleSlider,
    AngleSliderControl,
    AngleSliderHiddenInput,
    AngleSliderThumb,
  } from '@/components/angle-slider';
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@/components/checkbox';
  import { Editable, EditableArea, EditableInput, EditablePreview } from '@/components/editable';
  import { Input } from '@/components/input';
  import { NativeSelect } from '@/components/native-select';
  import { NumberInput, NumberInputControl, NumberInputInput } from '@/components/number-input';
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputInput,
    PasswordInputVisibilityTrigger,
  } from '@/components/password-input';
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInputs,
  } from '@/components/pin-input';
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
  } from '@/components/radio-group';
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItems,
  } from '@/components/rating-group';
  import {
    SegmentGroup,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
  } from '@/components/segment-group';
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderThumb,
    SliderTrack,
  } from '@/components/slider';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@/components/switch';
  import { Textarea } from '@/components/textarea';

  let angle = $state(10);
  let area = $state('a');
  let checked = $state<boolean | 'indeterminate'>(false);
  let edit = $state('a');
  let editing = $state(false);
  let num = $state('1');
  let pin = $state(['1', '', '']);
  let radio = $state<string | null>('a');
  let rate = $state(1);
  let seg = $state<string | null>('a');
  let sel = $state('react');
  let slide = $state([10]);
  let sw = $state(false);
  let text = $state('a');
  let vis = $state(false);

  export const write = () => {
    angle = 90;
    area = 'ext';
    checked = true;
    edit = 'ext';
    editing = true;
    num = '5';
    pin = ['7', '8', '9'];
    radio = 'b';
    rate = 3;
    seg = 'b';
    sel = 'vue';
    slide = [50];
    sw = true;
    text = 'ext';
    vis = true;
  };

  export const read = () => ({
    angle,
    area,
    checked,
    num,
    pin: [...pin],
    radio,
    rate,
    seg,
    sel,
    slide: [...slide],
    sw,
    text,
    vis,
  });
</script>

<div data-testid="checkbox">
  <Checkbox bind:checked>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxControl />
    <CheckboxHiddenInput />
  </Checkbox>
</div>
<div data-testid="switch">
  <Switch bind:checked={sw}>
    <SwitchControl />
    <SwitchLabel>Switch</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</div>
<Input aria-label="Input" bind:value={text} />
<Textarea aria-label="Textarea" bind:value={area} />
<NativeSelect aria-label="Select" bind:value={sel}>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</NativeSelect>
<NumberInput bind:value={num}>
  <NumberInputControl><NumberInputInput aria-label="Number" /></NumberInputControl>
</NumberInput>
<div data-testid="slider">
  <Slider bind:value={slide}>
    <SliderControl>
      <SliderTrack />
      <SliderThumb index={0}><SliderHiddenInput /></SliderThumb>
    </SliderControl>
  </Slider>
</div>
<div data-testid="radio">
  <RadioGroup bind:value={radio}>
    {#each ['a', 'b'] as option (option)}
      <RadioGroupItem value={option}>
        <RadioGroupItemControl />
        <RadioGroupItemText>Radio {option}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    {/each}
  </RadioGroup>
</div>
<div data-testid="segment">
  <SegmentGroup bind:value={seg}>
    {#each ['a', 'b'] as option (option)}
      <SegmentGroupItem value={option}>
        <SegmentGroupItemText>Segment {option}</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    {/each}
  </SegmentGroup>
</div>
<div data-testid="rating">
  <RatingGroup count={5} bind:value={rate}>
    <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</div>
<div data-testid="pin">
  <PinInput count={3} bind:value={pin}>
    <PinInputControl><PinInputInputs /></PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</div>
<PasswordInput bind:visible={vis}>
  <PasswordInputControl>
    <PasswordInputInput aria-label="Password" />
    <PasswordInputVisibilityTrigger aria-label="Toggle" />
  </PasswordInputControl>
</PasswordInput>
<div data-testid="editable">
  <Editable activationMode="click" bind:edit={editing} bind:value={edit}>
    <EditableArea>
      <EditableInput aria-label="Editable" />
      <EditablePreview />
    </EditableArea>
  </Editable>
</div>
<div data-testid="angle">
  <AngleSlider bind:value={angle}>
    <AngleSliderControl><AngleSliderThumb /></AngleSliderControl>
    <AngleSliderHiddenInput />
  </AngleSlider>
</div>