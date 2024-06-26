import React from 'react'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const ExportCard = () => {
  return (
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">کد ملی</CTableHeaderCell>
          <CTableHeaderCell scope="col">نام و نام خانوادگی</CTableHeaderCell>
          <CTableHeaderCell scope="col">شماره کارت </CTableHeaderCell>
          <CTableHeaderCell scope="col"> رمز عبور </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">1</CTableHeaderCell>
          <CTableDataCell>Mark</CTableDataCell>
        </CTableRow>
        <CTableRow></CTableRow>
        <CTableRow></CTableRow>
      </CTableBody>
      <CButton color="primary">ثبت</CButton>
    </CTable>
  )
}
export default ExportCard
