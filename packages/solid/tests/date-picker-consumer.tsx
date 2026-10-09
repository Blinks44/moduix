import {
  DatePickerField,
  DatePickerRangeField,
  DatePickerDayTable,
} from '@moduix/solid/date-picker';
import type { ComponentProps } from 'solid-js';

export const fixedChildrenTypes: Extract<
  | keyof ComponentProps<typeof DatePickerField>
  | keyof ComponentProps<typeof DatePickerRangeField>
  | keyof ComponentProps<typeof DatePickerDayTable>,
  'children'
> extends never
  ? true
  : false = true;