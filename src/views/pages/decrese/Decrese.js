import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CRow, CCol, CCardHeader, CCardBody, CCard, CFormInput, CButton } from '@coreui/react'

const Decrese = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    description: '',
  })
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })
  const [nationalCode, setNationalCode] = useState('')
  const [card, setCard] = useState({})

  const handleInput = (e) => {
    const rawNumber = e.target.value
    const name = e.target.name
    const value = rawNumber.replace(/[^0-9]/g, '')
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // useEffect(() => {
  //   if (localStorage.getItem('customer')) {
  //     const customer = JSON.parse(localStorage.getItem('customer'))
  //     AxiosInstance.get(`/cards/${customer.id}`)
  //       .then((res) => {
  //         setCard(res.data.data.card)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         toast.error('خطا در دریافت اطلاعات کارت')
  //       })
  //   }
  // }, [])

  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        AxiosInstance.get(`/cards/${res.data.data.user.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
          })
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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                  {customerData.firstname + ' ' + customerData.lastname}
                  <p />
                  <p>
                    موجودی کارت: {card.balance ? numberWithCommas(card.balance) : 0} ریال
                    <br />
                    شماره کارت: {card.number}
                  </p>
                </div>
              </CCol>

              {/* Transaction Section */}
              <CCol md="6" className="mt-3">
                <CFormInput
                  name="amount"
                  placeholder="مبلغ"
                  onChange={handleInput}
                  value={numberWithCommas(formData.amount)}
                />
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
