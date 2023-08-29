import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
      axios
        .get(`http://localhost:4000/api/manager/cards/${customer.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setCard(res.data.data.card)
          setCardForm({
            number: res.data.data.card.number,
            // password: res.data.data.card.password,
            received_card: res.data.data.card.received_card,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleUpdate = () => {
    const customer = JSON.parse(localStorage.getItem('customer'))
    axios
      .put(
        `http://localhost:4000/api/manager/cards`,
        {
          user_id: customer.id,
          ...cardForm,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        console.log(res)
        alert('به روزرسانی با موفقیت انجام شد')(false) // Exit editing mode after successful update
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در به روزرسانی')
      })
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
                  <CTableHeaderCell>{card.balance}</CTableHeaderCell>
                  <CTableHeaderCell>{card.received_card}</CTableHeaderCell>
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
                              label="پسورد"
                            />
                          </CCol>
                          <CCol md={6}>
                            <CFormInput
                              name="received_card"
                              value={cardForm.received_card}
                              onChange={handleInputChange}
                            />
                          </CCol>
                        </div>
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
