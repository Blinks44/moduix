import { parseDate } from '@ark-ui/solid/date-picker';
import { Button } from '@moduix/solid/button';
import { DatePicker } from '@moduix/solid/date-picker';
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
      <output>Submitted: {submitted()}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}