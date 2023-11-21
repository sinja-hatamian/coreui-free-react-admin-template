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
} from '@coreui/react'

const ShowByTag = () => {
  const [tag, setTag] = useState({
    tag: '',
  })
  const [customers, setCustomers] = useState([])
  const [card, setCard] = useState({})
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
        AxiosInstance.get(`/cards/${customerData.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
            toast.error('خطا در دریافت اطلاعات کارت')
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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
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
                <CTableHeaderCell>نام</CTableHeaderCell>
                <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                <CTableHeaderCell>کد ملی</CTableHeaderCell>
                <CTableHeaderCell>شماره تماس</CTableHeaderCell>
                <CTableHeaderCell> موجودی حساب</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>{fomedata.firstname}</CTableDataCell>
                <CTableDataCell>{fomedata.lastname}</CTableDataCell>
                <CTableDataCell>{fomedata.national_code}</CTableDataCell>
                <CTableDataCell>{fomedata.phone}</CTableDataCell>
                <CTableDataCell>
                  {card.balance ? numberWithCommas(card.balance) + ' ریال' : 0 + ' ریال'}
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCol>
        <CCol xs="12" md="12" className="mb-4">
          <strong>اطلاعات همراهان</strong>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>شماره دستبند</CTableHeaderCell>
                <CTableHeaderCell>زمان ورود </CTableHeaderCell>
                <CTableHeaderCell> زمان خروج</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer) => (
                <CTableRow key={customer.id}>
                  <CTableDataCell>{customer.TagSerial}</CTableDataCell>
                  <CTableDataCell>
                    {customer.EnterTime
                      ? new Date(customer.EnterTime).toLocaleDateString('fa-IR')
                      : ''}
                  </CTableDataCell>
                  <CTableDataCell>{customer.ExitTime}</CTableDataCell>
                </CTableRow>
              ))}
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
    </>
  )
}
export default ShowByTag
