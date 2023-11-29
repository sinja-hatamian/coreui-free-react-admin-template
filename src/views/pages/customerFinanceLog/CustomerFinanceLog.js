import React, { useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { format } from 'date-fns'
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

  const handleGetReport = () => {
    AxiosInstance.get(
      `/users/get-report/${customer.id}?start_date=${startDate}&end_date=${endDate}`,
    )
      .then((res) => {
        setReport(res.data.data.report)
        setStartDate(res.data.data.start_date)
        setEndDate(res.data.data.end_date)
        console.log(res.data.data.report)
        console.log(startDate)
        console.log(endDate)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
      })
  }

  const handleStartDate = (newDate) => {
    setStartDate(newDate.valueOf())
  }

  const handleEndDate = (newDate) => {
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
        console.log(res.data.data.user)
      })
      .catch((error) => {
        toast.error('مشتری با این کد ملی یافت نشد')
        console.log(error.response.data.message)
      })
  }

  const fetchDataWithPhone = () => {
    AxiosInstance.get(`/users/phone/${formdata.phone}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره تلفن وجود ندارد')
      })
  }

  const fetchDataWithCardNumber = () => {
    AxiosInstance.get(`/users/card-number/${card_number}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
        }))
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره کارت وجود ندارد')
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
                <strong>لطفا بازه زمانی گزارش را مشخص نمایید</strong>
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
              مشخصات مشتری: {formdata.firstname} {formdata.lastname}
            </strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>میزان شارژ</CTableHeaderCell>
                  <CTableHeaderCell>نوع شارژ </CTableHeaderCell>
                  <CTableHeaderCell>میزان مصرف</CTableHeaderCell>
                  <CTableHeaderCell>تاریخ شارژ</CTableHeaderCell>
                  <CTableHeaderCell>تاریخ مصرف</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {report.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>
                      {item.income
                        ? item.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '-'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.income_type === '3'
                        ? 'نقدی'
                        : item.income_type === '2'
                        ? 'پوز'
                        : item.income_type === '4'
                        ? ' کارت هدیه '
                        : item.income_type === '5'
                        ? 'رایگان'
                        : '-'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.outcome
                        ? item.outcome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '-'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.income_date
                        ? format(new Date(item.income_date), 'yyyy-MM-dd HH:mm:ss')
                        : '-'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.outcome_date
                        ? format(new Date(item.outcome_date), 'yyyy-MM-dd HH:mm:ss')
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
