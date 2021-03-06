import React, { FC, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { Button, Layout, Popover, message, Tooltip, DatePicker } from 'antd';
import { RouteComponentProps } from 'react-router';
import { ReminderModal } from '../Reminder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { ReminderModel } from 'app/models';
import { useReminderActions, useReminderModalActions } from 'app/actions';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { mapDays } from './utils';

const Day = styled.div<{ anotherMonth: boolean }>`
  width: auto;
  height: 120px;
  border-bottom: 1px solid #b7b7b7;
  border-left: 1px solid #b7b7b7;
  flex: 0 0 14%;
  background-color: #fff;
  
  &:nth-child(7n) {
    border-right: 1px solid #b7b7b7;
    background-color: lightgray;
    color: blue;
  }
  &:nth-child(7n+1) {
    background-color: lightgray;
    color: blue;
  }
  color: ${({ anotherMonth }) => `${anotherMonth ? '#b7b7b7 !important' : '#252525'}`};
`;

type CalendarDayProps = {
  anotherMonth: boolean
  reminders: ReminderModel[]
  calendarDate: Moment
  day: number
}

const Circle = styled.div<{ color: string }>`
  height : 10px;
  width : 10px;
  border-radius: 1000px;
  background-color: ${({ color }) => `${color}`};
  margin-right: 10px;
  border: 1px solid black;
  margin-left: 5px;
 `

const Reminder = ({ date, color }: { date: Moment, color: string }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Circle color={color} />
      {date.format('HH:mm')}
    </div>
  )
}

const PopoverReminderDetails = ({ reminder }: { reminder: ReminderModel }) => {
  const dispatch = useDispatch();
  const reminderActions = useReminderActions(dispatch);
  const modalActions = useReminderModalActions(dispatch);

  const deleteReminder = () => {
    reminderActions.deleteReminder(reminder.id)
    message.success(`Reminder ${reminder.name} removed!`)
  }

  const editReminder = () => modalActions.editReminder(reminder)

  let Complement = () => <p>Without weather info</p>

  if (reminder.weatherInfo?.description) {
    Complement = () => <p>{reminder.weatherInfo?.description} (Min: {reminder.weatherInfo?.min} - Max: {reminder.weatherInfo?.max})</p>
  }

  return (
    <div>
      <p>Name: {reminder.name}</p>
      <p>Date: {reminder.date.format('YYYY-MM-DD')}</p>
      <p>Time: {reminder.date.format('HH:mm:ss')}</p>
      <p>City: {reminder.city}</p>
      <Complement />
      <div style={{ display: 'flex', justifyContent: 'space-between', }}>
        <Button type="primary" danger onClick={deleteReminder}>Delete</Button>
        <Button type="primary" onClick={editReminder}>Edit</Button>
      </div>
    </div>
  )
}

const ReminderList = ({ reminders }: { reminders: ReminderModel[] }) => {
  return (
    <div>
      {reminders.map((item, idx) =>
        <Popover placement="top" key={idx} title="Reminder" content={<PopoverReminderDetails reminder={item} />}>
          <div>
            <Reminder key={item.id} date={item.date} color={item.color} />
          </div>
        </Popover>
      )}
    </div>
  )
}

const RemoveAllButton = ({ date, day }: { date: Moment, day: number }) => {
  const dispatch = useDispatch();
  const reminderActions = useReminderActions(dispatch);

  const removeAll = () => {
    reminderActions.deleteAllFromDayReminder(
      { monthYear: `${date.month() + 1}-${date.year()}`, day }
    )
  }

  return (
    <span>
      <Tooltip title="Click to clear this day">
        <Button onClick={removeAll} type="primary" danger shape="circle" icon={<CloseOutlined />} size="small" style={{ margin: '5px' }} />
      </Tooltip>
    </span>
  )
}

const CalendarDay: FC<CalendarDayProps> = ({ anotherMonth, reminders, calendarDate, day }) => {
  const LIMIT_PER_DAY = 3

  const remindersToday = reminders && !anotherMonth ? reminders.filter((reminder) => day === reminder.date.date()) : []
  const hiddenReminders = remindersToday.length - LIMIT_PER_DAY

  return (
    <Day anotherMonth={anotherMonth}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ margin: '7px' }}>
          {day}
        </div>
        {remindersToday.length > 0 && <RemoveAllButton date={calendarDate} day={day} />}
      </div>
      <ReminderList reminders={remindersToday.splice(0, LIMIT_PER_DAY)} />
      {hiddenReminders > 0 && (
        <Popover placement="top" trigger="click" title={`Day ${day}`} content={<ReminderList reminders={remindersToday} />}>
          <div style={{ textAlign: 'center', marginTop: '5px', cursor: 'pointer' }}>more {hiddenReminders}</div>
        </Popover>
      )}
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

const Calendar = () => {
  const [currentCalendarDate, setCurrentCalendarDate] = useState(moment().format())
  const currentCalendarDateMoment = moment(currentCalendarDate)

  const mappedDaysOfMonth = mapDays(currentCalendarDateMoment)

  const { reminders } = useSelector((state: RootState) => {
    const monthYear = `${currentCalendarDateMoment.month() + 1}-${currentCalendarDateMoment.year()}`

    return {
      reminders: state.reminder[monthYear]
    };
  });

  const daysOfWeek = moment.weekdays()

  const backMonth = () => setCurrentCalendarDate(currentCalendarDateMoment.subtract(1, 'month').format())
  const nextMonth = () => setCurrentCalendarDate(currentCalendarDateMoment.add(1, 'month').format())

  const onChangeDate = (_date: Moment | null, dateString: string) => {
    setCurrentCalendarDate(moment(dateString).format())
  }

  return (
    <div style={{ margin: 'auto', width: '850px' }}>
      <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', fontSize: '20px', marginRight: '16px', marginBottom: '25px' }}>
        <Button.Group>
          <Button onClick={backMonth} type="default" icon={<LeftOutlined />} size="large" />
          <DatePicker allowClear={false} onChange={onChangeDate} value={moment(currentCalendarDateMoment)} picker="month" format="MMMM - YYYY" />
          <Button onClick={nextMonth} type="default" icon={<RightOutlined />} size="large" />
        </Button.Group>
        <ReminderModal />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {daysOfWeek.map((item, idx) =>
          <Weekday key={idx}>{item}</Weekday>
        )}
        {mappedDaysOfMonth.map((item, idx) =>
          <CalendarDay key={idx} day={item.day} calendarDate={currentCalendarDateMoment} reminders={reminders}
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
  <div style={{ width: '100%', marginTop: '30px', marginBottom: '100px' }}>
    <Layout style={{ backgroundColor: '#fff' }}>
      <Layout.Content>
        <Calendar />
      </Layout.Content>
    </Layout>
  </div>
);
