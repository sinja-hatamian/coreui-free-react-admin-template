import React, { useState } from 'react'
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
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'

const PackageReg = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_person: '',
    status: '',
  })

  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value

    // If name is price_per_person, then we should use commas when the user enters a number
    if (name === 'price_per_person') {
      // Remove existing commas
      value = value.replace(/,/g, '')
      // Format the number with commas
      if (!isNaN(value) && value !== '') {
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const addPackage = () => {
    AxiosInstance.post('/packages', formData)
      .then((res) => {
        console.log(res)
        toast.success('بسته جدید با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        toast.error('خطا در ثبت بسته')
      })
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>ثبت بسته جدید</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormInput
                name="title"
                placeholder="عنوان"
                onChange={handleInput}
                value={formData.title}
                className="mb-3"
              />
            </CCol>
            <CCol md="6">
              <CFormInput
                name="price_per_person"
                placeholder="قیمت"
                onChange={handleInput}
                value={formData.price_per_person}
                className="mb-3"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormSelect
                name="status"
                onChange={handleInput}
                value={formData.status}
                className="mb-3"
              >
                <option value="">وضعیت</option>
                <option value="1">فعال</option>
                <option value="0">غیرفعال</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="12">
              <CFormTextarea
                name="description"
                placeholder="توضیحات"
                onChange={handleInput}
                value={formData.description}
                rows="4"
                className="mb-3"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12" className="text-center">
              <CButton color="success" style={{ color: '#fff' }} onClick={addPackage}>
                ثبت
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
export default PackageReg
