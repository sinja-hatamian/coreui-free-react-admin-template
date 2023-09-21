import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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
      AxiosInstance.get(`/cards/${customer.id}`)
        .then((res) => {
          console.log(res)
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
    const rawNumber = value.replace(/[^0-9]/g, '')
    const formattedData = numberWithCommas(rawNumber)
    setCardForm({
      ...cardForm,
      [name]: formattedData,
    })
  }

  const handleUpdate = () => {
    const customer = JSON.parse(localStorage.getItem('customer'))
    AxiosInstance.put(`/manager/cards`, {
      user_id: customer.id,
      ...cardForm,
    })
      .then((res) => {
        console.log(res)
        alert('به روزرسانی با موفقیت انجام شد')(false) // Exit editing mode after successful update
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در به روزرسانی')
      })
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
