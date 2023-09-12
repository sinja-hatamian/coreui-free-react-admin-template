import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CButton,
  CRow,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CCol,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'

const GiftCard = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [card, setCard] = useState([])
  const [formdata, setFormdata] = useState({
    numbers: [''],
    amount: '',
    directive: '',
    description: '',
    is_active: '',
  })

  useEffect(() => {
    AxiosInstance.get('/gift-cards')
      .then((res) => {
        console.log(res)
        setCard(res.data.data.giftCards)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    if (name === 'numbers') {
      setFormdata((prev) => ({
        ...prev,
        numbers: [value],
      }))
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSaveGiftCard = () => {
    console.log(formdata)
    AxiosInstance.post('/gift-cards', formdata)
      .then((res) => {
        console.log(res)
        alert('کارت با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت کارت')
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            ثبت کارت هدیه
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            لیست کارت هدیه
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>ثبت کارت هدیه</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        label="کد کارت"
                        name="numbers"
                        placeholder="کد کارت"
                        aria-label="numbers"
                        locale="fa-IR"
                        value={formdata.numbers[0]}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                  </CRow>
                  <CForm className="row g-3">
                    <CCol md={6}>
                      <CCol xs>
                        <CFormInput
                          label="مبلغ"
                          name="amount"
                          placeholder="مبلغ"
                          aria-label="amount"
                          locale="fa-IR"
                          value={formdata.amount}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={6}>
                      <CCol xs>
                        <CFormInput
                          label="توضیحات"
                          name="description"
                          placeholder="توضیحات"
                          aria-label="description"
                          locale="fa-IR"
                          value={formdata.description}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={6}>
                      <CCol xs>
                        <CFormInput
                          label="وضعیت"
                          name="is_active"
                          placeholder="وضعیت"
                          aria-label="is_active"
                          locale="fa-IR"
                          value={formdata.is_active}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={6}>
                      <CCol xs>
                        <CFormInput
                          label="دستور دهنده"
                          name="directive"
                          placeholder="دستور دهنده"
                          aria-label="directive"
                          locale="fa-IR"
                          value={formdata.directive}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={12}>
                      <CButton type="button" onClick={handleSaveGiftCard}>
                        ثبت
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>لیست کارت هدیه</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>کد کارت</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ</CTableHeaderCell>
                    <CTableHeaderCell>توضیحات</CTableHeaderCell>
                    <CTableHeaderCell>وضعیت</CTableHeaderCell>
                    <CTableHeaderCell>دستور دهنده</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {card.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.number}</CTableDataCell>
                      <CTableDataCell>{item.amount}</CTableDataCell>
                      <CTableDataCell>{item.description}</CTableDataCell>
                      <CTableDataCell>{item.is_active}</CTableDataCell>
                      <CTableDataCell>{item.directive}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default GiftCard
