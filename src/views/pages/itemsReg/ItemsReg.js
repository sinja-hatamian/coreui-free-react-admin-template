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

const ItemsReg = () => {
  const [formData, setFormData] = useState({
    title: '',
    parent_id: '',
    description: '',
    price: '',
    is_per_person: '',
    status: '',
  })

  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value

    // If name is price, then we should use commas when the user enters a number
    if (name === 'price') {
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

  const addItems = () => {
    AxiosInstance.post('/items', formData)
      .then((res) => {
        console.log(res)
        toast.success('آیتم جدید با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        toast.error('خطا در ثبت آیتم')
      })
  }

  return (
    <CRow>
      <CCard>
        <CCardHeader>
          <strong>ثبت آیتم جدید</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md="6" className="mb-3">
              <CFormInput
                name="title"
                placeholder="عنوان"
                value={formData.title}
                onChange={handleInput}
              />
            </CCol>
            <CCol md="6" className="mb-3">
              <CFormInput
                name="price"
                placeholder="قیمت"
                value={formData.price}
                onChange={handleInput}
              />
            </CCol>
            <CCol md="6" className="mb-3">
              <CFormInput
                name="parent_id"
                placeholder="parent_id"
                value={formData.parent_id}
                onChange={handleInput}
              />
            </CCol>
            <CCol md="6" className="mb-3">
              <CFormSelect
                name="is_per_person"
                onChange={handleInput}
                value={formData.is_per_person}
              >
                <option value="">آیا قابلیت انتخاب برای هر نفر دارد؟</option>
                <option value="true">بله</option>
                <option value="false">خیر</option>
              </CFormSelect>
            </CCol>
            <CCol md="6" className="mb-3">
              <CFormSelect name="status" onChange={handleInput} value={formData.status}>
                <option value="">وضعیت</option>
                <option value="1">فعال</option>
                <option value="2">غیرفعال</option>
              </CFormSelect>
            </CCol>
            <CCol md="12" className="mb-3">
              <CFormTextarea
                name="description"
                placeholder="توضیحات"
                value={formData.description}
                onChange={handleInput}
                rows="4"
              />
            </CCol>
            <CCol md="12" className="text-center">
              <CButton color="success" style={{ color: '#fff' }} onClick={addItems}>
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
    </CRow>
  )
}

export default ItemsReg
