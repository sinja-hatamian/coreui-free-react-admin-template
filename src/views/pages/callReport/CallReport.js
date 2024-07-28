import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CFormInput,
  CButton,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'

const CallReport = () => {
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [reports, setReports] = useState([])
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })
  const [formData, setFormData] = useState({
    user_id: '',
    user_firstname: '',
    user_lastname: '',
    manager_firstname: '',
    manager_lastname: '',
    description: '',
    rate: '',
  })

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setCustomerData(customerData)
        setFormData({
          ...formData,
          user_id: customerData.id,
        })
        toast.success('مشتری یافت شد')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchUSerByPhone = () => {
    AxiosInstance.get(`users/phone/${phone}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setCustomerData(customerData)
        setFormData({
          ...formData,
          user_id: customerData.id,
        })
        console.log(res)
        toast.success('مشتری یافت شد')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const showReports = () => {
    AxiosInstance.get(`/call-reports/${formData.user_id}`)
      .then((res) => {
        console.log(res.data.data)
        setReports(res.data.data.callReports)
      })

      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>گزارشات تماس</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CButton onClick={showReports} color="primary">
                  نمایش گزارشات
                </CButton>
              </CRow>
              <CRow>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>نام مشتری</CTableHeaderCell>
                      <CTableHeaderCell>نام مدیر</CTableHeaderCell>
                      <CTableHeaderCell>امتیاز</CTableHeaderCell>
                      <CTableHeaderCell>توضیحات</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {reports.map((report) => (
                      <CTableRow key={report.id}>
                        <CTableDataCell>
                          {report.user_firstname} {report.user_lastname}
                        </CTableDataCell>
                        <CTableDataCell>
                          {report.manager_firstname} {report.manager_lastname}
                        </CTableDataCell>
                        <CTableDataCell>{report.rate}</CTableDataCell>
                        <CTableDataCell>{report.description}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CallReport
