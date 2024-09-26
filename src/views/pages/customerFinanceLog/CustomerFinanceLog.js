import React, { useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import jalaali from 'jalaali-js'
import {
  CCol,
  CRow,
  CTable,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CFormInput,
} from '@coreui/react'

const CustomerFinanceLog = () => {
  const [report, setReport] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [customer, setCustomer] = useState({})
  const [card_number, setCard_number] = useState('')
  const [formdata, setFormdata] = useState({
    firstname: '',
    lastname: '',
    national_code: '',
    phone: '',
  })

  const handleStartDate = (newDate) => {
    newDate = new Date(newDate)
    newDate.setHours(0, 0, 0, 0)
    setStartDate(newDate.valueOf())
  }

  const handleEndDate = (newDate) => {
    newDate = new Date(newDate)
    newDate.setHours(23, 59, 59, 999)
    setEndDate(newDate.valueOf())
  }

  const handleInputCahnge = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'card_number') {
      setCard_number(e.target.value)
    }
  }

  const fetchCustomerData = () => {
    AxiosInstance.get(`/users/national-code/${formdata.national_code}`)
      .then((res) => {
        setCustomer(res.data.data.user)
        setFormdata({
          firstname: res.data.data.user.firstname,
          lastname: res.data.data.user.lastname,
          national_code: res.data.data.user.national_code,
          phone: res.data.data.user.phone,
          card_number: res.data.data.user.card_number,
        })
      })
      .catch((error) => {
        toast.error('مشتری با این کد ملی یافت نشد')
        console.log(error.response.data.message)
      })
  }

  const fetchDataWithPhone = () => {
    AxiosInstance.get(`/users/phone/${formdata.phone}`)
      .then((res) => {
        setCustomer(res.data.data.user)
        console.log(customer)
        setFormdata({
          firstname: res.data.data.user.firstname,
          lastname: res.data.data.user.lastname,
          national_code: res.data.data.user.national_code,
          phone: res.data.data.user.phone,
          card_number: res.data.data.user.card_number,
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره تلفن وجود ندارد')
      })
  }

  const fetchDataWithCardNumber = () => {
    AxiosInstance.get(`/users/card-number/${card_number}`)
      .then((res) => {
        setCustomer(res.data.data.user)
        console.log(customer)
        setFormdata({
          firstname: res.data.data.user.firstname,
          lastname: res.data.data.user.lastname,
          national_code: res.data.data.user.national_code,
          phone: res.data.data.user.phone,
          card_number: res.data.data.user.card_number,
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره کارت وجود ندارد')
      })
  }

  const handleGetReport = () => {
    AxiosInstance.get(
      `/users/get-report/${customer.id}?start_date=${startDate}&end_date=${endDate}`,
    )
      .then((res) => {
        if (res.data.data.report.length === 0) {
          toast.error('گزارشی برای این بازه زمانی یافت نشد')
        }
        setReport(res.data.data.report)
        setStartDate(res.data.data.start_date)
        setEndDate(res.data.data.end_date)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
      })
  }

  return (
    <CRow>
      <CCol xs="12" lg="12">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>گزارش کامل مشتری</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md="4" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CFormInput
                  label={
                    <span>
                      <strong style={{ textWrap: 'nowrap' }}>یافتن مشتری با کد ملی</strong>
                    </span>
                  }
                  onChange={handleInputCahnge}
                  name="national_code"
                  aria-label="national_code"
                  value={formdata.national_code}
                />
              </CCol>
              <CCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
                <CButton color="info" onClick={fetchCustomerData} style={{ color: '#fff' }}>
                  بررسی کد ملی
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="4" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CFormInput
                  label={
                    <span>
                      <strong style={{ textWrap: 'nowrap' }}>یافتن مشتری با شماره همراه</strong>
                    </span>
                  }
                  onChange={handleInputCahnge}
                  name="phone"
                  aria-label="phone"
                  value={formdata.phone}
                />
              </CCol>
              <CCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
                <CButton color="info" onClick={fetchDataWithPhone} style={{ color: '#fff' }}>
                  بررسی شماره همراه
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="4" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CFormInput
                  label={
                    <span>
                      <strong style={{ textWrap: 'nowrap' }}>یافتن مشتری با شماره کارت</strong>
                    </span>
                  }
                  onChange={handleInputCahnge}
                  name="card_number"
                  aria-label="card_number"
                  value={card_number}
                />
              </CCol>
              <CCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
                <CButton color="info" onClick={fetchDataWithCardNumber} style={{ color: '#fff' }}>
                  بررسی شماره کارت
                </CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="12">
                <strong
                  style={{
                    display: 'flex',
                    color: 'red',
                  }}
                >
                  لطفا بازه زمانی گزارش را مشخص نمایید.
                </strong>
                <p />
              </CCol>
              <CCol xs="12" md="6">
                <DatePicker
                  placeholder=" از تاریخ"
                  value={startDate}
                  onChange={handleStartDate}
                  calendarPosition="bottom-right"
                  inputPlaceholder=" از تاریخ"
                  locale={persian_fa}
                  calendar={persian}
                />
              </CCol>
              <CCol xs="12" md="6">
                <DatePicker
                  placeholder=" تا تاریخ"
                  value={endDate}
                  onChange={handleEndDate}
                  calendarPosition="bottom-right"
                  inputPlaceholder=" تا تاریخ"
                  locale={persian_fa}
                  calendar={persian}
                />
              </CCol>
              <p />
              <CButton color="primary" className="md-2" onClick={handleGetReport}>
                جستجو
              </CButton>
            </CRow>
            <br />
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <strong>
              نام مشتری:{' '}
              <strong
                style={{
                  color: 'green',
                }}
              >
                {formdata.firstname} {formdata.lastname}
              </strong>
            </strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell> مبلغ</CTableHeaderCell>
                  <CTableHeaderCell>نوع عملکرد </CTableHeaderCell>
                  <CTableHeaderCell>تاریخ </CTableHeaderCell>
                  <CTableHeaderCell>ساعت </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {report.map((item, index) => (
                  <CTableRow key={item.id ? item.id.toString() : index.toString()}>
                    <CTableDataCell>
                      {item.amount
                        ? item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '-'}
                    </CTableDataCell>
                    <CTableDataCell>{item.type}</CTableDataCell>
                    <CTableDataCell>
                      {item.created_at
                        ? jalaali.toJalaali(new Date(item.created_at)).jy +
                          '/' +
                          jalaali.toJalaali(new Date(item.created_at)).jm +
                          '/' +
                          jalaali.toJalaali(new Date(item.created_at)).jd
                        : '-'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.created_at
                        ? new Date(item.created_at).getUTCHours().toString().padStart(2, '0') +
                          ':' +
                          new Date(item.created_at).getUTCMinutes().toString().padStart(2, '0') +
                          ':' +
                          new Date(item.created_at).getUTCSeconds().toString().padStart(2, '0')
                        : '-'}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        rtl
      />
    </CRow>
  )
}

export default CustomerFinanceLog
