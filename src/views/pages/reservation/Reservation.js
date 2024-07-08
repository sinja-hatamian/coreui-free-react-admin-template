import React, { useState, useEffect } from 'react'
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
import { Axios } from 'axios'

const Reservation = () => {
  const [stages, setStages] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [nationalCode, setNationalCode] = useState('')
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
        console.log(error)
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
            <CCard className="mb-4">
              <CCol sm="12">
                <CCol md="8">
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
                        <CTableDataCell>{item.date}</CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.start_time}</CTableDataCell>
                        <CTableDataCell>{item.end_time}</CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{item.total_price}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CCard>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" visible={activeKey === 2} aria-labelledby="profile-tab">
          <CRow>
            <CCard className="mb-4">
              <CCol sm="12">
                <CCol md="8">
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
                        <CTableDataCell>{item.date}</CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.start_time}</CTableDataCell>
                        <CTableDataCell>{item.end_time}</CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{item.total_price}</CTableDataCell>
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
                        <CTableDataCell>{item.date}</CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.start_time}</CTableDataCell>
                        <CTableDataCell>{item.end_time}</CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{item.total_price}</CTableDataCell>
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
              <CCol sm="12">
                <CCol md="8">
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
                        <CTableDataCell>{item.date}</CTableDataCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.start_time}</CTableDataCell>
                        <CTableDataCell>{item.end_time}</CTableDataCell>
                        <CTableDataCell>{item.attendants_number}</CTableDataCell>
                        <CTableDataCell>{item.total_price}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CCard>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default Reservation
