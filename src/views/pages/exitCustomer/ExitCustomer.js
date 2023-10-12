import React, { useState, useRef, useEffect } from 'react'
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
} from '@coreui/react'

const ExitCustomer = () => {
  const [tag, setTag] = useState({
    tag: '',
  })
  const [customers, setCustomers] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleInputChange = (e) => {
    setTag({
      ...tag,
      [e.target.name]: e.target.value,
    })
  }

  const handleExit = () => {
    AxiosInstance.post('/attendants/exit', tag)
      .then((res) => {
        console.log(res.data)
        if (res.data.data?.customers) {
          setCustomers(res.data.data.customers)
        }
        setTag({
          tag: '',
        })
        alert('خروج با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg)
      })
  }
  return (
    <CRow>
      <CCol xs="12">
        <CFormInput
          name="tag"
          placeholder="Tag"
          onChange={handleInputChange}
          value={tag.tag}
          ref={inputRef}
        />
      </CCol>
      <p></p>
      <CCol>
        <CButton color="primary" onClick={handleExit}>
          ثبت خروج
        </CButton>
      </CCol>
      <CCol xs="12">
        <CRow>
          <p />
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
                <CTableHeaderCell>تاریخ ورود</CTableHeaderCell>
                <CTableHeaderCell>تاریخ خروج</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{customer.number}</CTableDataCell>
                  <CTableDataCell>
                    {Intl.DateTimeFormat('fa-IR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(customer.EnterTime.split('.')[0]))}
                  </CTableDataCell>
                  <CTableDataCell>
                    {customer.ExitTime
                      ? Intl.DateTimeFormat('fa-IR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(
                          new Date(customer.ExitTime.split('.')[0]),
                          // Helper.getIsoDateWithTimezone(new Date(customer.ExitTime).getTime()),
                        )
                      : '-'}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default ExitCustomer
