import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CFormInput,
  CButton,
} from '@coreui/react'

const Gates = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [gates, setGates] = useState([])
  const [gateData, setGateData] = useState({
    name: '',
    device_code: '',
    price: '',
    stage_id: '',
    is_enter: '',
    accountancy_code: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setGateData({ ...gateData, [name]: value })
  }

  useEffect(() => {
    AxiosInstance.get('/gates')
      .then((res) => {
        setGates(res.data.data.gates)
        console.log(res.data.data.gates)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSaveGate = () => {
    AxiosInstance.post('/gates', gateData)
      .then((res) => {
        console.log(res)
        alert('گیت با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت گیت')
      })
  }
  const handleUpdateGame = () => {
    AxiosInstance.put(`/gates/${gateData.id}`, gateData)
      .then((res) => {
        console.log(res)
        alert('گیت با موفقیت ویرایش شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش گیت')
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            {' '}
            نمایش گیت ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            {' '}
            افزودن گیت
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-label="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>نمایش گیت ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableDataCell>نام گیت</CTableDataCell>
                        <CTableDataCell> شماره دستگاه</CTableDataCell>
                        <CTableDataCell> کد حسابداری</CTableDataCell>
                        <CTableDataCell> هزینه ورودی</CTableDataCell>
                        <CTableDataCell> شماره سالن</CTableDataCell>
                        <CTableDataCell> نوع گیت</CTableDataCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {gates.map((gate) => (
                        <CTableRow key={gates.id}>
                          <CTableDataCell>{gate.Name}</CTableDataCell>
                          <CTableDataCell>{gate.DeviceCode}</CTableDataCell>
                          <CTableDataCell>{gate.accountancy_code}</CTableDataCell>
                          <CTableDataCell>{gate.Price}</CTableDataCell>
                          <CTableDataCell>{gate.stage_id}</CTableDataCell>
                          <CTableDataCell>{gate.IsEnter ? 'ورودی' : 'خروجی'}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="info"
                              onClick={() => {
                                console.log(gate)
                                setGateData({
                                  id: gate.id,
                                  name: gate.Name,
                                  device_code: gate.DeviceCode,
                                  accountancy_code: gate.accountancy_code,
                                  price: gate.Price,
                                  stage_id: gate.stage_id,
                                  is_enter: gate.IsEnter,
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
        <CTabPane role="tabpanel" aria-label="profile-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن گیت</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="نام گیت"
                        name="name"
                        value={gateData.name}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="شماره دستگاه"
                        name="device_code"
                        value={gateData.device_code}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label=" کد حسابداری"
                        name="accountancy_code"
                        value={gateData.accountancy_code}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="هزینه ورودی"
                        name="price"
                        value={gateData.price}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="شماره سالن"
                        name="stage_id"
                        value={gateData.stage_id}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="نوع گیت"
                        name="is_enter"
                        value={gateData.is_enter}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CButton
                        color="success"
                        //onclick if id is null add else update
                        onClick={gateData.id ? handleUpdateGame : handleSaveGate}
                      >
                        ذخیره
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

export default Gates
