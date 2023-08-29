import React, { useState, useEffect } from 'react'
import {
  CButton,
  CRow,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CCol,
  CFormSelect,
  CCardHeader,
} from '@coreui/react'
import axios from 'axios'

const ChargCard = () => {
  // const [card, setCard] = useState([])
  const [cardForm, setCardForm] = useState({
    amount: '',
    type: '',
  })

  const handleInput = (e) => {
    setCardForm({
      ...cardForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleForm = () => {
    if (localStorage.getItem('customer')) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      axios
        .post(
          'http://localhost:4000/api/manager/cards/charge',
          {
            ...cardForm,
            user_id: customer.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then((res) => {
          console.log(res)
          alert('شارژ با موفقیت انجام شد')
        })
        .catch((err) => {
          console.log(err)
          alert('خطا در شارژ کارت')
        })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>شارژ کارت</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <div className="col-md-12">
                <CCol md={6}>
                  <CFormInput
                    label="مبلغ"
                    id="amoint"
                    name="amount"
                    aria-label="amount"
                    onChange={handleInput}
                    value={cardForm.amount}
                    locale="fa-IR"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="نوع"
                    id="type"
                    name="type"
                    aria-label="type"
                    onChange={handleInput}
                    value={cardForm.type}
                    locale="fa-IR"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="2">پوز</option>
                    <option value="3">نقدی</option>
                    <option value="4">اپشنال</option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="col-12">
                <CButton type="button" onClick={handleForm}>
                  ثبت
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChargCard
