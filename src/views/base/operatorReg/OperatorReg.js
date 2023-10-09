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
  CFormSelect,
} from '@coreui/react'

const OperatorReg = () => {
  const [activekey, setActivekey] = useState(1)
  const [operatorList, setOperatorList] = useState([])
  const [roles, setRoles] = useState([])
  const [formdata, setFormdata] = useState({
    national_code: '',
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    accounting_code: '',
    is_superadmin: false,
    status: '1',
    roles: [''],
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

    AxiosInstance.get('/roles')
      .then((res) => {
        console.log(res.data.data)
        setRoles(res.data.data.roles)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    if (name === 'roles') {
      setFormdata((prev) => ({ ...prev, roles: [value] }))
    }
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
        alert(err.response.data.message)
      })
  }

  const handleUpdateOperator = () => {
    AxiosInstance.put(`/managers/${formdata.id}`, formdata)
      .then((res) => {
        console.log(res)
        alert('اپراتور با موفقیت ویرایش شد')
        setActivekey(1)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message)
      })
    console.log(formdata)
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
                        <CTableHeaderCell>وضعیت</CTableHeaderCell>
                        {/* <CTableHeaderCell>نقش</CTableHeaderCell> */}
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
                          <CTableDataCell>{item.status}</CTableDataCell>
                          {/* <CTableDataCell>{item.role}</CTableDataCell> */}
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
                                  accounting_code: item.accounting_code,
                                  status: item.status,
                                  // role: item.role,
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
                    <CCol md={6}>
                      <CFormInput
                        name="accounting_code"
                        label="کد حسابداری"
                        placeholder="کد حسابداری"
                        value={formdata.accounting_code}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        name="status"
                        label="وضعیت"
                        value={formdata.status}
                        onChange={handleInputCahnge}
                      >
                        <option value="">انتخاب کنید</option>
                        <option value="1">فعال</option>
                        <option value="0">غیرفعال</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        name="roles"
                        label="نقش"
                        value={formdata.roles}
                        onChange={handleInputCahnge}
                      >
                        <option value="">انتخاب کنید</option>
                        {roles.map((role) => {
                          return (
                            <option value={role.id} key={role.id}>
                              {role.name}
                            </option>
                          )
                        })}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        name="is_superadmin"
                        label="مدیر کل"
                        value={formdata.is_superadmin}
                        onChange={handleInputCahnge}
                      >
                        <option value="">انتخاب کنید</option>
                        <option value={true}>بله</option>
                        <option value={false}>خیر</option>
                      </CFormSelect>
                    </CCol>
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
