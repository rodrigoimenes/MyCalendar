import React, { FC, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { Button, Layout } from 'antd';
import { RouteComponentProps } from 'react-router';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Day = styled.div<{ anotherMonth: boolean }>`
  width: auto;
  height: 120px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  flex: 0 0 14%;
  
  &:nth-child(7n) {
    border-right: 1px solid black;
    background-color: lightgray;
    color: blue;
  }
  &:nth-child(7n+1) {
    background-color: lightgray;
    color: blue;
  }
  color: ${({ anotherMonth }) => `${anotherMonth ? 'gray !important' : 'black'}`};
`;

type CalendarDayProps = {
  anotherMonth: boolean
  calendarDate: Moment
  day: number
}

const CalendarDay: FC<CalendarDayProps> = ({ anotherMonth, calendarDate, day }) => {
  return (
    <Day anotherMonth={anotherMonth}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        {day}
      </div>
    </Day>
  )
}

const Weekday = styled.div`
  background-color: #2f73b5;
  flex: 0 0 14%;
  border: 1px solid black;
  border-right: none;
  color: white;
  height: 30px;
  font-size: 20px;
  text-align: center;
  &:nth-child(7n) {
    border-right: 1px solid black;
  }
`

const firstDayOfMonth = (currentMonth: Moment) => {
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

  for (let i = 0; i < neededToFillLine; i++) {
    result.push({ day: i + 1, anotherMonth: true })
  }

  return result
};

const Calendar = () => {
  const [currentCalendarDate, setCurrentCalendarDate] = useState(moment().format())
  const currentCalendarDateMoment = moment(currentCalendarDate)

  const mappedDaysOfMonth = firstDayOfMonth(currentCalendarDateMoment)

  const daysOfWeek = moment.weekdays()

  const backMonth = () => setCurrentCalendarDate(currentCalendarDateMoment.subtract(1, 'month').format())
  const nextMonth = () => setCurrentCalendarDate(currentCalendarDateMoment.add(1, 'month').format())

  return (
    <div style={{
      margin: 'auto', width: '850px'
    }}>
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Button onClick={backMonth} type="text" icon={<LeftOutlined />} size="small" />
        {currentCalendarDateMoment.format('MMMM')}
        <Button onClick={nextMonth} type="text" icon={<RightOutlined />} size="small" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {daysOfWeek.map((item, idx) =>
          <Weekday key={idx}>{item}</Weekday>
        )}
        {mappedDaysOfMonth.map((item, idx) =>
          <CalendarDay key={idx} day={item.day} calendarDate={currentCalendarDateMoment}
            anotherMonth={item.anotherMonth}>{item.day}</CalendarDay>
        )}
      </div>
    </div>

  )
}

export namespace CalendarScreen {
  export interface Props extends RouteComponentProps<void> { }
}

export const CalendarScreen = () => (
  <div style={{ width: '100%', marginTop: '100px', marginBottom: '100px' }}>
    <Layout>
      <Layout.Content>
        <Calendar />
      </Layout.Content>
    </Layout>
  </div>
);
