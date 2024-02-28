import React, { useState, useEffect, useRef } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BeatLoader } from 'react-spinners'
import {
  CCol,
  CRow,
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
} from '@coreui/react'

const ShowByTag = () => {
  const [tag, setTag] = useState({
    tag: '',
  })
  const [customers, setCustomers] = useState([])
  const [card, setCard] = useState({
    balance: '',
  })
  const inputRef = useRef(null)
  const [fomedata, setFomedata] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    national_code: '',
  })
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false) // State for disabling button
  const [isLoading, setIsLoading] = useState(false) // State for loading
  const [showModal, setShowModal] = useState(false) // State for showing modal
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
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

  const handleInput = (e) => {
    setTag({
      ...tag,
      [e.target.name]: e.target.value,
    })
  }

  const handlePeymentChange = (e, index) => {
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

  const handleShowTag = () => {
    AxiosInstance.get(`/users/tag-serial/${tag.tag}`)
      .then((res) => {
        const customerData = res.data.data.user
        setUser(customerData)
        // console.log(customerData)
        setFomedata((prev) => ({
          ...prev,
          ...customerData,
        }))
        setCustomers(res.data.data.user.customers)
        setTag({
          tag: '',
        })
        AxiosInstance.get(`/cards/${customerData.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
            toast.error('خطا در دریافت اطلاعات کارت')
            localStorage.removeItem('customer')
          })
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
        setFomedata({
          firstname: '',
          lastname: '',
          phone: '',
          national_code: '',
        })
        setCard({
          balance: '',
        })
      })
  }

  const handleExit = (TagSerial) => {
    AxiosInstance.post('/attendants/exit', { tag: TagSerial })
      .then((res) => {
        console.log(res.data)
        if (res.data.data?.customers) {
          setCustomers(res.data.data.customers)
          if (!res.data.data.customers.find((customer) => customer.ExitTime == null)) {
            // window.location.reload()
            localStorage.removeItem('customer')
          }
        }
        toast.success('خروج با موفقیت ثبت شد')
        //remove customer from localstorage
        localStorage.removeItem('customer')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
        localStorage.removeItem('customer')
      })
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

  const handleForm = () => {
    console.log('handle form called')
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
      console.log('has error')
      return
    }

    setIsButtonDisabled(true) // Disable the button
    setIsLoading(true) // Start loading spinner

    if (user) {
      // const customer = JSON.parse(localStorage.getItem('customer'))
      // console.log(customer.id)
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
        user_id: user.id,
      })
        .then((res) => {
          console.log(res)
          const totalAmount = numberWithCommas(res.data.data.total_amount)
          toast.success(`شارژ با موفقیت انجام شد. مبلغ کل: ${totalAmount} ریال`)
          //clear form
          setCardForm([initialCardForm])
          setSelectedTypes([''])
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
    <>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CFormInput
            name="tag"
            placeholder="Tag"
            value={tag.tag}
            onChange={handleInput}
            // innerRef={inputRef}
          />
          <CButton color="primary" className="mt-2" onClick={handleShowTag}>
            نمایش
          </CButton>
        </CCol>
        <CCol xs="12" md="12" className="mb-4">
          <CTable striped bordered style={{ textAlign: 'center' }}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>نام</CTableHeaderCell>
                <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                <CTableHeaderCell>کد ملی</CTableHeaderCell>
                <CTableHeaderCell>شماره تماس</CTableHeaderCell>
                <CTableHeaderCell> موجودی حساب</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>{fomedata.firstname}</CTableDataCell>
                <CTableDataCell>{fomedata.lastname}</CTableDataCell>
                <CTableDataCell>{fomedata.national_code}</CTableDataCell>
                <CTableDataCell>{fomedata.phone}</CTableDataCell>
                <CTableDataCell>
                  {card.balance ? numberWithCommas(card.balance) + ' ریال' : 0 + ' ریال'}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => setShowModal(true)}>
                    تسویه
                  </CButton>
                  <CModal visible={showModal} show={showModal} onClose={() => setShowModal(false)}>
                    <CModalHeader closeButton>
                      <CModalTitle>تسویه حساب</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
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
                                    onChange={(e) => handlePeymentChange(e, index)}
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
                                    onChange={(e) => handlePeymentChange(e, index)}
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
                                        onChange={(e) => handlePeymentChange(e, index)}
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
                                        onChange={(e) => handlePeymentChange(e, index)}
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
                                      onChange={(e) => handlePeymentChange(e, index)}
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
                              <CButton
                                color="success"
                                onClick={() => handleForm()}
                                disabled={isButtonDisabled}
                              >
                                {isLoading ? (
                                  // Show the spinner while loading
                                  <BeatLoader color={'#ffffff'} loading={true} size={10} />
                                ) : (
                                  'ثبت'
                                )}
                              </CButton>
                            </CCol>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CModalBody>
                  </CModal>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCol>
        <CCol xs="12" md="12" className="mb-4">
          <strong>اطلاعات همراهان</strong>
          <p />
          <CTable striped bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
                <CTableHeaderCell>زمان ورود </CTableHeaderCell>
                <CTableHeaderCell> زمان خروج</CTableHeaderCell>
                <CTableHeaderCell> ثبت خروج</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer) => (
                <CTableRow
                  key={customer.id}
                  style={{ backgroundColor: customer.ExitTime == null ? '#fff' : '#e04a5e' }}
                >
                  <CTableDataCell>{customer.TagSerial}</CTableDataCell>
                  <CTableDataCell>
                    {customer.EnterTime.split('T')[1].split(':').slice(0, 2).join(':')}
                  </CTableDataCell>{' '}
                  <CTableDataCell>{customer.ExitTime}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      disabled={customer.ExitTime != null}
                      onClick={() => {
                        return handleExit(customer.TagSerial)
                      }}
                      color="success"
                    >
                      ثبت خروج
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          rtl={true}
          pauseOnFocusLoss
        />
      </CRow>
    </>
  )
}
export default ShowByTag
