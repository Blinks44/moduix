import { Button, ColorPicker, parseColor } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function FormUsageColorPickerDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('accent') ?? ''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ColorPicker name="accent" defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
      </ColorPicker>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}