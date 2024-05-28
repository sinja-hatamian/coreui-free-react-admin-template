import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormSelect,
} from '@coreui/react'

const StagePlans = () => {
  const [StageList, setStageList] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [formdata, setFormdata] = useState({
    day: '',
    start_time: new Date().setHours(9, 0),
    end_time: new Date().setHours(22, 0),
    stage_id: '',
    gender: '',
  })

  useEffect(() => {
    AxiosInstance.get('/stages')
      .then((res) => {
        console.log(res.data.data.stages)
        setStageList(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInput = (e, name) => {
    if (name === 'start_time' || name === 'end_time') {
      let date = new Date(e)
      let time = date.toISOString().split('T')[1].split('.')[0]
      let [hours, minutes] = time.split(':')
      setFormdata({ ...formdata, [name]: `${hours}:${minutes}` })
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
  }

  const handleAddStageDetails = () => {
    AxiosInstance.post('/stage-plans', formdata)
      .then((res) => {
        console.log(res.data.data)
        setStageList([...StageList, res.data.data.stages])
        toast.success('با موفقیت اضافه شد')

        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
    console.log(formdata)
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            مدیریت جنسیت سالن ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن برنامه سالن ها
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>مدیریت جنسیت سالن ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام سالن</CTableHeaderCell>
                        <CTableHeaderCell>روز </CTableHeaderCell>
                        <CTableHeaderCell>ساعت شروع </CTableHeaderCell>
                        <CTableHeaderCell>ساعت پایان </CTableHeaderCell>
                        <CTableHeaderCell>جنسیت </CTableHeaderCell>
                        <CTableHeaderCell>عملیات</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {StageList.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.title}</CTableDataCell>
                          <CTableDataCell>{item.day}</CTableDataCell>
                          <CTableDataCell>{item.start_time}</CTableDataCell>
                          <CTableDataCell>{item.end_time}</CTableDataCell>
                          <CTableDataCell>{item.gender}</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="primary" onClick={() => setActiveKey(2)}>
                              ویرایش
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger">حذف</CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
          <CRow>
            <CCol>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن برنامه سالن ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={2}>
                      <CFormSelect name="title" placeholder="نام سالن" label="نام سالن">
                        {StageList.map((item) => (
                          <option key={item.id} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={2}>
                      <CFormSelect
                        name="day"
                        placeholder="روز"
                        value={formdata.day}
                        onChange={handleInput}
                        label="روز"
                      >
                        <option value="6">شنبه</option>
                        <option value="0">یکشنبه</option>
                        <option value="1">دوشنبه</option>
                        <option value="2">سه شنبه</option>
                        <option value="3">چهارشنبه</option>
                        <option value="4">پنجشنبه</option>
                        <option value="5">جمعه</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={2}>
                      <p>ساعت شروع</p>
                      <DatePicker
                        name="start_time"
                        value={formdata.start_time}
                        disableDayPicker
                        format="HH:mm"
                        Calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(e) => handleInput(e, 'start_time')}
                        plugins={[<TimePicker hideSeconds key={1} hStep={1} mStep={30} />]}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <p>ساعت پایان</p>
                      <DatePicker
                        name="end_time"
                        value={formdata.end_time}
                        disableDayPicker
                        format="HH:mm"
                        Calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(e) => handleInput(e, 'end_time')}
                        plugins={[<TimePicker hideSeconds key={1} hStep={1} mStep={30} />]}
                      />
                    </CCol>
                    <CCol xs={12} md={3}>
                      <CFormSelect
                        name="gender"
                        placeholder="جنسیت"
                        label="جنسیت"
                        aria-label="جنسیت"
                        locale="fa-IR"
                        onChange={handleInput}
                      >
                        <option defaultValue="">انتخاب کنید</option>
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </CFormSelect>
                    </CCol>

                    <CCol xs={12} md={12}>
                      <p />
                      <CButton color="success" onClick={handleAddStageDetails}>
                        ثبت
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default StagePlans
