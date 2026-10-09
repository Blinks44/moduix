import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
} from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-advanced-customization.module.css';

export default function CustomSegmentsDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      name="custom-date"
      defaultValue={[new CalendarDate(2026, 6, 22)]}
    >
      <DateInputLabel>Custom segments</DateInputLabel>
      <DateInputHiddenInput name="custom-date" />
      <DateInputControl className={styles.control}>
        <DateInputSegmentGroup>
          <DateInputSegmentContext>
            {(segment) => (
              <DateInputSegment
                segment={segment}
                className={segment.type === 'day' ? styles.daySegment : styles.segment}
              />
            )}
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
    </DateInput>
  );
}