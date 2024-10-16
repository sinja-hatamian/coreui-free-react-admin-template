import React, { useState, useRef } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import jalaali from 'jalaali-js'
import { useReactToPrint } from 'react-to-print'
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

  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onBeforePrint: () => {
      const height = handlePixcel(contentRef.current.offsetHeight)
      const style = document.createElement('style')
      style.innerHTML = `@media print { @page { size: 8cm ${
        height * 2
      }cm; margin:0; } .table { width: 100%; direction: rtl; } }`
      document.head.appendChild(style)
      return new Promise((resolve) => {
        resolve()
      })
    },
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

  const handlePixcel = (px) => {
    let d = document.body

    let customeEl = document.createElement('div')
    customeEl.id = 'printer'
    customeEl.style =
      'position: absolute; top: -10000cm; left: -10000cm; height:1000cm; width:1000cm '
    d.appendChild(customeEl)

    let pixcel = customeEl.offsetHeight / 1000
    customeEl.remove()
    return px / pixcel
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
        setCustomerFullReport(res.data.data.report)
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
                        // Adjust to Tehran time (UTC+3:30)
                        const tehranOffset = 3.5 * 60 * 60 * 1000 // +3:30 in milliseconds
                        const tehranDate = new Date(dateTime.getTime() - tehranOffset)
                        const jalaliDate = jalaali.toJalaali(tehranDate)
                        const jalaliTime = `${tehranDate
                          .getHours()
                          .toString()
                          .padStart('2', '0')}:${tehranDate
                          .getMinutes()
                          .toString()
                          .padStart('2', '0')}`
                        const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`

                        return date + '-' + jalaliTime
                      })()}
                    </CTableDataCell>
                    <CTableDataCell>
                      {(() => {
                        if (item.ExitTime === null) {
                          return 'خارج نشده'
                        }

                        const dateTime = new Date(item.ExitTime)
                        // Adjust to Tehran time (UTC+3:30)
                        const tehranOffset = 3.5 * 60 * 60 * 1000 // +3:30 in milliseconds
                        const tehranDate = new Date(dateTime.getTime() - tehranOffset)
                        const jalaliDate = jalaali.toJalaali(tehranDate)
                        const jalaliTime = `${tehranDate
                          .getHours()
                          .toString()
                          .padStart(2, '0')}:${tehranDate.getMinutes().toString().padStart(2, '0')}`
                        const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`

                        // Check if exit time is 00:30
                        const isExitTime0030 =
                          tehranDate.getHours() === 0 && tehranDate.getMinutes() === 30

                        return (
                          <span style={{ color: isExitTime0030 ? 'red' : 'black' }}>
                            {date + '-' + jalaliTime}
                          </span>
                        )
                      })()}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.AllCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{
                        color: item.RemainCharge < 0 ? 'red' : 'green',
                      }}
                    >
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
                    {/* <CTableHeaderCell> زمان ورود به بازی </CTableHeaderCell>
                    <CTableHeaderCell>زمان خروج از بازی </CTableHeaderCell> */}
                    <CTableHeaderCell>شارژ مصرفی دستبند</CTableHeaderCell>
                    <CTableHeaderCell> مشاهده جزئیات </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {customerReport.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.TagSerial}</CTableDataCell>
                      <CTableDataCell>
                        {item.UseCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
            <CModalBody className="table" ref={contentRef}>
              {customerFullReport.map((item) => (
                <CTable key={item.id} striped className="mb-4">
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
                      <CTableDataCell>{item.customerTagSerial}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>زمان ورود</CTableHeaderCell>
                      <CTableDataCell>
                        {(() => {
                          const dateTime = new Date(item.inOutLogEnterTime)
                          const jalaliDate = jalaali.toJalaali(dateTime)
                          const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                          const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                          return date + '-' + time
                        })()}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>زمان خروج</CTableHeaderCell>
                      <CTableDataCell>
                        {(() => {
                          const dateTime = new Date(item.inOutLogExitTime)
                          const jalaliDate = jalaali.toJalaali(dateTime)
                          const date = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
                          const time = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`
                          return date + '-' + time
                        })()}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>نام بازی</CTableHeaderCell>
                      <CTableDataCell>{item.gameName ? item.gameName : '-'}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>هزینه در بازی</CTableHeaderCell>
                      <CTableDataCell>
                        {item.inOutLogPrice ? item.inOutLogPrice : '-'}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>تایم اصلی بازی(دقیقه)</CTableHeaderCell>
                      <CTableDataCell>{item.gameBaseTime ? item.gameBaseTime : '-'}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>تایم حضور در بازی(دقیقه)</CTableHeaderCell>
                      <CTableDataCell>{item.totalPlayTime}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>تایم استراحت (دقیقه)</CTableHeaderCell>
                      <CTableDataCell>
                        {item.inOutLogAbsentTime ? item.inOutLogAbsentTime : '-'}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              ))}
              <div>
                <CButton color="warning" onClick={reactToPrintFn}>
                  پرینت
                </CButton>
              </div>
            </CModalBody>
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
