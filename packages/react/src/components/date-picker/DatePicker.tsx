import type { ComponentProps, ComponentRef } from 'react';
import {
  DatePicker as DatePickerPrimitive,
  parseDate,
  useDatePicker,
  useDatePickerContext,
} from '@ark-ui/react/date-picker';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './DatePicker.module.css';

const DatePickerRoot = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Root>,
  ComponentProps<typeof DatePickerPrimitive.Root>
>(function DatePickerRoot({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Root
      ref={ref}
      data-slot="date-picker-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerRootProvider = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.RootProvider>,
  ComponentProps<typeof DatePickerPrimitive.RootProvider>
>(function DatePickerRootProvider({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.RootProvider
      ref={ref}
      data-slot="date-picker-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerLabel = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Label>,
  ComponentProps<typeof DatePickerPrimitive.Label>
>(function DatePickerLabel({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Label
      ref={ref}
      data-slot="date-picker-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerControl = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Control>,
  ComponentProps<typeof DatePickerPrimitive.Control>
>(function DatePickerControl({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Control
      ref={ref}
      data-slot="date-picker-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerInput = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Input>,
  ComponentProps<typeof DatePickerPrimitive.Input>
>(function DatePickerInput({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Input
      ref={ref}
      data-slot="date-picker-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Trigger>,
  ComponentProps<typeof DatePickerPrimitive.Trigger>
>(function DatePickerTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.Trigger
      ref={ref}
      data-slot="date-picker-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CalendarIcon />}
    </DatePickerPrimitive.Trigger>
  );
});

const DatePickerClearTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ClearTrigger>,
  ComponentProps<typeof DatePickerPrimitive.ClearTrigger>
>(function DatePickerClearTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.ClearTrigger
      ref={ref}
      data-slot="date-picker-clear-trigger"
      asChild={asChild}
      className={clsx(
        !asChild && styles.trigger,
        styles.clearTrigger,
        normalizeClassName(className),
      )}
      {...props}
    >
      {children ?? <CloseIcon />}
    </DatePickerPrimitive.ClearTrigger>
  );
});

const DatePickerPositioner = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Positioner>,
  ComponentProps<typeof DatePickerPrimitive.Positioner>
>(function DatePickerPositioner({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Positioner
      ref={ref}
      data-slot="date-picker-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerContent = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Content>,
  ComponentProps<typeof DatePickerPrimitive.Content>
>(function DatePickerContent({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Content
      ref={ref}
      data-slot="date-picker-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerView = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.View>,
  ComponentProps<typeof DatePickerPrimitive.View>
>(function DatePickerView({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.View
      ref={ref}
      data-slot="date-picker-view"
      className={clsx(styles.view, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerViewControl = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ViewControl>,
  ComponentProps<typeof DatePickerPrimitive.ViewControl>
>(function DatePickerViewControl({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.ViewControl
      ref={ref}
      data-slot="date-picker-view-control"
      className={clsx(styles.viewControl, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerPrevTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.PrevTrigger>,
  ComponentProps<typeof DatePickerPrimitive.PrevTrigger>
>(function DatePickerPrevTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.PrevTrigger
      ref={ref}
      data-slot="date-picker-prev-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.navTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronLeftIcon />}
    </DatePickerPrimitive.PrevTrigger>
  );
});

const DatePickerNextTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.NextTrigger>,
  ComponentProps<typeof DatePickerPrimitive.NextTrigger>
>(function DatePickerNextTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.NextTrigger
      ref={ref}
      data-slot="date-picker-next-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.navTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </DatePickerPrimitive.NextTrigger>
  );
});

const DatePickerRangeText = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.RangeText>,
  ComponentProps<typeof DatePickerPrimitive.RangeText>
>(function DatePickerRangeText({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.RangeText
      ref={ref}
      data-slot="date-picker-range-text"
      className={clsx(styles.rangeText, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerViewTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ViewTrigger>,
  ComponentProps<typeof DatePickerPrimitive.ViewTrigger>
>(function DatePickerViewTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.ViewTrigger
      ref={ref}
      data-slot="date-picker-view-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.viewTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? (
        <>
          <DatePickerRangeText />
          <ChevronDownIcon />
        </>
      )}
    </DatePickerPrimitive.ViewTrigger>
  );
});

const DatePickerTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  ComponentProps<typeof DatePickerPrimitive.Table>
>(function DatePickerTable({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Table
      ref={ref}
      data-slot="date-picker-table"
      className={clsx(styles.table, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerTableHead = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHead>,
  ComponentProps<typeof DatePickerPrimitive.TableHead>
>(function DatePickerTableHead({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableHead
      ref={ref}
      data-slot="date-picker-table-head"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const DatePickerTableBody = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableBody>,
  ComponentProps<typeof DatePickerPrimitive.TableBody>
>(function DatePickerTableBody({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableBody
      ref={ref}
      data-slot="date-picker-table-body"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const DatePickerTableRow = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableRow>,
  ComponentProps<typeof DatePickerPrimitive.TableRow>
>(function DatePickerTableRow({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableRow
      ref={ref}
      data-slot="date-picker-table-row"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const DatePickerTableHeader = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHeader>,
  ComponentProps<typeof DatePickerPrimitive.TableHeader>
>(function DatePickerTableHeader({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableHeader
      ref={ref}
      data-slot="date-picker-table-header"
      className={clsx(styles.tableHeader, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerWeekNumberHeaderCell = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.WeekNumberHeaderCell>,
  ComponentProps<typeof DatePickerPrimitive.WeekNumberHeaderCell>
>(function DatePickerWeekNumberHeaderCell({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.WeekNumberHeaderCell
      ref={ref}
      data-slot="date-picker-week-number-header-cell"
      className={clsx(styles.tableHeader, styles.weekNumberCell, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerWeekNumberCell = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.WeekNumberCell>,
  ComponentProps<typeof DatePickerPrimitive.WeekNumberCell>
>(function DatePickerWeekNumberCell({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.WeekNumberCell
      ref={ref}
      data-slot="date-picker-week-number-cell"
      className={clsx(styles.weekNumberCell, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerTableCell = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableCell>,
  ComponentProps<typeof DatePickerPrimitive.TableCell>
>(function DatePickerTableCell({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableCell
      ref={ref}
      data-slot="date-picker-table-cell"
      className={clsx(styles.tableCell, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerTableCellTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableCellTrigger>,
  ComponentProps<typeof DatePickerPrimitive.TableCellTrigger>
>(function DatePickerTableCellTrigger({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableCellTrigger
      ref={ref}
      data-slot="date-picker-table-cell-trigger"
      className={clsx(styles.tableCellTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerMonthSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.MonthSelect>,
  ComponentProps<typeof DatePickerPrimitive.MonthSelect>
>(function DatePickerMonthSelect({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.MonthSelect
      ref={ref}
      data-slot="date-picker-month-select"
      className={clsx(styles.select, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerYearSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.YearSelect>,
  ComponentProps<typeof DatePickerPrimitive.YearSelect>
>(function DatePickerYearSelect({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.YearSelect
      ref={ref}
      data-slot="date-picker-year-select"
      className={clsx(styles.select, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerPresetTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.PresetTrigger>,
  ComponentProps<typeof DatePickerPrimitive.PresetTrigger>
>(function DatePickerPresetTrigger({ asChild, className, ...props }, ref) {
  return (
    <DatePickerPrimitive.PresetTrigger
      ref={ref}
      data-slot="date-picker-preset-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.presetTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerValueText = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ValueText>,
  ComponentProps<typeof DatePickerPrimitive.ValueText>
>(function DatePickerValueText({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.ValueText
      ref={ref}
      data-slot="date-picker-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

const DatePickerContext = DatePickerPrimitive.Context;

const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  RootProvider: DatePickerRootProvider,
  Label: DatePickerLabel,
  Control: DatePickerControl,
  Input: DatePickerInput,
  Trigger: DatePickerTrigger,
  ClearTrigger: DatePickerClearTrigger,
  Positioner: DatePickerPositioner,
  Content: DatePickerContent,
  View: DatePickerView,
  ViewControl: DatePickerViewControl,
  PrevTrigger: DatePickerPrevTrigger,
  NextTrigger: DatePickerNextTrigger,
  ViewTrigger: DatePickerViewTrigger,
  RangeText: DatePickerRangeText,
  ValueText: DatePickerValueText,
  Table: DatePickerTable,
  TableHead: DatePickerTableHead,
  TableBody: DatePickerTableBody,
  TableRow: DatePickerTableRow,
  TableHeader: DatePickerTableHeader,
  TableCell: DatePickerTableCell,
  TableCellTrigger: DatePickerTableCellTrigger,
  WeekNumberHeaderCell: DatePickerWeekNumberHeaderCell,
  WeekNumberCell: DatePickerWeekNumberCell,
  MonthSelect: DatePickerMonthSelect,
  YearSelect: DatePickerYearSelect,
  PresetTrigger: DatePickerPresetTrigger,
  Context: DatePickerContext,
});

export { DatePicker, parseDate, useDatePicker, useDatePickerContext };
export type {
  DatePickerContextProps,
  DatePickerDateRangePreset,
  DatePickerDateView,
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerSelectionMode,
  DatePickerValueChangeDetails,
  DatePickerValueTextRenderProps,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
  DateValue,
  UseDatePickerContext,
  UseDatePickerProps,
  UseDatePickerReturn,
} from '@ark-ui/react/date-picker';