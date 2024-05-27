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
  CFormInput,
  CButton,
} from '@coreui/react'

const Stages = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [stageList, setStageList] = useState([])
  const [stage, setStage] = useState({
    title: '',
    capacity: '',
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
  }, [])

  const handleInput = (e) => {
    setStage({ ...stage, [e.target.name]: e.target.value })
  }

  const handleAddStage = () => {
    AxiosInstance.post('/stages', stage)
      .then((res) => {
        console.log(res.data.data)
        setStageList([...stageList, res.data.data.stage])
        setStage({
          title: '',
          capacity: '',
        })
        toast.success('با موفقیت اضافه شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleUpdateStage = () => {
    AxiosInstance.put(`/stages/${stage.id}`, stage)
      .then((res) => {
        console.log(res.data.data)
        setStageList(stageList.map((item) => (item.id === stage.id ? stage : item)))
        setStage({ title: '', capacity: '' })
        toast.success('با موفقیت ویرایش شد')
        setActiveKey(1)
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
            لیست سالن ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن سالن جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong> لیست سالن ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام سالن</CTableHeaderCell>
                        <CTableHeaderCell>ظرفیت</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {stageList.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.title}</CTableDataCell>
                          <CTableDataCell>{item.capacity}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setStage({
                                  id: item.id,
                                  title: item.title,
                                })
                                setActiveKey(2)
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
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>افزودن بازی جدید</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="نام سالن"
                        placeholder="نام سالن"
                        name="title"
                        aria-label="نام سالن"
                        locale="fa-IR"
                        value={stage.title}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="ظرفیت"
                        placeholder="ظرفیت"
                        name="capacity"
                        aria-label="ظرفیت"
                        locale="fa-IR"
                        value={stage.capacity}
                        onChange={handleInput}
                      />
                    </CCol>
                  </CRow>
                  <p></p>
                  <CRow>
                    <CCol>
                      <CButton
                        color="primary"
                        onClick={stage.id ? handleUpdateStage : handleAddStage}
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

export default Stages
