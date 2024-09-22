import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'moment-jalaali'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CForm,
  CFormInput,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFormTextarea,
  CAccordion,
  CAccordionItem,
  CAccordionBody,
  CAccordionHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

const PackageReserve = () => {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
  const [isModalCustomerOpen, setIsModalCustomerOpen] = useState(false)
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [isActivePackage, setIsActivePackage] = useState([])
  const [isActiveItems, setIsActiveItems] = useState([])
  const [isActiveOtherItems, setIsActiveOtherItems] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [selectedChildren, setSelectedChildren] = useState({})
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [introductionWays, setIntroductionWays] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [value, setValue] = useState(new Date())
  const [startDate, setStartDate] = useState(moment().toDate())
  const [endDate, setEndDate] = useState(moment().toDate())
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })
  const [formData, setFormData] = useState({
    user_id: '',
    package_id: '',
    date: '',
    start_time: '',
    total_count: '',
    player_count: '',
    description: '',
    discount: '',
    items: [],
  })
  const [userData, setUserData] = useState({
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

  // const fetchCity = (state_id) => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/api/states/${state_id}/cities`)
  //     .then((res) => {
  //       setCity(res.data.data.cities)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  useEffect(() => {
    AxiosInstance.get('/packages/active')
      .then((res) => {
        setIsActivePackage(res.data.data.packages)
      })
      .catch((err) => {
        console.log(err)
      })

    AxiosInstance.get('/items/active')
      .then((res) => {
        const items = res.data.data.items
        const parentIds = items.map((item) => item.parent_id)
        const parentItems = items.filter((item) => parentIds.includes(item.id))
        const childItems = items.filter((item) => item.parent_id !== null)
        const otherItems = items.filter(
          (item) => item.parent_id === null && !parentIds.includes(item.id),
        )

        const organizedItems = parentItems.map((parent) => {
          return {
            ...parent,
            children: childItems.filter((child) => child.parent_id === parent.id),
          }
        })

        setIsActiveItems(organizedItems)
        setIsActiveOtherItems(otherItems)
      })
      .catch((err) => {
        console.log(err)
      })

    AxiosInstance.get('/introduction-ways')
      .then((res) => {
        setIntroductionWays(res.data.data.introduction_ways)
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/states`)
      .then((res) => {
        setState(res.data.data.states)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleDate = (date) => {
    const formattedDate = moment(date.toDate()).format('YYYY-MM-DD')
    setFormData({ ...formData, date: formattedDate })
  }

  const handleBirthDate = (newDate) => {
    if (newDate) {
      setValue(newDate.valueOf())
      setUserData((prev) => ({ ...prev, birthday: newDate.valueOf() }))
    }
  }

  const handleRadioChange = (parentId, child) => {
    if (selectedChildren[parentId] === undefined) {
      // If item already exists in array, update the count if needed
      setFormData({ ...formData, items: [...formData.items, { id: child.id, count: 1 }] })
    } else {
      setFormData({
        ...formData,
        items: [
          ...formData.items.filter((item) => item.id != selectedChildren[parentId]),
          { id: child.id, count: 1 },
        ],
      })
    }

    setSelectedChildren((prevSelectedChildren) => ({
      ...prevSelectedChildren,
      [parentId]: child.id,
    }))
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormData({ ...formData, items: [...formData.items, { id: e.target.value, count: 1 }] })
    } else {
      setFormData({
        ...formData,
        items: [...formData.items.filter((item) => item.id != e.target.value)],
      })
    }
  }

  const handleInputChange = (e, id) => {
    setFormData({
      ...formData,
      items: [...formData.items.filter((item) => item.id != id), { id, count: e.target.value }],
    })
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const renderDropdowns = () => {
    return (
      <CAccordion>
        {isActiveItems.map((item) => (
          <CAccordionItem key={item.id} itemKey={item.id}>
            <CAccordionHeader>
              <div
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  backgroundColor: '#f7f7f7',
                  fontFamily: 'IRANSans',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </div>
            </CAccordionHeader>

            <CAccordionBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>آیتم</CTableHeaderCell>
                    <CTableHeaderCell>تعداد</CTableHeaderCell>
                    <CTableHeaderCell>قیمت واحد(ریال)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {item.children.map((child) => (
                    <CTableRow key={child.id}>
                      <CTableDataCell>
                        <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <input
                            type="radio"
                            checked={selectedChildren[item.id] === child.id}
                            onChange={() => handleRadioChange(item.id, child)}
                            style={{ marginRight: '10px' }}
                          />
                          <span style={{ marginRight: '10px' }}>{child.title}</span>
                        </label>
                      </CTableDataCell>
                      <CTableDataCell>
                        {child.is_per_person ? (
                          <CFormInput
                            id="count"
                            name="count"
                            placeholder="تعداد"
                            style={{ width: '100px' }}
                            value={
                              formData.items.find((formItem) => formItem.id === child.id)?.count ||
                              ''
                            }
                            onChange={(e) => handleInputChange(e, child.id)}
                          />
                        ) : (
                          '-'
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <span style={{ marginRight: '10px' }}>{numberWithCommas(child.price)}</span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>
    )
  }

  const renderOtherItems = () => {
    return (
      <CAccordion>
        <CAccordionItem itemKey="otherItems">
          <CAccordionHeader>
            <div
              style={{
                cursor: 'pointer',
                padding: '10px',
                backgroundColor: '#f7f7f7',
                fontFamily: 'IRANSans',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              سایر آیتم‌ها
            </div>
          </CAccordionHeader>

          <CAccordionBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>آیتم</CTableHeaderCell>
                  <CTableHeaderCell>تعداد</CTableHeaderCell>
                  <CTableHeaderCell>قیمت واحد(ریال)</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {isActiveOtherItems.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>
                      <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <input
                          type="checkbox"
                          style={{ marginRight: '10px' }}
                          value={item.id}
                          onChange={handleCheckboxChange}
                        />
                        <span style={{ marginRight: '10px' }}>{item.title}</span>
                      </label>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.is_per_person ? (
                        <CFormInput
                          id="count"
                          name="count"
                          placeholder="تعداد"
                          style={{ width: '100px' }}
                          value={
                            formData.items.find((formItem) => formItem.id === item.id)?.count || ''
                          }
                          onChange={(e) => handleInputChange(e, item.id)}
                        />
                      ) : (
                        '-'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <span style={{ marginRight: '10px' }}>{numberWithCommas(item.price)}</span>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    )
  }

  const handleTimeChange = (date) => {
    // Ensure moment is used correctly to format the time
    const formattedTime = moment(date.toDate()).format('HH:mm')
    setFormData({ ...formData, start_time: formattedTime })
  }
  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        console.log(res.data.data.user)
        setCustomerData({
          id: res.data.data.user.id,
          firstname: res.data.data.user.firstname,
          lastname: res.data.data.user.lastname,
        })
        setFormData({ ...formData, user_id: res.data.data.user.id })
        console.log(formData)
      })
      .catch((err) => {
        toast.error('کاربری با این کد ملی یافت نشد')
      })
  }

  const fetchUSerByPhone = () => {
    AxiosInstance.get(`/users/phone/${phone}`)
      .then((res) => {
        setCustomerData({
          id: res.data.data.user.id,
          firstname: res.data.data.user.firstname,
          lastname: res.data.data.user.lastname,
        })
        setFormData({ ...formData, user_id: res.data.data.user.id })
      })
      .catch((err) => {
        toast.error('کاربری با این شماره تلفن یافت نشد')
      })
  }

  const handleSaveCustomerInputChange = (e) => {
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
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveCustomer = () => {
    AxiosInstance.post('/users', userData)
      .then((res) => {
        setCustomerData({
          id: res.data.data.user.id,
          firstname: res.data.data.user.firstname,
          lastname: res.data.data.user.lastname,
        })
        setFormData({ ...formData, user_id: res.data.data.user.id })
        toast.success('کاربر با موفقیت ثبت شد')
        setIsModalCustomerOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const showDetails = (id) => {
    AxiosInstance.get(`/package-reserves/${id}`)
      .then((res) => {
        setCustomerData({
          firstname: res.data.data.package_reserve.user_firstname,
          lastname: res.data.data.package_reserve.user_lastname,
        })
        setFormData({
          date: res.data.data.package_reserve.date,
          start_time: res.data.data.package_reserve.start_time,
          total_count: res.data.data.package_reserve.total_count,
          player_count: res.data.data.package_reserve.player_count,
          description: res.data.data.package_reserve.description,
          total_price: res.data.data.package_reserve.total_price,
          package_id: res.data.data.package_reserve.package_id,
          items: res.data.data.package_reserve.items,
        })
        setIsModalDetailsOpen(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hadleCalculate = () => {
    console.log(formData)
    AxiosInstance.post('/package-reserves/calculate-price', formData)
      .then((res) => {
        setCalculatedPrice(res.data.data.total_price)
        setIsModalOpen(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleReserve = () => {
    AxiosInstance.post('/package-reserves', formData)
      .then((res) => {
        toast.success('رزرو با موفقیت ثبت شد')
        setIsModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
        toast.error('خطا در ثبت رزرو')
      })
  }

  const handleShowReserves = () => {
    AxiosInstance.get(`package-reserves?start_date=${startDate}&end_date=${endDate}`)

      .then((res) => {
        setData(res.data.data.package_reserves)
        console.log(startDate)
        console.log(endDate)
      })
      .catch((err) => {
        console.log(err)

        toast.error('خطا در دریافت اطلاعات')
      })
  }

  const handleStartDate = (date) => {
    date = new Date(date)
    setStartDate(date.valueOf())
  }

  const handleEndDate = (date) => {
    date = new Date(date)
    setEndDate(date.valueOf())
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            لیست کلیه رزروها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            رزرو جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane aria-label="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCard>
              <CCardHeader>
                <strong>جستجو بر اساس تاریخ</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CForm>
                    <CCol md="6" className="mb-3">
                      <CFormLabel
                        htmlFor="startDate"
                        className="form-label"
                        style={{
                          padding: '10px',
                        }}
                      >
                        از تاریخ
                      </CFormLabel>
                      <DatePicker
                        value={startDate}
                        onChange={handleStartDate}
                        locale={persian_fa}
                        calendar={persian}
                      />
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CFormLabel
                        htmlFor="endDate"
                        className="form-label"
                        style={{
                          padding: '10px',
                        }}
                      >
                        تا تاریخ
                      </CFormLabel>
                      <DatePicker
                        value={endDate}
                        onChange={handleEndDate}
                        locale={persian_fa}
                        calendar={persian}
                      />
                    </CCol>
                  </CForm>
                </CRow>
                <CButton color="primary" onClick={handleShowReserves}>
                  جستجو
                </CButton>
              </CCardBody>
            </CCard>
            <CCol>
              <br />
              <CCard>
                <CCardHeader>
                  <strong>لیست کلیه رزروها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام مشتری</CTableHeaderCell>
                        <CTableHeaderCell>تاریخ</CTableHeaderCell>
                        <CTableHeaderCell>ساعت</CTableHeaderCell>
                        <CTableHeaderCell>قیمت</CTableHeaderCell>
                        <CTableHeaderCell>وضعیت</CTableHeaderCell>
                        <CTableHeaderCell>جزئیات</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>
                            {item.user_firstname} {item.user_lastname}
                          </CTableDataCell>
                          <CTableDataCell>
                            {moment(item.date).format('jYYYY/jMM/jDD')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {item.start_time.split('T')[1].split(':').slice(0, 2).join(':')}
                          </CTableDataCell>
                          <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                          <CTableDataCell>{item.status}</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="primary" onClick={() => showDetails(item.id)}>
                              نمایش جزئیات
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
                <CModal visible={isModalDetailsOpen} onClose={() => setIsModalDetailsOpen(false)}>
                  <CModalHeader className="bg-primary text-white">
                    <CModalTitle>جزئیات رزرو</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="p-4">
                    <CTable striped hover bordered responsive className="mb-4">
                      <CTableBody>
                        {/* Customer Name */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">نام مشتری:</CTableHeaderCell>
                          <CTableDataCell>
                            {customerData.firstname} {customerData.lastname}
                          </CTableDataCell>
                        </CTableRow>
                        {/* Date */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">تاریخ:</CTableHeaderCell>
                          <CTableDataCell>
                            {moment(formData.date).format('jYYYY/jMM/jDD')}
                          </CTableDataCell>
                        </CTableRow>
                        {/* Time */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">ساعت:</CTableHeaderCell>
                          <CTableDataCell>{formData.start_time}</CTableDataCell>
                        </CTableRow>
                        {/* Total Guests */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">تعداد کل مهمانان:</CTableHeaderCell>
                          <CTableDataCell>{formData.total_count}</CTableDataCell>
                        </CTableRow>
                        {/* Players Count */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">تعداد بازیکن:</CTableHeaderCell>
                          <CTableDataCell>{formData.player_count}</CTableDataCell>
                        </CTableRow>
                        {/* Selected Package */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">پکیج انتخاب شده:</CTableHeaderCell>
                          <CTableDataCell>
                            {isActivePackage.find((pkg) => pkg.id === formData.package_id)?.title ||
                              'N/A'}
                          </CTableDataCell>
                        </CTableRow>
                        {/* Final Price */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">قیمت نهایی :</CTableHeaderCell>
                          <CTableDataCell>
                            {numberWithCommas(formData.total_price || 0)} ریال
                          </CTableDataCell>
                        </CTableRow>
                        {/* Description */}
                        <CTableRow>
                          <CTableHeaderCell className="fw-bold">توضیحات:</CTableHeaderCell>
                          <CTableDataCell>{formData.description}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>

                    {/* Item Details */}
                    <h5 className="mt-4">آیتم‌ها</h5>
                    <CTable striped hover bordered responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>نام آیتم</CTableHeaderCell>
                          <CTableHeaderCell>تعداد</CTableHeaderCell>
                          <CTableHeaderCell>قیمت کل (ریال)</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {formData.items.length > 0 ? (
                          formData.items.map((item) => {
                            const foundItem = isActiveItems
                              .map((parent) => parent.children)
                              .flat()
                              .concat(isActiveOtherItems)
                              .find((i) => String(i.id) === String(item.id))

                            const title = foundItem?.title ?? 'Unknown Title'
                            const price = foundItem?.price ?? 0

                            return (
                              <CTableRow key={item.id}>
                                <CTableDataCell>{title}</CTableDataCell>
                                <CTableDataCell>{item.count}</CTableDataCell>
                                <CTableDataCell>
                                  {numberWithCommas(item.count * price)}
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan="3" className="text-center">
                              آیتمی یافت نشد
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setIsModalDetailsOpen(false)}>
                      بستن
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane aria-label="home-tab" visible={activeKey === 2}>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <strong>یافتن مشتری </strong>
                </CCardHeader>
                <CCardBody>
                  <CRow className="justify-content-center align-items-center">
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="nationalCode"
                          name="nationalCode"
                          placeholder="کد ملی"
                          value={nationalCode}
                          onChange={(e) => setNationalCode(e.target.value)}
                        />
                      </CForm>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CButton color="primary" onClick={fetchUser}>
                        جستجو بر اساس کد ملی
                      </CButton>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="phone"
                          name="phone"
                          placeholder="شماره تلفن"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </CForm>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CButton color="primary" onClick={fetchUSerByPhone}>
                        جستجو بر اساس شماره تلفن
                      </CButton>
                    </CCol>
                    <CCol md="12" className="mb-3">
                      <CButton color="primary" onClick={() => setIsModalCustomerOpen(true)}>
                        ثبت مشتری جدید
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
                <CModal visible={isModalCustomerOpen} onClose={() => setIsModalCustomerOpen(false)}>
                  <CModalHeader className="bg-primary text-white">
                    <CModalTitle>ثبت مشتری جدید</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="p-4">
                    <CForm>
                      <CRow>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="national_code">کد ملی</CFormLabel>
                          <CFormInput
                            id="national_code"
                            name="national_code"
                            value={userData.national_code}
                            onChange={handleSaveCustomerInputChange}
                            placeholder="کد ملی"
                            required
                          />
                        </CCol>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="phone">شماره تلفن</CFormLabel>
                          <CFormInput
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleSaveCustomerInputChange}
                            placeholder="شماره تلفن"
                            required
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="firstname">نام</CFormLabel>
                          <CFormInput
                            id="firstname"
                            name="firstname"
                            value={userData.firstname}
                            onChange={handleSaveCustomerInputChange}
                            placeholder="نام"
                            required
                          />
                        </CCol>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="lastname">نام خانوادگی</CFormLabel>
                          <CFormInput
                            id="lastname"
                            name="lastname"
                            value={userData.lastname}
                            onChange={handleSaveCustomerInputChange}
                            placeholder="نام خانوادگی"
                            required
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="introduction_way">روش معرفی</CFormLabel>
                          <CFormSelect
                            id="introduction_way"
                            name="introduction_way"
                            value={userData.introduction_way}
                            onChange={handleSaveCustomerInputChange}
                            required
                          >
                            <option value="">انتخاب کنید</option>
                            {introductionWays.map((way) => (
                              <option key={way.id} value={way.id}>
                                {way.title}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="state_id">استان</CFormLabel>
                          <CFormSelect
                            id="state_id"
                            name="state_id"
                            value={userData.state_id}
                            onChange={handleSaveCustomerInputChange}
                            required
                          >
                            <option value="">انتخاب کنید</option>
                            {state.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="city_id">شهر</CFormLabel>
                          <CFormSelect
                            id="city_id"
                            name="city_id"
                            value={userData.city_id}
                            onChange={handleSaveCustomerInputChange}
                            required
                          >
                            <option value="">انتخاب کنید</option>
                            {city.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="password">رمز عبور</CFormLabel>
                          <CFormInput
                            id="password"
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleSaveCustomerInputChange}
                            placeholder="رمز عبور"
                            required
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="gender">جنسیت</CFormLabel>
                          <CFormSelect
                            id="gender"
                            value={userData.gender}
                            name="gender"
                            onChange={handleSaveCustomerInputChange}
                            required
                          >
                            <option value="">انتخاب کنید</option>
                            <option value="male">مرد</option>
                            <option value="female">زن</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md="6" className="mb-3">
                          <CFormLabel htmlFor="birthday">تاریخ تولد</CFormLabel>
                          <DatePicker
                            id="birthday"
                            value={value}
                            onChange={handleBirthDate}
                            locale={persian_fa}
                            calendar={persian}
                            required
                          />
                        </CCol>
                      </CRow>
                    </CForm>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="success" onClick={handleSaveCustomer}>
                      ثبت
                    </CButton>
                    <CButton color="secondary" onClick={() => setIsModalCustomerOpen(false)}>
                      بستن
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCard>
              <br />
              <CCard>
                <CCardHeader>
                  <strong>اطلاعات مشتری</strong>
                </CCardHeader>
                <CCardBody>
                  <p>
                    <strong>نام:</strong> {customerData.firstname}
                  </p>
                  <p>
                    <strong>نام خانوادگی:</strong> {customerData.lastname}
                  </p>
                </CCardBody>
              </CCard>
              <br />
              <CCard>
                <CCardHeader>
                  <strong>اطلاعات رزرو</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'right',
                      gap: '20px', // Add gap between columns
                    }}
                  >
                    <CCol md="2" className="mb-3">
                      <CForm>
                        <div>
                          <p>تاریخ</p>
                        </div>
                        <DatePicker
                          value={
                            formData.date ? moment(formData.date, 'YYYY-MM-DD').toDate() : null
                          }
                          onChange={handleDate}
                          format="YYYY-MM-DD"
                          calendar={persian}
                          calendarPosition="bottom-right"
                          locale={persian_fa}
                        />
                      </CForm>
                    </CCol>
                    <CCol md="2" className="mb-3">
                      <CForm>
                        <div>
                          <p>ساعت</p>
                        </div>
                        <DatePicker
                          disableDayPicker
                          format="HH:mm"
                          calendar={persian} // Your calendar settings
                          locale={persian_fa}
                          value={
                            formData.start_time
                              ? moment(formData.start_time, 'HH:mm').toDate()
                              : null
                          }
                          onChange={handleTimeChange}
                          plugins={[<TimePicker key={1} hideSeconds />]} // Using timepicker with hidden seconds
                        />
                      </CForm>
                    </CCol>
                    <CCol md="2" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="total_count"
                          name="total_count"
                          placeholder=" تعداد کل مهمانان"
                          label="تعداد کل مهمانان"
                          value={formData.total_count}
                          onChange={(e) =>
                            setFormData({ ...formData, total_count: e.target.value })
                          }
                        />
                      </CForm>
                    </CCol>
                    <CCol md="2" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="player_count"
                          name="player_count"
                          placeholder="تعداد بازیکن"
                          label="تعداد بازیکن"
                          value={formData.player_count}
                          onChange={(e) =>
                            setFormData({ ...formData, player_count: e.target.value })
                          }
                        />
                      </CForm>
                    </CCol>
                    <CCol md="2" className="mb-3">
                      <CForm>
                        <CFormInput
                          type="number"
                          min={0}
                          max={10}
                          id="discount"
                          name="discount"
                          placeholder="تخفیف"
                          label="تخفیف(ریال)"
                          value={formData.discount}
                          onChange={(e) => {
                            const value = Math.min(10, Math.max(0, Number(e.target.value)))
                            setFormData({ ...formData, discount: value })
                          }}
                        />
                      </CForm>
                    </CCol>
                    <CCol md="12" className="mb-3">
                      <CForm>
                        <CFormTextarea
                          id="description"
                          name="description"
                          placeholder="توضیحات"
                          label="توضیحات"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                        />
                      </CForm>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <br />
              <CCard>
                <CCardHeader>
                  <strong>انتخاب پکیج</strong>
                </CCardHeader>
                <CCardBody>
                  <CCol>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>نام پکیج</CTableHeaderCell>
                          <CTableHeaderCell>قیمت به ازای هر نفر</CTableHeaderCell>
                          <CTableHeaderCell>توضیحات</CTableHeaderCell>
                          <CTableHeaderCell>انتخاب</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {isActivePackage.map((item) => (
                          <CTableRow key={item.id}>
                            <CTableDataCell>{item.title}</CTableDataCell>
                            <CTableDataCell>
                              {numberWithCommas(item.price_per_person)}
                            </CTableDataCell>
                            <CTableDataCell>{item.description}</CTableDataCell>
                            <CTableDataCell>
                              <input
                                type="checkbox"
                                checked={formData.package_id === item.id}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({ ...formData, package_id: item.id })
                                  } else {
                                    setFormData({ ...formData, package_id: '' })
                                  }
                                }}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CCardBody>
              </CCard>
              <br />
              <CCard>
                <CCardHeader>
                  <strong>انتخاب آیتم</strong>
                </CCardHeader>
                <CCardBody>
                  <CCol>{renderDropdowns()}</CCol>
                  <CCol>{renderOtherItems()}</CCol>
                </CCardBody>
              </CCard>
              <br />
              <CCard>
                <CCardBody>
                  <CButton color="primary" onClick={hadleCalculate}>
                    محاسبه هزینه
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CModalHeader className="bg-primary text-white">
            <CModalTitle>جزئیات رزرو</CModalTitle>
          </CModalHeader>
          <CModalBody className="p-4">
            <CTable striped hover bordered responsive className="mb-4">
              <CTableBody>
                {/* Customer Name */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">نام مشتری:</CTableHeaderCell>
                  <CTableDataCell>
                    {customerData.firstname} {customerData.lastname}
                  </CTableDataCell>
                </CTableRow>
                {/* Date */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">تاریخ:</CTableHeaderCell>
                  <CTableDataCell>{moment(formData.date).format('jYYYY/jMM/jDD')}</CTableDataCell>
                </CTableRow>
                {/* Time */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">ساعت:</CTableHeaderCell>
                  <CTableDataCell>{formData.start_time}</CTableDataCell>
                </CTableRow>
                {/* Total Guests */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">تعداد کل مهمانان:</CTableHeaderCell>
                  <CTableDataCell>{formData.total_count}</CTableDataCell>
                </CTableRow>
                {/* Players Count */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">تعداد بازیکن:</CTableHeaderCell>
                  <CTableDataCell>{formData.player_count}</CTableDataCell>
                </CTableRow>
                {/* Selected Package */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">پکیج انتخاب شده:</CTableHeaderCell>
                  <CTableDataCell>
                    {isActivePackage.find((pkg) => pkg.id === formData.package_id)?.title || 'N/A'}
                  </CTableDataCell>
                </CTableRow>
                {/* Final Price */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">قیمت نهایی :</CTableHeaderCell>
                  <CTableDataCell>
                    {calculatedPrice && numberWithCommas(calculatedPrice)} ریال
                  </CTableDataCell>
                </CTableRow>
                {/* Description */}
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">توضیحات:</CTableHeaderCell>
                  <CTableDataCell>{formData.description}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
              بستن
            </CButton>
            <CButton color="primary" onClick={handleReserve}>
              ثبت رزرو
            </CButton>
          </CModalFooter>
        </CModal>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CTabContent>
    </>
  )
}
export default PackageReserve
