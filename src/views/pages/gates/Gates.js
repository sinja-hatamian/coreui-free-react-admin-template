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
  CFormSelect,
} from '@coreui/react'

const Gates = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [gates, setGates] = useState([])
  const [stage, setStage] = useState([])
  const [deviceCode, setDeviceCode] = useState('')
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
    const rawNumber = value.replace(/[^0-9]/g, '')
    const formatedNumber = numberWithCommas(rawNumber)
    if (name === 'price') {
      setGateData({ ...gateData, [name]: formatedNumber })
    } else {
      setGateData({ ...gateData, [name]: value })
    }
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
    AxiosInstance.get('/stages')
      .then((res) => {
        setStage(res.data.data.stages)
        console.log(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSaveGate = () => {
    AxiosInstance.post('/gates', gateData)
      .then((res) => {
        console.log(res)
        setGates([...gates, res.data.data.gate])
        alert('گیت با موفقیت ثبت شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg)
      })
  }
  const handleUpdateGame = () => {
    AxiosInstance.put(`/gates/${gateData.id}`, gateData)
      .then((res) => {
        console.log(res)
        alert('گیت با موفقیت ویرایش شد')
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg)
      })
  }

  const handleIpSend = () => {
    // Check if deviceCode (IP) is empty
    if (!deviceCode) {
      alert('لطفاً یک آدرس IP معتبر را وارد کنید')
      return
    }

    AxiosInstance.post('/gates/open', { ip: deviceCode }) // Send "ip" in the request body
      .then((res) => {
        console.log(res)
        alert('دستور ارسال شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ارسال دستور')
      })
  }
  const numberWithCommas = (x) => {
    //add comma to each 3 digit
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                        <CTableDataCell> ویرایش </CTableDataCell>
                        <CTableDataCell> تردد کارکنان</CTableDataCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {gates.map((gate) => (
                        <CTableRow key={gates.id}>
                          <CTableDataCell>{gate.Name}</CTableDataCell>
                          <CTableDataCell>{gate.DeviceCode}</CTableDataCell>
                          <CTableDataCell>
                            {gate.accountancy_code ? gate.accountancy_code : '-'}
                          </CTableDataCell>
                          <CTableDataCell>{gate.Price}</CTableDataCell>
                          <CTableDataCell>{gate.stage_id}</CTableDataCell>
                          <CTableDataCell>{gate.IsEnter == '1' ? 'ورودی' : 'خروجی'}</CTableDataCell>
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
                          <CTableDataCell>
                            <CButton
                              color="success"
                              onClick={() => {
                                setDeviceCode(gate.DeviceCode)
                                handleIpSend()
                              }}
                            >
                              ارسال دستور
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
                      <CFormSelect
                        name="stage_id"
                        value={gateData.stage_id}
                        onChange={handleInputChange}
                        label="شماره سالن"
                      >
                        <option value="">انتخاب کنید</option>
                        {
                          //get stages from api
                          stage.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))
                        }
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={6}>
                      {/* <CFormInput
                        label="نوع گیت"
                        name="is_enter"
                        value={gateData.is_enter}
                        onChange={handleInputChange}
                      /> */}
                      <CFormSelect
                        name="is_enter"
                        value={gateData.is_enter}
                        onChange={handleInputChange}
                        label="نوع گیت"
                      >
                        <option value="">انتخاب کنید</option>
                        <option value={true}>ورودی</option>
                        <option value={false}>خروجی</option>
                      </CFormSelect>
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
