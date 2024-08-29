import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'moment'
import 'moment/locale/fa'
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
} from '@coreui/react'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'

const PackageReserve = () => {
  const [data, setData] = useState([])
  const [isActivePackage, setIsActivePackage] = useState([])
  const [isActiveItems, setIsActiveItems] = useState([])
  const [isActiveOtherItems, setIsActiveOtherItems] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [selectedChildren, setSelectedChildren] = useState({})
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState({})
  const [customerData, setCustomerData] = useState({
    firstname: '',
    lastname: '',
  })
  const [formData, setFormData] = useState({
    package_id: '',
    date: '',
    start_time: '',
    total_count: '',
    player_count: '',
    description: '',
    discount: '',
    items: [],
  })

  useEffect(() => {
    AxiosInstance.get('/package-reserves')
      .then((res) => {
        setData(res.data.data.package_reserves)
      })
      .catch((err) => {
        console.log(err)
      })

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
  }, [])

  const handleDate = (date) => {
    let jalaliDate = moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY/M/D')
    return jalaliDate
  }

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const handleCheckboxChange = (id, item) => {
    setSelectedChildren((prevSelectedChildren) => {
      return {
        ...prevSelectedChildren,
        [id]: !prevSelectedChildren[id],
      }
    })
  }

  const handleRadioChange = (parentId, child) => {
    setSelectedChildren((prevSelectedChildren) => {
      return {
        ...prevSelectedChildren,
        [parentId]: [child.id],
      }
    })
  }

  const renderDropdowns = () => {
    return isActiveItems.map((parent) => (
      <div
        key={parent.id}
        style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        <div
          onClick={() => toggleAccordion(parent.id)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: '#f7f7f7',
            fontFamily: 'IRANSans',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {parent.title}
        </div>
        {openAccordion === parent.id && (
          <div style={{ padding: '10px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {parent.children.map((child) => (
                <li
                  key={child.id}
                  style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <input
                      type="radio"
                      name={parent.id}
                      checked={selectedChildren[parent.id]?.includes(child.id) || false}
                      onChange={() => handleRadioChange(parent.id, child)}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ marginRight: '10px' }}>{child.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))
  }

  const renderOtherItems = () => {
    return isActiveOtherItems.map((item) => (
      <div
        key={item.id}
        style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <label
              style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '1%' }}
            >
              <input
                type="checkbox"
                name="otherItems"
                checked={selectedChildren[item.id] || false}
                onChange={() => handleCheckboxChange(item.id, item)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ marginRight: '10px' }}>{item.title}</span>
            </label>
          </li>
        </ul>
      </div>
    ))
  }

  const handleTime = (time) => {
    // Split the datetime string to get the time part
    let timePart = time.split('T')[1].split('.')[0]

    // Return only the hours and minutes
    return timePart.slice(0, 5)
  }

  const fetchUser = () => {
    AxiosInstance.get(`/users/national-code/${nationalCode}`)
      .then((res) => {
        AxiosInstance.get(`/cards/${res.data.data.user.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
          })
        const customerData = res.data.data.user
        setCustomerData(customerData)
        toast.success('مشتری یافت شد')
      })
      .catch((err) => {
        toast.error('مشتری یافت نشد')
        setCustomerData({
          firstname: '',
          lastname: '',
        })
      })
  }

  const fetchUSerByPhone = () => {
    AxiosInstance.get(`users/phone/${phone}`)
      .then((res) => {
        AxiosInstance.get(`/cards/${res.data.data.user.id}`)
          .then((res) => {
            setCard(res.data.data.card)
          })
          .catch((err) => {
            console.log(err)
          })
        const customerData = res.data.data.user
        setCustomerData(customerData)
        console.log(res)
        toast.success('مشتری یافت شد')
      })
      .catch((err) => {
        console.log(err)
        toast.error('مشتری یافت نشد')
      })
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleReserve = () => {
    console.log(formData)
    AxiosInstance.post('/package-reserves', {
      user_id: customerData.id,
      formData,
    })
      .then((res) => {
        toast.success('رزرو با موفقیت انجام شد')
      })
      .catch((err) => {
        toast.error('خطا در رزرو')
      })
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
        <CTabPane show={activeKey === 1} aria-label="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol>
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
                        <CTableHeaderCell>توضیحات</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>
                            {item.user_firstname} {item.user_lastname}
                          </CTableDataCell>
                          <CTableDataCell>{handleDate(item.date)}</CTableDataCell>
                          <CTableDataCell>{handleTime(item.start_time)}</CTableDataCell>
                          <CTableDataCell>{numberWithCommas(item.total_price)}</CTableDataCell>
                          <CTableDataCell>{item.status}</CTableDataCell>
                          <CTableDataCell>{item.description}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane show={activeKey === 2} aria-label="home-tab" visible={activeKey === 2}>
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
                      <CButton color="primary" onClick={fetchUser} block>
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
                      <CButton color="primary" onClick={fetchUSerByPhone} block>
                        جستجو بر اساس شماره تلفن
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
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
                  <CRow className="justify-content-center align-items-center">
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <DatePicker
                          value={formData.date}
                          onChange={(date) => setFormData({ ...formData, date: handleDate(date) })}
                          calendar={persian}
                          locale={persian_fa}
                          format="YYYY-MM-DD"
                        />
                      </CForm>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <DatePicker
                          disableDayPicker
                          format="HH:mm"
                          calendar={persian}
                          locale={persian_fa}
                          value={formData.start_time}
                          onChange={(time) => setFormData({ ...formData, start_time: time })}
                          plugins={[<TimePicker key={1} hideSeconds />]}
                        />
                      </CForm>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="total_count"
                          name="total_count"
                          placeholder="تعداد کل"
                          value={formData.total_count}
                          onChange={(e) =>
                            setFormData({ ...formData, total_count: e.target.value })
                          }
                        />
                      </CForm>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="player_count"
                          name="player_count"
                          placeholder="تعداد بازیکن"
                          value={formData.player_count}
                          onChange={(e) =>
                            setFormData({ ...formData, player_count: e.target.value })
                          }
                        />
                      </CForm>
                    </CCol>
                    <CCol md="6" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="discount"
                          name="discount"
                          placeholder="تخفیف"
                          value={formData.discount}
                          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        />
                      </CForm>
                    </CCol>
                    <CCol md="12" className="mb-3">
                      <CForm>
                        <CFormInput
                          id="description"
                          name="description"
                          placeholder="توضیحات"
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
                              <CButton color="primary" block>
                                انتخاب
                              </CButton>
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
            </CCol>
          </CRow>
        </CTabPane>
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
