import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'moment'
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
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'

const PackageDays = () => {
  const [packageDays, setPackageDays] = useState([])
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    day: '',
    start_time: '',
    end_time: '',
    price_per_person: '',
  })

  useEffect(() => {
    AxiosInstance.get('/package-days')
      .then((res) => {
        setPackageDays(res.data.data.package_days)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const openModal = () => {
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
    setFormData({
      day: '',
      start_time: '',
      end_time: '',
      price_per_person: '',
    })
  }

  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value

    if (name === 'price_per_person') {
      value = value.replace(/,/g, '')
      if (!isNaN(value) && value !== '') {
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTimeInput = (date, name) => {
    const formattedTime = moment(date.toDate()).format('HH:mm')
    setFormData({
      ...formData,
      [name]: formattedTime,
    })
  }

  const getDay = (day) => {
    switch (day) {
      case 0:
        return 'یکشنبه'
      case 1:
        return 'دوشنبه'
      case 2:
        return 'سه شنبه'
      case 3:
        return 'چهارشنبه'
      case 4:
        return 'پنجشنبه'
      case 5:
        return 'جمعه'
      case 6:
        return 'شنبه'
      default:
        return
    }
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleAddPackageDay = () => {
    // Convert start_time and end_time to timestamps
    const startTime = moment(formData.start_time, 'HH:mm').format('HH:mm')
    const endTime = moment(formData.end_time, 'HH:mm').format('HH:mm')

    const dataToSend = {
      ...formData,
      start_time: startTime,
      end_time: endTime,
    }

    AxiosInstance.post('/package-days', dataToSend)
      .then((res) => {
        console.log(dataToSend)
        setPackageDays(res.data.data.package_day)
        closeModal()
        toast.success('پکیج روز با موفقیت اضافه شد')
      })
      .catch((error) => {
        console.log(error)
        toast.error('خطا در اضافه کردن پکیج روز')
      })
  }

  const handleDeletePackageDay = (id) => {
    AxiosInstance.delete(`/package-days/${id}`)
      .then((res) => {
        setPackageDays(packageDays.filter((packageDay) => packageDay.id !== id))
        toast.success('پکیج روز با موفقیت حذف شد')
      })
      .catch((error) => {
        console.log(error)
        toast.error('خطا در حذف پکیج روز')
      })
  }

  const handleUpdatePackageDay = (id) => {
    AxiosInstance.put(`/package-days/${id}`, formData)
      .then((res) => {
        console.log(res)
        toast.success('پکیج روز با موفقیت ویرایش شد')
      })
      .catch((error) => {
        console.log(error)
        toast.error('خطا در ویرایش پکیج روز')
      })
  }

  return (
    <>
      <CRow>
        <CCard>
          <CCardHeader>
            <strong>افزودن پکیج روز</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md="3">
                <CButton color="success" onClick={openModal} style={{ color: '#fff' }}>
                  افزودن
                </CButton>
              </CCol>
            </CRow>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>روز</CTableHeaderCell>
                  <CTableHeaderCell>ساعت شروع</CTableHeaderCell>
                  <CTableHeaderCell>ساعت پایان</CTableHeaderCell>
                  <CTableHeaderCell>قیمت هر نفر</CTableHeaderCell>
                  <CTableHeaderCell>عملیات</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Array.isArray(packageDays) &&
                  packageDays.map((packageDay) => (
                    <CTableRow key={packageDay.id}>
                      <CTableDataCell>{getDay(packageDay.day)}</CTableDataCell>
                      <CTableDataCell>
                        {new Date(packageDay.start_time).getUTCHours().toString().padStart(2, '0')}:
                        {new Date(packageDay.start_time)
                          .getUTCMinutes()
                          .toString()
                          .padStart(2, '0')}
                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(packageDay.end_time).getUTCHours().toString().padStart(2, '0')}:
                        {new Date(packageDay.end_time).getUTCMinutes().toString().padStart(2, '0')}
                      </CTableDataCell>
                      <CTableDataCell>
                        {numberWithCommas(packageDay.price_per_person)}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          style={{ color: '#fff' }}
                          color="danger"
                          onClick={() => handleDeletePackageDay(packageDay.id)}
                        >
                          حذف
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton style={{ color: '#fff' }} color="warning">
                          ویرایش
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CRow>
      <CModal visible={visible} onClose={closeModal}>
        <CModalHeader closeButton>
          <h5>افزودن پکیج روز</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CCol>
              <CFormSelect name="day" value={formData.day} onChange={handleInput}>
                <option value="">انتخاب کنید</option>
                <option value="0">یکشنبه</option>
                <option value="1">دوشنبه</option>
                <option value="2">سه شنبه</option>
                <option value="3">چهارشنبه</option>
                <option value="4">پنجشنبه</option>
                <option value="5">جمعه</option>
                <option value="6">شنبه</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <DatePicker
                disableDayPicker
                format="HH:mm"
                calendar={persian}
                locale={persian_fa}
                value={formData.start_time ? moment(formData.start_time, 'HH:mm').toDate() : null}
                onChange={(value) => handleTimeInput(value, 'start_time')}
                plugins={[<TimePicker key={1} hideSeconds />]}
              />
            </CCol>
            <CCol>
              <DatePicker
                disableDayPicker
                format="HH:mm"
                calendar={persian}
                locale={persian_fa}
                value={formData.end_time ? moment(formData.end_time, 'HH:mm').toDate() : null}
                onChange={(value) => handleTimeInput(value, 'end_time')}
                plugins={[<TimePicker key={1} hideSeconds />]}
              />
            </CCol>
            <CCol>
              <CFormInput
                type="text"
                label="قیمت هر نفر"
                name="price_per_person"
                value={formData.price_per_person}
                onChange={handleInput}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAddPackageDay}>
            ذخیره
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            لغو
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
    </>
  )
}

export default PackageDays
