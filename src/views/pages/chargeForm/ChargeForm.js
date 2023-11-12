import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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
} from '@coreui/react'

const ChargeForm = () => {
  const [chargeForm, setChargeForm] = useState([])
  const [paymentHistories, setPaymentHistories] = useState({
    pos_amounts: {},
    gift_amount: '',
    cash_amount: '',
  })
  const [cash, setCash] = useState({
    amount: '',
    description: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    const rawNumber = value.replace(/,/g, '')
    const formatedData = numberWithCommas(rawNumber)
    setCash({ ...cash, [name]: formatedData })
  }

  useEffect(() => {
    AxiosInstance.get('/payment-histories/register')
      .then((res) => {
        console.log(res.data)
        setChargeForm(res.data.data.payment_histories)
        setPaymentHistories({
          pos_amounts: res.data.data.pos_amounts,
          gift_amount: res.data.data.gift_amount,
          cash_amount: res.data.data.cash_amount,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

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
                    <CTableHeaderCell>وضعیت</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ</CTableHeaderCell>
                    <CTableHeaderCell>تاریخ</CTableHeaderCell>
                    <CTableHeaderCell>توضیحات</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {chargeForm.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>
                        {item.type == '2' ? 'پوز' : item.type == '3' ? ' نقدی ' : 'کارت هدیه'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.status == '1' ? 'تایید شده' : 'تایید نشده'}
                      </CTableDataCell>
                      <CTableDataCell>{numberWithCommas(item.amount)}</CTableDataCell>
                      <CTableDataCell>{item.created_at.split('T')[1].split('.')[0]}</CTableDataCell>

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
    </>
  )
}

export default ChargeForm
