import { DatePicker, Field } from '@moduix/react';

export default function FieldDatePickerDemo() {
  return (
    <div className="date-picker-field-preview">
      <Field invalid>
        <DatePicker required invalid>
          <DatePicker.Label>Deadline</DatePicker.Label>
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
        </DatePicker>
        <Field.ErrorText>Choose a valid deadline.</Field.ErrorText>
      </Field>
    </div>
  );
}