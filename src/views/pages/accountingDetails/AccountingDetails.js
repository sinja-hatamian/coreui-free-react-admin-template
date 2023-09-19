// import React, { useState, useEffect } from 'react'
// import AxiosInstance from 'src/utils/AxiosInstance'
// import {
//   CCol,
//   CRow,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CButton,
//   CTabContent,
//   CTabPane,
//   CTable,
//   CTableBody,
//   CTableRow,
//   CTableHead,
//   CTableDataCell,
//   CTableHeaderCell,
//   CFormInput,
//   CNav,
//   CNavItem,
//   CNavLink,
// } from '@coreui/react'

// const AccountingDetails = () => {
//   const [activeKey, setActiveKey] = useState(1)
//   const [accountingDetails, setAccountingDetails] = useState([])
//   const [accountingData, setAccountingData] = useState({
//     title: '',
//     accounting_code: '',
//     description: '',
//   })

//   const handleInputChange = (e) => {
//     setAccountingData({ ...accountingData, [e.target.name]: e.target.value })
//   }

//   return (
//     <>
//       <CNav variant="tabs" role="tablist">
//         <CNavItem>
//           <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
//             لیست اسناد
//           </CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
//             افزودن اسناد
//           </CNavLink>
//         </CNavItem>
//       </CNav>
//       <CTabContent>
//         <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
//           <CRow>
//             <CCol xs={12}>
//               <CCard className="mb-4">
//                 <CCardHeader>
//                   <strong>لیست اسناد</strong>
//                 </CCardHeader>
//                 <CCardBody>
//                   <CTable striped>
//                     <CTableHead>
//                       <CTableRow>
//                         <CTableHeaderCell>تیتر </CTableHeaderCell>
//                         <CTableHeaderCell> شماره حسابداری</CTableHeaderCell>
//                         <CTableHeaderCell>توضیحات </CTableHeaderCell>
//                       </CTableRow>
//                     </CTableHead>
//                     <CTableBody>
//                       {wristband.map((item) => (
//                         <CTableRow key={item.id}>
//                           <CTableDataCell>{item.number}</CTableDataCell>
//                           <CTableDataCell>{item.tag}</CTableDataCell>
//                           <CTableDataCell>{item.stage_id}</CTableDataCell>
//                           <CTableDataCell>
//                             <CButton
//                               color="primary"
//                               onClick={() => {
//                                 setWrist({
//                                   number: item.number,
//                                   tag: item.tag,
//                                   stage_id: item.stage_id,
//                                 })
//                                 setActiveKey(2)
//                               }}
//                             >
//                               ویرایش
//                             </CButton>
//                           </CTableDataCell>
//                           <CTableDataCell>
//                             <CButton
//                               color="danger"
//                               onClick={() => {
//                                 handleRemoveWrist(item.id)
//                               }}
//                             >
//                               حذف
//                             </CButton>
//                           </CTableDataCell>
//                         </CTableRow>
//                       ))}
//                     </CTableBody>
//                   </CTable>
//                 </CCardBody>
//               </CCard>
//             </CCol>
//           </CRow>
//         </CTabPane>
//         <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
//           <CRow>
//             <CCol xs={12}>
//               <CCard className="mb-4">
//                 <CCardHeader>افزودن دستبند جدید</CCardHeader>
//                 <CCardBody>
//                   <CRow>
//                     <CCol xs={12} md={6}>
//                       <CFormInput
//                         label="شماره دستبند"
//                         placeholder="شماره دستبند"
//                         name="number"
//                         value={wrist.number}
//                         onChange={handleInputChange}
//                       />
//                     </CCol>
//                     <CCol xs={12} md={6}>
//                       <CFormInput
//                         label="تگ دستبند"
//                         placeholder="تگ دستبند"
//                         name="tag"
//                         value={wrist.tag}
//                         onChange={handleInputChange}
//                       />
//                     </CCol>
//                     <CCol xs={12} md={6}>
//                       <CFormInput
//                         name="stage_id"
//                         label="شماره سالن"
//                         placeholder="شماره سالن"
//                         value={wrist.stage_id}
//                         onChange={handleInputChange}
//                       />
//                     </CCol>
//                     <CCol xs={12} md={4} style={{ margin: 15 + 'px' }}>
//                       <p></p>
//                       <CButton
//                         color="success"
//                         onClick={() => {
//                           if (wrist.id ? handleUpdateWrist() : handleAddWrist()) setActiveKey(1)
//                         }}
//                       >
//                         افزودن دستبند
//                       </CButton>
//                     </CCol>
//                   </CRow>
//                 </CCardBody>
//               </CCard>
//             </CCol>
//           </CRow>
//         </CTabPane>
//       </CTabContent>
//     </>
//   )
// }
// export default AccountingDetails
