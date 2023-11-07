import React, { useState, useEffect, useRef } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  CForm,
} from '@coreui/react'

const ShowByTag = () => {
  const [tag, setTag] = useState({
    tag: '',
  })
  const [customers, setCustomers] = useState([])
  const [fomedata, setFomedata] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    national_code: '',
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

  const handleShowTag = () => {
    AxiosInstance.get(`/users/tag-serial/${tag.tag}`)
      .then((res) => {
        const customerData = res.data.data.user
        setFomedata((prev) => ({
          ...prev,
          ...customerData,
        }))
        setCustomers(res.data.data.user.customers)
        setTag({
          tag: '',
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
        setFomedata({
          firstname: '',
          lastname: '',
          phone: '',
          national_code: '',
        })
      })
  }

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CFormInput
          name="tag"
          placeholder="Tag"
          value={tag.tag}
          onChange={handleInputChange}
          innerRef={inputRef}
        />
        <CButton color="primary" className="mt-2" onClick={handleShowTag}>
          نمایش
        </CButton>
      </CCol>
      <CCol xs="12" md="12" className="mb-4">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">نام</CTableHeaderCell>
              <CTableHeaderCell scope="col">نام خانوادگی</CTableHeaderCell>
              <CTableHeaderCell scope="col">کد ملی</CTableHeaderCell>
              <CTableHeaderCell scope="col">شماره تماس</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{fomedata.firstname}</CTableDataCell>
              <CTableDataCell>{fomedata.lastname}</CTableDataCell>
              <CTableDataCell>{fomedata.national_code}</CTableDataCell>
              <CTableDataCell>{fomedata.phone}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={true}
        pauseOnFocusLoss
      />
    </CRow>
  )
}
export default ShowByTag
