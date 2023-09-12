import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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
  const [operatorList, setOperatorList] = useState([])
  const [operator, setOperator] = useState({
    national_code: '',
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    is_superadmin: true,
  })

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    setOperator((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    AxiosInstance.get('/managers')
      .then((res) => {
        console.log(res.data.data)
        setOperatorList(res.data.data.managers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleUpdateOperator = (id) => {
    AxiosInstance.put(`/managers/${id}`, operator)
      .then((res) => {
        console.log(res)
        alert('اپراتور با موفقیت ویرایش شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش اپراتور')
      })
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>لیست اپراتورها</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>نام</CTableHeaderCell>
                    <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                    <CTableHeaderCell>کد ملی</CTableHeaderCell>
                    <CTableHeaderCell>شماره تماس</CTableHeaderCell>
                    <CTableHeaderCell>نام کاربری</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {operatorList.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.firstname}</CTableDataCell>
                      <CTableDataCell>{item.lastname}</CTableDataCell>
                      <CTableDataCell>{item.national_code}</CTableDataCell>
                      <CTableDataCell>{item.phone}</CTableDataCell>
                      <CTableDataCell>{item.username}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => handleUpdateOperator(item.id)}>
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
    </>
  )
}

export default OperatorList
