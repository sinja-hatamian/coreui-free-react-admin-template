import React, { useState, useRef, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
} from '@coreui/react'

const ExitCustomer = () => {
  const [tag, setTag] = useState({
    tag: '',
  })
  const [customers, setCustomers] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (!customers.find((customer) => customer.ExitTime == null)) {
      localStorage.removeItem('customer')
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
<<<<<<< HEAD
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
  }, [customers])
=======
  }, [])
>>>>>>> parent of 2963ac7 (Change full page of exitCustomer)

  const handleInputChange = (e) => {
    setTag({
      ...tag,
      [e.target.name]: e.target.value,
    })
  }

  const handleExit = () => {
    AxiosInstance.post('/attendants/exit', tag)
      .then((res) => {
        if (res.data.data) {
          setCustomers(res.data.data.customers)
          toast.success('خروج با موفقیت ثبت شد')
        }
<<<<<<< HEAD
=======
        setTag({
          tag: '',
        })
        toast.success('خروج با موفقیت ثبت شد')
>>>>>>> parent of 2963ac7 (Change full page of exitCustomer)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  return (
<<<<<<< HEAD
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
                          {/* <CTable striped bordered>
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
                          </CTable> */}
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
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
                <CTableHeaderCell>زمان ورود </CTableHeaderCell>
                {/* <CTableHeaderCell> زمان خروج</CTableHeaderCell> */}
                <CTableHeaderCell> ثبت خروج</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer) => (
                <CTableRow
                  key={customer.id}
                  style={{
                    backgroundColor: customer.ExitTime !== null ? '#B31312' : '#2B2A4C',
                    color: '#fff',
                  }}
                >
                  <CTableDataCell>{customer.TagSerial}</CTableDataCell>
                  <CTableDataCell>
                    {customer.EnterTime
                      ? customer.EnterTime.split('T')[1].split(':').slice(0, 2).join(':')
                      : ''}
                  </CTableDataCell>{' '}
                  {/* <CTableDataCell>{customer.ExitTime}</CTableDataCell> */}
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        return handleExit(customer.TagSerial)
                      }}
                      color="success"
                      // If the customer has already exited, disable the button
                      disabled={customer.ExitTime !== null}
                    >
                      ثبت خروج
                    </CButton>
=======
    <CRow>
      <CCol xs="12">
        <CFormInput
          name="tag"
          placeholder="Tag"
          onChange={handleInputChange}
          value={tag.tag}
          ref={inputRef}
        />
      </CCol>
      <p></p>
      <CCol>
        <CButton color="primary" onClick={handleExit}>
          ثبت خروج
        </CButton>
      </CCol>
      <CCol xs="12">
        <CRow>
          <p />
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
                <CTableHeaderCell>تاریخ ورود</CTableHeaderCell>
                <CTableHeaderCell>تاریخ خروج</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{customer.TagSerial}</CTableDataCell>
                  <CTableDataCell>
                    {Intl.DateTimeFormat('fa-IR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(customer.EnterTime.split('.')[0]))}
                  </CTableDataCell>
                  <CTableDataCell>
                    {customer.ExitTime
                      ? Intl.DateTimeFormat('fa-IR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(
                          new Date(customer.ExitTime.split('.')[0]),
                          // Helper.getIsoDateWithTimezone(new Date(customer.ExitTime).getTime()),
                        )
                      : '-'}
>>>>>>> parent of 2963ac7 (Change full page of exitCustomer)
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CRow>
      </CCol>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
<<<<<<< HEAD
export default ShowByTag
=======

export default ExitCustomer
>>>>>>> parent of 2963ac7 (Change full page of exitCustomer)
