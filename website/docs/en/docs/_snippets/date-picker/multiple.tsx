import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker } from '@moduix/react/date-picker';
import styles from '@/components/examples/date-picker/date-picker-multiple.module.css';

export default function MultipleDatePickerDemo() {
  return (
    <DatePicker
      className={styles.root}
      selectionMode="multiple"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      maxSelectedDates={3}
    >
      <DatePicker.Label>Meeting days</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Context>
          {(datePicker) => (
            <div className={styles.selectedDates}>
              {datePicker.value.length > 0 ? (
                datePicker.value.map((date, index) => (
                  <span key={date.toString()} className={styles.selectedDate}>
                    {date.toString()}
                    <button
                      type="button"
                      className={styles.remove}
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
              ) : (
                <span className={styles.placeholder}>Select dates</span>
              )}
            </div>
          )}
        </DatePicker.Context>
        <DatePicker.ClearTrigger aria-label="Clear dates" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
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
  );
}