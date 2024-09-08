import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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
} from '@coreui/react'

const PackageReserve = () => {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [isActivePackage, setIsActivePackage] = useState([])
  const [isActiveItems, setIsActiveItems] = useState([])
  const [isActiveOtherItems, setIsActiveOtherItems] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [selectedChildren, setSelectedChildren] = useState({})
  const [nationalCode, setNationalCode] = useState('')
  const [phone, setPhone] = useState('')
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
    const formattedDate = moment(date.toDate()).format('YYYY-MM-DD')
    setFormData({ ...formData, date: formattedDate })
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

  const handleTime = (date, name) => {
    const formattedTime = moment(date.toDate()).format('HH:mm')
    setFormData({ ...formData, [name]: formattedTime })
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

  const showDetails = (id) => {
    AxiosInstance.get(`/package-reserves/${id}`)
      .then((res) => {
        console.log(res.data.data.package_reserve)
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
    console.log(formData)
    AxiosInstance.post('/package-reserves', formData)
      .then((res) => {
        toast.success('رزرو با موفقیت ثبت شد')
      })
      .catch((err) => {
        toast.error('خطا در ثبت رزرو')
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
        <CTabPane aria-label="home-tab" visible={activeKey === 1}>
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
                  <CModalHeader>
                    <CModalTitle>جزئیات رزرو</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <p>
                      <strong>نام مشتری:</strong> {customerData.firstname} {customerData.lastname}
                    </p>
                    <p>
                      <strong>تاریخ:</strong> {moment(formData.date).format('jYYYY/jMM/jDD')}
                    </p>
                    <p>
                      <strong>ساعت:</strong>{' '}
                      {/* {formData.start_time.split('T')[1].split(':').slice(0, 2).join(':')} */}
                    </p>
                    <p>
                      <strong>تعداد کل مهمانان:</strong> {formData.total_count}
                    </p>
                    <p>
                      <strong>تعداد بازیکن:</strong> {formData.player_count}
                    </p>
                    <p>
                      <strong>پکیج انتخاب شده:</strong>{' '}
                      {isActivePackage.find((pkg) => pkg.id === formData.package_id)?.title || ''}
                    </p>
                    <p>
                      <strong>قیمت نهایی :</strong> {formData.total_price} ریال
                    </p>
                    <p>
                      <strong>توضیحات:</strong> {formData.description}
                    </p>
                    <p>
                      <strong>آیتم‌ها:</strong>
                      <ul>
                        {formData.items.map((item) => (
                          <li key={item.id}>
                            {
                              isActiveItems
                                .map((parent) => parent.children)
                                .flat()
                                .find((child) => child.id === item.id)?.title
                            }
                          </li>
                        ))}
                      </ul>
                    </p>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
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
                          calendar={persian}
                          locale={persian_fa}
                          value={
                            formData.start_time
                              ? moment(formData.start_time, 'HH:mm').toDate()
                              : null
                          }
                          onChange={(date) => handleTime(date, 'start_time')}
                          plugins={[<TimePicker key={1} hideSeconds />]}
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
                          id="discount"
                          name="discount"
                          placeholder="تخفیف"
                          label="تخفیف(ریال)"
                          value={formData.discount}
                          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
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
          <CModalHeader>
            <CModalTitle>جزئیات رزرو</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              <strong>نام مشتری:</strong> {customerData.firstname} {customerData.lastname}
            </p>
            <p>
              <strong>تاریخ:</strong> {moment(formData.date).format('jYYYY/jMM/jDD')}
            </p>
            <p>
              <strong>ساعت:</strong> {formData.start_time}
            </p>
            <p>
              <strong>تعداد کل مهمانان:</strong> {formData.total_count}
            </p>
            <p>
              <strong>تعداد بازیکن:</strong> {formData.player_count}
            </p>
            <p>
              <strong>پکیج انتخاب شده:</strong>{' '}
              {isActivePackage.find((pkg) => pkg.id === formData.package_id)?.title || ''}
            </p>
            <p>
              <strong>قیمت نهایی :</strong> {calculatedPrice && numberWithCommas(calculatedPrice)}{' '}
              ریال
            </p>
            <p>
              <strong>توضیحات:</strong> {formData.description}
            </p>
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
