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
} from '@coreui/react'

const InfoCard = () => {
  const [card, setCard] = useState([])
  const [cardForm, setCardForm] = useState({
    user_id: '',
    number: '',
    password: '',
    received_card: '',
  })

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
          console.log(res.data.data.card)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

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
                  <CTableHeaderCell>شماره همراه</CTableHeaderCell>
                  <CTableHeaderCell>پسورد</CTableHeaderCell>
                  <CTableHeaderCell>موجودی کارت</CTableHeaderCell>
                  <CTableHeaderCell>وضعیت دریافت کارت</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell>{card.number}</CTableHeaderCell>
                  <CTableHeaderCell>{card.password}</CTableHeaderCell>
                  <CTableHeaderCell>{card.balance}</CTableHeaderCell>
                  <CTableHeaderCell>{card.received_card}</CTableHeaderCell>
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
