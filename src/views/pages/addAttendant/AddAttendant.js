import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import {
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

const AddAttendant = () => {
  const [attendant, setAttendant] = useState([
    {
      firstname: '',
      lastname: '',
      national_code: '',
      phone: '',
      birthday: '',
      gender: '',
      tag: '',
    },
  ])
  const [fixedData, setFixedData] = useState([])
  const [customer, setCustomer] = useState({})
  const [tag, setTag] = useState(null)
  const [serverTag, setServerTag] = useState(null)
  const [qrcode, setQrcode] = useState(null)
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    if (localStorage.getItem('customer')) {
      const parsedCustomer = JSON.parse(localStorage.getItem('customer'))
      setCustomer(parsedCustomer)

      AxiosInstance.get(`/attendants/${parsedCustomer.id}/last`)
        .then((res) => {
          console.log(res.data.data)
          if (Object.keys(res.data.data.attendant).length > 0) {
            setFixedData([
              ...res.data.data.attendant.members.filter((item) => item.tag !== undefined),
            ])
            setAttendant(res.data.data.attendant.members.filter((item) => item.tag === undefined))
            setTag(res.data.data.attendant.tag)
            setServerTag(res.data.data.attendant.tag)
          }
        })

        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const handleChange = (e, index) => {
    const { name, value } = e.target
    setAttendant([
      ...attendant.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value }
        }
        return item
      }),
    ])
  }

  const handleAddAttendant = () => {
    AxiosInstance.post('/attendants/complete', {
      user_id: customer.id,
      tag: tag,
      members: attendant.map((item) => {
        Object.keys(item).forEach((key) => {
          if (item[key] === '') {
            delete item[key]
          }
        })
        return item
      }),
    })
      .then((res) => {
        console.log(res)
        const newAttendant = res.data.data
        setAttendant([...attendant, newAttendant])
        alert('همراه با موفقیت ثبت شد')
        if (res.data.data.qrcode) {
          setQrcode(res.data.data.qrcode)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت همراه')
      })
  }

  const removeAttendant = (index) => {
    setAttendant([...attendant.filter((item, i) => i !== index)])
  }
  const cloneAttendant = () => {
    setAttendant([
      ...attendant,
      {
        firstname: '',
        lastname: '',
        national_code: '',
        phone: '',
        birthday: '',
        gender: '',
        tag: '',
      },
    ])
  }

  const handleDate = (newDate, index) => {
    setValue(newDate.valueOf())
    setAttendant(
      ...attendant.map((item, i) => {
        if (i === index) {
          return { ...item, birthday: newDate.valueOf() }
        }
        return item
      }),
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>افزودن همراهان</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              {serverTag === null ? (
                <div className="col-12 row">
                  <CCol md={6}>
                    <CFormInput
                      label="نام"
                      id="firstname"
                      name="firstname"
                      aria-label="firstname"
                      placeholder="نام"
                      value={customer.firstname}
                      locale="fa-IR"
                      disabled
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="نام خانوادگی"
                      id="lastname"
                      name="lastname"
                      aria-label="lastname"
                      placeholder="نام خانوادگی"
                      value={customer.lastname}
                      locale="fa-IR"
                      disabled
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="کد ملی"
                      id="national_code"
                      name="national_code"
                      aria-label="national_code"
                      placeholder="کد ملی"
                      value={customer.national_code}
                      locale="fa-IR"
                      disabled
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="شماره تلفن"
                      id="phone"
                      aria-label="phone"
                      name="phone"
                      placeholder="شماره تلفن"
                      value={customer.phone}
                      locale="fa-IR"
                      disabled
                    />
                  </CCol>
                  <CCol md={6}>
                    <label>
                      <p>تاریخ تولد</p>
                      <DatePicker
                        value={value}
                        label="تاریخ تولد"
                        onChange={handleDate}
                        calendarPosition="bottom-right"
                        inputPlaceholder="تاریخ تولد"
                        locale={persian_fa}
                        calendar={persian}
                      />
                    </label>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect
                      label="جنسیت"
                      name="gender"
                      aria-label="gender"
                      value={customer.gender}
                      locale="fa-IR"
                      disabled
                    >
                      <option value="male">مرد</option>
                      <option value="female">زن</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormInput
                      label="تگ"
                      name="tag"
                      aria-label="tag"
                      onChange={(event) => setTag(event.target.value)}
                      value={tag}
                      locale="fa-IR"
                    ></CFormInput>
                  </CCol>
                </div>
              ) : null}
              {attendant.map((item, index) => (
                <div className="col-12 row" key={index}>
                  <CCol md={6}>
                    <CFormInput
                      label="نام"
                      id="firstname"
                      name="firstname"
                      aria-label="firstname"
                      placeholder="نام"
                      onChange={(event) => handleChange(event, index)}
                      value={item.firstname}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="نام خانوادگی"
                      id="lastname"
                      name="lastname"
                      aria-label="lastname"
                      placeholder="نام خانوادگی"
                      onChange={(event) => handleChange(event, index)}
                      value={item.lastname}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="کد ملی"
                      id="national_code"
                      name="national_code"
                      aria-label="national_code"
                      placeholder="کد ملی"
                      onChange={(event) => handleChange(event, index)}
                      value={item.national_code}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="شماره تلفن"
                      id="phone"
                      aria-label="phone"
                      name="phone"
                      placeholder="شماره تلفن"
                      onChange={(event) => handleChange(event, index)}
                      value={item.phone}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol md={6}>
                    {/* <CFormInput
                      label="تاریخ تولد"
                      type="date"
                      id="birthday"
                      name="birthday"
                      placeholder="تاریخ تولد"
                      onChange={(event) => handleChange(event, index)}
                      value={item.birthday}
                      locale="fa-IR"
                    /> */}
                    <label>
                      <p>تاریخ تولد</p>
                      <DatePicker
                        value={value}
                        label="تاریخ تولد"
                        onChange={handleDate}
                        calendarPosition="bottom-right"
                        inputPlaceholder="تاریخ تولد"
                        locale={persian_fa}
                        calendar={persian}
                      />
                    </label>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect
                      label="جنسیت"
                      name="gender"
                      aria-label="gender"
                      onChange={(event) => handleChange(event, index)}
                      value={item.gender}
                      locale="fa-IR"
                    >
                      <option value={0}>انتخاب کنید</option>
                      <option value="male">مرد</option>
                      <option value="female">زن</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormInput
                      label="تگ"
                      name="tag"
                      aria-label="tag"
                      onChange={(event) => handleChange(event, index)}
                      value={item.tag}
                      locale="fa-IR"
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CButton
                      color="danger"
                      onClick={() => {
                        removeAttendant(index)
                      }}
                    >
                      حذف
                    </CButton>
                  </CCol>
                </div>
              ))}

              <CButton
                color="primary"
                onClick={() => {
                  cloneAttendant()
                }}
              >
                افزودن همراه
              </CButton>

              <CButton color="primary" onClick={handleAddAttendant}>
                ثبت
              </CButton>
            </CForm>
          </CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>نام</CTableHeaderCell>
                <CTableHeaderCell>نام خانوادگی</CTableHeaderCell>
                <CTableHeaderCell> شماره دستبند</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {serverTag !== null ? (
                <CTableRow>
                  <CTableHeaderCell>{customer.firstname}</CTableHeaderCell>
                  <CTableHeaderCell>{customer.lastname}</CTableHeaderCell>
                  <CTableHeaderCell>{tag}</CTableHeaderCell>
                </CTableRow>
              ) : null}
              {fixedData.map((item) => (
                <CTableRow key={item.id}>
                  <CTableHeaderCell>{item.firstname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.lastname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.tag}</CTableHeaderCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
      <CModal visible={qrcode !== null} onClose={() => setQrcode(null)} color="primary" size="lg">
        <CModalHeader closeButton>
          <CModalTitle>لطفا اسکن کنید</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <img src={qrcode} alt="qrcode" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setQrcode(null)}>
            بستن
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default AddAttendant
