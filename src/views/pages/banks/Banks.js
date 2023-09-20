import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCardHeader,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFormInput,
} from '@coreui/react'

const Banks = () => {
  const [acttiveKey, setActtiveKey] = useState(1)
  const [bankslist, setBankslist] = useState([])
  const [bank, setBank] = useState({
    title: '',
    accounting_code: '',
  })

  useEffect(() => {
    AxiosInstance.get('/banks')
      .then((res) => {
        console.log(res.data)
        setBankslist(res.data.data.banks)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInputChange = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value })
  }

  const handleAddBank = () => {
    AxiosInstance.post('/banks', bank)
      .then((res) => {
        console.log(res.data.data)
        alert('بانک با موفقیت اضافه شد')
        setBankslist([...bankslist, res.data.data.bank])
        setActtiveKey(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUpdateBank = () => {
    AxiosInstance.put(`/banks/${bank.id}`, bank)
      .then((res) => {
        console.log(res.data.data)
        setBankslist([...bankslist.filter((item) => item.id != bank.id), res.data.data.bank])
        alert('بانک با موفقیت ویرایش شد')
        setActtiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش بانک')
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={acttiveKey === 1} onClick={() => setActtiveKey(1)}>
            لیست بانک ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={acttiveKey === 2} onClick={() => setActtiveKey(2)}>
            افزودن بانک
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-label="home-tab" visible={acttiveKey === 1}>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <strong>لیست بانک ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام بانک</CTableHeaderCell>
                        <CTableHeaderCell> کد حسابداری</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {bankslist.map((bank) => (
                        <CTableRow key={bank.id}>
                          <CTableDataCell>{bank.title}</CTableDataCell>
                          <CTableDataCell>{bank.accounting_code}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setBank({
                                  title: bank.title,
                                  accounting_code: bank.accounting_code,
                                })
                                setActtiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-label="profile-tab" visible={acttiveKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن بانک</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        label="نام بانک"
                        placeholder="نام بانک "
                        value={bank.title}
                        onChange={handleInputChange}
                        name="title"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        label="کد حسابداری"
                        placeholder="کد حسابداری"
                        value={bank.accounting_code}
                        onChange={handleInputChange}
                        name="accounting_code"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CButton
                        color="success"
                        onClick={() => {
                          bank.id ? handleUpdateBank() : handleAddBank()
                        }}
                      >
                        ثبت
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
export default Banks
