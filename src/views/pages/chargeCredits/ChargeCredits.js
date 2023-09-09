import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableHeader,
  CTableDataCell,
  CTableHeaderCell,
} from '@coreui/react'

const ChargeCredits = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [credit, setCredit] = useState([])
  const [charge, setCharge] = useState({
    charge_amount: '',
    credit_amount: '',
  })

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setCharge((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/manager/charge-credits', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data.data)
        setCredit(res.data.data.charge_credits)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleAddCredit = () => {
    axios
      .post('http://localhost:4000/api/manager/charge-credits/', charge, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data.data)
        setCredit([...credit, res.data.data.charge_credit])
        alert('اعتبار با موفقیت افزوده شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در افزودن اعتبار')
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            لیست اعتبارات
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افرودن اعتبار
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs="12">
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست اعتبارات</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>مبلغ</CTableHeaderCell>
                        <CTableHeaderCell>اعتبار</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {credit.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.charge_amount}</CTableDataCell>
                          <CTableDataCell>{item.credit_amount}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن اعتبار</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="مبلغ"
                        placeholder="مبلغ"
                        name="charge_amount"
                        aria-label="charge_amount"
                        locale="fa-IR"
                        value={charge.charge_amount}
                        onChange={handleChangeInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="اعتبار"
                        placeholder="اعتبار"
                        name="credit_amount"
                        aria-label="credit_amount"
                        locale="fa-IR"
                        value={charge.credit_amount}
                        onChange={handleChangeInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CButton color="primary" onClick={handleAddCredit}>
                        افزودن
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default ChargeCredits
