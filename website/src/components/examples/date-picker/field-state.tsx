import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/react/date-picker';
import { Field, FieldErrorText } from '@moduix/react/field';
import styles from '@/components/examples/date-picker/date-picker-field-state.module.css';

export default function FieldDatePickerDemo() {
  return (
    <div className={styles.root}>
      <Field invalid>
        <DatePicker required invalid>
          <DatePickerLabel>Deadline</DatePickerLabel>
          <DatePickerField />
          <DatePickerPositioner>
            <DatePickerContent>
              <DatePickerView view="day">
                <DatePickerDayTable />
              </DatePickerView>
              <DatePickerView view="month">
                <DatePickerMonthTable />
              </DatePickerView>
              <DatePickerView view="year">
                <DatePickerYearTable />
              </DatePickerView>
            </DatePickerContent>
          </DatePickerPositioner>
        </DatePicker>
        <FieldErrorText>Choose a valid deadline.</FieldErrorText>
      </Field>
    </div>
  );
}