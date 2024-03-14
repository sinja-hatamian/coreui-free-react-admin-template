import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const GiftCard = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [card, setCard] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 30
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const [formdata, setFormdata] = useState({
    numbers: [''],
    amount: '',
    directive: '',
    description: '',
    is_active: 'true',
  })

  useEffect(() => {
    console.log('Current Page:', currentPage)
    AxiosInstance.get('/gift-cards')
      .then((res) => {
        console.log(res)
        setCard(res.data.data.gift_cards)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentPage])

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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                        value={formdata && formdata.numbers ? formdata.numbers[0] : ''}
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
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>کد کارت</CTableHeaderCell>
                    <CTableHeaderCell>مبلغ (ریال)</CTableHeaderCell>
                    <CTableHeaderCell>توضیحات</CTableHeaderCell>
                    <CTableHeaderCell>وضعیت</CTableHeaderCell>
                    <CTableHeaderCell>دستور دهنده</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {card.slice(startIndex, endIndex).map((item) => (
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
              <CPagination
                align="center"
                doubleArrows={false}
                activePage={currentPage}
                pages={Math.ceil(card.length / itemsPerPage)}
                onActivePageChange={setCurrentPage}
                limit={5}
              >
                <CPaginationItem
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1)
                    }
                  }}
                >
                  قبلی
                </CPaginationItem>

                {/* Generate a CPaginationItem for each page */}
                {[...Array(Math.ceil(card.length / itemsPerPage)).keys()].map((i) => {
                  // Only create CPaginationItem for the first page, the last page, the current page, and two pages around the current page
                  if (
                    i === 0 ||
                    i === Math.ceil(card.length / itemsPerPage) - 1 ||
                    Math.abs(currentPage - (i + 1)) <= 2
                  ) {
                    return (
                      <CPaginationItem
                        key={i}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </CPaginationItem>
                    )
                  } else if (i === 1 && currentPage > 4) {
                    // Add an ellipsis after the first page if the current page is greater than 4
                    return <CPaginationItem key={i}>...</CPaginationItem>
                  } else if (
                    i === Math.ceil(card.length / itemsPerPage) - 2 &&
                    currentPage < Math.ceil(card.length / itemsPerPage) - 3
                  ) {
                    // Add an ellipsis before the last page if the current page is less than the total number of pages minus 3
                    return <CPaginationItem key={i}>...</CPaginationItem>
                  } else {
                    return null
                  }
                })}
                <CPaginationItem
                  onClick={() => {
                    if (currentPage < Math.ceil(card.length / itemsPerPage)) {
                      setCurrentPage(currentPage + 1)
                    }
                  }}
                >
                  بعدی
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CTabPane>
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
