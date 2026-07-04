/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react';

const presets = ['last7Days', 'last30Days'];
export function PresetDatePickerDemo() {
  return (
    <DatePicker selectionMode="range">
      <DatePicker.Label>Preset range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} placeholder="Start date" />
        <DatePicker.Input index={1} placeholder="End date" />
        <DatePicker.ClearTrigger aria-label="Clear date" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <div className="date-picker-presets">
            <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>
            <DatePicker.PresetTrigger value="last30Days">Last 30 days</DatePicker.PresetTrigger>
          </div>
          <DatePicker.View view="day">
            <ArkDatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table>
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
            </ArkDatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}

//#endregion