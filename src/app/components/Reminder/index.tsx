import React, { useState } from 'react'
import { Modal, Button, DatePicker, TimePicker, Input, Form, message } from 'antd'
import moment from 'moment'
import { useReminderActions } from 'app/actions/reminder';
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import { ReminderModel } from 'app/models';

export const ReminderModal = ({ reminder }: { reminder?: ReminderModel }) => {
  const dispatch = useDispatch();
  const reminderActions = useReminderActions(dispatch);

  const [visible, setVisible] = useState(reminder !== undefined)
  const [name, setName] = useState(reminder?.name || '')
  const [day, setDay] = useState<string | null>(moment(reminder?.date).format('YYYY-MM-DD'))
  const [time, setTime] = useState<string | null>(moment(reminder?.date).format('HH:mm'))
  const [city, setCity] = useState(reminder?.city || '')
  const [color, setColor] = useState(reminder?.color || '#FFF')

  const createReminder = () => {
    const date = moment(`${day + ' ' + time}`)
    reminderActions.addReminder(
      {
        id: moment().valueOf().toString(),
        name,
        city,
        date,
        year: moment(date).year().toString(),
        month: (moment(date).month() + 1).toString(),
        color,
      }
    )
    setVisible(false)
    message.success(`Reminder ${name} created!`);
  }

  const closeModal = () => setVisible(false)
  const showModal = () => setVisible(true)

  return (
    <>
      {reminder === undefined &&
        <Button type="primary" onClick={showModal}>
          Create reminder
      </Button>}
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={createReminder}
        onCancel={closeModal}
        okText="Create"
      >
        <Form layout="horizontal">
          <Form.Item label="Name" name="name">
            <Input value={name} maxLength={30}
              onChange={e => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker value={moment(day)}
              onChange={day => setDay(day?.format('YYYY-MM-DD') || null)} />
          </Form.Item>
          <Form.Item label="Time" name="time">
            <TimePicker value={moment(time)}
              onChange={time => setTime(time?.format('HH:mm') || null)} />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input value={city}
              onChange={e => setCity(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <SketchPicker
              color={color}
              onChangeComplete={(color: any) => setColor(color.hex)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};