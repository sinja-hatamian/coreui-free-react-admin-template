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
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormSelect,
  CForm,
  CFormInput,
} from '@coreui/react'

const StageDays = () => {
  const [stageList, setStageList] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [stageDays, setStageDays] = useState([])
  const [formData, setFormData] = useState({
    day: '',
    stage_id: '',
    online_capacity: '',
    price: '',
  })

  useEffect(() => {
    AxiosInstance.get('/stages')
      .then((res) => {
        console.log(res.data.data.stages)
        setStageList(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
    AxiosInstance.get('/stage-days')
      .then((res) => {
        console.log(res.data.data.stage_days)
        setStageDays(res.data.data.stage_days)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addStageDays = () => {
    AxiosInstance.post('/stage-days', formData)
      .then((res) => {
        console.log(res.data.data)
        setStageList([...stageList, res.data.data.stages])
        toast.success('با موفقیت اضافه شد')
        setActiveKey(1)
        console.log(formData)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleDeleteStageDays = (id) => {
    AxiosInstance.delete(`/stage-days/${id}`)
      .then((res) => {
        console.log(res.data.data)
        setStageDays(stageDays.filter((item) => item.id !== id))
        toast.success('با موفقیت حذف شد')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            نمایش لیست
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست روزهای سالن ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام سالن</CTableHeaderCell>
                        <CTableHeaderCell>روز</CTableHeaderCell>
                        <CTableHeaderCell>ظرفیت انلاین</CTableHeaderCell>
                        <CTableHeaderCell>هزینه</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {stageDays.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.stage_title}</CTableDataCell>
                          <CTableDataCell>
                            {' '}
                            {item.day === 6
                              ? 'شنبه'
                              : item.day === 0
                              ? 'یکشنبه'
                              : item.day === 1
                              ? 'دوشنبه'
                              : item.day === 2
                              ? 'سه شنبه'
                              : item.day === 3
                              ? 'چهارشنبه'
                              : item.day === 4
                              ? 'پنجشنبه'
                              : item.day === 5
                              ? 'جمعه'
                              : ''}
                          </CTableDataCell>
                          <CTableDataCell>{item.online_capacity}</CTableDataCell>
                          <CTableDataCell>{item.price}</CTableDataCell>
                          <CTableHeaderCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setActiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <CButton color="danger" onClick={() => handleDeleteStageDays(item.id)}>
                              حذف
                            </CButton>
                          </CTableHeaderCell>
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
            <CCol>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن روز جدید</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={2}>
                      <CFormSelect
                        label="انتخاب سالن"
                        name="stage_id"
                        value={formData.stage_id}
                        onChange={handleInput}
                      >
                        <option value="">انتخاب سالن</option>
                        {stageList.map(
                          (item) =>
                            item && (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ),
                        )}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={2}>
                      <CFormSelect
                        label="انتخاب روز"
                        name="day"
                        value={formData.day}
                        onChange={handleInput}
                      >
                        <option value="">انتخاب روز</option>
                        <option value="1">شنبه</option>
                        <option value="2">یکشنبه</option>
                        <option value="3">دوشنبه</option>
                        <option value="4">سه شنبه</option>
                        <option value="5">چهارشنبه</option>
                        <option value="6">پنجشنبه</option>
                        <option value="7">جمعه</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={2}>
                      <CFormInput
                        name="online_capacity"
                        label="ظرفیت انلاین"
                        value={formData.online_capacity}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={2}>
                      <CFormInput
                        name="price"
                        label="هزینه"
                        value={formData.price}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol md={8} style={{ marginTop: '30px' }}>
                      <CButton color="success" style={{ color: '#fff' }} onClick={addStageDays}>
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
      />
    </>
  )
}

export default StageDays
