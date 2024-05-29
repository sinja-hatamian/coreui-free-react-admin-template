import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'

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
  const [startDate, setStartDate] = useState(new Date().setHours(9, 0))
  const [endDate, setEndDate] = useState(new Date().setHours(22, 0))
  const [stagePlanList, setStagePlanList] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [formdata, setFormdata] = useState({
    day: '',
    start_time: '',
    end_time: '',
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

    AxiosInstance.get('/stage-plans')
      .then((res) => {
        console.log(res.data.data.stage_plans)
        setStagePlanList(res.data.data.stage_plans)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInput = (e, name) => {
    console.log(e.valueOf())
    if (name === 'start_time' || name === 'end_time') {
      setFormdata({ ...formdata, [name]: e })
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    console.log('log handleInput formData: ', formdata)
  }

  const handleAddStageDetails = () => {
    let date = new Date(startDate.valueOf())
    date.setHours(date.getHours() + 3, date.getMinutes() + 30)
    date = date.toISOString().split('T')[1].split('.')[0].split(':')
    let date2 = new Date(endDate.valueOf())
    date2.setHours(date2.getHours() + 3, date2.getMinutes() + 30)
    date2 = date2.toISOString().split('T')[1].split('.')[0].split(':')
    const updatedFormData = {
      ...formdata,
      start_time: `${date[0]}:${date[1]}`,
      end_time: `${date2[0]}:${date2[1]}`,
    }
    console.log('updatedFormData:', updatedFormData)
    AxiosInstance.post('/stage-plans', updatedFormData)
      .then((res) => {
        console.log(res.data.data)
        setStageList([...StageList, res.data.data.stages])
        toast.success('با موفقیت اضافه شد')
        setActiveKey(1)
        console.log(updatedFormData)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
        console.log(updatedFormData)
      })
  }
  const handleDeleteDetails = (id) => {
    AxiosInstance.delete(`/stage-plans/${id}`)
      .then((res) => {
        console.log(res.data.data)
        setStagePlanList(stagePlanList.filter((item) => item.id !== id))
        toast.success('با موفقیت حذف شد')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
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
                      {stagePlanList.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.stage_title}</CTableDataCell>
                          <CTableDataCell>
                            {item.day === 6
                              ? 'شنبه'
                              : item.day === 0
                              ? 'یکشنبه'
                              : item.day === 1
                              ? 'دوشنبه'
                              : item.day === 2
                              ? 'سه شنبه'
                              : item.day === 3
                              ? 'چهارشنبه'
                              : item.day === 4
                              ? 'پنجشنبه'
                              : item.day === 5
                              ? 'جمعه'
                              : ''}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(item.start_time).getUTCHours().toString().padStart(2, '0')}:
                            {new Date(item.start_time).getUTCMinutes().toString().padStart(2, '0')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(item.end_time).getUTCHours().toString().padStart(2, '0')}:
                            {new Date(item.end_time).getUTCMinutes().toString().padStart(2, '0')}
                          </CTableDataCell>

                          <CTableDataCell>{item.gender === 'male' ? 'مرد' : 'زن'}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setFormdata({
                                  day: item.day,
                                  start_time: item.start_time,
                                  end_time: item.end_time,
                                  stage_id: item.stage_id,
                                  gender: item.gender,
                                })
                                setActiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger" onClick={() => handleDeleteDetails(item.id)}>
                              حذف
                            </CButton>
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
                      <CFormSelect
                        name="stage_id"
                        placeholder="نام سالن"
                        label="نام سالن"
                        onChange={handleInput}
                      >
                        {StageList.map(
                          (item) =>
                            item && (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ),
                        )}
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
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={2}>
                      <p>ساعت شروع</p>
                      <DatePicker
                        name="start_time"
                        value={startDate}
                        onChange={setStartDate}
                        disableDayPicker
                        format="HH:mm"
                        Calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        plugins={[<TimePicker hideSeconds key={1} hStep={1} mStep={30} />]}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <p>ساعت پایان</p>
                      <DatePicker
                        name="end_time"
                        value={endDate}
                        onChange={setEndDate}
                        disableDayPicker
                        format="HH:mm"
                        Calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
      />
    </>
  )
}

export default StagePlans
