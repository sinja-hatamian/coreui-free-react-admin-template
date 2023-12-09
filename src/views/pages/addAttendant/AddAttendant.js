import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  CTableDataCell,
} from '@coreui/react'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

const AddAttendant = () => {
  const [attendant, setAttendant] = useState([])
  const [fixedData, setFixedData] = useState([])
  const [customer, setCustomer] = useState({})
  const [tag, setTag] = useState(null)
  const [serverTag, setServerTag] = useState(null)
  const [qrcode, setQrcode] = useState(null)
  const [value, setValue] = useState(new Date())
  const [card, setCard] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableData, setTableData] = useState([{}])
  const [modalFormData, setModalFormData] = useState({
    firstname: '',
    lastname: '',
    national_code: '',
    phone: '',
    birthday: '',
    gender: '',
    tag: '',
  })

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
      AxiosInstance.get(`/cards/${parsedCustomer.id}`)
        .then((res) => {
          setCard(res.data.data.card)
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
        toast.success('همراه با موفقیت ثبت شد')
        if (res.data.data.qrcode) {
          setQrcode(res.data.data.qrcode)
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message ? err.response.data.message : 'خطایی رخ داده است')
      })
  }

  const hanldeAddingNewAttendant = () => {
    // Validation checks for empty fields
    if (!modalFormData.firstname) {
      toast.error('نام را وارد کنید')
      return
    }
    if (!modalFormData.lastname) {
      toast.error('نام خانوادگی را وارد کنید')
      return
    }
    if (!modalFormData.tag) {
      toast.error('شماره دستبند را وارد کنید')
      return
    }
    if (!modalFormData.gender) {
      toast.error('جنسیت را انتخاب کنید')
      return
    }
    // Check if the tag already exists in the attendant array or the main customer's tag
    const isTagExist =
      attendant.some((att) => att.tag === modalFormData.tag) ||
      customer.tag === modalFormData.tag ||
      serverTag === modalFormData.tag || // Check if the tag already exists in the server
      tableData.some((att) => att.tag === modalFormData.tag)

    if (isTagExist) {
      // If the tag already exists, show an error message and return to prevent adding the attendant
      toast.error('شماره دستبند تکراری است')
      return
    }
    //add new attendant to attendant array and show in table
    setAttendant([...attendant, modalFormData])
    setTableData([...tableData, modalFormData])
    closeModal()
    console.log(tableData)
  }

  const removeAttendant = (index) => {
    setAttendant([...attendant.filter((item, i) => i !== index)])
    setTableData([...tableData.filter((item, i) => i !== index)])

    if (index.tag === customer.tag) {
      setCustomer({ ...customer, tag: '' })
    }
    if (index.tag === serverTag) {
      setServerTag('')
    }
  }
  // const cloneAttendant = () => {
  //   setAttendant([
  //     ...attendant,
  //     {
  //       firstname: '',
  //       lastname: '',
  //       national_code: '',
  //       phone: '',
  //       birthday: '',
  //       gender: '',
  //       tag: '',
  //     },
  //   ])
  // }

  const cloneAttendant = () => {
    const clonedAttendant = {
      firstname: '',
      lastname: '',
      national_code: '',
      phone: '',
      birthday: '',
      gender: '',
      tag: '',
    }
    setModalFormData(clonedAttendant)
    openModal()
  }

  const handleDate = (newDate, index) => {
    if (newDate) {
      setValue(newDate.valueOf())
      setAttendant([
        ...attendant.map((item, i) => {
          if (i === index) {
            return { ...item, birthday: newDate.valueOf() }
          }
          return item
        }),
      ])
    }
  }

  const closeModals = () => {
    setQrcode(null)
    localStorage.removeItem('customer')
    window.location.reload(true) // Navigate to the current URL
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleModalChange = (e) => {
    const { name, value } = e.target
    setModalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                    <p>تاریخ تولد</p>
                    <DatePicker
                      value={customer.birthday}
                      label="تاریخ تولد"
                      onChange={handleDate}
                      calendarPosition="bottom-right"
                      inputPlaceholder="تاریخ تولد"
                      locale={persian_fa}
                      calendar={persian}
                      disabled
                    />
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
                      label={
                        <>
                          سریال دستبند <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                      name="tag"
                      aria-label="tag"
                      onChange={(event) => setTag(event.target.value)}
                      value={tag}
                      locale="fa-IR"
                    ></CFormInput>
                  </CCol>
                </div>
              ) : null}

              {/* {attendant.map((item, index) => (
                <div className="col-12 row" key={index}>
                  <p />
                  <hr />
                  <CCol md={6}>
                    <CFormInput
                      label={
                        <>
                          نام <span style={{ color: 'red' }}>*</span>
                        </>
                      }
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
                      label={
                        <>
                          نام خانوادگی <span style={{ color: 'red' }}>*</span>
                        </>
                      }
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
                      label="کد ملی "
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
                    <label>
                      <p>تاریخ تولد</p>
                      <DatePicker
                        value={value}
                        onChange={(newDate) => handleDate(newDate, index)}
                        calendarPosition="bottom-right"
                        inputPlaceholder="تاریخ تولد "
                        locale={persian_fa}
                        calendar={persian}
                      />
                    </label>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect
                      label={
                        <>
                          جنسیت <span style={{ color: 'red' }}>*</span>
                        </>
                      }
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
                      label={
                        <>
                          سریال دستبند <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                      name="tag"
                      aria-label="tag"
                      onChange={(event) => handleChange(event, index)}
                      value={item.tag}
                      locale="fa-IR"
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CButton
                      style={{ color: '#fff', marginTop: '2rem' }}
                      color="danger"
                      onClick={() => {
                        removeAttendant(index)
                      }}
                    >
                      حذف
                    </CButton>
                  </CCol>
                </div>
              ))} */}

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
                <CTableHeaderCell>موجودی</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {serverTag !== null ? (
                <CTableRow>
                  <CTableDataCell>{customer.firstname}</CTableDataCell>
                  <CTableDataCell>{customer.lastname}</CTableDataCell>
                  <CTableDataCell>{tag}</CTableDataCell>
                  <CTableDataCell>
                    {card.balance ? numberWithCommas(card.balance) : 0}
                  </CTableDataCell>
                </CTableRow>
              ) : null}
<<<<<<< HEAD
              {tableData.map((item, index) => (
                <CTableRow key={index}>
=======
              {/* {fixedData.map((item) => (
                <CTableRow key={item.id}>
>>>>>>> parent of 1c58b89 (Add delete to add attendant page)
                  <CTableHeaderCell>{item.firstname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.lastname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.tag}</CTableHeaderCell>
                </CTableRow>
<<<<<<< HEAD
              ))}
              {attendant.map((item, index) => (
=======
              ))} */}
              {tableData.map((item, index) => (
>>>>>>> parent of 1c58b89 (Add delete to add attendant page)
                <CTableRow key={index}>
                  <CTableHeaderCell>{item.firstname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.lastname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.tag}</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              ))}
              {/* {attendant.map((item, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell>{item.firstname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.lastname}</CTableHeaderCell>
                  <CTableHeaderCell>{item.tag}</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              ))} */}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
      <CModal visible={qrcode !== null} onClose={() => closeModals()} color="primary" size="lg">
        <CModalHeader closeButton>
          <CModalTitle>لطفا اسکن کنید</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <img src={qrcode} alt="qrcode" />
        </CModalBody>
      </CModal>
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
      <CModal visible={isModalOpen} onClose={closeModal} color="primary" size="xl">
        <CModalHeader closeButton>
          <CModalTitle>افزودن همراه جدید</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <div className="col-12 row">
              <CCol md={6}>
                <CFormInput
                  label={
                    <>
                      نام <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  id="firstname"
                  name="firstname"
                  aria-label="firstname"
                  placeholder="نام"
                  onChange={handleModalChange}
                  value={modalFormData.firstname}
                  locale="fa-IR"
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label={
                    <>
                      نام خانوادگی <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  id="lastname"
                  name="lastname"
                  aria-label="lastname"
                  placeholder="نام خانوادگی"
                  onChange={handleModalChange}
                  value={modalFormData.lastname}
                  locale="fa-IR"
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="کد ملی "
                  id="national_code"
                  name="national_code"
                  aria-label="national_code"
                  placeholder="کد ملی"
                  onChange={handleModalChange}
                  value={modalFormData.national_code}
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
                  onChange={handleModalChange}
                  value={modalFormData.phone}
                  locale="fa-IR"
                />
              </CCol>
              <CCol md={6}>
                <label>
                  <p>تاریخ تولد</p>
                  <DatePicker
                    value={value}
                    onChange={handleDate}
                    calendarPosition="bottom-right"
                    inputPlaceholder="تاریخ تولد "
                    locale={persian_fa}
                    calendar={persian}
                  />
                </label>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  label={
                    <>
                      جنسیت <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  name="gender"
                  aria-label="gender"
                  onChange={handleModalChange}
                  value={modalFormData.gender}
                  locale="fa-IR"
                >
                  <option value={0}>انتخاب کنید</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label={
                    <>
                      سریال دستبند <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  name="tag"
                  aria-label="tag"
                  onChange={handleModalChange}
                  value={modalFormData.tag}
                  locale="fa-IR"
                />
              </CCol>
              <p />
              <div
                className="col-3 row-6"
                style={{ display: 'flex', justifyContent: 'space-between ' }}
              >
                <CButton
                  color="success"
                  onClick={hanldeAddingNewAttendant}
                  style={{
                    marginRight: '1rem',
                    padding: '0.5rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  ثبت
                </CButton>
                <CButton
                  color="danger"
                  onClick={closeModal}
                  style={{
                    marginRight: '1rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  انصراف
                </CButton>
              </div>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}

export default AddAttendant
