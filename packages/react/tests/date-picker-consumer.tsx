import {
  DatePickerField,
  DatePickerRangeField,
  DatePickerDayTable,
} from '@moduix/react/date-picker';
import type { ComponentProps } from 'react';

export const fixedCompositionTypes: Extract<
  | keyof ComponentProps<typeof DatePickerField>
  | keyof ComponentProps<typeof DatePickerRangeField>
  | keyof ComponentProps<typeof DatePickerDayTable>,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;