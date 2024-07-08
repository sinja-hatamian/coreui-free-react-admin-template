import React, { useEffect, useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CCol,
  CRow,
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCardHeader,
} from '@coreui/react'

const ClassReg = () => {
  const [activeKey, setActiveKey] = useState(1)

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            کلاس ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            ثبت کلاس جدید
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane visible={activeKey === 1} role="tabpanel" aria-braillelabel="profile">
          <CCard>
            <CCardHeader>
              <strong>لیست کلاس های ورزشی</strong>
            </CCardHeader>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>نام کلاس</CTableHeaderCell>
                  <CTableHeaderCell>تاریخ شروع</CTableHeaderCell>
                  <CTableHeaderCell>تاریخ پایان</CTableHeaderCell>
                  <CTableHeaderCell>ساعت شروع</CTableHeaderCell>
                  <CTableHeaderCell>ساعت پایان</CTableHeaderCell>
                  <CTableHeaderCell>تعداد جلسات</CTableHeaderCell>
                  <CTableHeaderCell>عملیات</CTableHeaderCell>
                  <CTableHeaderCell>حذف</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>کلاس 1</CTableDataCell>
                  <CTableDataCell>1400/01/01</CTableDataCell>
                  <CTableDataCell>1400/01/01</CTableDataCell>
                  <CTableDataCell>08:00</CTableDataCell>
                  <CTableDataCell>10:00</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="info" style={{ color: 'white' }}>
                      ویرایش
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="danger" style={{ color: 'white' }}>
                      حذف
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default ClassReg
