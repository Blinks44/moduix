import {
  DatePicker as DatePickerPrimitive,
  useDatePicker,
  useDatePickerContext,
  type UseDatePickerReturn,
} from '@ark-ui/solid/date-picker';
import { useFieldContext } from '@ark-ui/solid/field';
import { useFieldsetContext } from '@ark-ui/solid/fieldset';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, For, Show, splitProps } from 'solid-js';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/lib/moduix/icons/ui/Icons';
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
type DatePickerFieldProps = ComponentProps<typeof DatePickerPrimitive.Control> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  inputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  placeholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerRangeFieldProps = ComponentProps<typeof DatePickerPrimitive.Control> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  endInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  endPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  startInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  startPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerApi = ReturnType<UseDatePickerReturn>;
type DatePickerOffset = ReturnType<DatePickerApi['getOffset']>;
type DatePickerDayTableProps = ComponentProps<typeof DatePickerPrimitive.Table> & {
  offset?: DatePickerOffset;
  showHeader?: boolean;
  showWeekNumbers?: boolean;
};

function DatePicker(props: DatePickerRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'disabled',
    'invalid',
    'lazyMount',
    'portalled',
    'portalRef',
    'readOnly',
    'required',
    'unmountOnExit',
  ]);
  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DatePickerPrimitive.Root
        asChild={local.asChild}
        class={clsx(styles.root, local.class)}
        disabled={local.disabled ?? field?.()?.disabled ?? fieldset?.()?.disabled}
        invalid={local.invalid ?? field?.()?.invalid ?? fieldset?.()?.invalid}
        lazyMount={local.lazyMount ?? true}
        readOnly={local.readOnly ?? field?.()?.readOnly}
        required={local.required ?? field?.()?.required}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="date-picker-root"
      >
        {local.children}
      </DatePickerPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function DatePickerRootProvider(props: DatePickerRootProviderProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DatePickerPrimitive.RootProvider
        asChild={local.asChild}
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="date-picker-root-provider"
      >
        {local.children}
      </DatePickerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function DatePickerLabel(props: ComponentProps<typeof DatePickerPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="date-picker-label"
    />
  );
}

function DatePickerControl(props: ComponentProps<typeof DatePickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="date-picker-control"
    />
  );
}

function DatePickerField(props: DatePickerFieldProps) {
  const [local, others] = splitProps(props, [
    'clearLabel',
    'clearTriggerProps',
    'inputProps',
    'placeholder',
    'triggerLabel',
    'triggerProps',
  ]);

  return (
    <DatePickerControl {...others}>
      <DatePickerInput placeholder={local.placeholder} {...(local.inputProps ?? {})} index={0} />
      <DatePickerClearTrigger aria-label={local.clearLabel} {...(local.clearTriggerProps ?? {})} />
      <DatePickerTrigger aria-label={local.triggerLabel} {...(local.triggerProps ?? {})} />
    </DatePickerControl>
  );
}

function DatePickerRangeField(props: DatePickerRangeFieldProps) {
  const [local, others] = splitProps(props, [
    'clearLabel',
    'clearTriggerProps',
    'endInputProps',
    'endPlaceholder',
    'startInputProps',
    'startPlaceholder',
    'triggerLabel',
    'triggerProps',
  ]);

  return (
    <DatePickerControl {...others}>
      <DatePickerInput
        placeholder={local.startPlaceholder}
        {...(local.startInputProps ?? {})}
        index={0}
      />
      <DatePickerInput
        placeholder={local.endPlaceholder}
        {...(local.endInputProps ?? {})}
        index={1}
      />
      <DatePickerClearTrigger aria-label={local.clearLabel} {...(local.clearTriggerProps ?? {})} />
      <DatePickerTrigger aria-label={local.triggerLabel} {...(local.triggerProps ?? {})} />
    </DatePickerControl>
  );
}

function DatePickerInput(props: ComponentProps<typeof DatePickerPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Input
      class={clsx(styles.input, local.class)}
      {...others}
      data-slot="date-picker-input"
    />
  );
}

