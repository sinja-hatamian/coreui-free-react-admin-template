import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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
        setStage({ title: '' })
        alert('با موفقیت اضافه شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در اضافه کردن')
      })
  }

  const handleUpdateStage = () => {
    AxiosInstance.put(`/stages/${stage.id}`, stage)
      .then((res) => {
        console.log(res.data.data)
        setStageList(stageList.map((item) => (item.id === stage.id ? stage : item)))
        setStage({ title: '' })
        alert('با موفقیت  ویرایش شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش')
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
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {stageList.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.title}</CTableDataCell>
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
    </>
  )
}

export default Stages
