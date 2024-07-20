import React, { useEffect, useState } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChargCard from 'src/views/pages/chargCard/ChargCard'
import AddAttendant from 'src/views/pages/addAttendant/AddAttendant'
import InfoCard from 'src/views/pages/infoCard/InfoCard'
import Decrese from 'src/views/pages/decrese/Decrese'
import DatePicker from 'react-multi-date-picker'
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
    introduction_way_id: '',
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

  const fetchCity = (state_id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/states/${state_id}/cities`)
      .then((res) => {
        setCity(res.data.data.cities)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleInputCahnge = (e) => {
    const { name, value } = e.target
    if (name === 'state_id') {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/states/${value}/cities`)
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
      const customerData = JSON.parse(localStorage.getItem('customer'))
      fetchCity(customerData.state_id)
      setValue(new Date(customerData.birthday))
      setFormdata((prev) => ({
        ...prev,
        ...customerData,
        birthday: new Date(customerData.birthday).valueOf(),
        introduction_way: customerData.introduction_way_id,
      }))
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/states`)
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
        fetchCity(customerData.state_id)
        setValue(new Date(customerData.birthday))
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
          birthday: new Date(customerData.birthday).valueOf(),
          introduction_way: customerData.introduction_way_id,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این کد ملی وجود ندارد')
        setFormdata((prev) => ({
          ...prev,
          firstname: '',
          lastname: '',
          introduction_way: '',
          password: '',
          phone: '',
          state_id: '',
          city_id: '',
          gender: '',
          birthday: '',
          id: '',
        }))
        localStorage.removeItem('customer')
      })
  }

  const fetchDataWithPhone = () => {
    AxiosInstance.get(`/users/phone/${formdata.phone}`)
      .then((res) => {
        const customerData = res.data.data.user
        fetchCity(customerData.state_id)
        setValue(new Date(customerData.birthday))
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
          birthday: new Date(customerData.birthday).valueOf(),
          introduction_way: customerData.introduction_way_id,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره تلفن وجود ندارد')
        setFormdata((prev) => ({
          ...prev,
          firstname: '',
          lastname: '',
          introduction_way: '',
          password: '',
          phone: '',
          state_id: '',
          city_id: '',
          gender: '',
          birthday: '',
          id: '',
        }))
        localStorage.removeItem('customer')
      })
  }

  const fetchDataWithCardNumber = () => {
    AxiosInstance.get(`/users/card-number/${card_number}`)
      .then((res) => {
        const customerData = res.data.data.user
        fetchCity(customerData.state_id)
        setValue(new Date(customerData.birthday))
        console.log(customerData)
        setFormdata((prev) => ({
          ...prev,
          ...customerData,
          birthday: new Date(customerData.birthday).valueOf(),
          introduction_way: customerData.introduction_way_id,
        }))
        localStorage.setItem('customer', JSON.stringify(customerData))
        setActiveKey(2)
      })
      .catch((err) => {
        console.log(err)
        toast.error('کاربری با این شماره کارت وجود ندارد')
        setFormdata((prev) => ({
          ...prev,
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
          id: '',
        }))
        localStorage.removeItem('customer')
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
    if (newDate) {
      setValue(newDate.valueOf())
      console.log(newDate.valueOf())
      setFormdata((prev) => ({ ...prev, birthday: newDate.valueOf() }))
    }
  }

  const handleCleanForm = () => {
    setFormdata({
      national_code: '',
      firstname: '',
      lastname: '',
      introduction_way: '',
      introduction_way_id: '',
      password: '',
      phone: '',
      state_id: '',
      city_id: '',
      gender: '',
      birthday: '',
    })
    localStorage.removeItem('customer')
  }

  const managerRoles = JSON.parse(localStorage.getItem('manager')).roles
  const targetRoles = ['cashier', 'supervisor']
  const isEqual = JSON.stringify(managerRoles) === JSON.stringify(targetRoles)
  const isSuperAdmin = JSON.parse(localStorage.getItem('manager')).is_superadmin

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
        {isEqual || isSuperAdmin ? (
          <CNavItem>
            <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
              مدیریت اعتبار
            </CNavLink>
          </CNavItem>
        ) : null}
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
                        // value={formdata.introduction_way_id}
                      >
                        <option value="">انتخاب کنید</option>
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
                        onChange={handleInputCahnge} // Ensure this is correctly spelled as handleInputChange
                        value={formdata.state_id} // Control the selection with this value
                      >
                        <option value="">انتخاب کنید</option>
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
                        onChange={handleInputCahnge} // Corrected the function name typo
                        value={formdata.city_id} // Control the selection with this value
                      >
                        <option value="">انتخاب کنید</option>
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
                        onChange={handleInputCahnge} // Corrected the function name typo
                      >
                        <option value="">انتخاب کنید</option>
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CButton
                        color="success"
                        style={{ color: '#fff', width: '100px' }}
                        onClick={handleSaveCustomer}
                      >
                        ذخیره
                      </CButton>
                    </CCol>
                    <p />
                    <CCol md={12} style={{ display: 'flex', alignItems: 'baseline' }}>
                      <CButton
                        color="warning"
                        style={{ color: '#fff', width: '100px' }} // Add some margin to the right of the button
                        onClick={handleUpdateCustomer}
                      >
                        ویرایش کاربر
                      </CButton>

                      <p style={{ marginRight: '10px', fontSize: '18px' }}>
                        <strong style={{ color: 'red' }}>توجه:</strong> فقط برای اپدیت اطلاعات کاربر
                        از گزینه ویرایش کاربر استفاده کنید
                      </p>
                    </CCol>
                    <p />
                    <CCol md={12}>
                      <CButton color="danger" style={{ color: '#fff' }} onClick={handleCleanForm}>
                        پاک سازی فرم
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
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 4}>
          {activeKey === 4 ? <Decrese /> : null}
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
