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
} from '@coreui/react'

const AddCallReport = () => {
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })
  const [formData, setFormData] = useState({
    user_id: '',
    description: '',
    rete: '',
  })

  const handleInput = (e) => {
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

  const handleAddCallReport = () => {
    AxiosInstance.post('/call-reports', formData)
      .then((res) => {
        console.log(res)
        toast.success('گزارش تماس با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <CCard>
          <CCardHeader>
            <strong>ثبت گزارش تماس</strong>
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
              {/* call report form */}
              <CCol md="6" className="mt-3">
                <CFormTextarea
                  type="textarea"
                  placeholder="توضیحات"
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                />
              </CCol>
              <CCol md="6" className="mt-3">
                <CFormInput
                  placeholder="امتیاز از یک تا ده"
                  name="rete"
                  value={formData.rete}
                  onChange={handleInput}
                />
              </CCol>
              <CCol md="12" className="mt-3">
                <CButton
                  color="success"
                  onClick={handleAddCallReport}
                  style={{
                    color: 'white',
                  }}
                >
                  ثبت گزارش
                </CButton>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default AddCallReport
