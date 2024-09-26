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
  const [classes, setClasses] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    price: '',
    is_active: '',
  })

  useEffect(() => {
    AxiosInstance.get('/classes')
      .then((res) => {
        setClasses(res.data.data.classes)
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
                {classes.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.start_date}</CTableDataCell>
                    <CTableDataCell>{item.end_date}</CTableDataCell>
                    <CTableDataCell>{item.start_time}</CTableDataCell>
                    <CTableDataCell>{item.end_time}</CTableDataCell>
                    <CTableDataCell>{item.sessions}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info">ویرایش</CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger">حذف</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default ClassReg
