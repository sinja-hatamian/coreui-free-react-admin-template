import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [stages, setStages] = useState([])
  const [stageName, setStageName] = useState('')
  const [selectedStageId, setSelectedStageId] = useState(null)
  const [updateStageName, setUpdateStageName] = useState('')

  const handleSelectStage = (id) => {
    setSelectedStageId(id)
    setActiveKey(3)
  }

  const handleUpdateStageTitleChange = (e) => {
    setUpdateStageName(e.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/manager/stages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setStages(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleTitleChange = (e) => {
    setStageName(e.target.value)
  }

  const handleAddStage = () => {
    axios
      .post(
        'http://localhost:4000/api/manager/stages',
        { title: stageName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data.data)
        alert('سالن با موفقیت اضافه شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در اضافه کردن سالن')
      })
  }

  const handleUpdateStage = () => {
    if (selectedStageId !== null) {
      axios
        .put(
          `http://localhost:4000/api/manager/stages/${selectedStageId}`,
          { title: updateStageName },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then((res) => {
          console.log(res.data.data)
          alert('سالن با موفقیت ویرایش شد')
          setUpdateStageName('')
          setSelectedStageId(null)
        })
        .catch((err) => {
          console.log(err)
          alert('خطا در ویرایش سالن')
        })
    }
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            مشاهده سالن ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن سالن
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
            ویرایش سالن
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>مشاهده سالن ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام سالن</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {stages.map((stage) => (
                        <CTableRow key={stage.id}>
                          <CTableDataCell>{stage.title}</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="info" onClick={() => handleSelectStage(stage.id)}>
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
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن سالن</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        label="نام سالن"
                        name="stageName"
                        value={stageName}
                        onChange={handleTitleChange}
                        aria-label="title"
                        locale="fa-IR"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CButton color="success" onClick={handleAddStage}>
                        افزودن
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>ویرایش سالن</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        label="نام جدید سالن"
                        name="stageName"
                        value={updateStageName}
                        onChange={handleUpdateStageTitleChange}
                        aria-label="title"
                        locale="fa-IR"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CButton color="success" onClick={handleUpdateStage}>
                        ویرایش
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