import { DatePicker, Field } from '@moduix/react';

export default function FieldDatePickerDemo() {
  return (
    <div className="date-picker-field-preview">
      <Field invalid>
        <DatePicker required invalid>
          <DatePicker.Label>Deadline</DatePicker.Label>
          <DatePicker.Field />
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="day">
                <DatePicker.DayTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </DatePicker>
        <Field.ErrorText>Choose a valid deadline.</Field.ErrorText>
      </Field>
    </div>
  );
}