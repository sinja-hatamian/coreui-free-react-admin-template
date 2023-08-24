import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@coreui/react'
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
  const [tag, setTag] = useState('')
  const [attendantForm, setAttendantForm] = useState({
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

      axios
        .get(`http://localhost:4000/api/manager/attendants/${parsedCustomer.id}/last`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setAttendant(res.data.data.attendant.members.filter((item) => item.tag === undefined))
          setFixedData(res.data.data.attendant.members.filter((item) => item.tag !== undefined))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const handleChange = (e, index) => {
    const { name, value } = e.target
    // setAttendant({
    //   ...attendant.map((item, i) => {
    //     if (i === index) {
    //       return { ...item, [name]: value }
    //     }
    //     return item
    //   }),
    // })
    let iot = attendant[index]
    iot[name] = value
    setAttendant([...attendant, iot])
  }

  const handleAddAttendant = () => {
    axios
      .post(
        'http://localhost:4000/api//manager/attendants/complete',
        {
          user_id: customer.id,
          tag: tag,
          members: attendant,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        const newAttendant = res.data.data
        setAttendant([...attendant, newAttendant])
        alert('همراه با موفقیت ثبت شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ثبت همراه')
      })
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
              {attendant.map((item, index) => (
                <div key={index}>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      value={item.phone}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      label="تاریخ تولد"
                      type="date"
                      id="birthday"
                      name="birthday"
                      placeholder="تاریخ تولد"
                      onChange={handleChange}
                      value={item.birthday}
                      locale="fa-IR"
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect
                      label="جنسیت"
                      name="gender"
                      aria-label="gender"
                      onChange={handleChange}
                      value={item.gender}
                      locale="fa-IR"
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
                      onChange={handleChange}
                      value={item.tag}
                      locale="fa-IR"
                    ></CFormInput>
                  </CCol>
                </div>
              ))}
              {/* <CCol md={6}>
                <CFormInput
                  label="نام"
                  id="firstname"
                  name="firstname"
                  aria-label="firstname"
                  placeholder="نام"
                  onChange={handleChange}
                  value={attendantForm.firstname}
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
                  onChange={handleChange}
                  value={attendantForm.lastname}
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
                  onChange={handleChange}
                  value={attendantForm.national_code}
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
                  onChange={handleChange}
                  value={attendantForm.phone}
                  locale="fa-IR"
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="تاریخ تولد"
                  type="date"
                  id="birthday"
                  name="birthday"
                  placeholder="تاریخ تولد"
                  onChange={handleChange}
                  value={attendantForm.birthday}
                  locale="fa-IR"
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="جنسیت"
                  name="gender"
                  aria-label="gender"
                  onChange={handleChange}
                  value={attendantForm.gender}
                  locale="fa-IR"
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
                  onChange={handleChange}
                  value={attendantForm.tag}
                  locale="fa-IR"
                ></CFormInput> 
              </CCol>*/}
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
    </CRow>
  )
}

export default AddAttendant
