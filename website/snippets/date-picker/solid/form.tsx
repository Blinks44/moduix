import { parseDate } from '@ark-ui/solid/date-picker';
import { Button } from '@moduix/solid/button';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
} from '@moduix/solid/date-picker';
import { createSignal } from 'solid-js';

export default function DatePickerFormDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('delivery-date') ?? ''));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <output>Submitted: {submitted()}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}