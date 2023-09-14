import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CTableDataCell,
  CTableBody,
  CFormInput,
} from '@coreui/react'

const IntroductionWays = () => {
  const [activekey, setActivekey] = useState(1)
  const [introductionWaysList, setIntroductionWaysList] = useState([])
  const [formdata, setFormdata] = useState({
    title: '',
  })

  useEffect(() => {
    AxiosInstance.get('/introduction-ways')
      .then((res) => {
        console.log(res.data.data)
        setIntroductionWaysList(res.data.data.introduction_ways)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFormdata({
      ...formdata,
      [name]: value,
    })
  }

  const handleAddWays = () => {
    AxiosInstance.post('/introduction-ways', formdata)
      .then((res) => {
        console.log(res.data.data)
        setIntroductionWaysList([...introductionWaysList, res.data.data.introduction_way])
        alert('روش آشنایی با موفقیت افزوده شد')
        setActivekey(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUpdateWays = (id) => {
    AxiosInstance.put(`/introduction-ways/${id}`, formdata)
      .then((res) => {
        console.log(res.data.data)
        setIntroductionWaysList(
          introductionWaysList.map((introductionWay) => {
            if (introductionWay.id === id) {
              return res.data.data.introduction_way
            }
            return introductionWay
          }),
        )
        alert('روش آشنایی با موفقیت ویرایش شد')
        setActivekey(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablis">
        <CNavItem>
          <CNavLink active={activekey === 1} onClick={() => setActivekey(1)}>
            لیست روش های آشنایی
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activekey === 2} onClick={() => setActivekey(2)}>
            ثبت روش آشنایی جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activekey === 1}>
          <CRow>
            <CCol xs="12">
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست روش های آشنایی</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {introductionWaysList.map((introductionWay) => (
                        <CTableRow key={introductionWay.id}>
                          <CTableDataCell>{introductionWay.title}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setFormdata({
                                  title: introductionWay.title,
                                  id: introductionWay.id,
                                })
                                setActivekey(2)
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
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activekey === 2}>
          <CRow>
            <CCol xs="12">
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>ثبت روش آشنایی جدید</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="12" md={6}>
                      <CFormInput
                        label="نام روش آشنایی"
                        placeholder="نام روش آشنایی"
                        aria-label="title"
                        locale="fa-IR"
                        value={formdata.title}
                        name="title"
                        onChange={handleChangeInput}
                      />
                    </CCol>
                    <CCol xs="12">
                      <CButton
                        color="success"
                        onClick={() => {
                          if (formdata.id) {
                            handleUpdateWays(formdata.id)
                          } else {
                            handleAddWays()
                          }
                        }}
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

export default IntroductionWays
