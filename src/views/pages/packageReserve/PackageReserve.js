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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <CRow>
        <CCol>
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
