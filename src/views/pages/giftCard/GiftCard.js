import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'moment-jalaali'

import {
  CButton,
  CRow,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CCol,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
  CFormCheck,
} from '@coreui/react'

const GiftCard = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [card, setCard] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [value, setValue] = useState(new Date())
  const [file, setFile] = useState(null)
  // const [giftCardNumber, setGiftCardNumber] = useState('')
  const [formdata, setFormdata] = useState({
    numbers: [''],
    amount: '',
    directive: '',
    description: '',
    is_active: 'true',
    expires_at: null,
  })

  useEffect(() => {
    AxiosInstance.get('/gift-cards')
      .then((res) => {
        console.log(res)
        setCard(res.data.data.gift_cards)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    if (name === 'numbers') {
      setFormdata({ ...formdata, [name]: [value] })
    } else if (name === 'amount') {
      const rawNumber = value.replace(/[^0-9]/g, '')
      const formattedData = numberWithCommas(rawNumber)
      setFormdata({
        ...formdata,
        [name]: formattedData,
      })
    } else {
      setFormdata({ ...formdata, [name]: value })
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const handleUploadFile = () => {
    console.log('handleUploadFile called')
    console.log(file)
    if (file) {
      // Check if file exists and contains any files
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = (e) => {
        console.log('onload called')
        const data = e.target.result
        const lines = data.split(/\r\n|\n/)
        if (lines && lines.length > 0) {
          const result = []
          for (let i = 1; i < lines.length; i++) {
            const obj = lines[i].split(',')
            console.log(i)
            console.log(lines[i])
            if (obj.length > 0) {
              const card = {
                number: obj[0],
                amount: obj[1],
                directive: obj[2],
                description: obj[3],
                expires_at: obj[4],
              }
              result.push(card)
            }
            console.log(result)
            AxiosInstance.post('/gift-cards/upload-csv', { cards: result })
              .then((res) => {
                console.log(res)
                setCard([
                  ...card.filter((item) =>
                    res.data.data.gift_cards.find((newItem) => newItem.id !== item.id),
                  ),
                  ...res.data.data.gift_cards,
                ])
              })
              .catch((err) => {
                console.log(err)
                toast.error(
                  err.response.data.errors
                    ? err.response.data.errors[0].msg
                    : err.response.data.message,
                )
              })
          }
        }
      }
      toast.success('فایل با موفقیت آپلود شد')
      setActiveKey(1)
    } else {
      // Handle case where no file is selected
      toast.error('لطفاً یک فایل را انتخاب کنید')
    }
  }

  const handleSaveGiftCard = () => {
    console.log(formdata)
    AxiosInstance.post('/gift-cards', formdata)
      .then((res) => {
        console.log(res)
        setCard([...card, ...res.data.data.gift_cards])
        toast.success('کارت با موفقیت ثبت شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })

      .finally(() => {
        setFormdata({
          numbers: [''],
          amount: '',
          directive: '',
          description: '',
          is_active: 'true',
          expires_at: null,
        })
      })
  }

  const handleUpdateGiftcard = () => {
    AxiosInstance.put(`/gift-cards/${formdata.id}`, {
      number: formdata.numbers[0],
      amount: formdata.amount,
      directive: formdata.directive,
      description: formdata.description,
      is_active: formdata.is_active,
    })
      .then((res) => {
        console.log(res)
        setCard([...card.filter((item) => item.id !== formdata.id), res.data.data.gift_card])
        toast.success('کارت با موفقیت ویرایش شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  // const handleGiftcardHistory = () => {
  //   AxiosInstance.get(`/gift-card-histories/users/`)
  //     .then((res) => {
  //       console.log(res)
  //       setCard([...card, ...res.data.data.gift_card_histories])
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast.error(err.response.data.errors[0].msg)
  //     })
  // }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleDate = (newDate) => {
    setValue(newDate)
    if (newDate) {
      const gregorianDate = moment(newDate).format('YYYY/MM/DD')
      setFormdata({ ...formdata, expires_at: gregorianDate })
    }
  }
  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            لیست کارت هدیه
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            ثبت کارت هدیه
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
            بارگذاری فایل
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
            بررسی تاریخچه
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>ثبت کارت هدیه</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={8}>
                      <CFormInput
                        label="کد کارت"
                        name="numbers"
                        placeholder="کد کارت"
                        aria-label="numbers"
                        locale="fa-IR"
                        value={
                          formdata.numbers && formdata.numbers.length > 0 ? formdata.numbers[0] : ''
                        }
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                  </CRow>
                  <CForm className="row g-3">
                    <CCol md={8}>
                      <CCol xs>
                        <CFormInput
                          label="مبلغ"
                          name="amount"
                          placeholder="مبلغ"
                          aria-label="amount"
                          locale="fa-IR"
                          value={formdata.amount}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={8}>
                      <CCol xs>
                        <CFormInput
                          label="توضیحات"
                          name="description"
                          placeholder="توضیحات"
                          aria-label="description"
                          locale="fa-IR"
                          value={formdata.description}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={8}>
                      <CCol xs>
                        <CFormInput
                          label="دستور دهنده"
                          name="directive"
                          placeholder="دستور دهنده"
                          aria-label="directive"
                          locale="fa-IR"
                          value={formdata.directive}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={6}>
                      <div>تاریخ انقضا</div>
                      <DatePicker
                        value={value}
                        onChange={handleDate}
                        calendarPosition="bottom-right"
                        inputPlaceholder=" تاریخ انقضا"
                        calendar={persian}
                        locale={persian_fa}
                      />
                    </CCol>
                    <CCol md={8}>
                      <div>
                        <p>وضعیت کارت</p>
                        <CFormCheck
                          button={{ color: 'success', variant: 'outline' }}
                          type="radio"
                          name="is_active"
                          id="success-outlined"
                          value={true}
                          onChange={handleInputCahnge}
                          autoComplete="off"
                          label="فعال"
                          checked={formdata.is_active === 'true'}
                        />
                        <CFormCheck
                          button={{ color: 'danger', variant: 'outline' }}
                          type="radio"
                          name="is_active"
                          onChange={handleInputCahnge}
                          id="danger-outlined"
                          autoComplete="off"
                          label="غیر فعال"
                          value={false}
                          checked={formdata.is_active === 'false'}
                        />
                      </div>
                    </CCol>

                    <CCol md={12}>
                      <CButton
                        color="primary"
                        onClick={formdata.id ? handleUpdateGiftcard : handleSaveGiftCard}
                      >
                        ثبت
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 1}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>لیست کارت هدیه</strong>
            </CCardHeader>
            <CCardBody>
              <CFormInput
                label="جستجوی کارت"
                name="search"
                placeholder="شماره کارت را وارد نمایید"
                aria-label="search"
                locale="fa-IR"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>کد کارت</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ</CTableHeaderCell>
                    <CTableHeaderCell>توضیحات</CTableHeaderCell>
                    <CTableHeaderCell>وضعیت</CTableHeaderCell>
                    <CTableHeaderCell>دستور دهنده</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {card
                    .filter((item) => item.number.includes(searchTerm))
                    .map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.number}</CTableDataCell>
                        <CTableDataCell>
                          {item && item.amount !== undefined ? (
                            numberWithCommas(item.amount)
                          ) : (
                            <span>Amount Not Available</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item && item.description !== undefined ? (
                            item.description
                          ) : (
                            <span>Description Not Available</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item && item.is_active !== undefined ? (
                            item.is_active ? (
                              <span className="badge bg-success">فعال</span>
                            ) : (
                              <span className="badge bg-danger">غیر فعال</span>
                            )
                          ) : (
                            <span>Active Not Available</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item && item.directive !== undefined ? (
                            item.directive
                          ) : (
                            <span>Directive Not Available</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            onClick={() => {
                              if (item) {
                                setFormdata({
                                  id: item.id,
                                  numbers: [item.number],
                                  amount: item.amount,
                                  directive: item.directive,
                                  description: item.description,
                                  is_active: item.is_active,
                                })
                                setActiveKey(2)
                              } else {
                                console.log('Item is undefined')
                              }
                            }}
                          >
                            ویرایش
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>بارگذاری فایل</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={8}>
                  <CFormInput
                    type="file"
                    label="فایل"
                    name="file"
                    placeholder="فایل"
                    aria-label="file"
                    locale="fa-IR"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CButton color="primary" onClick={handleUploadFile}>
                    بارگذاری
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CTabPane>
        {/* <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>بررسی تاریخچه</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={8}>
                  <CFormInput
                    label="کد کارت"
                    name="giftCardNumber"
                    placeholder="کد کارت"
                    aria-label="giftCardNumber"
                    locale="fa-IR"
                    value={giftCardNumber}
                    onChange={(e) => setGiftCardNumber(e.target.value)}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CButton color="primary" onClick={handleGiftcardHistory}>
                    جستجو
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>لیست کارت هدیه</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>کد کارت</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ</CTableHeaderCell>
                    <CTableHeaderCell>توضیحات</CTableHeaderCell>
                    <CTableHeaderCell>دستور دهنده</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {card
                    .filter((item) => item.number.includes(giftCardNumber))
                    .map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.giftcard_number}</CTableDataCell>
                        <CTableDataCell>
                          {item && item.amount !== undefined ? (
                            numberWithCommas(item.amount)
                          ) : (
                            <span>Amount Not Available</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item && item.description !== undefined ? (
                            item.description
                          ) : (
                            <span>Description Not Available</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item && item.directive !== undefined ? (
                            item.directive
                          ) : (
                            <span>Directive Not Available</span>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CTabPane> */}
      </CTabContent>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default GiftCard
