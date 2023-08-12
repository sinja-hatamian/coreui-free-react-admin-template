import React from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const ChangeCard = () => {
  return (
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">نام و نام خانوادگی</CTableHeaderCell>
          <CTableHeaderCell scope="col">کد ملی</CTableHeaderCell>
          <CTableHeaderCell scope="col"> اعتبار(ریال) </CTableHeaderCell>
          <CTableHeaderCell scope="col"> قبلی شماره کارت</CTableHeaderCell>
          <CTableHeaderCell scope="col"> جدید شماره کارت</CTableHeaderCell>
          <CTableHeaderCell scope="col"> رمز عبور کارت جدید</CTableHeaderCell>
          <CTableHeaderCell scope="col"> نحوه پرداخت</CTableHeaderCell>
          <CTableHeaderCell scope="col"> عملیات</CTableHeaderCell>
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

export default ChangeCard