function DatePickerTrigger(props: ComponentProps<typeof DatePickerPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="date-picker-trigger"
    >
      {resolvedChildren() ?? <CalendarIcon />}
    </DatePickerPrimitive.Trigger>
  );
}

function DatePickerClearTrigger(props: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const resolvedChildren = children(() => local.children);
  const triggerClass = clsx(styles.clearTrigger, local.class);

  if (local.asChild) {
    return (
      <DatePickerPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={triggerClass}
        {...others}
        data-slot="date-picker-clear-trigger"
      >
        {local.children}
      </DatePickerPrimitive.ClearTrigger>
    );
  }

  return (
    <DatePickerPrimitive.ClearTrigger
      asChild={(triggerProps) => {
        const resolvedProps = triggerProps();

        return (
          <CloseButton
            {...resolvedProps}
            {...(local['aria-label'] === undefined ? {} : { 'aria-label': local['aria-label'] })}
            {...(local['aria-labelledby'] === undefined
              ? {}
              : { 'aria-labelledby': local['aria-labelledby'] })}
          >
            {resolvedChildren()}
          </CloseButton>
        );
      }}
      class={triggerClass}
      {...others}
      data-slot="date-picker-clear-trigger"
    />
  );
}

function DatePickerPositioner(props: ComponentProps<typeof DatePickerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DatePickerPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="date-picker-positioner"
      />
    </OverlayPortal>
  );
}

function DatePickerContent(props: ComponentProps<typeof DatePickerPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="date-picker-content"
    />
  );
}

function DatePickerView(props: ComponentProps<typeof DatePickerPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.View
      class={clsx(styles.view, local.class)}
      {...others}
      data-slot="date-picker-view"
    />
  );
}

function DatePickerViewControl(props: ComponentProps<typeof DatePickerPrimitive.ViewControl>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.ViewControl
      class={clsx(styles.viewControl, local.class)}
      {...others}
      data-slot="date-picker-view-control"
    />
  );
}

function DatePickerPrevTrigger(props: ComponentProps<typeof DatePickerPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.PrevTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.navTrigger, local.class)}
      {...others}
      data-slot="date-picker-prev-trigger"
    >
      {resolvedChildren() ?? <ChevronLeftIcon />}
    </DatePickerPrimitive.PrevTrigger>
  );
}

function DatePickerNextTrigger(props: ComponentProps<typeof DatePickerPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.NextTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.navTrigger, local.class)}
      {...others}
      data-slot="date-picker-next-trigger"
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </DatePickerPrimitive.NextTrigger>
  );
}

function DatePickerRangeText(props: ComponentProps<typeof DatePickerPrimitive.RangeText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.RangeText
      class={clsx(styles.rangeText, local.class)}
      {...others}
      data-slot="date-picker-range-text"
    />
  );
}

function DatePickerViewTrigger(props: ComponentProps<typeof DatePickerPrimitive.ViewTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.ViewTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.viewTrigger, local.class)}
      {...others}
      data-slot="date-picker-view-trigger"
    >
      {resolvedChildren() ?? (
        <>
          <DatePickerRangeText />
          <ChevronDownIcon />
        </>
      )}
    </DatePickerPrimitive.ViewTrigger>
  );
}

function DatePickerTable(props: ComponentProps<typeof DatePickerPrimitive.Table>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Table
      class={clsx(styles.table, local.class)}
      {...others}
      data-slot="date-picker-table"
    />
  );
}

function DatePickerTableHead(props: ComponentProps<typeof DatePickerPrimitive.TableHead>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableHead
      class={local.class}
      {...others}
      data-slot="date-picker-table-head"
    />
  );
}

function DatePickerTableBody(props: ComponentProps<typeof DatePickerPrimitive.TableBody>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableBody
      class={local.class}
      {...others}
      data-slot="date-picker-table-body"
    />
  );
}

function DatePickerTableRow(props: ComponentProps<typeof DatePickerPrimitive.TableRow>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableRow
      class={local.class}
      {...others}
      data-slot="date-picker-table-row"
    />
  );
}

function DatePickerTableHeader(props: ComponentProps<typeof DatePickerPrimitive.TableHeader>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableHeader
      class={clsx(styles.tableHeader, local.class)}
      {...others}
      data-slot="date-picker-table-header"
    />
  );
}

