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
  const [card, setCard] = useState({})
  const [description, setDescription] = useState('')
  const [games, setGames] = useState([])

  useEffect(() => {
    AxiosInstance.get('/games')
      .then((res) => {
        setGames(res.data.data.games)
        console.log(res.data.data.games)
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

  const handleDecrese = () => {
    AxiosInstance.post('/cards/decrease', formData)
      .then((res) => {
        toast.success('موجودی کارت کاهش یافت')
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000)
        console.log(res)
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
                  <option value="0">انتخاب کنید</option>
                  <option value="1">متفرقه</option>
                  <option value="2">بازی</option>
                  <option value="3"> گیت</option>
                </CFormSelect>
              </CCol>

              {formData.type === '2' && (
                <CCol md="6" className="mt-3">
                  <CFormSelect
                    name="item_id"
                    onChange={handleInput}
                    // value={formData.item_id}
                    placeholder="بازی"
                  >
                    <option value="0">انتخاب کنید</option>
                    {games.map((game) => (
                      <option key={game.id} value={game.item_id}>
                        {game.Name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              )}

              <CCol md="6" className="mt-3">
                {formData.type === '2' || formData.type === '3' ? (
                  <div>
                    <strong>مبلغ:</strong>
                    <p>در حالت بازی و گیت به جای مبلغ دقیقه ثبت شود</p>
                  </div>
                ) : null}

                <CFormInput
                  name="amount"
                  placeholder="مبلغ"
                  onChange={handleInput}
                  value={numberWithCommas(formData.amount)}
                />
              </CCol>
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
