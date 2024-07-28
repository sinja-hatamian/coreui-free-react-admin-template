import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CFormInput,
  CButton,
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

  const showCallReports = () => {
    console.log(customerData.id)
    AxiosInstance.get(`/call-reports/`, {
      params: {
        user_id: formData.user_id,
      },
    })
      .then((res) => {
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
              <CCol md="12">
                {/* search section */}
                <CRow className="mt-3">
                  <CCol md="6">
                    <CFormInput
                      placeholder="کد ملی"
                      name="nationalCode"
                      value={nationalCode}
                      onChange={(e) => {
                        setNationalCode(e.target.value)
                      }}
                    />
                  </CCol>
                  <CCol md="6">
                    <CButton color="primary" onClick={fetchUser}>
                      جستجو
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md="6">
                    <CFormInput
                      placeholder="شماره تماس"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                      }}
                    />
                  </CCol>
                  <CCol md="6">
                    <CButton color="primary" onClick={fetchUSerByPhone}>
                      جستجو
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>
              {/* customer info */}
              <CCol md="12" className="mt-3">
                <div
                  className="text-center"
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', // Corrected from 'justifyItems' to 'alignItems' for proper CSS
                    flexDirection: 'column', // Added for vertical alignment of items
                  }}
                >
                  مشخصات مشتری:
                  <br />
                  {customerData.firstname} {customerData.lastname}
                </div>
              </CCol>
              <br />
              <CRow>
                <CButton onClick={showCallReports} color="primary">
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
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CRow>
    </>
  )
}

export default CallReport
