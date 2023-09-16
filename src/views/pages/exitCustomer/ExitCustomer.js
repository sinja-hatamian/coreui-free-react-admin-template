import React, { useState, useRef, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react'

const ExitCustomer = () => {
  const [tag, setTag] = useState({
    tag: '',
  })
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
        setTag({
          tag: res.data.data.tag,
        })
        alert('خروج با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت خروج')
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
        <CButton color="primary" onClick={handleExit}>
          ثبت خروج
        </CButton>
      </CCol>
    </CRow>
  )
}

export default ExitCustomer
