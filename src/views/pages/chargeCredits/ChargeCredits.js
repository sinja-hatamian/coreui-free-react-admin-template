import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
} from '@coreui/react'

const ChargeCredits = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [credit, setCredit] = useState([])
  const [charge, setCharge] = useState({
    charge_amount: '',
    credit_amount: '',
  })

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    const rawNumber = value.replace(/[^0-9]/g, '')
    const formattedData = numberWithCommas(rawNumber)
    setCharge({
      ...charge,
      [name]: formattedData,
    })
  }

  useEffect(() => {
    AxiosInstance.get('/charge-credits')
      .then((res) => {
        setCredit(res.data.data.charge_credits)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleAddCredit = () => {
    AxiosInstance.post('/charge-credits/', charge)
      .then((res) => {
        setCredit([...credit, res.data.data.charge_credit])
        toast.success('اعتبار با موفقیت ثبت شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleDeleteCredit = (id) => {
    AxiosInstance.delete(`/charge-credits/${id}`)
    setCredit(credit.filter((item) => item.id !== id))
  }

  const handleUpdateCredit = () => {
    AxiosInstance.put(`/charge-credits/${charge.id}`, charge)
      .then((res) => {
        setCredit([...credit.filter((item) => item.id !== charge.id), res.data.data.charge_credit])
        toast.success('اعتبار با موفقیت ویرایش شد')
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
            لیست اعتبارات
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افرودن اعتبار
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs="12">
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست اعتبارات</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>مبلغ</CTableHeaderCell>
                        <CTableHeaderCell>اعتبار</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {credit.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{numberWithCommas(item.charge_amount)}</CTableDataCell>
                          <CTableDataCell>{numberWithCommas(item.credit_amount)}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setCharge({
                                  id: item.id,
                                  charge_amount: numberWithCommas(item.charge_amount),
                                  credit_amount: numberWithCommas(item.credit_amount),
                                })
                                setActiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              style={{ color: '#FFF' }}
                              color="danger"
                              onClick={() => handleDeleteCredit(item.id)}
                            >
                              حذف
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
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن اعتبار</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="مبلغ"
                        placeholder="مبلغ"
                        name="charge_amount"
                        aria-label="charge_amount"
                        locale="fa-IR"
                        value={charge.charge_amount}
                        onChange={handleChangeInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="اعتبار"
                        placeholder="اعتبار"
                        name="credit_amount"
                        aria-label="credit_amount"
                        locale="fa-IR"
                        value={charge.credit_amount}
                        onChange={handleChangeInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CButton
                        color="primary"
                        onClick={charge.id ? handleUpdateCredit : handleAddCredit}
                      >
                        ثبت
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
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

export default ChargeCredits
