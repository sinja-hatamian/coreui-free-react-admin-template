import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

const OperatorReg = () => {
  const [activekey, setActivekey] = useState(1)
  const [operatorList, setOperatorList] = useState([])
  const [formdata, setFormdata] = useState({
    national_code: '',
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    is_superadmin: true,
  })

  useEffect(() => {
    AxiosInstance.get('/managers')
      .then((res) => {
        console.log(res.data.data)
        setOperatorList(res.data.data.managers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    setFormdata((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveOperator = () => {
    AxiosInstance.post('/managers', formdata)
      .then((res) => {
        console.log(res)
        alert('اپراتور با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت اپراتور')
      })
  }

  const handleUpdateOperator = () => {
    AxiosInstance.put(`/managers/${formdata.id}`, formdata)
      .then((res) => {
        console.log(res)
        alert('اپراتور با موفقیت ویرایش شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش اپراتور')
      })
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activekey === 1} onClick={() => setActivekey(1)}>
            لیست اپراتورها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activekey === 2} onClick={() => setActivekey(2)}>
            ثبت اپراتور جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activekey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست اپراتورها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام</CTableHeaderCell>
                        <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                        <CTableHeaderCell>کد ملی</CTableHeaderCell>
                        <CTableHeaderCell>شماره تماس</CTableHeaderCell>
                        <CTableHeaderCell>نام کاربری</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {operatorList.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.firstname}</CTableDataCell>
                          <CTableDataCell>{item.lastname}</CTableDataCell>
                          <CTableDataCell>{item.national_code}</CTableDataCell>
                          <CTableDataCell>{item.phone}</CTableDataCell>
                          <CTableDataCell>{item.username}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              onClick={() => {
                                console.log(item)
                                setFormdata({
                                  id: item.id,
                                  national_code: item.national_code,
                                  firstname: item.firstname,
                                  lastname: item.lastname,
                                  phone: item.phone,
                                  username: item.username,
                                  is_superadmin: item.is_superadmin,
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
        <CTabPane role="tabpanel" aria-labelledby="signup-tab" visible={activekey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>ثبت نام کاربر جدید</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs>
                      <CFormInput
                        label="نام"
                        name="firstname"
                        placeholder="نام "
                        aria-label="firstname"
                        locale="fa-IR"
                        value={formdata.firstname}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormInput
                        name="lastname"
                        label="نام خانوادگی"
                        placeholder="نام خانوادگی "
                        aria-label="lastname"
                        locale="fa-IR"
                        value={formdata.lastname}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                  </CRow>
                  <CForm className="row g-3">
                    <CCol md={6}>
                      <CFormInput
                        name="username"
                        label="نام کاربری"
                        placeholder="نام کاربری"
                        value={formdata.username}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="password"
                        name="password"
                        label="پسورد"
                        placeholder="پسورد"
                        value={formdata.password}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="int"
                        name="national_code"
                        label="کد ملی"
                        placeholder="کد ملی"
                        value={formdata.national_code}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="phone"
                        name="phone"
                        label="شماره تلفن"
                        placeholder="شماره تلفن"
                        value={formdata.phone}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    {/* <CCol md={4}>
                 <CFormSelect id="inputState" label="جنسیت">
                   <option value="male">مرد</option>
                   <option value="female">زن</option>
                 </CFormSelect>
               </CCol> */}
                    {/* <CCol xs={12}>
                 <CFormInput id="inputAddress" label="آدرس پستی" placeholder="1234 Main St" />
               </CCol>
               <CCol md={2}>
                 <CFormInput id="inputZip" label="کدپستی" />
               </CCol>
               <CCol md={4}>
                 <CFormSelect id="inputState" label="نقش">
                   <option>مدیر سایت</option>
                   <option>کارمند پذیرش</option>
                   <option>پیک </option>
                   <option> حسابدار</option>
                 </CFormSelect>
               </CCol> */}
                    <CCol md={12}>
                      <CButton
                        color="info"
                        onClick={() => {
                          if (formdata.id) {
                            handleUpdateOperator()
                          } else {
                            handleSaveOperator()
                          }
                        }}
                      >
                        ثبت
                      </CButton>
                      {/* <CButton color="success">افزودن</CButton> */}
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default OperatorReg
