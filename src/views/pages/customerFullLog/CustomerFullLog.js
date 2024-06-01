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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

const CustomerFullLog = () => {
  const [report, setReport] = useState([])
  const [modal, setModal] = useState(false)
  const [secondModal, setSecondModal] = useState(false)
  const [customerReport, setCustomerReport] = useState([])
  const [customerFullReport, setCustomerFullReport] = useState([])
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
    if (customer.id === undefined) {
      customer.id = ''
    }
    AxiosInstance.get(
      `/users/group-customers?start_date=${startDate}&end_date=${endDate}&user_id=${customer.id}`,
    )
      .then((res) => {
        if (
          !res.data.data ||
          !res.data.data.groupCustomers ||
          res.data.data.groupCustomers.length === 0
        ) {
          toast.error('گزارشی برای این بازه زمانی یافت نشد')
        } else {
          setReport(res.data.data.groupCustomers)
          // setGroupCustomerId(res.data.data.groupCustomers[0].id)
          setStartDate(res.data.data.start_date)
          setEndDate(res.data.data.end_date)
          console.log(res.data.data.groupCustomers)
          console.log(startDate)
          console.log(endDate)
        }
      })
      .catch((error) => {
        //Check date choose
        if (startDate === '' || endDate === '') {
          toast.error('لطفا بازه زمانی را مشخص کنید')
        } else {
          toast.error(error.response.groupCustomers.message)
          console.log(error.response.groupCustomers.message)
        }
      })
  }

  const handleCustomerReport = (id) => {
    AxiosInstance.get(`/users/group-customers/${id}`)
      .then((res) => {
        setCustomerReport(res.data.data.customers)
        // if (res.data.data.customers.length > 0) {
        //   setCustomerId(res.data.data.customers[0].id)
        // }
        console.log(res.data.data.customers)
        console.log('first modal shows')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
      })
  }

  const handleCustomerFullReport = (id) => {
    AxiosInstance.get(`/users/customers/${id}`)
      .then((res) => {
        console.log(res)
        setCustomerFullReport(res.data.data.report)
        console.log(customerFullReport)
        console.log('second modal shows')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
      })
  }
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
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره تلفن وجود ندارد')
      })
  }

  const fetchDataWithCardNumber = () => {
    AxiosInstance.get(`/users/card-number/${card_number}`)
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
                  <CTableHeaderCell>کد ملی</CTableHeaderCell>
                  <CTableHeaderCell>شماره همراه</CTableHeaderCell>
                  <CTableHeaderCell>نام </CTableHeaderCell>
                  <CTableHeaderCell>نام خانوادگی </CTableHeaderCell>
                  <CTableHeaderCell> ورود به مجموعه </CTableHeaderCell>
                  <CTableHeaderCell> خروج از مجموعه</CTableHeaderCell>
                  <CTableHeaderCell> شارژ ورود (ریال)</CTableHeaderCell>
                  <CTableHeaderCell> مانده شارژ (ریال)</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {report.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.national_code ?? 'ثبت نشده'}</CTableDataCell>
                    <CTableDataCell>{item.phone ?? 'ثبت نشده'}</CTableDataCell>
                    <CTableDataCell>{item.firstname}</CTableDataCell>
                    <CTableDataCell>{item.lastname}</CTableDataCell>
                    <CTableDataCell>
                      {(() => {
                        const dateTime = new Date(item.EnterTime)
                        const jalaliDate = jalaali.toJalaali(dateTime)
                        const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                        const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                        return date + '-' + time
                      })()}
                    </CTableDataCell>
                    <CTableDataCell>
                      {(() => {
                        if (item.ExitTime === null) {
                          return 'خارج نشده'
                        }

                        const dateTime = new Date(item.ExitTime)
                        const jalaliDate = jalaali.toJalaali(dateTime)
                        const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                        const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                        return date + '-' + time
                      })()}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.AllCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.RemainCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        onClick={() => {
                          // setGroupCustomerId(item.id)
                          handleCustomerReport(item.id)
                          setModal(true)
                        }}
                        style={{
                          color: '#fff',
                        }}
                      >
                        جزئیات
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        {
          <CModal
            visible={modal}
            onClose={() => setModal(false)}
            color="info"
            size="lg"
            style={{ fontFamily: 'VazirD', display: 'block' }}
          >
            <CModalHeader closeButton>
              <CModalTitle>گزارش کامل مشتری</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>شماره دستبند </CTableHeaderCell>
                    <CTableHeaderCell> زمان ورود به بازی </CTableHeaderCell>
                    <CTableHeaderCell>زمان خروج از بازی </CTableHeaderCell>
                    <CTableHeaderCell> مشاهده جزئیات </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {customerReport.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.TagSerial}</CTableDataCell>
                      <CTableDataCell>
                        {(() => {
                          const dateTime = new Date(item.inOutLogEnterTime)
                          const jalaliDate = jalaali.toJalaali(dateTime)
                          const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                          const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                          return date + '-' + time
                        })()}
                      </CTableDataCell>
                      <CTableDataCell>
                        {(() => {
                          if (item.ExitTime === null) {
                            return 'خارج نشده'
                          }

                          const dateTime = new Date(item.inOutLogExitTime)
                          const jalaliDate = jalaali.toJalaali(dateTime)
                          const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                          const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                          return date + '-' + time
                        })()}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          onClick={() => {
                            // setCustomerFullReport()
                            handleCustomerFullReport(item.id)
                            setSecondModal(true)
                          }}
                          style={{
                            color: '#fff',
                          }}
                        >
                          جزئیات
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CModalBody>
            {/* <CModalFooter
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: 'none',
              }}
            >
              <CButton color="danger" onClick={() => setModal(!modal)}>
                بستن
              </CButton>
            </CModalFooter> */}
          </CModal>
        }
        {
          <CModal
            visible={secondModal}
            onClose={() => setSecondModal(false)}
            color="info"
            size="lg"
            style={{ fontFamily: 'VazirD', display: 'block' }}
          >
            <CModalHeader closeButton>
              <CModalTitle>گزارش کامل مشتری</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>شماره دستبند </CTableHeaderCell>
                    <CTableHeaderCell>زمان ورود </CTableHeaderCell>
                    <CTableHeaderCell>زمان خروج </CTableHeaderCell>
                    <CTableHeaderCell> نام بازی </CTableHeaderCell>
                    <CTableHeaderCell> هزینه در بازی </CTableHeaderCell>
                    <CTableHeaderCell>تایم اصلی بازی(دقیقه)</CTableHeaderCell>
                    <CTableHeaderCell> تایم اضافی سپری شده در بازی(دقیقه)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {customerFullReport.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.customerTagSerial}</CTableDataCell>
                      <CTableDataCell>
                        {(() => {
                          const dateTime = new Date(item.customerEnterTime)
                          const jalaliDate = jalaali.toJalaali(dateTime)
                          const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                          const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                          return date + '-' + time
                        })()}
                      </CTableDataCell>
                      <CTableDataCell>
                        {(() => {
                          const dateTime = new Date(item.customerExitTime)
                          const jalaliDate = jalaali.toJalaali(dateTime)
                          const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                          const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                          return date + '-' + time
                        })()}
                      </CTableDataCell>
                      <CTableDataCell>{item.gameName}</CTableDataCell>

                      <CTableDataCell>{item.inOutLogPrice}</CTableDataCell>
                      <CTableDataCell>{item.gameBaseTime}</CTableDataCell>
                      <CTableDataCell>{item.inOutLogAbsentTime}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CModalBody>
            {/* <CModalFooter
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: 'none',
              }}
            >
              <CButton color="danger" onClick={() => setModal(!modal)}>
                بستن
              </CButton>
            </CModalFooter> */}
          </CModal>
        }
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
//SinjaDev
export default CustomerFullLog