function DatePickerWeekNumberHeaderCell(
  props: ComponentProps<typeof DatePickerPrimitive.WeekNumberHeaderCell>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.WeekNumberHeaderCell
      class={clsx(styles.tableHeader, styles.weekNumberCell, local.class)}
      {...others}
      data-slot="date-picker-week-number-header-cell"
    />
  );
}

function DatePickerWeekNumberCell(
  props: ComponentProps<typeof DatePickerPrimitive.WeekNumberCell>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.WeekNumberCell
      class={clsx(styles.weekNumberCell, local.class)}
      {...others}
      data-slot="date-picker-week-number-cell"
    />
  );
}

function DatePickerTableCell(props: ComponentProps<typeof DatePickerPrimitive.TableCell>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableCell
      class={clsx(styles.tableCell, local.class)}
      {...others}
      data-slot="date-picker-table-cell"
    />
  );
}

function DatePickerTableCellTrigger(
  props: ComponentProps<typeof DatePickerPrimitive.TableCellTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableCellTrigger
      class={clsx(styles.tableCellTrigger, local.class)}
      {...others}
      data-slot="date-picker-table-cell-trigger"
    />
  );
}

function DatePickerDayTable(props: DatePickerDayTableProps) {
  const [local, others] = splitProps(props, ['offset', 'showHeader', 'showWeekNumbers']);

  return (
    <DatePickerPrimitive.Context>
      {(datePicker) => (
        <>
          <Show when={local.showHeader ?? true}>
            <DatePickerViewControl>
              <DatePickerPrevTrigger />
              <DatePickerViewTrigger />
              <DatePickerNextTrigger />
            </DatePickerViewControl>
          </Show>
          <DatePickerTable {...others}>
            <DatePickerTableHead>
              <DatePickerTableRow>
                <Show when={local.showWeekNumbers ?? false}>
                  <DatePickerWeekNumberHeaderCell />
                </Show>
                <For each={datePicker().weekDays}>
                  {(weekDay) => <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>}
                </For>
              </DatePickerTableRow>
            </DatePickerTableHead>
            <DatePickerTableBody>
              <For each={local.offset?.weeks ?? datePicker().weeks}>
                {(week, weekIndex) => (
                  <DatePickerTableRow>
                    <Show when={local.showWeekNumbers ?? false}>
                      <DatePickerWeekNumberCell week={week} weekIndex={weekIndex()}>
                        {datePicker().getWeekNumber(week)}
                      </DatePickerWeekNumberCell>
                    </Show>
                    <For each={week}>
                      {(day) => (
                        <DatePickerTableCell value={day} visibleRange={local.offset?.visibleRange}>
                          <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                        </DatePickerTableCell>
                      )}
                    </For>
                  </DatePickerTableRow>
                )}
              </For>
            </DatePickerTableBody>
          </DatePickerTable>
        </>
      )}
    </DatePickerPrimitive.Context>
  );
}

function DatePickerMonthSelect(props: ComponentProps<typeof DatePickerPrimitive.MonthSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.MonthSelect
      class={clsx(styles.select, local.class)}
      {...others}
      data-slot="date-picker-month-select"
    />
  );
}

function DatePickerYearSelect(props: ComponentProps<typeof DatePickerPrimitive.YearSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.YearSelect
      class={clsx(styles.select, local.class)}
      {...others}
      data-slot="date-picker-year-select"
    />
  );
}

function DatePickerPresetTrigger(props: ComponentProps<typeof DatePickerPrimitive.PresetTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DatePickerPrimitive.PresetTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.presetTrigger, local.class)}
      {...others}
      data-slot="date-picker-preset-trigger"
    />
  );
}

function DatePickerValueText(props: ComponentProps<typeof DatePickerPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="date-picker-value-text"
    />
  );
}

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
  useDatePicker,
  useDatePickerContext,
};
export type {
  DatePickerDayTableProps,
  DatePickerFieldProps,
  DatePickerRangeFieldProps,
  DatePickerRootProps,
  DatePickerRootProviderProps,
};