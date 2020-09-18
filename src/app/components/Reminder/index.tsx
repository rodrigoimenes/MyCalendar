import React, { useEffect, useState } from 'react'
import { Modal, Button, DatePicker, TimePicker, Input, Form, message } from 'antd'
import moment, { Moment } from 'moment'
import { useReminderActions } from 'app/actions/reminder';
import { useDispatch, useSelector } from 'react-redux';
import { SliderPicker } from 'react-color';
import { useReminderModalActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { ReminderModel } from 'app/models';
import { createOrEdit } from './createOrEdit';

export const ReminderModal = () => {
  const dispatch = useDispatch();
  const reminderActions = useReminderActions(dispatch);
  const modalActions = useReminderModalActions(dispatch);

  const { visible, reminder } = useSelector((state: RootState) => {
    return {
      visible: state.reminderModal.visible,
      reminder: state.reminderModal.reminder,
    }
  })

  const [name, setName] = useState('')
  const [day, setDay] = useState<string | null>(moment(reminder?.date).format('YYYY-MM-DD'))
  const [time, setTime] = useState<Moment | null>(moment(reminder?.date))
  const [city, setCity] = useState('')
  const [color, setColor] = useState('#FFF')

  useEffect(() => {
    if (reminder) {
      setCity(reminder.city);
      setName(reminder.name);
      setColor(reminder.color);
      setDay(moment(reminder?.date).format('YYYY-MM-DD'))
    }
  }, [reminder]);

  const onFinish = async () => {
    let error = ''
    if (!name) error = 'name'
    else if (!city) error = 'city'

    if (error) {
      message.error(`You need to provide a ${error}`);
      return
    }

    const reminderFunc = reminder ? reminderActions.editReminder : reminderActions.addReminder

    const date = moment(`${day + ' ' + time?.format('HH:mm')}`)

    const reminderObj: ReminderModel = {
      id: reminder?.id || moment().valueOf().toString(),
      name,
      city,
      date,
      year: moment(date).year().toString(),
      month: (moment(date).month() + 1).toString(),
      color,
    }

    reminderFunc(await createOrEdit(reminderObj))

    modalActions.closeModal()
    message.success(`Reminder ${name} ${reminder ? 'edited' : 'created'}!`);
  }

  const closeModal = () => modalActions.closeModal()

  const showModal = () => {
    setDay(moment().format('YYYY-MM-DD'))
    setTime(moment())
    setCity('')
    setColor('')
    setName('')
    modalActions.newReminder()
  }

  return (
    <>
      <div style={{
        justifyContent: 'center',
        display: 'flex',
      }}>
        <Button type="primary" onClick={showModal} size="large">
          Create reminder
        </Button>
      </div>
      <Modal
        title={`${reminder ? 'Edit' : 'Create'} reminder`}
        visible={visible}
        onOk={onFinish}
        onCancel={closeModal}
        okText={reminder ? 'Edit' : 'Create'}
      >
        <Form layout="horizontal" labelCol={{ span: 6 }} onFinish={onFinish}>
          <Form.Item label="Name" required>
            <Input value={name} maxLength={30} style={{ width: '250px' }}
              onChange={e => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="City" required>
            <Input value={city} style={{ width: '250px' }}
              onChange={e => setCity(e.target.value)} />
          </Form.Item>
          <Form.Item label="Date" required>
            <DatePicker value={moment(day)}
              onChange={day => setDay(day?.format('YYYY-MM-DD') || null)} />
          </Form.Item>
          <Form.Item label="Time" required>
            <TimePicker minuteStep={5} format='HH:mm' value={time}
              onChange={time => time ? setTime(time) : ''} />
          </Form.Item>
          <Form.Item label="Choose a color" required>
            <SliderPicker
              color={color}
              onChangeComplete={(color: any) => setColor(color.hex)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};