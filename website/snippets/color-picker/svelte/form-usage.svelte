<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    ColorPicker,
    parseColor,
    ColorPickerHiddenInput,
    ColorPickerLabel,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerPositioner,
    ColorPickerContent,
    ColorPickerArea,
    ColorPickerChannelInput,
  } from '@moduix/svelte/color-picker';

  let submitted = $state('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('accent') ?? '');
  };
</script>

<form onsubmit={handleSubmit}>
  <ColorPicker name="accent" defaultValue={parseColor('#eb5e41')}>
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
      </ColorPickerContent>
    </ColorPickerPositioner>
    <ColorPickerHiddenInput />
  </ColorPicker>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>