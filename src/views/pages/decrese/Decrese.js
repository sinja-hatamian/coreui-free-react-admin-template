import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react'

const Decrese = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    type: '',
    item_id: '',
  })
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState({})
  const [description, setDescription] = useState('')
  const [games, setGames] = useState([])
  const [gates, setGates] = useState([])

  useEffect(() => {
    AxiosInstance.get('/games')
      .then((res) => {
        setGames(res.data.data.games)
      })
      .catch((err) => {
        console.log(err)
      })

    AxiosInstance.get('/gates')
      .then((res) => {
        setGates(res.data.data.gates)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInput = (e) => {
    const rawNumber = e.target.value
    const name = e.target.name
    const value = rawNumber.replace(/[^0-9]/g, '')
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }

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

  const fetchUSerByPhone = () => {
    AxiosInstance.get(`users/phone/${phone}`)
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
        toast.success('موجودی کارت کاهش یافت')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
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
                <CButton
                  color="success"
                  onClick={fetchUser}
                  className="mt-2"
                  style={{
                    color: '#fff',
                  }}
                >
                  جستجو
                </CButton>
              </CCol>
              <br />
              <CCol md="6">
                <CFormInput
                  name="phone"
                  placeholder="شماره تلفن"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <CButton
                  color="success"
                  onClick={fetchUSerByPhone}
                  className="mt-2"
                  style={{
                    color: '#fff',
                  }}
                >
                  جستجو با شماره تلفن
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
                  </p>
                </div>
              </CCol>

              {/* Transaction Section */}
              <CCol md="6" className="mt-3">
                <CFormSelect
                  name="type"
                  onChange={handleInput}
                  value={formData.type}
                  placeholder="نوع تراکنش"
                >
                  <option value="0">حالت کسر مبلغ را انتخاب کنید </option>
                  <option value="1">متفرقه</option>
                  <option value="2">بازی</option>
                  <option value="3"> گیت</option>
                </CFormSelect>
              </CCol>

              {formData.type === '2' && (
                <CCol md="6" className="mt-3">
                  <CFormSelect name="item_id" onChange={handleInput} placeholder="بازی">
                    <option value="0">انتخاب بازی</option>
                    {games.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.Name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              )}
              {formData.type === '3' && (
                <CCol md="6" className="mt-3">
                  <CFormSelect name="item_id" onChange={handleInput} placeholder="گیت">
                    <option value="0">انتخاب گیت</option>
                    {gates.map((gate) => (
                      <option key={gate.id} value={gate.id}>
                        {gate.Name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              )}
              <CCol md="6" className="mt-3">
                {formData.type === '2' ? (
                  <div>
                    <strong>در حالت بازی به جای مبلغ دقیقه ثبت شود</strong>
                  </div>
                ) : formData.type === '3' ? (
                  <div>
                    <strong>در حالت گیت به جای مبلغ تعداد افراد ثبت شود</strong>
                  </div>
                ) : null}
                <p />

                <CFormInput
                  name="amount"
                  placeholder={
                    formData.type === '2'
                      ? 'دقیقه'
                      : formData.type === '3'
                      ? 'تعداد افراد'
                      : 'مبلغ به ریال'
                  }
                  onChange={handleInput}
                  value={numberWithCommas(formData.amount)}
                />
              </CCol>
              <p />
              {formData.type === '1' ? (
                <div>
                  <strong>در حالت متفرقه توضیحات الزامی می‌باشد</strong>
                </div>
              ) : null}
              <CCol md="6" className="mt-3">
                <CFormInput
                  name="description"
                  placeholder="توضیحات"
                  onChange={handleDescription}
                  value={description}
                />
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
