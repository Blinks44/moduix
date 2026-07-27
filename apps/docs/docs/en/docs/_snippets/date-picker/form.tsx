import { parseDate } from '@ark-ui/react/date-picker';
import { Button, DatePicker } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function DatePickerFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('delivery-date') ?? ''));
  };

  return (
    <form className="date-picker-preview" onSubmit={handleSubmit}>
      <DatePicker
        defaultValue={[parseDate('2026-06-22')]}
        maxView="day"
        minView="day"
        name="delivery-date"
      >
        <DatePicker.Label>Delivery date</DatePicker.Label>
        <DatePicker.Field />
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </DatePicker>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}