import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

const Reservation = () => {
  const [stages, setStages] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [formData, setFormData] = useState([
    {
      firstname: '',
      lastname: '',
      date: '',
      title: '',
      start_time: '',
      end_time: '',
      attendants_number: '',
      total_price: '',
    },
  ])

  useEffect(() => {
    AxiosInstance.get('/stages')
      .then((res) => {
        setStages(res.data.data.stages)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        AxiosInstance.get(`/reserves/users/${res.data.data.user.id}`)
          .then((res) => {
            setFormData(res.data.data.reserves)
            console.log(res.data.data.reserves)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        toast.error('کاربری با این کد ملی یافت نشد')
      })
  }

  const fetchUSerByPhone = () => {
    AxiosInstance.get(`/users/phone/${phone}`)
      .then((res) => {
        AxiosInstance.get(`/reserves/users/${res.data.data.user.id}`)
          .then((res) => {
            setFormData(res.data.data.reserves)
            console.log(res.data.data.reserves)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        toast.error('کاربری با این شماره تلفن یافت نشد')
      })
  }

  const indexAllReservations = () => {
    AxiosInstance.get('/reserves')
      .then((res) => {
        setFormData(res.data.data.reserves)
        console.log(res.data.data.reserves)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const indexTodayReservations = () => {
    AxiosInstance.get('/reserves/today')
      .then((res) => {
        setFormData(res.data.data.reserves)
        console.log(res.data.data.reserves)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const indexReservationByStage = (id) => {
    AxiosInstance.get(`/reserves/stages/${id}`)
      .then((res) => {
        setFormData(res.data.data.reserves)
        console.log(res.data.data.reserves)
      })
      .catch((error) => {
        console.log(error)
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
            همه رزروها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            رزروهای امروز
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
            رزروهای کاربر
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
            رزروهای سالن
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" visible={activeKey === 1} aria-labelledby="home-tab">
          <CRow>
            <CCol xs="12" sm="12" md="12">
              <CCard className="mb-4">
                <CCol sm="12">
                  <CCol md="8" style={{ marginBottom: '20px', padding: '20px' }}>
                    <CButton
                      color="primary"
                      onClick={() => {
                        indexAllReservations()
                      }}
                    >
                      نمایش همه رزروها
                    </CButton>
                  </CCol>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام</CTableHeaderCell>
                        <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                        <CTableHeaderCell>تاریخ</CTableHeaderCell>
                        <CTableHeaderCell>عنوان</CTableHeaderCell>
                        <CTableHeaderCell>زمان شروع</CTableHeaderCell>
                        <CTableHeaderCell>زمان پایان</CTableHeaderCell>
                        <CTableHeaderCell>تعداد حاضرین</CTableHeaderCell>
                        <CTableHeaderCell>قیمت کل</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {formData.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{item.firstname}</CTableDataCell>
                          <CTableDataCell>{item.lastname}</CTableDataCell>
                          <CTableDataCell>
                            {
                              //show date in persian
                              item.date ? new Date(item.date).toLocaleDateString('fa-IR') : ''
                            }
                          </CTableDataCell>
                          <CTableDataCell>{item.title}</CTableDataCell>
                          <CTableDataCell>
                            {
                              //show start time in persian and not show seconds
                              item.start_time
                                ? new Date(item.start_time).toLocaleTimeString('fa-IR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : ''
                            }
                          </CTableDataCell>
                          <CTableDataCell>
                            {
                              //show end time in persian and not show seconds
                              item.end_time
                                ? new Date(item.end_time).toLocaleTimeString('fa-IR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : ''
                            }
                          </CTableDataCell>
                          <CTableDataCell>{item.attendants_number}</CTableDataCell>
                          <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" visible={activeKey === 2} aria-labelledby="profile-tab">
          <CRow>
            <CCard className="mb-4">
              <CCol sm="12">
                <CCol md="8" style={{ marginBottom: '20px', padding: '20px' }}>
                  <CButton color="primary" onClick={indexTodayReservations}>
                    نمایش رزروهای امروز
                  </CButton>
                </CCol>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>نام</CTableHeaderCell>
                      <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                      <CTableHeaderCell>تاریخ</CTableHeaderCell>
                      <CTableHeaderCell>عنوان</CTableHeaderCell>
                      <CTableHeaderCell>زمان شروع</CTableHeaderCell>
                      <CTableHeaderCell>زمان پایان</CTableHeaderCell>
                      <CTableHeaderCell>تعداد حاضرین</CTableHeaderCell>
                      <CTableHeaderCell>قیمت کل</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {formData.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.firstname}</CTableDataCell>
                        <CTableDataCell>{item.lastname}</CTableDataCell>
                        <CTableDataCell>
                          {
                            //show date in persian
                            item.date ? new Date(item.date).toLocaleDateString('fa-IR') : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>
                          {
                            //show start time in persian and not show seconds
                            item.start_time
                              ? new Date(item.start_time).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          {
                            //show end time in persian and not show seconds
                            item.end_time
                              ? new Date(item.end_time).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CCard>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" visible={activeKey === 3} aria-labelledby="profile-tab">
          <CRow>
            <CCard className="mb-4">
              <div
                style={{
                  marginBottom: '20px',
                  padding: '20px',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <strong>جستجو رزرو بر اساس کد ملی یا شماره تلفن کاربر</strong>
              </div>
              <CCol sm="12">
                <CRow>
                  <CCol md="4">
                    <CFormInput
                      placeholder="کد ملی"
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CButton color="primary" onClick={fetchUser}>
                      جستجو
                    </CButton>
                  </CCol>
                </CRow>
                <br />
                <CRow>
                  <CCol md="4">
                    <CFormInput
                      placeholder="شماره تلفن"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CButton color="primary" onClick={fetchUSerByPhone}>
                      جستجو
                    </CButton>
                  </CCol>
                </CRow>
                <CTable
                  striped
                  style={{
                    marginTop: '20px',
                  }}
                >
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>نام</CTableHeaderCell>
                      <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                      <CTableHeaderCell>تاریخ</CTableHeaderCell>
                      <CTableHeaderCell>عنوان</CTableHeaderCell>
                      <CTableHeaderCell>زمان شروع</CTableHeaderCell>
                      <CTableHeaderCell>زمان پایان</CTableHeaderCell>
                      <CTableHeaderCell>تعداد حاضرین</CTableHeaderCell>
                      <CTableHeaderCell>قیمت کل</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {formData.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.firstname}</CTableDataCell>
                        <CTableDataCell>{item.lastname}</CTableDataCell>
                        <CTableDataCell>
                          {
                            //show date in persian
                            item.date ? new Date(item.date).toLocaleDateString('fa-IR') : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>
                          {
                            //show start time in persian and not show seconds
                            item.start_time
                              ? new Date(item.start_time).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          {
                            //show end time in persian and not show seconds
                            item.end_time
                              ? new Date(item.end_time).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CCard>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" visible={activeKey === 4} aria-labelledby="profile-tab">
          <CRow>
            <CCard className="mb-4">
              <div
                style={{
                  marginBottom: '20px',
                  padding: '20px',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <strong>جستجو رزرو براساس نام سالن ها</strong>
              </div>
              <CCol sm="12">
                <CCol
                  md="8"
                  style={{
                    marginBottom: '20px',
                    padding: '20px',
                  }}
                >
                  <CFormSelect
                    name="stage_id"
                    onChange={(e) => indexReservationByStage(e.target.value)}
                    placeholder="سالن"
                  >
                    <option value="0">انتخاب سالن</option>
                    {stages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.title}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>نام</CTableHeaderCell>
                      <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                      <CTableHeaderCell>تاریخ</CTableHeaderCell>
                      <CTableHeaderCell>عنوان</CTableHeaderCell>
                      <CTableHeaderCell>زمان شروع</CTableHeaderCell>
                      <CTableHeaderCell>زمان پایان</CTableHeaderCell>
                      <CTableHeaderCell>تعداد حاضرین</CTableHeaderCell>
                      <CTableHeaderCell>قیمت کل</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {formData.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.firstname}</CTableDataCell>
                        <CTableDataCell>{item.lastname}</CTableDataCell>
                        <CTableDataCell>
                          {
                            //show date in persian
                            item.date ? new Date(item.date).toLocaleDateString('fa-IR') : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>
                          {
                            //show start time in persian and not show seconds
                            item.start_time
                              ? new Date(item.start_time).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          {
                            //show end time in persian and not show seconds
                            item.end_time
                              ? new Date(item.end_time).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''
                          }
                        </CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CCard>
          </CRow>
        </CTabPane>
      </CTabContent>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Reservation
