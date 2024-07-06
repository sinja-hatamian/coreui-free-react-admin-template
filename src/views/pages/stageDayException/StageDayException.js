import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'moment'
import 'moment/locale/fa'
import mj from 'moment-jalaali'
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
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react'

const StageDayException = () => {
  const [stagesList, setStagesList] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [stageDayException, setStageDayException] = useState([])
  const [value, setValue] = useState(new Date())
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    stage_id: '',
    online_capacity: '',
    price: '',
  })

  useEffect(() => {
    AxiosInstance.get('/stages')
      .then((res) => {
        console.log(res.data.data.stages)
        setStagesList(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
    AxiosInstance.get('/stage-day-exceptions')
      .then((res) => {
        setStageDayException(res.data.data.stage_day_exceptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInput = (e) => {
    if (e.target.name === 'price') {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddException = () => {
    AxiosInstance.post('/stage-day-exceptions', formData)
      .then((res) => {
        console.log(formData)
        setStagesList([...stagesList, res.data.data.stages])
        toast.success('با موفقیت افزوده شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleDeleteException = (id) => {
    AxiosInstance.delete(`/stage-day-exceptions/${id}`)
      .then((res) => {
        setStageDayException(stageDayException.filter((item) => item.id !== id))
        toast.success('با موفقیت حذف شد')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUpdateException = (id) => {
    AxiosInstance.put(`/stage-day-exceptions/${id}`, formData)
      .then((res) => {
        setStageDayException(
          stageDayException.map((item) => (item.id === id ? res.data.data : item)),
        )
        toast.success('با موفقیت ویرایش شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDate = (date) => {
    const formattedDate = moment(date.toDate()).format('YYYY-MM-DD')
    setValue(date)
    setFormData({ ...formData, date: formattedDate })
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            نمایش لیست
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست روزهای استثنا</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام سالن</CTableHeaderCell>
                        <CTableHeaderCell>تاریخ</CTableHeaderCell>
                        <CTableHeaderCell>ظرفیت انلاین</CTableHeaderCell>
                        <CTableHeaderCell>هزینه</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {stageDayException.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.title}</CTableDataCell>
                          <CTableDataCell>
                            {mj(item.date).locale('fa').format('jYYYY/jMM/jDD')}
                          </CTableDataCell>
                          <CTableDataCell>{item.online_capacity}</CTableDataCell>
                          <CTableDataCell>{numberWithCommas(item.price)}</CTableDataCell>
                          <CTableHeaderCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setFormData({
                                  id: item.id,
                                  date: item.date ? moment(item.date).format('YYYY-MM-DD') : '',
                                  stage_id: item.stage_id,
                                  online_capacity: item.online_capacity,
                                  price: item.price,
                                })
                                setActiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <CButton
                              style={{ color: '#fff' }}
                              color="danger"
                              onClick={() => handleDeleteException(item.id)}
                            >
                              حذف
                            </CButton>
                          </CTableHeaderCell>
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
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن روز استثنا</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <div>
                        <p>تاریخ</p>
                      </div>
                      <DatePicker
                        value={value}
                        onChange={handleDate}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY-MM-DD"
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        name="online_capacity"
                        label="ظرفیت انلاین"
                        placeholder="ظرفیت انلاین"
                        aria-labelledby="online_capacity"
                        value={formData.online_capacity}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        name="price"
                        label="هزینه"
                        placeholder="هزینه"
                        value={formData.price}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormSelect
                        label="انتخاب سالن"
                        name="stage_id"
                        value={formData.stage_id}
                        onChange={handleInput}
                      >
                        <option value="">انتخاب سالن</option>
                        {stagesList.map(
                          (item) =>
                            item && (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ),
                        )}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <br />
                  <CButton color="success" onClick={handleAddException} style={{ color: '#fff' }}>
                    ثبت
                  </CButton>
                  <br />
                  <div>
                    <CButton
                      color="primary"
                      onClick={() => handleUpdateException(formData.id)}
                      style={{ color: '#fff' }}
                    >
                      به روز رسانی
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        draggable
      />
    </>
  )
}
export default StageDayException
