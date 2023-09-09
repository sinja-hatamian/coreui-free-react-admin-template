import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CTable,
  CButton,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTableRow,
} from '@coreui/react'

const OperatorList = () => {
  return <div>operator list</div>
  //   const [operatorData, setOperatorData] = useState([])
  //   const [operators, setOperators] = useState({
  //     firstname: '',
  //     lastname: '',
  //     national_code: '',
  //     username: '',
  //     phone: '',
  //   })

  //   return (
  //     <>
  //       <CRow>
  //         <CCol xs="12">
  //           <CCard className="mb-4">
  //             <CCardHeader>
  //               <strong> لیست اپراتورها</strong>
  //             </CCardHeader>
  //             <CCardBody>
  //               <CTable striped>
  //                 <CTableHead>
  //                   <CTableRow>
  //                     <CTableHeaderCell>نام</CTableHeaderCell>
  //                     <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
  //                     <CTableHeaderCell>کد ملی</CTableHeaderCell>
  //                     <CTableHeaderCell>نام کاربری</CTableHeaderCell>
  //                     <CTableHeaderCell>شماره تماس</CTableHeaderCell>
  //                   </CTableRow>
  //                 </CTableHead>
  //               </CTable>
  //             </CCardBody>
  //             {operatorData.map((operator) => (
  //               <CTableRow key={operator._id}>
  //                 <CTableDataCell>{operator.firstname}</CTableDataCell>
  //                 <CTableDataCell>{operator.lastname}</CTableDataCell>
  //                 <CTableDataCell>{operator.national_code}</CTableDataCell>
  //                 <CTableDataCell>{operator.username}</CTableDataCell>
  //                 <CTableDataCell>{operator.phone}</CTableDataCell>
  //               </CTableRow>
  //             ))}
  //           </CCard>
  //         </CCol>
  //       </CRow>
  //     </>
  //   )
  // }
}

export default OperatorList
