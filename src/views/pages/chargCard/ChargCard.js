import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BeatLoader } from 'react-spinners'
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
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
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
  const [selectCharge, setSelectCharge] = useState([''])
  const [banks, setBanks] = useState([])
  const [credit, setCredit] = useState([])
  const [card, setCard] = useState({})
  const [isButtonDisabled, setIsButtonDisabled] = useState(false) // State for disabling button
  const [isLoading, setIsLoading] = useState(false) // State for loading

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
    AxiosInstance.get('/charge-credits')
      .then((res) => {
        setSelectCharge(res.data.data.charge_credits)
      })
      .catch((err) => {
        console.log(err)
      })

    AxiosInstance.get('/charge-credits').then((res) => {
      setCredit(res.data.data.charge_credits)
    })

    if (localStorage.getItem('customer')) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      AxiosInstance.get(`/cards/${customer.id}`)
        .then((res) => {
          setCard(res.data.data.card)
        })
        .catch((err) => {
          console.log(err)
          toast.error('خطا در دریافت اطلاعات کارت')
        })
    }
  }, [])

  const handleForm = () => {
    let hasError = false
    cardForm.forEach((item) => {
      if (
        !item.amount ||
        !item.type ||
        (item.type === '2' && (!item.bank_id || !item.transaction_id))
      ) {
        hasError = true
        toast.error('لطفا تمامی فیلد ها را پر کنید')
        return
      }
    })
    if (hasError) {
      return
    }

    setIsButtonDisabled(true) // Disable the button
    setIsLoading(true) // Start loading spinner

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
          const totalAmount = numberWithCommas(res.data.data.total_amount)
          toast.success(`شارژ با موفقیت انجام شد. مبلغ کل: ${totalAmount} ریال`)
        })
        .catch((err) => {
          console.log(err)
          toast.error('خطا در شارژ کارت')
        })
        .finally(() => {
          setIsLoading(false) // Stop loading spinner
          setTimeout(() => {
            setIsButtonDisabled(false)
          }, 3000)
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
    if (x !== undefined && x !== null) {
      // add comma to each 3 digits
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      // handle the case where x is undefined or null
      return ''
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>شارژ کارت</strong>
            <strong style={{ float: 'left' }}>
              {card.balance ? numberWithCommas(card.balance) : 0} ریال
            </strong>
          </CCardHeader>
          <CCardBody>
            {cardForm.map((cardForm, index) => (
              <CForm className="row g-3" key={index}>
                <CCol md={6}>
                  <CFormSelect
                    name="amount"
                    label="اعتبارات"
                    onChange={(e) => handleInput(e, index)}
                    value={cardForm.amount}
                    locale="fa-IR"
                  >
                    <option value="">انتخاب کنید</option>
                    {selectCharge.map((charge) => (
                      <option key={charge.id} value={charge.charge_amount}>
                        {numberWithCommas(charge.charge_amount) + ' ' + 'ریال '}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="سایر مبالغ (ریال)"
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
                      <CFormSelect
                        label="بانک"
                        name="bank_id"
                        aria-label="bank_id"
                        onChange={(e) => handleInput(e, index)}
                        // value={cardForm.bank_id}
                        locale="fa-IR"
                        required={true}
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
                        label={
                          <>
                            شماره تراکنش<span style={{ color: 'red' }}>*</span>
                          </>
                        }
                        name="transaction_id"
                        aria-label="transaction_id"
                        onChange={(e) => handleInput(e, index)}
                        value={cardForm.transaction_id}
                        locale="fa-IR"
                        required={true}
                      />
                    </CCol>
                  </>
                ) : null}
                {cardForm.type === '4' ? (
                  <CCol md={6}>
                    <CFormInput
                      label="شماره کارت هدیه"
                      name="card_number"
                      aria-label="card_number"
                      onChange={(e) => handleInput(e, index)}
                      value={cardForm.card_number}
                      locale="fa-IR"
                    />
                  </CCol>
                ) : null}
                <CCol md={8}>
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
              <CButton color="success" onClick={() => handleForm()} disabled={isButtonDisabled}>
                {isLoading ? (
                  // Show the spinner while loading
                  <BeatLoader color={'#ffffff'} loading={true} size={10} />
                ) : (
                  'ثبت'
                )}
              </CButton>
            </CCol>
          </CCardBody>
          <CTable striped bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell
                  color="warning"
                  style={{
                    width: '45%',
                    color: '#EE5A9F',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  میزان شارژ (ریال)
                </CTableHeaderCell>
                <CTableHeaderCell
                  color="primary"
                  style={{
                    width: '45%',
                    color: '#EE5A9F',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  میزان اعتبار (ریال)
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {credit.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell style={{ textAlign: 'center' }}>
                    {numberWithCommas(item.charge_amount)}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: 'center' }}>
                    {numberWithCommas(item.credit_amount)}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CRow>
  )
}

export default ChargCard
