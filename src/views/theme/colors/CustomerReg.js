import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import ChargCard from 'src/views/pages/chargCard/ChargCard'
import AddAttendant from 'src/views/pages/addAttendant/AddAttendant'
import InfoCard from 'src/views/pages/infoCard/InfoCard'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

const CustomerReg = () => {
  const [formdata, setFormdata] = useState({
    national_code: '',
    firstname: '',
    lastname: '',
    introduction_way: '',
    password: '',
    phone: '',
    state: '',
    city: '',
    gender: '',
    birthday: '',
  })
  const [activeKey, setActiveKey] = useState(1)
  const [value, setValue] = useState(new Date())

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    setFormdata((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (localStorage.getItem('customer')) {
      setFormdata(JSON.parse(localStorage.getItem('customer')))
    }
  }, [])

  const handleSaveCustomer = () => {
    console.log(formdata)
    axios
      .post('http://localhost:4000/api/manager/users', formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        localStorage.setItem('customer', JSON.stringify(res.data.data.user))
        console.log(res)
        alert('کاربر با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت کاربر')
      })
  }
  const fetchCustomerData = () => {
    axios
      .get(`http://localhost:4000/api/manager/users/national-code/${formdata.national_code}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setFormdata((prev) => ({ ...prev, ...customerData }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        alert(' کاربر موجود نیست')
      })
  }

  const handleUpdateCustomer = () => {
    axios
      .put(`http://localhost:4000/api/manager/users/${formdata.id}`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res)
        alert('کاربر با موفقیت ویرایش شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش کاربر')
      })
  }

  // const formatDate = (date) => {
  //   if (!date) {
  //     return null
  //   }
  //   const year = date.format('YYYY')
  //   const month = date.format('MM')
  //   const day = date.format('DD')

  //   return `${year}-${month}-${day}`
  // }

  const handleDate = (newDate) => {
    setValue(newDate.valueOf())
    console.log(newDate.valueOf())
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            ذخیره نام مشتری
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            اطلاعات کارت
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
            شارژ کارت
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
            انتقال وجه
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 6} onClick={() => setActiveKey(6)}>
            تخصیص دستبند
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>ثبت نام کاربر جدید</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        label="کدملی"
                        name="national_code"
                        placeholder="کد ملی"
                        aria-label="national_code"
                        locale="fa-IR"
                        value={formdata.national_code}
                        onChange={handleInputCahnge}
                      />
                      <CButton color="info" onClick={fetchCustomerData}>
                        بررسی کد ملی
                      </CButton>
                    </CCol>
                  </CRow>
                  <CForm className="row g-3">
                    <CCol md={6}>
                      <CCol xs>
                        <CFormInput
                          label="نام"
                          name="firstname"
                          placeholder=" نام"
                          aria-label="firstname"
                          locale="fa-IR"
                          value={formdata.firstname}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={6}>
                      <CCol xs>
                        <CFormInput
                          label="نام خانوادگی"
                          name="lastname"
                          placeholder="نام خانوادگی"
                          aria-label="lastname"
                          locale="fa-IR"
                          value={formdata.lastname}
                          onChange={handleInputCahnge}
                        />
                      </CCol>
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        label=" نحوه آشنایی"
                        name="introduction_way"
                        placeholder="نحوه آشنایی"
                        aria-label="introduction_way"
                        locale="fa-IR"
                        value={formdata.introduction_way}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="password"
                        label=" پسورد"
                        name="password"
                        aria-label="password"
                        locale="fa-IR"
                        value={formdata.password}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="phone"
                        label="شماره تلفن"
                        name="phone"
                        aria-label="phone"
                        locale="fa-IR"
                        value={formdata.phone}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="state"
                        label="استان"
                        name="state"
                        aria-label="state"
                        locale="fa-IR"
                        value={formdata.state}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="city"
                        label="شهر"
                        name="city"
                        aria-label="city"
                        locale="fa-IR"
                        value={formdata.city}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <p>تاریخ تولد</p>
                      {/* <CFormInput
                        type="birthday"
                        label="تاریخ تولد"
                        name="birthday"
                        aria-label="birthday"
                        locale="fa-IR"
                        value={formdata.birthday}
                        onChange={handleInputCahnge}
                      /> */}

                      <DatePicker
                        value={value}
                        onChange={handleDate}
                        calendarPosition="bottom-right"
                        inputPlaceholder="تاریخ تولد"
                        locale={persian_fa}
                        calendar={persian}
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormSelect
                        label="جنسیت"
                        name="gender"
                        aria-label="gender"
                        locale="fa-IR"
                        value={formdata.gender}
                        onChange={handleInputCahnge}
                      >
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CButton
                        color="success"
                        onClick={() => {
                          //if user field is full update user else create new user
                          if (formdata.id) {
                            handleUpdateCustomer()
                          } else {
                            handleSaveCustomer()
                          }
                        }}
                      >
                        ذخیره
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 2}>
          <InfoCard />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
          <ChargCard />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 6}>
          <AddAttendant />
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default CustomerReg
