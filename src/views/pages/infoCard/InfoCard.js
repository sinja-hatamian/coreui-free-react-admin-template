import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const InfoCard = () => {
  const [card, setCard] = useState({})
  const [cardForm, setCardForm] = useState({
    number: '',
    password: '',
    received_card: '',
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('customer')) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      AxiosInstance.get(`/cards/${customer.id}`)
        .then((res) => {
          setCard(res.data.data.card)
          setCardForm({
            number: res.data.data.card.number,
            password: res.data.data.card.password,
            received_card: res.data.data.card.received_card,
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error('خطا در دریافت اطلاعات کارت')
        })
    }
  }, [])

  const handleInputChange = (e) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value })
  }

  const handleUpdate = () => {
    const customer = JSON.parse(localStorage.getItem('customer'))
    AxiosInstance.put('/cards', {
      user_id: customer.id,
      ...cardForm,
    })
      .then((res) => {
        console.log(res)
        toast.success('به روزرسانی با موفقیت انجام شد') // Exit editing mode after successful update
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>اطلاعات کارت</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>شماره کارت</CTableHeaderCell>
                  <CTableHeaderCell>موجودی کارت</CTableHeaderCell>
                  <CTableHeaderCell>وضعیت دریافت کارت</CTableHeaderCell>
                  <CTableHeaderCell>عملیات</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell>{card.number}</CTableHeaderCell>
                  <CTableHeaderCell>
                    {card.balance ? numberWithCommas(card.balance) : 0}
                  </CTableHeaderCell>
                  <CTableHeaderCell>
                    {card.received_card ? 'دریافت شده' : 'دریافت نشده'}
                  </CTableHeaderCell>
                  <CTableHeaderCell>
                    {editing ? (
                      <CForm>
                        <div className="col-12 row">
                          <CCol md={12}>
                            <CFormInput
                              name="number"
                              value={cardForm.number}
                              onChange={handleInputChange}
                              label="شماره کارت"
                            />
                          </CCol>
                          <CCol md={12}>
                            <CFormInput
                              name="password"
                              value={cardForm.password}
                              onChange={handleInputChange}
                              label="رمز کارت(4 رقم)"
                              type="password"
                            />
                          </CCol>
                          <CCol md={6}>
                            <CFormSelect
                              name="received_card"
                              aria-label="received_card"
                              value={cardForm.received_card}
                              onChange={handleInputChange}
                              label="وضعیت دریافت کارت"
                            >
                              <option value="">انتخاب کنید</option>
                              <option value={true}>دریافت شده</option>
                              <option value={false}>دریافت نشده</option>
                            </CFormSelect>
                          </CCol>
                        </div>
                        <p />
                        {/* Add other input fields for password, received_card, etc. */}
                        <CButton color="success" onClick={handleUpdate}>
                          ذخیره
                        </CButton>
                        <CButton color="danger" onClick={() => setEditing(false)}>
                          انصراف
                        </CButton>
                      </CForm>
                    ) : (
                      <CButton color="primary" onClick={() => setEditing(true)}>
                        ویرایش
                      </CButton>
                    )}
                  </CTableHeaderCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default InfoCard
