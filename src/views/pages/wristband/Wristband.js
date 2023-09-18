import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CTable,
  CTableRow,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
} from '@coreui/react'

const Wristband = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [wristband, setWristband] = useState([])

  useEffect(() => {
    AxiosInstance.get('/wrist-bands')
      .then((res) => {
        setWristband(res.data.data.wrist_bands)
        console.log(res.data.data.wrist_bands)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            لیست دستبندها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن دستبند جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست دستبند ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>شماره دستبند </CTableHeaderCell>
                        <CTableHeaderCell> تگ دستبند</CTableHeaderCell>
                        <CTableHeaderCell>شماره سالن </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {wristband.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.number}</CTableDataCell>
                          <CTableDataCell>{item.tag}</CTableDataCell>
                          <CTableDataCell>{item.stage_id}</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="primary">ویرایش</CButton>
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
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>افزودن دستبند جدید</CCardHeader>
                <CCardBody>
                  <CRow>{/* <CCol xs={12} md={6}> */}</CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default Wristband
