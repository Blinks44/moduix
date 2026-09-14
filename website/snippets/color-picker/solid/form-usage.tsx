import { Button } from '@moduix/solid/button';
import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
import { createSignal } from 'solid-js';

export default function FormUsageColorPickerDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(String(new FormData(form).get('accent') ?? ''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ColorPicker name="accent" defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
          </ColorPicker.Content>
        </ColorPicker.Positioner>
        <ColorPicker.HiddenInput />
      </ColorPicker>
      <output>Submitted: {submitted()}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}