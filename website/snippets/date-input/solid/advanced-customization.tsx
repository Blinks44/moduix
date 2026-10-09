import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
} from '@moduix/solid/date-input';
import styles from '@/components/examples/date-input/date-input-advanced-customization.module.css';

export default function CustomSegmentsDateInputDemo() {
  return (
    <DateInput
      class={styles.root}
      name="custom-date"
      defaultValue={[new CalendarDate(2026, 6, 22)]}
    >
      <DateInputLabel>Custom segments</DateInputLabel>
      <DateInputHiddenInput name="custom-date" />
      <DateInputControl class={styles.control}>
        <DateInputSegmentGroup>
          <DateInputSegmentContext>
            {(segment) => (
              <DateInputSegment
                segment={segment}
                class={segment.type === 'day' ? styles.daySegment : styles.segment}
              />
            )}
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
    </DateInput>
  );
}