'use client';

import {
  DatePicker as DatePickerPrimitive,
  useDatePicker,
  useDatePickerContext,
} from '@ark-ui/react/date-picker';
import { useFieldContext } from '@ark-ui/react/field';
import { useFieldsetContext } from '@ark-ui/react/fieldset';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './DatePicker.module.css';

type DatePickerRootProps = ComponentProps<typeof DatePickerPrimitive.Root> & OverlayPortalProps;
type DatePickerRootProviderProps = ComponentProps<typeof DatePickerPrimitive.RootProvider> &
  OverlayPortalProps;
type DatePickerFieldProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Control>,
  'asChild' | 'children'
> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  inputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  placeholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerRangeFieldProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Control>,
  'asChild' | 'children'
> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  endInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  endPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  startInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  startPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerTableSugarProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Table>,
  'asChild' | 'children'
> & {
  showHeader?: boolean;
};
type DatePickerDayTableProps = Omit<DatePickerTableSugarProps, 'columns'> & {
  /** Shows the month this many months after the visible one, for multi-month layouts. */
  offset?: number;
};
type DatePickerMonthTableProps = DatePickerTableSugarProps & {
  format?: 'short' | 'long';
};
type DatePickerYearTableProps = DatePickerTableSugarProps;

const DatePicker = forwardRef<ComponentRef<typeof DatePickerPrimitive.Root>, DatePickerRootProps>(
  function DatePicker(
    {
      className,
      disabled,
      invalid,
      lazyMount = true,
      portalled,
      portalRef,
      readOnly,
      required,
      unmountOnExit = true,
      ...props
    },
    ref,
  ) {
    const field = useFieldContext();
    const fieldset = useFieldsetContext();

    return (
      <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
        <DatePickerPrimitive.Root
          ref={ref}
          className={clsx(styles.root, className)}
          disabled={disabled ?? field?.disabled ?? fieldset?.disabled}
          invalid={invalid ?? field?.invalid ?? fieldset?.invalid}
          lazyMount={lazyMount}
          readOnly={readOnly ?? field?.readOnly}
          required={required ?? field?.required}
          unmountOnExit={unmountOnExit}
          {...props}
          data-slot="date-picker-root"
        />
      </OverlayPortalProvider>
    );
  },
);

const DatePickerRootProvider = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.RootProvider>,
  DatePickerRootProviderProps
>(function DatePickerRootProvider(
  { className, lazyMount = true, portalled, portalRef, unmountOnExit = true, ...props },
  ref,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DatePickerPrimitive.RootProvider
        ref={ref}
        className={clsx(styles.root, className)}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="date-picker-root-provider"
      />
    </OverlayPortalProvider>
  );
});

const DatePickerLabel = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Label>,
  ComponentProps<typeof DatePickerPrimitive.Label>
>(function DatePickerLabel({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="date-picker-label"
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
      className={clsx(styles.control, className)}
      {...props}
      data-slot="date-picker-control"
    />
  );
});

const DatePickerField = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Control>,
  DatePickerFieldProps
>(function DatePickerField(
  { clearLabel, clearTriggerProps, inputProps, placeholder, triggerLabel, triggerProps, ...props },
  ref,
) {
  return (
    <DatePickerControl ref={ref} {...props} asChild={false}>
      <DatePickerInput placeholder={placeholder} {...inputProps} index={0} />
      <DatePickerClearTrigger aria-label={clearLabel} {...clearTriggerProps} />
      <DatePickerTrigger aria-label={triggerLabel} {...triggerProps} />
    </DatePickerControl>
  );
});

const DatePickerRangeField = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Control>,
  DatePickerRangeFieldProps
>(function DatePickerRangeField(
  {
    clearLabel,
    clearTriggerProps,
    endInputProps,
    endPlaceholder,
    startInputProps,
    startPlaceholder,
    triggerLabel,
    triggerProps,
    ...props
  },
  ref,
) {
  return (
    <DatePickerControl ref={ref} {...props} asChild={false}>
      <DatePickerInput placeholder={startPlaceholder} {...startInputProps} index={0} />
      <DatePickerInput placeholder={endPlaceholder} {...endInputProps} index={1} />
      <DatePickerClearTrigger aria-label={clearLabel} {...clearTriggerProps} />
      <DatePickerTrigger aria-label={triggerLabel} {...triggerProps} />
    </DatePickerControl>
  );
});

const DatePickerInput = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Input>,
  ComponentProps<typeof DatePickerPrimitive.Input>
>(function DatePickerInput({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Input
      ref={ref}
      className={clsx(styles.input, className)}
      {...props}
      data-slot="date-picker-input"
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
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="date-picker-trigger"
    >
      {children ?? <CalendarIcon />}
    </DatePickerPrimitive.Trigger>
  );
});

const DatePickerClearTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ClearTrigger>,
  ComponentProps<typeof DatePickerPrimitive.ClearTrigger>
>(function DatePickerClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const triggerClassName = clsx(styles.clearTrigger, className);

  return (
    <DatePickerPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="date-picker-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
          {children}
        </CloseButton>
      )}
    </DatePickerPrimitive.ClearTrigger>
  );
});

const DatePickerPositioner = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Positioner>,
  ComponentProps<typeof DatePickerPrimitive.Positioner>
>(function DatePickerPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DatePickerPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="date-picker-positioner"
      />
    </OverlayPortal>
  );
});

const DatePickerContent = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Content>,
  ComponentProps<typeof DatePickerPrimitive.Content>
>(function DatePickerContent({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="date-picker-content"
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
      className={clsx(styles.view, className)}
      {...props}
      data-slot="date-picker-view"
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
      className={clsx(styles.viewControl, className)}
      {...props}
      data-slot="date-picker-view-control"
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
      asChild={asChild}
      className={clsx(!asChild && styles.navTrigger, className)}
      {...props}
      data-slot="date-picker-prev-trigger"
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
      asChild={asChild}
      className={clsx(!asChild && styles.navTrigger, className)}
      {...props}
      data-slot="date-picker-next-trigger"
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
      className={clsx(styles.rangeText, className)}
      {...props}
      data-slot="date-picker-range-text"
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
      asChild={asChild}
      className={clsx(!asChild && styles.viewTrigger, className)}
      {...props}
      data-slot="date-picker-view-trigger"
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
      className={clsx(styles.table, className)}
      {...props}
      data-slot="date-picker-table"
    />
  );
});

const DatePickerTableHead = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHead>,
  ComponentProps<typeof DatePickerPrimitive.TableHead>
>(function DatePickerTableHead(props, ref) {
  return <DatePickerPrimitive.TableHead ref={ref} {...props} data-slot="date-picker-table-head" />;
});

const DatePickerTableBody = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableBody>,
  ComponentProps<typeof DatePickerPrimitive.TableBody>
>(function DatePickerTableBody(props, ref) {
  return <DatePickerPrimitive.TableBody ref={ref} {...props} data-slot="date-picker-table-body" />;
});

const DatePickerTableRow = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableRow>,
  ComponentProps<typeof DatePickerPrimitive.TableRow>
>(function DatePickerTableRow(props, ref) {
  return <DatePickerPrimitive.TableRow ref={ref} {...props} data-slot="date-picker-table-row" />;
});

const DatePickerTableHeader = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHeader>,
  ComponentProps<typeof DatePickerPrimitive.TableHeader>
>(function DatePickerTableHeader({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableHeader
      ref={ref}
      className={clsx(styles.tableHeader, className)}
      {...props}
      data-slot="date-picker-table-header"
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
      className={clsx(styles.tableHeader, className)}
      {...props}
      data-slot="date-picker-week-number-header-cell"
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
      className={clsx(styles.weekNumberCell, className)}
      {...props}
      data-slot="date-picker-week-number-cell"
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
      className={clsx(styles.tableCell, className)}
      {...props}
      data-slot="date-picker-table-cell"
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
      className={clsx(styles.tableCellTrigger, className)}
      {...props}
      data-slot="date-picker-table-cell-trigger"
    />
  );
});

function DatePickerHeader() {
  return (
    <DatePickerViewControl>
      <DatePickerPrevTrigger />
      <DatePickerViewTrigger />
      <DatePickerNextTrigger />
    </DatePickerViewControl>
  );
}

const DatePickerDayTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerDayTableProps
>(function DatePickerDayTable({ offset, showHeader = true, ...props }, ref) {
  const datePicker = useDatePickerContext();
  const offsetMonth = offset ? datePicker.getOffset({ months: offset }) : undefined;

  return (
    <>
      {showHeader ? <DatePickerHeader /> : null}
      <DatePickerTable ref={ref} {...props} asChild={false}>
        <DatePickerTableHead>
          <DatePickerTableRow>
            {datePicker.showWeekNumbers ? <DatePickerWeekNumberHeaderCell /> : null}
            {datePicker.weekDays.map((weekDay) => (
              <DatePickerTableHeader key={weekDay.value.toString()}>
                {weekDay.short}
              </DatePickerTableHeader>
            ))}
          </DatePickerTableRow>
        </DatePickerTableHead>
        <DatePickerTableBody>
          {(offsetMonth?.weeks ?? datePicker.weeks).map((week, weekIndex) => (
            <DatePickerTableRow key={week[0]?.toString()}>
              {datePicker.showWeekNumbers ? (
                <DatePickerWeekNumberCell week={week} weekIndex={weekIndex}>
                  {datePicker.getWeekNumber(week)}
                </DatePickerWeekNumberCell>
              ) : null}
              {week.map((day) => (
                <DatePickerTableCell
                  key={day.toString()}
                  value={day}
                  visibleRange={offsetMonth?.visibleRange}
                >
                  <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                </DatePickerTableCell>
              ))}
            </DatePickerTableRow>
          ))}
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
});

const DatePickerMonthTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerMonthTableProps
>(function DatePickerMonthTable(
  { columns = 4, format = 'short', showHeader = true, ...props },
  ref,
) {
  const datePicker = useDatePickerContext();

  return (
    <>
      {showHeader ? <DatePickerHeader /> : null}
      <DatePickerTable ref={ref} columns={columns} {...props} asChild={false}>
        <DatePickerTableBody>
          {datePicker.getMonthsGrid({ columns, format }).map((months) => (
            <DatePickerTableRow key={months[0]?.value}>
              {months.map((month) => (
                <DatePickerTableCell key={month.value} value={month.value}>
                  <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
                </DatePickerTableCell>
              ))}
            </DatePickerTableRow>
          ))}
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
});

const DatePickerYearTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerYearTableProps
>(function DatePickerYearTable({ columns = 4, showHeader = true, ...props }, ref) {
  const datePicker = useDatePickerContext();

  return (
    <>
      {showHeader ? <DatePickerHeader /> : null}
      <DatePickerTable ref={ref} columns={columns} {...props} asChild={false}>
        <DatePickerTableBody>
          {datePicker.getYearsGrid({ columns }).map((years) => (
            <DatePickerTableRow key={years[0]?.value}>
              {years.map((year) => (
                <DatePickerTableCell key={year.value} value={year.value} disabled={year.disabled}>
                  <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                </DatePickerTableCell>
              ))}
            </DatePickerTableRow>
          ))}
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
});

const DatePickerMonthSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.MonthSelect>,
  ComponentProps<typeof DatePickerPrimitive.MonthSelect>
>(function DatePickerMonthSelect({ className, ...props }, ref) {
  return (
    <span className={styles.selectControl} data-slot="date-picker-month-select-control">
      <DatePickerPrimitive.MonthSelect
        ref={ref}
        {...props}
        className={clsx(styles.select, className)}
        data-slot="date-picker-month-select"
      />
      <span
        aria-hidden="true"
        className={styles.selectIndicator}
        data-slot="date-picker-month-select-indicator"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
});

const DatePickerYearSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.YearSelect>,
  ComponentProps<typeof DatePickerPrimitive.YearSelect>
>(function DatePickerYearSelect({ className, ...props }, ref) {
  return (
    <span className={styles.selectControl} data-slot="date-picker-year-select-control">
      <DatePickerPrimitive.YearSelect
        ref={ref}
        {...props}
        className={clsx(styles.select, className)}
        data-slot="date-picker-year-select"
      />
      <span
        aria-hidden="true"
        className={styles.selectIndicator}
        data-slot="date-picker-year-select-indicator"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
});

const DatePickerPresetTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.PresetTrigger>,
  ComponentProps<typeof DatePickerPrimitive.PresetTrigger>
>(function DatePickerPresetTrigger({ asChild, className, ...props }, ref) {
  return (
    <DatePickerPrimitive.PresetTrigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.presetTrigger, className)}
      {...props}
      data-slot="date-picker-preset-trigger"
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
      className={clsx(styles.valueText, className)}
      {...props}
      data-slot="date-picker-value-text"
    />
  );
});

const DatePickerContext = DatePickerPrimitive.Context;

export {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContext,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayTable,
  DatePickerField,
  DatePickerInput,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerMonthTable,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerPrevTrigger,
  DatePickerRangeField,
  DatePickerRangeText,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerValueText,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
  DatePickerWeekNumberCell,
  DatePickerWeekNumberHeaderCell,
  DatePickerYearSelect,
  DatePickerYearTable,
  useDatePicker,
  useDatePickerContext,
};
export type {
  DatePickerDayTableProps,
  DatePickerFieldProps,
  DatePickerMonthTableProps,
  DatePickerRangeFieldProps,
  DatePickerRootProps,
  DatePickerRootProviderProps,
  DatePickerYearTableProps,
};
export type {
  DatePickerDateRangePreset,
  DatePickerDateView,
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerSelectionMode,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
  DateValue,
  UseDatePickerProps,
  UseDatePickerReturn,
} from '@ark-ui/react/date-picker';