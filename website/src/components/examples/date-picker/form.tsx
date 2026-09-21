import { parseDate } from '@ark-ui/react/date-picker';
import { Button } from '@moduix/react/button';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
} from '@moduix/react/date-picker';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/date-picker/date-picker-form.module.css';

export default function DatePickerFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('delivery-date') ?? ''));
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <DatePicker
        defaultValue={[parseDate('2026-06-22')]}
        maxView="day"
        minView="day"
        name="delivery-date"
      >
        <DatePickerLabel>Delivery date</DatePickerLabel>
        <DatePickerField />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerDayTable />
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
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