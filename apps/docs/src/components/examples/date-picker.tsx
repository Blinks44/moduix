import { createListCollection } from '@ark-ui/react/collection';
import {
  CalendarDate,
  CalendarDateTime,
  DateFormatter,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import {
  Button,
  DatePicker,
  Field,
  Select,
  parseDate,
  useDatePicker,
  type DateValue,
  type DatePickerValueChangeDetails,
  type UseDatePickerReturn,
} from '@moduix/react';
import { useState, type ChangeEvent } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

type DatePickerSelectItem = {
  label: string;
  value: string;
};

const monthSelectItems: DatePickerSelectItem[] = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const monthSelectCollection = createListCollection<DatePickerSelectItem>({
  items: monthSelectItems,
});

const dateTimeFormatter = new DateFormatter('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const formatMonthYear = (date: DateValue) => `${String(date.month).padStart(2, '0')}/${date.year}`;

const parseMonthYear = (value: string) => {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/);
  return match ? new CalendarDate(Number(match[2]), Number(match[1]), 1) : undefined;
};

const formatYear = (date: DateValue) => String(date.year);

const parseYear = (value: string) => {
  const year = Number(value);
  return Number.isFinite(year) ? new CalendarDate(year, 1, 1) : undefined;
};

export const datePickerExampleCss = `
  .date-picker-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-picker-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
  }

  .date-picker-today-row {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacing-3);
  }

  .date-picker-time-field {
    display: grid;
    gap: var(--spacing-1);
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-picker-time-field input {
    height: var(--date-picker-select-height, 2rem);
    border: var(--date-picker-border-width, var(--border-width-sm)) solid
      var(--date-picker-border-color, var(--color-border));
    border-radius: var(--radius-sm);
    padding-inline: var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
  }

  .date-picker-selected-dates {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-height: var(--date-picker-control-height, var(--size-lg));
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-1);
    border: var(--date-picker-border-width, var(--border-width-sm)) solid
      var(--date-picker-border-color, var(--color-border));
    border-radius: var(--date-picker-radius, var(--radius-md));
    padding-block: var(--spacing-1);
    padding-inline: var(--date-picker-input-padding-x-start, 0.875rem)
      var(--date-picker-input-padding-x-end, 4.25rem);
    background: var(--date-picker-bg, var(--color-background));
  }

  .date-picker-multiple-root {
    --date-picker-width: 20rem;
  }

  .date-picker-selected-date,
  .date-picker-selected-dates-placeholder {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: var(--spacing-1);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-picker-selected-date {
    padding: 0.125rem 0.375rem;
    background: var(--color-muted);
    color: var(--color-foreground);
  }

  .date-picker-selected-dates-placeholder {
    color: var(--date-picker-placeholder-color, var(--color-muted-foreground));
  }

  .date-picker-selected-date-remove {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: var(--radius-sm);
    padding: 0;
    background: transparent;
    color: var(--color-muted-foreground);
    cursor: pointer;
  }

  .date-picker-selected-date-remove:hover {
    background: var(--color-accent);
    color: var(--color-accent-foreground);
  }

  .date-picker-month-year-control {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--spacing-2);
  }

  .date-picker-month-year-selects,
  .date-picker-month-year-nav {
    align-items: center;
    gap: var(--spacing-1);
  }

  .date-picker-month-year-selects {
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(0, 1fr) minmax(4.5rem, 0.7fr);
  }

  .date-picker-month-year-nav {
    display: inline-flex;
  }

  .date-picker-month-select {
    --select-width: 100%;
    --select-control-height: var(--date-picker-select-height, 2rem);
    min-width: 0;
  }

  .date-picker-year-select {
    --select-width: 100%;
    --select-control-height: var(--date-picker-select-height, 2rem);
    min-width: 0;
  }

  .date-picker-multiple-months {
    display: flex;
    gap: var(--spacing-3);
    overflow-x: auto;
  }

  .date-picker-multiple-months-content {
    --date-picker-content-width: 37.5rem;
    --date-picker-content-max-width: calc(100vw - 2rem);
  }

  .date-picker-multiple-months-table {
    width: max-content;
    flex: 0 0 auto;
  }

  .date-picker-field-preview {
    width: fit-content;
    margin-inline: auto;
  }

  .date-picker-inline-preview {
    width: fit-content;
    margin-inline: auto;
  }

  .date-picker-custom-root {
    --date-picker-bg: var(--color-muted);
    --date-picker-border-color: var(--color-primary);
    --date-picker-focus-ring-color: var(--color-primary);
    --date-picker-table-cell-selected-bg: var(--color-primary);
    --date-picker-table-cell-selected-color: var(--color-primary-foreground);
    --date-picker-table-cell-range-bg: color-mix(in oklab, var(--color-primary) 12%, transparent);
  }
`;

export const datePickerNoData = `const data = null;`;

export const datePickerRangeData = `
  const defaultRange = [
    parseDate('2026-06-22'),
    parseDate('2026-06-26'),
  ];
`;

export const datePickerValidationData = `
  const minDate = parseDate('2026-06-22');
  const maxDate = parseDate('2026-06-30');
  const unavailableDay = 25;
`;

export const datePickerBasicCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function DatePickerDemo() {\n  return (\n    <DatePicker defaultValue={[parseDate("2026-06-22")]} name="release-date">\n      <DatePicker.Label>Release date</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerControlledCode =
  'import { DatePicker, parseDate, type DateValue } from "@moduix/react";\nimport { useState } from "react";\n\nexport function ControlledDatePickerDemo() {\n  const [value, setValue] = useState([parseDate("2026-06-22")] as DateValue[]);\n\n  return (\n    <div>\n      <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>\n        <DatePicker.Label>Controlled date</DatePicker.Label>\n        <DatePicker.Control>\n          <DatePicker.Input placeholder="Select date" />\n          <DatePicker.ClearTrigger aria-label="Clear date" />\n          <DatePicker.Trigger aria-label="Open calendar" />\n        </DatePicker.Control>\n        <DatePicker.Positioner>\n          <DatePicker.Content>\n            <DatePicker.View view="day">\n              <DatePicker.ViewControl>\n                <DatePicker.PrevTrigger />\n                <DatePicker.ViewTrigger />\n                <DatePicker.NextTrigger />\n              </DatePicker.ViewControl>\n              <DatePicker.Context>\n                {(datePicker) => (\n                  <DatePicker.Table>\n                    <DatePicker.TableHead>\n                      <DatePicker.TableRow>\n                        {datePicker.weekDays.map((weekDay) => (\n                          <DatePicker.TableHeader key={weekDay.value.toString()}>\n                            {weekDay.short}\n                          </DatePicker.TableHeader>\n                        ))}\n                      </DatePicker.TableRow>\n                    </DatePicker.TableHead>\n                    <DatePicker.TableBody>\n                      {datePicker.weeks.map((week) => (\n                        <DatePicker.TableRow key={week[0]?.toString()}>\n                          {week.map((day) => (\n                            <DatePicker.TableCell key={day.toString()} value={day}>\n                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                            </DatePicker.TableCell>\n                          ))}\n                        </DatePicker.TableRow>\n                      ))}\n                    </DatePicker.TableBody>\n                  </DatePicker.Table>\n                )}\n              </DatePicker.Context>\n            </DatePicker.View>\n          </DatePicker.Content>\n        </DatePicker.Positioner>\n      </DatePicker>\n      <div className="date-picker-state">Current value: {value[0]?.toString() ?? "empty"}</div>\n    </div>\n  );\n}';

export const datePickerDefaultViewCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function DefaultViewDatePickerDemo() {\n  return (\n    <DatePicker defaultValue={[parseDate("2026-06-22")]} defaultView="month" fixedWeeks>\n      <DatePicker.Label>Billing month</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n          <DatePicker.View view="month">\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table columns={4}>\n                  <DatePicker.TableBody>\n                    {datePicker.getMonthsGrid({ columns: 4, format: "short" }).map((months, rowIndex) => (\n                      <DatePicker.TableRow key={rowIndex}>\n                        {months.map((month) => (\n                          <DatePicker.TableCell key={month.value} value={month.value}>\n                            <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerRangeCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function RangeDatePickerDemo() {\n  return (\n    <DatePicker selectionMode="range" defaultValue={[parseDate("2026-06-22"), parseDate("2026-06-26")]}>\n      <DatePicker.Label>Travel dates</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input index={0} placeholder="Start date" />\n        <DatePicker.Input index={1} placeholder="End date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerMultipleCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function MultipleDatePickerDemo() {\n  return (\n    <DatePicker\n      className="date-picker-multiple-root"\n      selectionMode="multiple"\n      defaultValue={[parseDate("2026-06-22"), parseDate("2026-06-24")]}\n      maxSelectedDates={3}\n    >\n      <DatePicker.Label>Meeting days</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Context>\n          {(datePicker) => (\n            <div className="date-picker-selected-dates">\n              {datePicker.value.length > 0 ? (\n                datePicker.value.map((date, index) => (\n                  <span key={date.toString()} className="date-picker-selected-date">\n                    {date.toString()}\n                    <button\n                      type="button"\n                      className="date-picker-selected-date-remove"\n                      onClick={() =>\n                        datePicker.setValue(\n                          datePicker.value.filter((_, itemIndex) => itemIndex !== index),\n                        )\n                      }\n                    >\n                      ×\n                    </button>\n                  </span>\n                ))\n              ) : (\n                <span className="date-picker-selected-dates-placeholder">Select dates</span>\n              )}\n            </div>\n          )}\n        </DatePicker.Context>\n        <DatePicker.ClearTrigger aria-label="Clear dates" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerMultipleMonthsCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function MultipleMonthsDatePickerDemo() {\n  return (\n    <DatePicker defaultValue={[parseDate("2026-06-22")]} numOfMonths={2}>\n      <DatePicker.Label>Planning window</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content className="date-picker-multiple-months-content">\n          <DatePicker.ViewControl>\n            <DatePicker.PrevTrigger />\n            <DatePicker.RangeText />\n            <DatePicker.NextTrigger />\n          </DatePicker.ViewControl>\n          <div className="date-picker-multiple-months">\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table className="date-picker-multiple-months-table">\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n            <DatePicker.Context>\n              {(datePicker) => {\n                const offset = datePicker.getOffset({ months: 1 });\n\n                return (\n                  <DatePicker.Table className="date-picker-multiple-months-table">\n                    <DatePicker.TableHead>\n                      <DatePicker.TableRow>\n                        {datePicker.weekDays.map((weekDay) => (\n                          <DatePicker.TableHeader key={weekDay.value.toString()}>\n                            {weekDay.short}\n                          </DatePicker.TableHeader>\n                        ))}\n                      </DatePicker.TableRow>\n                    </DatePicker.TableHead>\n                    <DatePicker.TableBody>\n                      {offset.weeks.map((week) => (\n                        <DatePicker.TableRow key={week[0]?.toString()}>\n                          {week.map((day) => (\n                            <DatePicker.TableCell\n                              key={day.toString()}\n                              value={day}\n                              visibleRange={offset.visibleRange}\n                            >\n                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                            </DatePicker.TableCell>\n                          ))}\n                        </DatePicker.TableRow>\n                      ))}\n                    </DatePicker.TableBody>\n                  </DatePicker.Table>\n                );\n              }}\n            </DatePicker.Context>\n          </div>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerMonthYearSelectCode =
  'import { createListCollection } from "@ark-ui/react/collection";\nimport { DatePicker, Select, parseDate } from "@moduix/react";\n\nconst monthItems = [\n    { label: "January", value: "1" },\n    { label: "February", value: "2" },\n    { label: "March", value: "3" },\n    { label: "April", value: "4" },\n    { label: "May", value: "5" },\n    { label: "June", value: "6" },\n    { label: "July", value: "7" },\n    { label: "August", value: "8" },\n    { label: "September", value: "9" },\n    { label: "October", value: "10" },\n    { label: "November", value: "11" },\n    { label: "December", value: "12" },\n];\n\nconst months = createListCollection({ items: monthItems });\n\nexport function MonthYearSelectDatePickerDemo() {\n  return (\n    <DatePicker defaultValue={[parseDate("2026-06-22")]}>\n      <DatePicker.Label>Report date</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.ViewControl className="date-picker-month-year-control">\n            <DatePicker.Context>\n              {(datePicker) => {\n                const focusedYear = datePicker.focusedValue.year;\n                const years = createListCollection({\n                  items: Array.from({ length: 12 }, (_, index) => {\n                    const year = focusedYear - 5 + index;\n                    return { label: String(year), value: String(year) };\n                  }),\n                });\n\n                return (\n                  <div className="date-picker-month-year-selects">\n                    <Select\n                      className="date-picker-month-select"\n                      collection={months}\n                      value={[String(datePicker.focusedValue.month)]}\n                      onValueChange={(details) => {\n                        const month = Number(details.value[0]);\n                        if (month) {\n                          datePicker.setFocusedValue(\n                            datePicker.focusedValue.set({ month }),\n                          );\n                        }\n                      }}\n                    >\n                      <Select.Control>\n                        <Select.Trigger>\n                          <Select.ValueText />\n                        </Select.Trigger>\n                        <Select.Indicators>\n                          <Select.Indicator />\n                        </Select.Indicators>\n                      </Select.Control>\n                      <Select.Context>\n                        {(select) =>\n                          select.open ? (\n                                                  <Select.Positioner>\n                              <Select.Content>\n                                <Select.List>\n                                  {monthItems.map((item) => (\n                                    <Select.Item key={item.value} item={item}>\n                                      <Select.ItemText>{item.label}</Select.ItemText>\n                                      <Select.ItemIndicator />\n                                    </Select.Item>\n                                  ))}\n                                </Select.List>\n                              </Select.Content>\n                            </Select.Positioner>\n                                                ) : null\n                        }\n                      </Select.Context>\n                    </Select>\n                    <Select\n                      className="date-picker-year-select"\n                      collection={years}\n                      value={[String(datePicker.focusedValue.year)]}\n                      onValueChange={(details) => {\n                        const year = Number(details.value[0]);\n                        if (year) {\n                          datePicker.setFocusedValue(datePicker.focusedValue.set({ year }));\n                        }\n                      }}\n                    >\n                      <Select.Control>\n                        <Select.Trigger>\n                          <Select.ValueText />\n                        </Select.Trigger>\n                        <Select.Indicators>\n                          <Select.Indicator />\n                        </Select.Indicators>\n                      </Select.Control>\n                      <Select.Context>\n                        {(select) =>\n                          select.open ? (\n                            <Select.Positioner>\n                              <Select.Content>\n                                <Select.List>\n                                  {years.items.map((item) => (\n                                    <Select.Item key={item.value} item={item}>\n                                      <Select.ItemText>{item.label}</Select.ItemText>\n                                      <Select.ItemIndicator />\n                                    </Select.Item>\n                                  ))}\n                                </Select.List>\n                              </Select.Content>\n                            </Select.Positioner>\n                          ) : null\n                        }\n                      </Select.Context>\n                    </Select>\n                  </div>\n                );\n              }}\n            </DatePicker.Context>\n            <div className="date-picker-month-year-nav">\n              <DatePicker.PrevTrigger />\n              <DatePicker.NextTrigger />\n            </div>\n          </DatePicker.ViewControl>\n          <DatePicker.View view="day">\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerPresetsCode =
  'import { DatePicker } from "@moduix/react";\n\nexport function PresetDatePickerDemo() {\n  return (\n    <DatePicker selectionMode="range">\n      <DatePicker.Label>Preset range</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input index={0} placeholder="Start date" />\n        <DatePicker.Input index={1} placeholder="End date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <div className="date-picker-presets">\n            <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>\n            <DatePicker.PresetTrigger value="last30Days">Last 30 days</DatePicker.PresetTrigger>\n          </div>\n          <DatePicker.View view="day">\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerMinMaxCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function MinMaxDatePickerDemo() {\n  return (\n    <DatePicker\n      defaultValue={[parseDate("2026-06-24")]}\n      min={parseDate("2026-06-22")}\n      max={parseDate("2026-06-30")}\n      isDateUnavailable={(date) => date.day === 25}\n    >\n      <DatePicker.Label>Booking date</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerLocaleCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function LocaleDatePickerDemo() {\n  return (\n    <DatePicker\n      locale="de-DE"\n      startOfWeek={1}\n      defaultValue={[parseDate("2026-06-22")]}\n    >\n      <DatePicker.Label>German locale</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerMonthPickerCode =
  'import { CalendarDate } from "@internationalized/date";\nimport { DatePicker, type DateValue } from "@moduix/react";\n\nconst format = (date: DateValue) => `${String(date.month).padStart(2, "0")}/${date.year}`;\nconst parse = (value: string) => {\n  const match = value.match(/^(\\d{1,2})\\/(\\d{4})$/);\n  return match ? new CalendarDate(Number(match[2]), Number(match[1]), 1) : undefined;\n};\n\nexport function MonthPickerDemo() {\n  return (\n    <DatePicker defaultView="month" minView="month" format={format} parse={parse}>\n      <DatePicker.Label>Month</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="mm/yyyy" />\n        <DatePicker.ClearTrigger aria-label="Clear month" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="month">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table columns={4}>\n                  <DatePicker.TableBody>\n                    {datePicker.getMonthsGrid({ columns: 4, format: "short" }).map((months, rowIndex) => (\n                      <DatePicker.TableRow key={rowIndex}>\n                        {months.map((month) => (\n                          <DatePicker.TableCell key={month.value} value={month.value}>\n                            <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerYearPickerCode =
  'import { CalendarDate } from "@internationalized/date";\nimport { DatePicker, type DateValue } from "@moduix/react";\n\nconst format = (date: DateValue) => String(date.year);\nconst parse = (value: string) => {\n  const year = Number(value);\n  return Number.isFinite(year) ? new CalendarDate(year, 1, 1) : undefined;\n};\n\nexport function YearPickerDemo() {\n  return (\n    <DatePicker defaultView="year" minView="year" format={format} parse={parse}>\n      <DatePicker.Label>Year</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="yyyy" />\n        <DatePicker.ClearTrigger aria-label="Clear year" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="year">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table columns={4}>\n                  <DatePicker.TableBody>\n                    {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (\n                      <DatePicker.TableRow key={rowIndex}>\n                        {years.map((year) => (\n                          <DatePicker.TableCell key={`${year.label}-${year.value}`} value={year.value} disabled={year.disabled}>\n                            <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerInlineCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function InlineDatePickerDemo() {\n  return (\n    <div className="date-picker-inline-preview">\n      <DatePicker\n        inline\n        selectionMode="multiple"\n        maxSelectedDates={3}\n        defaultValue={[parseDate("2026-06-22"), parseDate("2026-06-24")]}\n        showWeekNumbers\n      >\n        <DatePicker.Label>Available days</DatePicker.Label>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      <DatePicker.WeekNumberHeaderCell />\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week, weekIndex) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        <DatePicker.WeekNumberCell week={week} weekIndex={weekIndex}>\n                          {datePicker.getWeekNumber(week)}\n                        </DatePicker.WeekNumberCell>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker>\n    </div>\n  );\n}';

export const datePickerFieldStateCode =
  'import { DatePicker, Field } from "@moduix/react";\n\nexport function FieldDatePickerDemo() {\n  return (\n    <div className="date-picker-field-preview">\n      <Field invalid>\n        <DatePicker required invalid>\n          <DatePicker.Label>Deadline</DatePicker.Label>\n          <DatePicker.Control>\n            <DatePicker.Input placeholder="Select date" />\n            <DatePicker.ClearTrigger aria-label="Clear date" />\n            <DatePicker.Trigger aria-label="Open calendar" />\n          </DatePicker.Control>\n          <DatePicker.Positioner>\n            <DatePicker.Content>\n              <DatePicker.View view="day">\n                <DatePicker.ViewControl>\n                  <DatePicker.PrevTrigger />\n                  <DatePicker.ViewTrigger />\n                  <DatePicker.NextTrigger />\n                </DatePicker.ViewControl>\n                <DatePicker.Context>\n                  {(datePicker) => (\n                    <DatePicker.Table>\n                      <DatePicker.TableHead>\n                        <DatePicker.TableRow>\n                          {datePicker.weekDays.map((weekDay) => (\n                            <DatePicker.TableHeader key={weekDay.value.toString()}>\n                              {weekDay.short}\n                            </DatePicker.TableHeader>\n                          ))}\n                        </DatePicker.TableRow>\n                      </DatePicker.TableHead>\n                      <DatePicker.TableBody>\n                        {datePicker.weeks.map((week) => (\n                          <DatePicker.TableRow key={week[0]?.toString()}>\n                            {week.map((day) => (\n                              <DatePicker.TableCell key={day.toString()} value={day}>\n                                <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                              </DatePicker.TableCell>\n                            ))}\n                          </DatePicker.TableRow>\n                        ))}\n                      </DatePicker.TableBody>\n                    </DatePicker.Table>\n                  )}\n                </DatePicker.Context>\n              </DatePicker.View>\n            </DatePicker.Content>\n          </DatePicker.Positioner>\n        </DatePicker>\n        <Field.ErrorText>Choose a valid deadline.</Field.ErrorText>\n      </Field>\n    </div>\n  );\n}';

export const datePickerRootProviderCode =
  'import { today } from "@internationalized/date";\nimport { Button, DatePicker, useDatePicker } from "@moduix/react";\n\nexport function RootProviderDatePickerDemo() {\n  const datePicker = useDatePicker({ defaultValue: [today("UTC")] });\n\n  return (\n    <div>\n      <DatePicker.RootProvider value={datePicker}>\n        <DatePicker.Label>Report date</DatePicker.Label>\n        <DatePicker.Control>\n          <DatePicker.Input placeholder="Select date" />\n          <DatePicker.ClearTrigger aria-label="Clear date" />\n          <DatePicker.Trigger aria-label="Open calendar" />\n        </DatePicker.Control>\n        <DatePicker.Positioner>\n          <DatePicker.Content>\n            <DatePicker.View view="day">\n              <DatePicker.ViewControl>\n                <DatePicker.PrevTrigger />\n                <DatePicker.ViewTrigger />\n                <DatePicker.NextTrigger />\n              </DatePicker.ViewControl>\n              <DatePicker.Context>\n                {(datePicker) => (\n                  <DatePicker.Table>\n                    <DatePicker.TableHead>\n                      <DatePicker.TableRow>\n                        {datePicker.weekDays.map((weekDay) => (\n                          <DatePicker.TableHeader key={weekDay.value.toString()}>\n                            {weekDay.short}\n                          </DatePicker.TableHeader>\n                        ))}\n                      </DatePicker.TableRow>\n                    </DatePicker.TableHead>\n                    <DatePicker.TableBody>\n                      {datePicker.weeks.map((week) => (\n                        <DatePicker.TableRow key={week[0]?.toString()}>\n                          {week.map((day) => (\n                            <DatePicker.TableCell key={day.toString()} value={day}>\n                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                            </DatePicker.TableCell>\n                          ))}\n                        </DatePicker.TableRow>\n                      ))}\n                    </DatePicker.TableBody>\n                  </DatePicker.Table>\n                )}\n              </DatePicker.Context>\n            </DatePicker.View>\n          </DatePicker.Content>\n        </DatePicker.Positioner>\n      </DatePicker.RootProvider>\n      <div className="date-picker-state">\n        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>\n          Clear\n        </Button>\n      </div>\n    </div>\n  );\n}';

export const datePickerSelectTodayCode =
  'import { Button, DatePicker } from "@moduix/react";\n\nexport function SelectTodayDatePickerDemo() {\n  return (\n    <DatePicker>\n      <DatePicker.Label>Today shortcut</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <>\n                  <DatePicker.Table>\n                    <DatePicker.TableHead>\n                      <DatePicker.TableRow>\n                        {datePicker.weekDays.map((weekDay) => (\n                          <DatePicker.TableHeader key={weekDay.value.toString()}>\n                            {weekDay.short}\n                          </DatePicker.TableHeader>\n                        ))}\n                      </DatePicker.TableRow>\n                    </DatePicker.TableHead>\n                    <DatePicker.TableBody>\n                      {datePicker.weeks.map((week) => (\n                        <DatePicker.TableRow key={week[0]?.toString()}>\n                          {week.map((day) => (\n                            <DatePicker.TableCell key={day.toString()} value={day}>\n                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                            </DatePicker.TableCell>\n                          ))}\n                        </DatePicker.TableRow>\n                      ))}\n                    </DatePicker.TableBody>\n                  </DatePicker.Table>\n                  <div className="date-picker-today-row">\n                    <Button size="sm" variant="secondary" onClick={() => datePicker.selectToday()}>\n                      Today\n                    </Button>\n                  </div>\n                </>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerWithTimeCode =
  'import { CalendarDateTime, DateFormatter, getLocalTimeZone } from "@internationalized/date";\nimport { DatePicker, type DatePickerValueChangeDetails } from "@moduix/react";\nimport { useState } from "react";\n\nconst formatter = new DateFormatter("en-US", {\n  dateStyle: "medium",\n  timeStyle: "short",\n});\n\nexport function DatePickerWithTimeDemo() {\n  const [value, setValue] = useState([new CalendarDateTime(2026, 6, 22, 14, 30)]);\n  const timeValue = value[0]\n    ? `${String(value[0].hour).padStart(2, "0")}:${String(value[0].minute).padStart(2, "0")}`\n    : "";\n\n  const handleDateChange = (details: DatePickerValueChangeDetails) => {\n    const nextDate = details.value[0];\n    if (!nextDate) return setValue([]);\n    const previousTime = value[0] ?? new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, 0, 0);\n    setValue([\n      new CalendarDateTime(\n        nextDate.year,\n        nextDate.month,\n        nextDate.day,\n        previousTime.hour,\n        previousTime.minute,\n      ),\n    ]);\n  };\n\n  return (\n    <div>\n      <DatePicker value={value} onValueChange={handleDateChange}>\n        <DatePicker.Label>Appointment</DatePicker.Label>\n        <DatePicker.Control>\n          <DatePicker.ValueText>\n            {value[0] ? formatter.format(value[0].toDate(getLocalTimeZone())) : "Select date"}\n          </DatePicker.ValueText>\n          <DatePicker.Trigger aria-label="Open calendar" />\n        </DatePicker.Control>\n        <DatePicker.Positioner>\n          <DatePicker.Content>\n            <DatePicker.View view="day">\n              <DatePicker.ViewControl>\n                <DatePicker.PrevTrigger />\n                <DatePicker.ViewTrigger />\n                <DatePicker.NextTrigger />\n              </DatePicker.ViewControl>\n              <DatePicker.Context>\n                {(datePicker) => (\n                  <DatePicker.Table>\n                    <DatePicker.TableHead>\n                      <DatePicker.TableRow>\n                        {datePicker.weekDays.map((weekDay) => (\n                          <DatePicker.TableHeader key={weekDay.value.toString()}>\n                            {weekDay.short}\n                          </DatePicker.TableHeader>\n                        ))}\n                      </DatePicker.TableRow>\n                    </DatePicker.TableHead>\n                    <DatePicker.TableBody>\n                      {datePicker.weeks.map((week) => (\n                        <DatePicker.TableRow key={week[0]?.toString()}>\n                          {week.map((day) => (\n                            <DatePicker.TableCell key={day.toString()} value={day}>\n                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                            </DatePicker.TableCell>\n                          ))}\n                        </DatePicker.TableRow>\n                      ))}\n                    </DatePicker.TableBody>\n                  </DatePicker.Table>\n                )}\n              </DatePicker.Context>\n            </DatePicker.View>\n          </DatePicker.Content>\n        </DatePicker.Positioner>\n      </DatePicker>\n      <label className="date-picker-time-field">\n        Time\n        <input\n          type="time"\n          value={timeValue}\n          onChange={(event) => {\n            const [hour, minute] = event.currentTarget.value.split(":").map(Number);\n            setValue((previous) => {\n              const current = previous[0] ?? new CalendarDateTime(2026, 6, 22, 0, 0);\n              return [current.set({ hour, minute })];\n            });\n          }}\n        />\n      </label>\n    </div>\n  );\n}';

export const datePickerCustomStylesCode =
  'import { DatePicker, parseDate } from "@moduix/react";\n\nexport function CustomStylesDatePickerDemo() {\n  return (\n    <DatePicker\n      className="date-picker-custom-root"\n      defaultValue={[parseDate("2026-06-22")]}\n    >\n      <DatePicker.Label>Styled date</DatePicker.Label>\n      <DatePicker.Control>\n        <DatePicker.Input placeholder="Select date" />\n        <DatePicker.ClearTrigger aria-label="Clear date" />\n        <DatePicker.Trigger aria-label="Open calendar" />\n      </DatePicker.Control>\n      <DatePicker.Positioner>\n        <DatePicker.Content>\n          <DatePicker.View view="day">\n            <DatePicker.ViewControl>\n              <DatePicker.PrevTrigger />\n              <DatePicker.ViewTrigger />\n              <DatePicker.NextTrigger />\n            </DatePicker.ViewControl>\n            <DatePicker.Context>\n              {(datePicker) => (\n                <DatePicker.Table>\n                  <DatePicker.TableHead>\n                    <DatePicker.TableRow>\n                      {datePicker.weekDays.map((weekDay) => (\n                        <DatePicker.TableHeader key={weekDay.value.toString()}>\n                          {weekDay.short}\n                        </DatePicker.TableHeader>\n                      ))}\n                    </DatePicker.TableRow>\n                  </DatePicker.TableHead>\n                  <DatePicker.TableBody>\n                    {datePicker.weeks.map((week) => (\n                      <DatePicker.TableRow key={week[0]?.toString()}>\n                        {week.map((day) => (\n                          <DatePicker.TableCell key={day.toString()} value={day}>\n                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>\n                          </DatePicker.TableCell>\n                        ))}\n                      </DatePicker.TableRow>\n                    ))}\n                  </DatePicker.TableBody>\n                </DatePicker.Table>\n              )}\n            </DatePicker.Context>\n          </DatePicker.View>\n        </DatePicker.Content>\n      </DatePicker.Positioner>\n    </DatePicker>\n  );\n}';

export const datePickerOverrideCssProperties: CssPropertyInput[] = [
  ['--date-picker-action-bg', 'transparent', 'Controls action background.'],
  ['--date-picker-action-bg-hover', 'var(--color-muted)', 'Controls action hover background.'],
  ['--date-picker-action-color-hover', 'var(--color-foreground)', 'Controls action hover color.'],
  ['--date-picker-action-focus-ring-offset', '0', 'Controls action focus ring offset.'],
  [
    '--date-picker-action-focus-ring-width',
    'var(--border-width-sm)',
    'Controls action focus ring width.',
  ],
  ['--date-picker-action-gap', '0.125rem', 'Controls gap between input actions.'],
  ['--date-picker-action-radius', 'var(--radius-sm)', 'Controls action corner radius.'],
  ['--date-picker-action-size', '1.5rem', 'Controls input action button size.'],
  ['--date-picker-bg', 'var(--color-background)', 'Controls input background.'],
  ['--date-picker-bg-hover', 'var(--color-accent)', 'Controls input hover background.'],
  ['--date-picker-border-color', 'var(--color-border)', 'Controls input border color.'],
  ['--date-picker-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--date-picker-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--date-picker-content-bg', 'var(--color-popover)', 'Controls calendar surface background.'],
  ['--date-picker-content-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--date-picker-content-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--date-picker-content-closed-opacity', '0', 'Controls closed popup opacity.'],
  ['--date-picker-content-closed-scale', 'var(--scale-popup)', 'Controls closed popup scale.'],
  ['--date-picker-content-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--date-picker-content-max-height', '32rem', 'Controls popup maximum height.'],
  ['--date-picker-content-max-width', 'calc(100vw - 2rem)', 'Controls popup maximum width.'],
  ['--date-picker-content-min-width', '18.75rem', 'Controls popup minimum width.'],
  ['--date-picker-content-padding', 'var(--spacing-3)', 'Controls popup padding.'],
  ['--date-picker-content-radius', 'var(--radius-md)', 'Controls popup corner radius.'],
  ['--date-picker-content-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--date-picker-content-width', '18.75rem', 'Controls default popup width.'],
  ['--date-picker-control-height', 'var(--size-lg)', 'Controls input height.'],
  ['--date-picker-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--date-picker-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--date-picker-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--date-picker-font-size', 'var(--text-md)', 'Controls input font size.'],
  ['--date-picker-icon-color', 'var(--color-muted-foreground)', 'Controls trigger icon color.'],
  ['--date-picker-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--date-picker-inline-content-min-width', '18rem', 'Controls inline calendar minimum width.'],
  ['--date-picker-inline-content-shadow', 'none', 'Controls inline calendar shadow.'],
  ['--date-picker-input-min-width', '7.5rem', 'Controls the minimum width of each input.'],
  ['--date-picker-input-padding-x-end', '4.25rem', 'Controls input end padding around actions.'],
  ['--date-picker-input-padding-x-start', '0.875rem', 'Controls input start padding.'],
  ['--date-picker-input-padding-y', '0.5rem', 'Controls input vertical padding.'],
  ['--date-picker-input-gap', 'var(--spacing-2)', 'Controls gap between range inputs.'],
  ['--date-picker-invalid-color', 'var(--color-destructive)', 'Controls invalid border and ring.'],
  [
    '--date-picker-label-color',
    'var(--date-picker-color, var(--color-foreground))',
    'Controls label color.',
  ],
  ['--date-picker-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--date-picker-label-font-weight', 'var(--weight-medium)', 'Controls label weight.'],
  ['--date-picker-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--date-picker-line-height', 'var(--line-height-text-md)', 'Controls input line height.'],
  ['--date-picker-max-width', '100%', 'Controls root maximum width.'],
  ['--date-picker-nav-trigger-size', '2rem', 'Controls calendar nav button size.'],
  [
    '--date-picker-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls input placeholder color.',
  ],
  ['--date-picker-preset-trigger-bg', 'var(--color-muted)', 'Controls preset button background.'],
  [
    '--date-picker-preset-trigger-bg-hover',
    'var(--color-accent)',
    'Controls preset button hover background.',
  ],
  ['--date-picker-preset-trigger-color', 'var(--color-foreground)', 'Controls preset text color.'],
  ['--date-picker-preset-trigger-font-size', 'var(--text-sm)', 'Controls preset font size.'],
  ['--date-picker-preset-trigger-height', '2rem', 'Controls preset button height.'],
  [
    '--date-picker-preset-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls preset line height.',
  ],
  [
    '--date-picker-preset-trigger-padding-x',
    'var(--spacing-2)',
    'Controls preset horizontal padding.',
  ],
  [
    '--date-picker-preset-trigger-selected-bg',
    'var(--color-primary)',
    'Controls selected preset background.',
  ],
  [
    '--date-picker-preset-trigger-selected-color',
    'var(--color-primary-foreground)',
    'Controls selected preset text.',
  ],
  ['--date-picker-range-input-min-width', '7.5rem', 'Controls each range input minimum width.'],
  ['--date-picker-radius', 'var(--radius-md)', 'Controls input radius.'],
  ['--date-picker-root-gap', 'var(--spacing-1)', 'Controls root vertical gap.'],
  ['--date-picker-select-bg', 'var(--color-background)', 'Controls native select background.'],
  [
    '--date-picker-select-bg-hover',
    'var(--color-accent)',
    'Controls native select hover background.',
  ],
  [
    '--date-picker-select-border-color',
    'var(--color-border)',
    'Controls native select border color.',
  ],
  [
    '--date-picker-select-border-width',
    'var(--border-width-sm)',
    'Controls native select border width.',
  ],
  ['--date-picker-select-color', 'var(--color-foreground)', 'Controls native select text.'],
  [
    '--date-picker-select-focus-ring-width',
    'var(--border-width-sm)',
    'Controls native select focus ring width.',
  ],
  ['--date-picker-select-font-size', 'var(--text-sm)', 'Controls native select font size.'],
  ['--date-picker-select-height', '2rem', 'Controls native select height.'],
  [
    '--date-picker-select-line-height',
    'var(--line-height-text-sm)',
    'Controls native select line height.',
  ],
  [
    '--date-picker-select-padding-x',
    'var(--spacing-2)',
    'Controls native select horizontal padding.',
  ],
  ['--date-picker-select-padding-y', '0.25rem', 'Controls native select vertical padding.'],
  ['--date-picker-select-radius', 'var(--radius-sm)', 'Controls native select radius.'],
  ['--date-picker-table-cell-bg', 'transparent', 'Controls calendar cell background.'],
  [
    '--date-picker-table-cell-bg-hover',
    'var(--color-accent)',
    'Controls day cell hover background.',
  ],
  ['--date-picker-table-cell-border-color', 'transparent', 'Controls calendar cell border color.'],
  ['--date-picker-table-cell-border-width', '0', 'Controls calendar cell border width.'],
  [
    '--date-picker-table-cell-color',
    'var(--date-picker-content-color, var(--color-foreground))',
    'Controls calendar cell text.',
  ],
  [
    '--date-picker-table-cell-color-hover',
    'var(--color-accent-foreground)',
    'Controls day cell hover text.',
  ],
  [
    '--date-picker-table-cell-focus-ring-color',
    'var(--color-ring)',
    'Controls day cell focus ring.',
  ],
  [
    '--date-picker-table-cell-focus-ring-width',
    'var(--border-width-sm)',
    'Controls calendar cell focus ring width.',
  ],
  ['--date-picker-table-cell-font-size', 'var(--text-sm)', 'Controls calendar cell font size.'],
  ['--date-picker-table-cell-gap', '0.125rem', 'Controls calendar cell spacing.'],
  [
    '--date-picker-table-cell-line-height',
    'var(--line-height-text-sm)',
    'Controls calendar cell line height.',
  ],
  [
    '--date-picker-table-cell-muted-color',
    'var(--color-muted-foreground)',
    'Controls unavailable/outside dates.',
  ],
  ['--date-picker-table-cell-radius', 'var(--radius-sm)', 'Controls calendar cell radius.'],
  ['--date-picker-table-cell-range-bg', 'var(--color-muted)', 'Controls range background.'],
  ['--date-picker-table-cell-range-color', 'var(--color-foreground)', 'Controls range text color.'],
  [
    '--date-picker-table-cell-selected-bg',
    'var(--color-primary)',
    'Controls selected cell background.',
  ],
  [
    '--date-picker-table-cell-selected-color',
    'var(--color-primary-foreground)',
    'Controls selected cell text.',
  ],
  ['--date-picker-table-cell-size', '2.25rem', 'Controls calendar cell size.'],
  [
    '--date-picker-table-cell-today-border-color',
    'var(--color-ring)',
    'Controls today marker color.',
  ],
  [
    '--date-picker-table-cell-today-color',
    'var(--date-picker-table-cell-color, var(--color-foreground))',
    'Controls today text color.',
  ],
  [
    '--date-picker-table-header-color',
    'var(--color-muted-foreground)',
    'Controls weekday header color.',
  ],
  ['--date-picker-table-header-font-size', 'var(--text-xs)', 'Controls weekday font size.'],
  [
    '--date-picker-table-header-font-weight',
    'var(--weight-medium)',
    'Controls weekday font weight.',
  ],
  ['--date-picker-table-header-height', '1.75rem', 'Controls weekday header height.'],
  [
    '--date-picker-table-header-line-height',
    'var(--line-height-text-xs)',
    'Controls weekday header line height.',
  ],
  [
    '--date-picker-transition',
    'var(--transition-default)',
    'Controls interactive transition timing.',
  ],
  ['--date-picker-trigger-offset-right', '0.5rem', 'Controls input action right offset.'],
  ['--date-picker-view-control-gap', 'var(--spacing-2)', 'Controls calendar header control gap.'],
  ['--date-picker-view-gap', 'var(--spacing-3)', 'Controls calendar view gap.'],
  [
    '--date-picker-view-trigger-color',
    'var(--color-foreground)',
    'Controls view trigger text color.',
  ],
  ['--date-picker-view-trigger-font-size', 'var(--text-sm)', 'Controls view trigger font size.'],
  [
    '--date-picker-view-trigger-font-weight',
    'var(--weight-medium)',
    'Controls view trigger font weight.',
  ],
  ['--date-picker-view-trigger-gap', 'var(--spacing-2)', 'Controls view trigger content gap.'],
  ['--date-picker-view-trigger-height', '2rem', 'Controls view trigger height.'],
  [
    '--date-picker-view-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls view trigger line height.',
  ],
  [
    '--date-picker-view-trigger-padding-x',
    'var(--spacing-2)',
    'Controls view trigger horizontal padding.',
  ],
  [
    '--date-picker-week-number-color',
    'var(--color-muted-foreground)',
    'Controls week number text color.',
  ],
  ['--date-picker-width', '18.75rem', 'Controls root width.'],
];

export function DatePickerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={datePickerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function DatePickerField({
  placeholder = 'Select date',
  indexes,
}: {
  placeholder?: string;
  indexes?: [number, number];
}) {
  return (
    <DatePicker.Control>
      {indexes ? (
        <>
          <DatePicker.Input index={indexes[0]} placeholder="Start date" />
          <DatePicker.Input index={indexes[1]} placeholder="End date" />
        </>
      ) : (
        <DatePicker.Input placeholder={placeholder} />
      )}
      <DatePicker.ClearTrigger aria-label="Clear date" />
      <DatePicker.Trigger aria-label="Open calendar" />
    </DatePicker.Control>
  );
}

function formatSelectedDate(date: DateValue) {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function MultipleDatePickerField() {
  return (
    <DatePicker.Control>
      <DatePicker.Context>
        {(datePicker) => (
          <div className="date-picker-selected-dates">
            {datePicker.value.length === 0 ? (
              <span className="date-picker-selected-dates-placeholder">Select dates...</span>
            ) : (
              datePicker.value.map((date, index) => (
                <span key={date.toString()} className="date-picker-selected-date">
                  {formatSelectedDate(date)}
                  <button
                    className="date-picker-selected-date-remove"
                    type="button"
                    aria-label={`Remove ${formatSelectedDate(date)}`}
                    onClick={() =>
                      datePicker.setValue(
                        datePicker.value.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        )}
      </DatePicker.Context>
      <DatePicker.ClearTrigger aria-label="Clear dates" />
      <DatePicker.Trigger aria-label="Open calendar" />
    </DatePicker.Control>
  );
}

function DatePickerDayTable({
  showHeader = true,
  showWeekNumbers = false,
  offset,
}: {
  showHeader?: boolean;
  showWeekNumbers?: boolean;
  offset?: ReturnType<UseDatePickerReturn['getOffset']>;
}) {
  return (
    <DatePicker.Context>
      {(datePicker) => (
        <>
          {showHeader ? (
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger />
              <DatePicker.ViewTrigger />
              <DatePicker.NextTrigger />
            </DatePicker.ViewControl>
          ) : null}
          <DatePicker.Table>
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                {showWeekNumbers ? <DatePicker.WeekNumberHeaderCell /> : null}
                {datePicker.weekDays.map((weekDay) => (
                  <DatePicker.TableHeader key={weekDay.value.toString()}>
                    {weekDay.short}
                  </DatePicker.TableHeader>
                ))}
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              {(offset?.weeks ?? datePicker.weeks).map((week, weekIndex) => (
                <DatePicker.TableRow key={week[0]?.toString()}>
                  {showWeekNumbers ? (
                    <DatePicker.WeekNumberCell week={week} weekIndex={weekIndex}>
                      {datePicker.getWeekNumber(week)}
                    </DatePicker.WeekNumberCell>
                  ) : null}
                  {week.map((day) => (
                    <DatePicker.TableCell
                      key={day.toString()}
                      value={day}
                      visibleRange={offset?.visibleRange}
                    >
                      <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePicker.Context>
  );
}

function MultipleMonthsDatePickerContent() {
  return (
    <DatePicker.Content className="date-picker-multiple-months-content">
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger />
        <DatePicker.RangeText />
        <DatePicker.NextTrigger />
      </DatePicker.ViewControl>
      <div className="date-picker-multiple-months">
        <DatePicker.Context>
          {(datePicker) => (
            <DatePicker.Table className="date-picker-multiple-months-table">
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {datePicker.weekDays.map((weekDay) => (
                    <DatePicker.TableHeader key={weekDay.value.toString()}>
                      {weekDay.short}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {datePicker.weeks.map((week) => (
                  <DatePicker.TableRow key={week[0]?.toString()}>
                    {week.map((day) => (
                      <DatePicker.TableCell key={day.toString()} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          )}
        </DatePicker.Context>
        <DatePicker.Context>
          {(datePicker) => {
            const offset = datePicker.getOffset({ months: 1 });

            return (
              <DatePicker.Table className="date-picker-multiple-months-table">
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {datePicker.weekDays.map((weekDay) => (
                      <DatePicker.TableHeader key={weekDay.value.toString()}>
                        {weekDay.short}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {offset.weeks.map((week) => (
                    <DatePicker.TableRow key={week[0]?.toString()}>
                      {week.map((day) => (
                        <DatePicker.TableCell
                          key={day.toString()}
                          value={day}
                          visibleRange={offset.visibleRange}
                        >
                          <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            );
          }}
        </DatePicker.Context>
      </div>
    </DatePicker.Content>
  );
}

function DatePickerSelectContent({ items }: { items: DatePickerSelectItem[] }) {
  return (
    <Select.Context>
      {(select) =>
        select.open ? (
          <Select.Positioner>
            <Select.Content>
              <Select.List>
                {items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Content>
          </Select.Positioner>
        ) : null
      }
    </Select.Context>
  );
}

function DatePickerSelectControl() {
  return (
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText />
      </Select.Trigger>
      <Select.Indicators>
        <Select.Indicator />
      </Select.Indicators>
    </Select.Control>
  );
}

function MonthYearPickerSelects() {
  return (
    <DatePicker.Context>
      {(datePicker) => {
        const focusedYear = datePicker.focusedValue.year;
        const yearItems = Array.from({ length: 12 }, (_, index) => {
          const year = focusedYear - 5 + index;
          return { label: String(year), value: String(year) };
        });
        const yearCollection = createListCollection<DatePickerSelectItem>({ items: yearItems });

        return (
          <div className="date-picker-month-year-selects">
            <Select
              className="date-picker-month-select"
              collection={monthSelectCollection}
              value={[String(datePicker.focusedValue.month)]}
              onValueChange={(details) => {
                const month = Number(details.value[0]);
                if (month) datePicker.setFocusedValue(datePicker.focusedValue.set({ month }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={monthSelectItems} />
            </Select>
            <Select
              className="date-picker-year-select"
              collection={yearCollection}
              value={[String(datePicker.focusedValue.year)]}
              onValueChange={(details) => {
                const year = Number(details.value[0]);
                if (year) datePicker.setFocusedValue(datePicker.focusedValue.set({ year }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={yearItems} />
            </Select>
          </div>
        );
      }}
    </DatePicker.Context>
  );
}

function DatePickerMonthTable() {
  return (
    <DatePicker.Context>
      {(datePicker) => (
        <>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table columns={4}>
            <DatePicker.TableBody>
              {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, rowIndex) => (
                <DatePicker.TableRow key={rowIndex}>
                  {months.map((month) => (
                    <DatePicker.TableCell key={month.value} value={month.value}>
                      <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePicker.Context>
  );
}

function DatePickerYearTable() {
  return (
    <DatePicker.Context>
      {(datePicker) => (
        <>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table columns={4}>
            <DatePicker.TableBody>
              {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                <DatePicker.TableRow key={rowIndex}>
                  {years.map((year) => (
                    <DatePicker.TableCell
                      key={`${year.label}-${year.value}`}
                      value={year.value}
                      disabled={year.disabled}
                    >
                      <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePicker.Context>
  );
}

function DatePickerViews({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <>
      <DatePicker.View view="day">
        <DatePickerDayTable showWeekNumbers={showWeekNumbers} />
      </DatePicker.View>
      <DatePicker.View view="month">
        <DatePickerMonthTable />
      </DatePicker.View>
      <DatePicker.View view="year">
        <DatePickerYearTable />
      </DatePicker.View>
    </>
  );
}

function DatePickerPopup({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePickerViews showWeekNumbers={showWeekNumbers} />
      </DatePicker.Content>
    </DatePicker.Positioner>
  );
}

function InlineDatePickerContent({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <DatePicker.Content>
      <DatePickerViews showWeekNumbers={showWeekNumbers} />
    </DatePicker.Content>
  );
}

export function DatePickerExample() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePicker.Label>Release date</DatePicker.Label>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  );
}

export function ControlledDatePickerExample() {
  const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);

  return (
    <div>
      <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
        <DatePicker.Label>Controlled date</DatePicker.Label>
        <DatePickerField />
        <DatePickerPopup />
      </DatePicker>
      <div className="date-picker-state">Current value: {value[0]?.toString() ?? 'empty'}</div>
    </div>
  );
}

export function DefaultViewDatePickerExample() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} defaultView="month" fixedWeeks>
      <DatePicker.Label>Billing month</DatePicker.Label>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  );
}

export function RangeDatePickerExample() {
  return (
    <DatePicker
      selectionMode="range"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}
    >
      <DatePicker.Label>Travel dates</DatePicker.Label>
      <DatePickerField indexes={[0, 1]} />
      <DatePickerPopup />
    </DatePicker>
  );
}

export function MultipleDatePickerExample() {
  return (
    <DatePicker
      className="date-picker-multiple-root"
      selectionMode="multiple"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      maxSelectedDates={3}
    >
      <DatePicker.Label>Meeting days</DatePicker.Label>
      <MultipleDatePickerField />
      <DatePickerPopup />
    </DatePicker>
  );
}

export function MultipleMonthsDatePickerExample() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePickerField />
      <DatePicker.Positioner>
        <MultipleMonthsDatePickerContent />
      </DatePicker.Positioner>
    </DatePicker>
  );
}

export function MonthYearSelectDatePickerExample() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Report date</DatePicker.Label>
      <DatePickerField />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl className="date-picker-month-year-control">
            <MonthYearPickerSelects />
            <div className="date-picker-month-year-nav">
              <DatePicker.PrevTrigger />
              <DatePicker.NextTrigger />
            </div>
          </DatePicker.ViewControl>
          <DatePicker.View view="day">
            <DatePickerDayTable showHeader={false} />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

export function MinMaxDatePickerExample() {
  return (
    <DatePicker
      defaultValue={[parseDate('2026-06-24')]}
      min={parseDate('2026-06-22')}
      max={parseDate('2026-06-30')}
      isDateUnavailable={(date) => date.day === 25}
    >
      <DatePicker.Label>Booking date</DatePicker.Label>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  );
}

export function PresetDatePickerExample() {
  return (
    <DatePicker selectionMode="range">
      <DatePicker.Label>Preset range</DatePicker.Label>
      <DatePickerField indexes={[0, 1]} />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <div className="date-picker-presets">
            <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>
            <DatePicker.PresetTrigger value="last30Days">Last 30 days</DatePicker.PresetTrigger>
          </div>
          <DatePickerViews />
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

export function LocaleDatePickerExample() {
  return (
    <DatePicker
      locale="de-DE"
      startOfWeek={1}
      defaultValue={[parseDate('2026-06-22')]}
      format={(date, details) =>
        new Intl.DateTimeFormat(details.locale, {
          dateStyle: 'medium',
          timeZone: details.timeZone,
        }).format(date.toDate(details.timeZone))
      }
    >
      <DatePicker.Label>German locale</DatePicker.Label>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  );
}

export function MonthPickerExample() {
  return (
    <DatePicker defaultView="month" minView="month" format={formatMonthYear} parse={parseMonthYear}>
      <DatePicker.Label>Month</DatePicker.Label>
      <DatePickerField placeholder="mm/yyyy" />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="month">
            <DatePickerMonthTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

export function YearPickerExample() {
  return (
    <DatePicker defaultView="year" minView="year" format={formatYear} parse={parseYear}>
      <DatePicker.Label>Year</DatePicker.Label>
      <DatePickerField placeholder="yyyy" />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="year">
            <DatePickerYearTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

export function InlineDatePickerExample() {
  return (
    <div className="date-picker-inline-preview">
      <DatePicker
        inline
        selectionMode="multiple"
        maxSelectedDates={3}
        defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
        showWeekNumbers
      >
        <DatePicker.Label>Available days</DatePicker.Label>
        <InlineDatePickerContent showWeekNumbers />
      </DatePicker>
    </div>
  );
}

export function FieldDatePickerExample() {
  return (
    <div className="date-picker-field-preview">
      <Field invalid>
        <DatePicker required invalid>
          <DatePicker.Label>Deadline</DatePicker.Label>
          <DatePickerField />
          <DatePickerPopup />
        </DatePicker>
        <Field.ErrorText>Choose a valid deadline.</Field.ErrorText>
      </Field>
    </div>
  );
}

export function RootProviderDatePickerExample() {
  const datePicker = useDatePicker({ defaultValue: [today('UTC')] });

  return (
    <div>
      <DatePicker.RootProvider value={datePicker}>
        <DatePicker.Label>Report date</DatePicker.Label>
        <DatePickerField />
        <DatePickerPopup />
      </DatePicker.RootProvider>
      <div className="date-picker-state">
        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export function SelectTodayDatePickerExample() {
  return (
    <DatePicker>
      <DatePicker.Label>Today shortcut</DatePicker.Label>
      <DatePickerField />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context>
              {(datePicker) => (
                <>
                  <DatePickerDayTable />
                  <div className="date-picker-today-row">
                    <Button size="sm" variant="secondary" onClick={() => datePicker.selectToday()}>
                      Today
                    </Button>
                  </div>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

export function DatePickerWithTimeExample() {
  const [value, setValue] = useState([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const timeValue = value[0]
    ? `${String(value[0].hour).padStart(2, '0')}:${String(value[0].minute).padStart(2, '0')}`
    : '';

  const handleDateChange = (details: DatePickerValueChangeDetails) => {
    const nextDate = details.value[0];

    if (!nextDate) {
      setValue([]);
      return;
    }

    const previousTime =
      value[0] ?? new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, 0, 0);

    setValue([
      new CalendarDateTime(
        nextDate.year,
        nextDate.month,
        nextDate.day,
        previousTime.hour,
        previousTime.minute,
      ),
    ]);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [hour, minute] = event.currentTarget.value.split(':').map(Number);

    setValue((previous) => {
      const current = previous[0] ?? new CalendarDateTime(2026, 6, 22, 0, 0);
      return [current.set({ hour, minute })];
    });
  };

  return (
    <div>
      <DatePicker value={value} onValueChange={handleDateChange}>
        <DatePicker.Label>Appointment</DatePicker.Label>
        <DatePickerField />
        <DatePickerPopup />
      </DatePicker>
      <label className="date-picker-time-field">
        {value[0]
          ? dateTimeFormatter.format(value[0].toDate(getLocalTimeZone()))
          : 'Select date and time'}
        <input type="time" value={timeValue} onChange={handleTimeChange} />
      </label>
    </div>
  );
}

export function CustomStylesDatePickerExample() {
  return (
    <DatePicker className="date-picker-custom-root" defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Styled date</DatePicker.Label>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  );
}