import React, { useEffect, useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'

const Decrese = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    description: '',
  })
  const [nationalCode, setNationalCode] = useState('')
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        const customerData = res.data.data.user
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

  const handleDecrese = () => {
    AxiosInstance.post('/cards/decrease', formData)
      .then((res) => {
        console.log(res)
        toast.success('موفقیت آمیز بود')
      })
      .catch((err) => {
        console.log(err)
        toast.error('خطا رخ داد')
      })
  }

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <CCard>
          <CCardHeader>
            <strong>مدیریت مالی حساب مشتری</strong>
          </CCardHeader>
          <CCardBody>
            <CCol md="12">
              {/* Search Section */}
              <CCol md="6">
                <CFormInput
                  name="nationalCode"
                  placeholder="کد ملی"
                  onChange={(e) => setNationalCode(e.target.value)}
                />
                <CButton color="success" onClick={fetchUser} className="mt-2">
                  جستجو
                </CButton>
              </CCol>

              {/* Customer Details */}
              <CCol md="12" className="mt-3">
                <div
                  className="text-center"
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                >
                  مشخصات مشتری:
                  <br />
                  {customerData.firstname + ' ' + customerData.lastname}
                </div>
              </CCol>

              {/* Transaction Section */}
              <CCol md="6" className="mt-3">
                <CFormInput name="amount" placeholder="مبلغ" onChange={handleInput} />
              </CCol>
              <CCol md="6" className="mt-3">
                <CFormInput name="description" placeholder="توضیحات" onChange={handleInput} />
              </CCol>
              <CCol md="6" className="mt-3">
                <CButton color="primary" onClick={handleDecrese}>
                  کاهش موجودی
                </CButton>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Decrese
