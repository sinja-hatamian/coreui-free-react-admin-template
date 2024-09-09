import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CTable,
  CTableRow,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const Wristband = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [stage, setStage] = useState([])
  const [wristband, setWristband] = useState([])
  const [wrist, setWrist] = useState({
    number: '',
    tag: '',
    stage_id: '',
    id: '',
  })

  useEffect(() => {
    AxiosInstance.get('/wrist-bands')
      .then((res) => {
        setWristband(res.data.data.wrist_bands)
      })
      .catch((err) => {
        console.log(err)
      })
    AxiosInstance.get('/stages')
      .then((res) => {
        setStage(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInputChange = (e) => {
    setWrist({ ...wrist, [e.target.name]: e.target.value })
  }

  const handleAddWrist = () => {
    AxiosInstance.post('/wrist-bands', wrist)
      .then((res) => {
        setWristband([...wristband, res.data.data.wrist_band])
        toast.success(res.data.message)
        setWrist({
          number: '',
          tag: '',
          stage_id: '',
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleUpdateWrist = (id) => {
    AxiosInstance.put(`/wrist-bands/${id}`, wrist)
      .then((res) => {
        setWristband([...wristband, res.data.data.wrist_band])
        toast.success(res.data.message)
      })

      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleRemoveWrist = (id) => {
    AxiosInstance.delete(`/wrist-bands/${id}`)
      .then((res) => {
        setWristband([...wristband.filter((item) => item.id !== id)])
        // alert('دستبند با موفقیت حذف شد')
      })
      .catch((err) => {
        console.log(err)
        alert('دستبند حذف نشد')
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            لیست دستبندها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن دستبند جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-label="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست دستبند ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>شماره دستبند </CTableHeaderCell>
                        <CTableHeaderCell> تگ دستبند</CTableHeaderCell>
                        <CTableHeaderCell>شماره سالن </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {wristband.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.number}</CTableDataCell>
                          <CTableDataCell>{item.tag}</CTableDataCell>
                          <CTableDataCell>{item.stage_id}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setWrist({
                                  number: item.number,
                                  tag: item.tag,
                                  stage_id: item.stage_id,
                                  id: item.id,
                                })
                                setActiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              onClick={() => {
                                handleRemoveWrist(item.id)
                              }}
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
                <CCardHeader>افزودن دستبند جدید</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="شماره دستبند"
                        placeholder="شماره دستبند"
                        name="number"
                        value={wrist.number}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="تگ دستبند"
                        placeholder="تگ دستبند"
                        name="tag"
                        value={wrist.tag}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormSelect
                        name="stage_id"
                        label="شماره سالن"
                        placeholder="شماره سالن"
                        value={wrist.stage_id}
                        onChange={handleInputChange}
                      >
                        <option value="">انتخاب کنید</option>
                        {stage.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <p></p>
                    <CButton style={{ color: 'white' }} color="success" onClick={handleAddWrist}>
                      افزودن دستبند
                    </CButton>

                    <p></p>
                    <CButton
                      style={{ color: 'white' }}
                      color="info"
                      onClick={() => handleUpdateWrist(wrist.id)}
                    >
                      ویرایش دستبند
                    </CButton>
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

export default Wristband
