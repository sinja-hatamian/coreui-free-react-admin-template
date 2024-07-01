import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import DatePicker from 'react-multi-date-picker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import {
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const ChargeForm = () => {
  const [chargeForm, setChargeForm] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [managerId, setManagerId] = useState('')
  const [managers, setManagers] = useState([])
  const [paymentHistories, setPaymentHistories] = useState({
    pos_amounts: {},
    gift_amount: '',
    cash_amount: '',
    additional__amount: '',
  })
  const [cash, setCash] = useState({
    amount: '',
    description: '',
  })

  useEffect(() => {
    AxiosInstance.get(`/payment-histories/register`)
      .then((res) => {
        console.log(res.data)
        setChargeForm(res.data.data.payment_histories)
        console.log(res.data.data.payment_histories.description)
        setPaymentHistories({
          pos_amounts: res.data.data.pos_amounts,
          gift_amount: res.data.data.gift_amount,
          cash_amount: res.data.data.cash_amount,
          additional__amount: res.data.data.additional__amount,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    const manager = JSON.parse(localStorage.getItem('manager'))
    if (manager.is_superadmin) {
      AxiosInstance.get('/managers')
        .then((res) => {
          console.log(res.data)
          setManagers(res.data.data.managers)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target
    const rawNumber = value.replace(/,/g, '')
    const formatedData = numberWithCommas(rawNumber)
    setCash({ ...cash, [name]: formatedData })
  }

  const handleFilter = () => {
    AxiosInstance.get(
      `/payment-histories/register?start_date=${startDate}&end_date=${endDate}&manager_id=${managerId} `,
    )
      .then((res) => {
        if (res.data.data.payment_histories.length === 0) {
          toast.error('گزارشی برای این بازه زمانی وجود ندارد')
        }
        console.log(res.data)
        setChargeForm(res.data.data.payment_histories)
        setPaymentHistories({
          pos_amounts: res.data.data.pos_amounts,
          gift_amount: res.data.data.gift_amount,
          cash_amount: res.data.data.cash_amount,
          additional__amount: res.data.data.additional__amount,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleManagerId = (e) => {
    setManagerId(e.target.value)
  }

  const handleStartDate = (newDate) => {
    newDate = new Date(newDate)
    newDate.setHours(0, 0, 0, 0)
    setStartDate(newDate.valueOf())
  }

  const handleEndDate = (newDate) => {
    newDate = new Date(newDate)
    newDate.setHours(23, 59, 59, 999)
    setEndDate(newDate.valueOf())
  }

  const handleCashSubmit = () => {
    AxiosInstance.post('/managers/close-register', cash)
      .then((res) => {
        console.log(res.data)
        alert('صندوق با موفقیت بسته شد')
      })
      .catch((err) => {
        console.log(err)
        // alert(err.response.data.errors[0].msg)
        if (err.response.data.errors[0].msg) {
          alert(err.response.data.errors[0].msg)
        } else {
          alert(err.response.data.errors)
        }
      })
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard className="mb-4">
            <CCardHeader>
              <strong> انتخاب بازه زمانی اختیاری است</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="4">
                  <DatePicker
                    placeholder="تاریخ شروع"
                    value={startDate}
                    onChange={handleStartDate}
                    calendarPosition="bottom-right"
                    inputPlaceholder="تاریخ شروع"
                    calendar={persian}
                    locale={persian_fa}
                  />
                </CCol>
                <CCol xs="12" md="4">
                  <DatePicker
                    placeholder="تاریخ پایان"
                    value={endDate}
                    onChange={handleEndDate}
                    calendarPosition="bottom-right"
                    inputPlaceholder="تاریخ پایان"
                    calendar={persian}
                    locale={persian_fa}
                  />
                </CCol>

                {JSON.parse(localStorage.getItem('manager')).is_superadmin ? (
                  <CCol xs="12" md="4">
                    <CFormSelect aria-label="Default select example" onChange={handleManagerId}>
                      <option value="">انتخاب صندوقدار</option>
                      {managers.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.firstname + ' ' + item.lastname}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                ) : null}

                <CCol xs="12" md="6">
                  <p />
                  <CButton color="primary" onClick={handleFilter}>
                    اعمال فیلتر
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Show All amounts */}
        <CCol xs="12">
          <CCard className="mb-4">
            <CCardHeader>
              <strong> فرم پرداخت</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>نوع پرداخت</CTableHeaderCell>
                    <CTableHeaderCell>نام بانک</CTableHeaderCell>
                    <CTableHeaderCell>وضعیت</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ</CTableHeaderCell>
                    <CTableHeaderCell>تاریخ</CTableHeaderCell>
                    <CTableHeaderCell>نام مشتری</CTableHeaderCell>
                    <CTableHeaderCell>کدملی مشتری</CTableHeaderCell>
                    <CTableHeaderCell>شماره تلفن</CTableHeaderCell>
                    <CTableHeaderCell>توضیحات</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {chargeForm.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>
                        {item.type == '2'
                          ? 'پوز'
                          : item.type == '3'
                          ? ' نقدی '
                          : item.type == '5'
                          ? 'رایگان'
                          : item.type == '4'
                          ? 'کارت هدیه '
                          : item.type == '6'
                          ? ' شارژ هدیه'
                          : item.type == '7'
                          ? '  کسر از حساب'
                          : 'نامشخص'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.bank_title == null ? '-' : item.bank_title}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.status == '1' ? 'تایید شده' : 'تایید نشده'}
                      </CTableDataCell>
                      <CTableDataCell>{numberWithCommas(item.amount)}</CTableDataCell>
                      <CTableDataCell>{item.created_at.split('T')[1].split('.')[0]}</CTableDataCell>
                      <CTableDataCell>{item.firstname + ' ' + item.lastname}</CTableDataCell>
                      <CTableDataCell>{item.national_code}</CTableDataCell>
                      <CTableDataCell>{item.phone}</CTableDataCell>
                      <CTableDataCell>{item.description}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          {/* Show Pos Amounts */}
          <CCol xs="12">
            <CCard className="mb-4">
              <CCardHeader>
                <strong>گزارش دستگاه پوز</strong>
              </CCardHeader>
              <CCardBody>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell> نام بانک</CTableHeaderCell>
                      <CTableHeaderCell> مبلغ</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                </CTable>
              </CCardBody>
              <CCardBody>
                {Object.keys(paymentHistories.pos_amounts).map((item) => (
                  <CListGroupItem key={item}>
                    {item} : {numberWithCommas(paymentHistories.pos_amounts[item])}
                  </CListGroupItem>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="12">
            <CCard className="mb-4">
              <CCardHeader>
                <strong> گزارش کلی </strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12" md="6">
                    <CListGroup striped>
                      {/* <CListGroupItem>
                        مبلغ پوز : {numberWithCommas(paymentHistories.pos_amounts)}
                      </CListGroupItem> */}
                      <CListGroupItem>
                        مبلغ نقدی : {numberWithCommas(paymentHistories.cash_amount)}
                      </CListGroupItem>
                      <CListGroupItem>
                        مبلغ کارت هدیه : {numberWithCommas(paymentHistories.gift_amount)}
                      </CListGroupItem>
                      <CListGroupItem>
                        مبلغ اضافه شارژ : {numberWithCommas(paymentHistories.additional__amount)}
                      </CListGroupItem>
                    </CListGroup>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CFormInput
                      placeholder="مبلغ دریافتی"
                      name="amount"
                      value={cash.amount}
                      onChange={handleInput}
                      locale="fa-IR"
                    />
                    <CFormInput
                      placeholder=" توضیحات"
                      name="description"
                      value={cash.description}
                      onChange={handleInput}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol xs="12">
                    <CRow>
                      <CButton color="primary" onClick={handleCashSubmit}>
                        بستن صندوق
                      </CButton>
                    </CRow>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CCol>
      </CRow>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        rtl
      />
    </>
  )
}

export default ChargeForm
