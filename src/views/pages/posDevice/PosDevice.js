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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const PosDevice = () => {
  const [acttiveKey, setActtiveKey] = useState(1)
  const [posList, setPosList] = useState([])
  const [bankTitle, setBankTitle] = useState([])
  const [stage, setStage] = useState([])
  const [pos, setPos] = useState({
    title: '',
    bank_id: '',
    bank_title: '',
    stage_title: '',
    stage_id: '',
    operator_ip: '',
    pos_ip: '',
    pos_port: '',
  })

  useEffect(() => {
    AxiosInstance.get('/pos-devices')
      .then((res) => {
        setPosList(res.data.data.pos_devices)
        console.log(res.data.data.pos_devices)
      })
      .catch((err) => {
        console.log(err)
      })

    AxiosInstance.get('/banks')
      .then((res) => {
        setBankTitle(res.data.data.banks)
        console.log(res.data.data.banks)
      })
      .catch((err) => {
        console.log(err)
      })

    AxiosInstance.get('/stages').then((res) => {
      setStage(res.data.data.stages)
      console.log(res.data.data.stages)
    })
  }, [])

  const handleInputChange = (e) => {
    setPos((pos) => ({ ...pos, [e.target.name]: e.target.value }))
  }

  const handleAddPos = () => {
    AxiosInstance.post('/pos-devices', pos)
      .then((res) => {
        console.log(res.data.data)
        alert('دستگاه با موفقیت اضافه شد')
        setPosList([...posList, res.data.data.pos_device])
        setActtiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg)
      })
  }

  const handleUpdatePos = () => {
    AxiosInstance.put(`/pos-devices/${pos.id}`, pos)
      .then((res) => {
        console.log(res.data.data)
        alert('ویرایش با موفقیت انجام شد')
        setPosList([...posList.filter((item) => item.id != pos.id), res.data.data.pos_device])
        setActtiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg)
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={acttiveKey === 1} onClick={() => setActtiveKey(1)}>
            لیست دستگاه پوز
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={acttiveKey === 2} onClick={() => setActtiveKey(2)}>
            افزودن دستگاه پوز
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        {/* Show pos devices list */}
        <CTabPane role="tabpanel" aria-label="home-tab" visible={acttiveKey === 1}>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <strong> لیست دستگاه ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام دستگاه</CTableHeaderCell>
                        <CTableHeaderCell> بانک</CTableHeaderCell>
                        <CTableHeaderCell> سالن</CTableHeaderCell>
                        <CTableHeaderCell>آیپی اپراتور</CTableHeaderCell>
                        <CTableHeaderCell>آیپی پوز</CTableHeaderCell>
                        <CTableHeaderCell>پورت پوز</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {posList.map((pos) => (
                        <CTableRow key={pos.id}>
                          <CTableDataCell>{pos.title}</CTableDataCell>
                          <CTableDataCell>{pos.bank_title}</CTableDataCell>
                          <CTableDataCell>{pos.stage_title}</CTableDataCell>
                          <CTableDataCell>{pos.operator_ip}</CTableDataCell>
                          <CTableDataCell>{pos.pos_ip}</CTableDataCell>
                          <CTableDataCell>{pos.pos_port}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                setPos({
                                  id: pos.id,
                                  title: pos.title,
                                  bank_title: pos.bank_title,
                                  stage_title: pos.stage_title,
                                  operator_ip: pos.operator_ip,
                                  pos_ip: pos.pos_ip,
                                  pos_port: pos.pos_port,
                                })
                                setActtiveKey(2)
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
        {/* Add and update pos */}
        <CTabPane role="tabpanel" aria-label="profile-tab" visible={acttiveKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>افزودن دستگاه</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        label="نام دستگاه"
                        placeholder="نام دستگاه "
                        value={pos.title}
                        onChange={handleInputChange}
                        name="title"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        label="بانک"
                        placeholder="بانک"
                        value={pos.bank_title}
                        onChange={handleInputChange}
                        name="bank_title"
                      >
                        <option value="">انتخاب کنید</option>
                        {bankTitle.map((bank) => (
                          <option key={bank.id} value={bank.title}>
                            {bank.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        label=" سالن"
                        placeholder="سالن"
                        value={pos.stage_title}
                        onChange={handleInputChange}
                        name="stage_title"
                      >
                        <option value="">انتخاب کنید</option>
                        {stage.map((stage) => (
                          <option key={stage.id} value={stage.title}>
                            {stage.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        label="آیپی اپراتور"
                        placeholder=" آیپی اپراتور"
                        value={pos.operator_ip}
                        onChange={handleInputChange}
                        name="operator_ip"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        label=" آیپی پوز"
                        placeholder="آیپی پوز"
                        value={pos.pos_ip}
                        onChange={handleInputChange}
                        name="pos_ip"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        label=" پورت پوز"
                        placeholder=" پورت پوز"
                        value={pos.pos_port}
                        onChange={handleInputChange}
                        name="pos_port"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CButton color="primary" onClick={pos.id ? handleUpdatePos : handleAddPos}>
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

export default PosDevice
