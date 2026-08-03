import { type DateValue } from '@ark-ui/react/date-picker';
import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@moduix/react/date-picker';

const format = (date: DateValue) => String(date.year);
export default function YearPickerDemo() {
  return (
    <DatePicker
      defaultValue={[new CalendarDate(2026, 1, 1)]}
      defaultView="year"
      minView="year"
      maxView="year"
      format={format}
    >
      <DatePicker.Label>Year</DatePicker.Label>
      <DatePicker.Field placeholder="yyyy" clearLabel="Clear year" />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="year">
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger />
              <DatePicker.RangeText />
              <DatePicker.NextTrigger />
            </DatePicker.ViewControl>
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table columns={4}>
                  <DatePicker.TableBody>
                    {datePicker
                      .getYearsGrid({
                        columns: 4,
                      })
                      .map((years, rowIndex) => (
                        <DatePicker.TableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePicker.TableCell
                              key={`${year.label}-${year.value}`}
                              value={year.value}
                              disabled={year.disabled}
                            >
                              <DatePicker.TableCellTrigger>
                                {year.label}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}