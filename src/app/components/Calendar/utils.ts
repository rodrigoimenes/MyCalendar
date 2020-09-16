import moment, { Moment } from "moment";

export const mapDays = (currentMonth: Moment) => {
  const ITENS_PER_ROW = 7

  const currentMonthMoment = moment(currentMonth)

  const firstDayThisMonth = parseInt(currentMonthMoment.startOf("month").format("d"))
  const lastDayOfPreviousMonth = parseInt(currentMonthMoment.subtract(1, 'month').endOf('month').format('DD'))
  const lastDayOfThisMonth = moment(currentMonth).daysInMonth()

  let result = []

  for (let i = 0; i < firstDayThisMonth; i++) {
    result.push({ day: lastDayOfPreviousMonth - i, anotherMonth: true });
  }

  result = result.reverse()

  for (let i = 0; i < lastDayOfThisMonth; i++) {
    result.push({ day: i + 1, anotherMonth: false });
  }

  const neededToFillLine = ITENS_PER_ROW - (result.length % ITENS_PER_ROW)

  if (neededToFillLine % 7 !== 0)
    for (let i = 0; i < neededToFillLine; i++) {
      result.push({ day: i + 1, anotherMonth: true })
    }

  return result
};