import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react/date-input';
import styles from '@/components/examples/date-input/date-input-advanced-customization.module.css';

export default function CustomSegmentsDateInputDemo() {
  return (
    <DateInput
      className={styles.root}
      name="custom-date"
      defaultValue={[new CalendarDate(2026, 6, 22)]}
    >
      <DateInput.Label>Custom segments</DateInput.Label>
      <DateInput.HiddenInput name="custom-date" />
      <DateInput.Control className={styles.control}>
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => (
              <DateInput.Segment
                segment={segment}
                className={segment.type === 'day' ? styles.daySegment : styles.segment}
              />
            )}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
    </DateInput>
  );
}