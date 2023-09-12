import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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

const ChargCard = () => {
  // const [card, setCard] = useState([])
  const [cardForm, setCardForm] = useState({
    amount: '',
    type: '',
    bank: '',
    card_number: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    const rawNumber = value.replace(/[^0-9]/g, '')
    const formattedData = numberWithCommas(rawNumber)
    setCardForm({
      ...cardForm,
      [name]: formattedData,
    })
  }

  const handleForm = () => {
    if (localStorage.getItem('customer')) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      AxiosInstance.post('/cards/charge', {
        ...cardForm,
        user_id: customer.id,
      })
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

  const numberWithCommas = (x) => {
    //add comma to each 3 digit
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                    id="amount"
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
                    <option value="4">کارت هدیه</option>
                  </CFormSelect>
                </CCol>
                {cardForm.type === '2' ? (
                  <CCol md={6}>
                    <CFormSelect
                      label="بانک"
                      id="bank"
                      name="bank"
                      aria-label="bank"
                      onChange={handleInput}
                      value={cardForm.bank}
                      locale="fa-IR"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="1">بانک ملی</option>
                    </CFormSelect>
                  </CCol>
                ) : null}
                {cardForm.type === '4' ? (
                  <CCol md={6}>
                    <CFormInput
                      label="شماره کارت هدیه"
                      id="card_number"
                      name="card_number"
                      aria-label="card_number"
                      onChange={handleInput}
                      value={cardForm.card_number}
                      locale="fa-IR"
                    />
                  </CCol>
                ) : null}
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
