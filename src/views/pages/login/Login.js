import React, { useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './login.css'

const Login = () => {
  const [formdata, setFormdata] = useState({
    username: '',
    password: '',
  })
  // const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    setFormdata((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    AxiosInstance.post('/auth/login', formdata)
      .then((res) => {
        console.log(res.data.data.manager)
        // alert('ورود با موفقیت انجام شد')
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('manager', JSON.stringify(res.data.data.manager))
        localStorage.removeItem('customer')

        //redirect to openCash page
        window.location.href = '/#/pages/openCash'
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg)
      })
  }

  return (
    <div className="c-app  bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>ورود</h1>
                    <p className="text-medium-emphasis">ورود به پنل کاربری</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="نام کاربری"
                        autoComplete="username"
                        value={formdata.username}
                        onChange={handleInputCahnge}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="پسورد"
                        autoComplete="current-password"
                        value={formdata.password}
                        onChange={handleInputCahnge}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          ورود
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
