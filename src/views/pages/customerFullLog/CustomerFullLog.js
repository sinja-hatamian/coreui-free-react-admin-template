// import React, { useState, useEffect } from 'react'
// import AxiosInstance from 'src/utils/AxiosInstance'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import DatePicker, { Calendar } from 'react-multi-date-picker'
// import persian from 'react-date-object/calendars/persian'
// import persian_fa from 'react-date-object/locales/persian_fa'
// import { format } from 'date-fns'

// import {
//   CCol,
//   CRow,
//   CTable,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CButton,
//   CTableBody,
//   CTableHead,
//   CTableHeaderCell,
//   CTableHeader,
//   CTableRow,
//   CTableCell,
//   CTableDataCell,
// } from '@coreui/react'

// const CustomerFullLog = () => {
//   const [report, setReport] = useState([])
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const customer = JSON.parse(localStorage.getItem('customer'))

//   const handleGetReport = () => {
//     AxiosInstance.get(
//       `/users/get-full-report/${customer.id}?start_date=${startDate}&end_date=${endDate}`,
//     )
//       .then((res) => {
//         setReport(res.data.data.report)
//         setStartDate(res.data.data.start_date)
//         setEndDate(res.data.data.end_date)
//         console.log(res.data.data.report)
//         console.log(startDate)
//         console.log(endDate)
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message)
//         console.log(error.response.data.message)
//       })
//   }

//   const handleStartDate = (newDate) => {
//     setStartDate(newDate.valueOf())
//   }
//   const handleEndDate = (newDate) => {
//     setEndDate(newDate.valueOf())
//   }

//   return (
//     <CRow>
//       <CCol xs="12" lg="12">
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>گزارش کامل مشتری</strong>
//           </CCardHeader>
//           <CCardBody>
//             <CRow>
//               <CCol xs="12" md="12">
//                 <strong>لطفا بازه زمانی گزارش را مشخص نمایید</strong>
//                 <p />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol xs="12" md="6">
//                 <DatePicker
//                   placeholder=" از تاریخ"
//                   value={startDate}
//                   onChange={handleStartDate}
//                   calendarPosition="bottom-right"
//                   inputPlaceholder=" از تاریخ"
//                   locale={persian_fa}
//                   calendar={persian}
//                 />
//               </CCol>
//               <CCol xs="12" md="6">
//                 <DatePicker
//                   placeholder=" تا تاریخ"
//                   value={endDate}
//                   onChange={handleEndDate}
//                   calendarPosition="bottom-right"
//                   inputPlaceholder=" تا تاریخ"
//                   locale={persian_fa}
//                   calendar={persian}
//                 />
//               </CCol>
//               <p />
//               <CButton color="primary" className="md-2" onClick={handleGetReport}>
//                 جستجو
//               </CButton>
//             </CRow>
//             <br />
//           </CCardBody>
//         </CCard>
//         <CCard>
//           <CCardHeader>
//             <strong>
//               نام مشتری: {customer.firstname} {customer.lastname}
//             </strong>
//           </CCardHeader>
//           <CCardBody>
//             <CTable striped>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
//                   <CTableHeaderCell>نام بازی</CTableHeaderCell>
//                   <CTableHeaderCell>زمان ورود </CTableHeaderCell>
//                   <CTableHeaderCell>زمان خروج </CTableHeaderCell>
//                   <CTableHeaderCell> مبلغ هزینه شده </CTableHeaderCell>
//                   <CTableHeaderCell> تایم اضافه </CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {report.map((item) => (
//                   <CTableRow key={item.id}>
//                     <CTableDataCell>{item.customerTagSerial}</CTableDataCell>
//                     <CTableDataCell>{item.gameName ? item.gameName : '-'}</CTableDataCell>
//                     <CTableDataCell>
//                       {item.inOutLogEnterTime
//                         ? format(new Date(item.inOutLogEnterTime), 'yyyy-MM-dd HH:mm:ss')
//                         : '-'}
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       {item.inOutLogExitTime
//                         ? format(new Date(item.inOutLogExitTime), 'yyyy-MM-dd HH:mm:ss')
//                         : '-'}
//                     </CTableDataCell>
//                     <CTableDataCell>{item.inOutLogPrice}</CTableDataCell>
//                     <CTableDataCell>{item.inOutLogAbsentTime}</CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default CustomerFullLog
