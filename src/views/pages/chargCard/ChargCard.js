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
  const initialCardForm = {
    amount: '',
    type: '',
    bank_id: '',
    card_number: '',
    transaction_id: '',
  }

  const [cardForm, setCardForm] = useState([initialCardForm])
  const [selectedTypes, setSelectedTypes] = useState([''])
  const [banks, setBanks] = useState([])

  const handleInput = (e, index) => {
    const { name, value } = e.target
    const rawNumber = value.replace(/[^0-9]/g, '')
    const formattedData = numberWithCommas(rawNumber)
    const updatedCardForms = [...cardForm]
    updatedCardForms[index] = {
      ...updatedCardForms[index], // Copy the existing object
      [name]: formattedData, // Update the specific field
    }
    if (name === 'transaction_id' || name === 'card_number') {
      updatedCardForms[index] = {
        ...updatedCardForms[index], // Copy the existing object

        [name]: rawNumber, // Update the specific field
      }
    }
    setCardForm(updatedCardForms)
  }

  const handleTypeChange = (e, index) => {
    const { value } = e.target

    const updatedSelectedTypes = [...selectedTypes]
    updatedSelectedTypes[index] = value
    setSelectedTypes(updatedSelectedTypes)

    // Also update the type in the cardForms array
    const updatedCardForms = [...cardForm]
    updatedCardForms[index] = {
      ...updatedCardForms[index],
      type: value,
    }
    setCardForm(updatedCardForms)
  }

  useEffect(() => {
    AxiosInstance.get('/banks')
      .then((res) => {
        setBanks(res.data.data.banks)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleForm = () => {
    if (localStorage.getItem('customer')) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      AxiosInstance.post('/cards/charge', {
        payments: [
          ...cardForm.map((item) => {
            Object.keys(item).forEach((key) => {
              item[key] = item[key].replace(/[^0-9]/g, '')
              if (item[key] === '') {
                delete item[key]
              }
            })
            return item
          }),
        ],
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

  const CloneForm = () => {
    setCardForm([...cardForm, initialCardForm])
    setSelectedTypes([...selectedTypes, ''])
  }

  const removeForm = (index) => {
    const updatedCardForms = [...cardForm]
    updatedCardForms.splice(index, 1)
    setCardForm(updatedCardForms)
    const updatedSelectedTypes = [...selectedTypes]
    updatedSelectedTypes.splice(index, 1)
    setSelectedTypes(updatedSelectedTypes)
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
            {cardForm.map((cardForm, index) => (
              <CForm className="row g-3" key={index}>
                <CCol md={6}>
                  <CFormInput
                    label="مبلغ"
                    // id={`amount-${index}`}
                    name="amount"
                    aria-label="amount"
                    onChange={(e) => handleInput(e, index)}
                    value={cardForm.amount}
                    locale="fa-IR"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="نوع"
                    // id={`type-${index}`}
                    name="type"
                    aria-label="type"
                    onChange={(e) => handleTypeChange(e, index)}
                    value={cardForm.type}
                    locale="fa-IR"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="2">پوز</option>
                    <option value="3">نقدی</option>
                    <option value="4">کارت هدیه</option>
                    <option value="5">رایگان</option>
                  </CFormSelect>
                </CCol>
                {cardForm.type === '2' ? (
                  <>
                    <CCol md={6}>
                      {/* <CFormSelect
                        label="بانک"
                        // id={`bank_id${index}`}
                        name="bank_id"
                        aria-label="bank_id"
                        onChange={(e) => handleInput(e, index)}
                        value={cardForm.bank_id}
                        locale="fa-IR"
                      >
                        <option value="">انتخاب کنید</option>
                        <option value="1">بانک ملی</option>
                      </CFormSelect> */}
                      <CFormSelect
                        label="بانک"
                        name="bank_id"
                        aria-label="bank_id"
                        onChange={(e) => handleInput(e, index)}
                        value={cardForm.bank_id}
                        locale="fa-IR"
                      >
                        <option value="">انتخاب کنید</option>
                        {banks.map((bank) => (
                          <option key={bank.id} value={bank.id}>
                            {bank.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        label="شماره تراکنش"
                        // id={`transaction_id-${index}`}
                        name="transaction_id"
                        aria-label="transaction_id"
                        onChange={(e) => handleInput(e, index)}
                        value={cardForm.transaction_id}
                        locale="fa-IR"
                      />
                    </CCol>
                  </>
                ) : null}
                {cardForm.type === '4' ? (
                  <CCol md={6}>
                    <CFormInput
                      label="شماره کارت هدیه"
                      // id={`card_number-${index}`}
                      name="card_number"
                      aria-label="card_number"
                      onChange={(e) => handleInput(e, index)}
                      value={cardForm.card_number}
                      locale="fa-IR"
                    />
                  </CCol>
                ) : null}
                <CCol md={6}>
                  <CButton
                    style={{ color: '#fff' }}
                    color="danger"
                    onClick={() => removeForm(index)}
                  >
                    حذف
                  </CButton>
                </CCol>
              </CForm>
            ))}
            <p />
            <CCol md={6}>
              <CButton color="primary" onClick={CloneForm}>
                افزودن کارت جدید
              </CButton>
            </CCol>
            <p />
            <CCol md={6}>
              <CButton color="success" onClick={() => handleForm()}>
                ثبت
              </CButton>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChargCard
