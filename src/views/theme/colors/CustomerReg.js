import React, { useEffect, useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChargCard from 'src/views/pages/chargCard/ChargCard'
import AddAttendant from 'src/views/pages/addAttendant/AddAttendant'
import InfoCard from 'src/views/pages/infoCard/InfoCard'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
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

const CustomerReg = () => {
  const [formdata, setFormdata] = useState({
    national_code: '',
    firstname: '',
    lastname: '',
    introduction_way: '',
    password: '',
    phone: '',
    state_id: '',
    city_id: '',
    gender: '',
    birthday: '',
  })
  const [activeKey, setActiveKey] = useState(1)
  const [value, setValue] = useState(new Date())
  const [introductionWays, setIntroductionWays] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [card_number, setCard_number] = useState('')

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    if (name === 'state_id') {
      axios
        .get(`http://192.168.11.11:3000/api/states/${value}/cities`)
        .then((res) => {
          setCity(res.data.data.cities)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    setFormdata((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (localStorage.getItem('customer')) {
      setFormdata(JSON.parse(localStorage.getItem('customer')))
    }
    AxiosInstance.get('/introduction-ways')
      .then((res) => {
        console.log(res)
        setIntroductionWays(res.data.data.introduction_ways)
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get('http://192.168.11.11:3000/api/states')
      .then((res) => {
        console.log(res)
        setState(res.data.data.states)
        console.log(state)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSaveCustomer = () => {
    console.log(formdata)
    AxiosInstance.post('/users', formdata)
      .then((res) => {
        localStorage.setItem('customer', JSON.stringify(res.data.data.user))
        console.log(res)
        toast.success('کاربر با موفقیت ثبت شد')
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }
  const fetchCustomerData = () => {
    AxiosInstance.get(`/users/national-code/${formdata.national_code}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این کد ملی وجود ندارد')
        setFormdata({
          firstname: '',
          lastname: '',
          introduction_way: '',
          password: '',
          phone: '',
          state_id: '',
          city_id: '',
          gender: '',
          birthday: '',
        })
        localStorage.removeItem('customer')
      })
  }

  const fetchDataWithPhone = () => {
    AxiosInstance.get(`/users/phone/${formdata.phone}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره تلفن وجود ندارد')
        setFormdata({
          firstname: '',
          lastname: '',
          introduction_way: '',
          password: '',
          phone: '',
          state_id: '',
          city_id: '',
          gender: '',
          birthday: '',
        })
      })
  }

  const fetchDataWithCardNumber = () => {
    AxiosInstance.get(`/users/card-number/${card_number}`)
      .then((res) => {
        const customerData = res.data.data.user
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره کارت وجود ندارد')
        setFormdata({
          national_code: '',
          firstname: '',
          lastname: '',
          introduction_way: '',
          password: '',
          phone: '',
          state_id: '',
          city_id: '',
          gender: '',
          birthday: '',
        })
      })
  }

  const handleUpdateCustomer = () => {
    AxiosInstance.put(`/users/${formdata.id}`, formdata)
      .then((res) => {
        console.log(res)
        toast.success('کاربر با موفقیت ویرایش شد')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleDate = (newDate) => {
    setValue(newDate.valueOf())
    console.log(newDate.valueOf())
    setFormdata((prev) => ({ ...prev, birthday: newDate.valueOf() }))
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
            شارژ
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
                    <CCol md={4}>
                      <CFormInput
                        label="کدملی"
                        name="national_code"
                        placeholder="کد ملی"
                        aria-label="national_code"
                        locale="fa-IR"
                        value={formdata.national_code}
                        onChange={handleInputCahnge}
                      />
                      <CButton
                        color="info"
                        onClick={fetchCustomerData}
                        style={{ color: '#fff' }}
                        className="mt-2"
                      >
                        بررسی کد ملی
                      </CButton>
                    </CCol>
                    <p />
                    <CCol md={4}>
                      <CFormInput
                        type="phone"
                        label="شماره تلفن"
                        name="phone"
                        aria-label="phone"
                        locale="fa-IR"
                        value={formdata.phone}
                        onChange={handleInputCahnge}
                      />

                      <CButton
                        color="info"
                        onClick={fetchDataWithPhone}
                        style={{ color: '#fff' }}
                        className="mt-2"
                      >
                        بررسی شماره تلفن
                      </CButton>
                    </CCol>
                    <p />
                    <CCol md={4}>
                      <CFormInput
                        label="شماره کارت"
                        name="card_number"
                        placeholder="شماره کارت"
                        aria-label="card_number"
                        locale="fa-IR"
                        value={card_number}
                        onChange={(e) => setCard_number(e.target.value)}
                      />
                      <CButton
                        color="info"
                        onClick={fetchDataWithCardNumber}
                        style={{ color: '#fff' }}
                        className="mt-2"
                      >
                        بررسی شماره کارت
                      </CButton>
                    </CCol>
                  </CRow>
                  <p />
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
                      <CFormSelect
                        name="introduction_way"
                        label="نحوه آشنایی"
                        aria-label="introduction_way"
                        locale="fa-IR"
                        onChange={handleInputCahnge}
                      >
                        <option>انتخاب کنید</option>
                        {introductionWays.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="password"
                        label="پسورد اکانت"
                        name="password"
                        aria-label="password"
                        locale="fa-IR"
                        value={formdata.password}
                        onChange={handleInputCahnge}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        name="state_id"
                        label="استان"
                        aria-label="state_id"
                        locale="fa-IR"
                        onChange={handleInputCahnge}
                      >
                        <option>انتخاب کنید</option>
                        {state.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        name="city_id"
                        label="شهر"
                        aria-label="city_id"
                        locale="fa-IR"
                        onChange={handleInputCahnge}
                      >
                        <option>انتخاب کنید</option>
                        {city.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <p>تاریخ تولد</p>
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
                        <option value="">انتخاب کنید</option>
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CButton
                        color="success"
                        style={{ color: '#fff' }}
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
          {activeKey === 2 ? <InfoCard /> : null}
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
          {activeKey === 3 ? <ChargCard /> : null}
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 6}>
          {activeKey === 6 ? <AddAttendant /> : null}
        </CTabPane>
      </CTabContent>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default CustomerReg
