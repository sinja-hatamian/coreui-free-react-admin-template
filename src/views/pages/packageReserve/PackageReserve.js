import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'jalali-moment'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'
import { number } from 'prop-types'

const PackageReserve = () => {
  const [data, setData] = useState([])
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState({})
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })

  useEffect(() => {
    AxiosInstance.get('/package-reserves')
      .then((res) => {
        setData(res.data.data.package_reserves)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleDate = (date) => {
    let jalaliDate = moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY/M/D')
    return jalaliDate
  }

  const handleTime = (time) => {
    // Split the datetime string to get the time part
    let timePart = time.split('T')[1].split('.')[0]

    // Return only the hours and minutes
    return timePart.slice(0, 5)
  }

  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        AxiosInstance.get(`/cards/${res.data.data.user.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
          })
        const customerData = res.data.data.user
        setCustomerData(customerData)
        toast.success('مشتری یافت شد')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchUSerByPhone = () => {
    AxiosInstance.get(`users/phone/${phone}`)
      .then((res) => {
        AxiosInstance.get(`/cards/${res.data.data.user.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
          })
        const customerData = res.data.data.user
        setCustomerData(customerData)
        console.log(res)
        toast.success('مشتری یافت شد')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>جستجوی مشتری</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol md="6">
                    <CFormInput
                      placeholder="کد ملی"
                      name="nationalCode"
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                    />
                  </CCol>

                  <CCol md="6">
                    <CFormInput
                      placeholder="شماره تماس"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CButton color="info" onClick={fetchUser}>
                  جستجو
                </CButton>
                <CCol md="6">
                  <CButton color="info" onClick={fetchUSerByPhone}>
                    جستجو بر اساس شماره تماس
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
              <strong>اطلاعات مشتری</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="6">
                  <p>نام: {customerData.firstname}</p>
                </CCol>
                <CCol md="6">
                  <p>نام خانوادگی: {customerData.lastname}</p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              <strong>رزرو بسته</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>نام مشتری </CTableHeaderCell>
                    <CTableHeaderCell>تاریخ</CTableHeaderCell>
                    <CTableHeaderCell>ساعت شروع</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ کل</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.length > 0 &&
                    data.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>
                          {item.user_firstname + ' ' + item.user_lastname}
                        </CTableDataCell>
                        <CTableDataCell>{handleDate(item.date)}</CTableDataCell>
                        <CTableDataCell>{handleTime(item.start_time)}</CTableDataCell>
                        <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default PackageReserve
