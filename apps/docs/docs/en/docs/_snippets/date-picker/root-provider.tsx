import { today } from '@internationalized/date';
import { Button, DatePicker, useDatePicker } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderDatePickerDemo() {
  const datePicker = useDatePicker({
    defaultValue: [today('UTC')],
  });
  return (
    <div>
      <DatePicker.RootProvider value={datePicker}>
        <DatePicker.Label>Report date</DatePicker.Label>
        <DatePicker.Field />
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
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
                        {datePicker
                          .getMonthsGrid({ columns: 4, format: 'short' })
                          .map((months, rowIndex) => (
                            <DatePicker.TableRow key={rowIndex}>
                              {months.map((month) => (
                                <DatePicker.TableCell key={month.value} value={month.value}>
                                  <DatePicker.TableCellTrigger>
                                    {month.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year">
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
                                key={year.value}
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
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </DatePicker.RootProvider>
      <PreviewMeta>
        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>
          Clear
        </Button>
      </PreviewMeta>
    </div>
  );
}