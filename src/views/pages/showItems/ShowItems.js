import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CFormSelect,
} from '@coreui/react'

const ShowItems = () => {
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    AxiosInstance.get('/items')
      .then((response) => {
        setItems(response.data.data.items)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const openModal = (item) => {
    setCurrentItem(item)
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value
    // Helper function to format number with commas
    const formatNumberWithCommas = (number) => {
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    if (name === 'price') {
      value = formatNumberWithCommas(value)
    }
    setCurrentItem({ ...currentItem, [name]: value })
  }

  const updateItems = () => {
    AxiosInstance.put(`/items/${currentItem.id}`, currentItem)
      .then((response) => {
        const updatedItems = items.map((item) =>
          item.id === currentItem.id ? response.data.data.item : item,
        )
        setItems(updatedItems)
        setVisible(false)
        toast.success('آیتم با موفقیت به روزرسانی شد')
      })
      .catch((error) => {
        console.log(error)
        toast.error('خطا در به روزرسانی آیتم')
      })
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>لیست آیتم پکیج ها</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>نام</CTableHeaderCell>
                <CTableHeaderCell>قیمت</CTableHeaderCell>
                <CTableHeaderCell>توضیحات</CTableHeaderCell>
                <CTableHeaderCell>حالت پرداختی</CTableHeaderCell>
                <CTableHeaderCell>عملیات</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {items.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.title}</CTableDataCell>
                  <CTableDataCell>{numberWithCommas(item.price)}</CTableDataCell>
                  <CTableDataCell>{item.description}</CTableDataCell>
                  <CTableDataCell>
                    {item.is_per_person === 'true' ? 'به ازای هر نفر' : 'یکجا'}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="info" onClick={() => openModal(item)}>
                      ویرایش
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
              {
                <CModal visible={visible} onClose={closeModal}>
                  <CModalHeader>
                    <h3>ویرایش آیتم</h3>
                  </CModalHeader>
                  <CModalBody>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="title"
                          value={currentItem?.title}
                          onChange={handleInput}
                          placeholder="نام"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="price"
                          value={currentItem?.price}
                          onChange={handleInput}
                          placeholder="قیمت"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="description"
                          value={currentItem?.description}
                          onChange={handleInput}
                          placeholder="توضیحات"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormSelect
                          name="is_per_person"
                          value={currentItem?.is_per_person}
                          onChange={handleInput}
                        >
                          <option value="true">به ازای هر نفر</option>
                          <option value="false">یکجا</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CButton color="success" onClick={updateItems}>
                          ذخیره
                        </CButton>
                      </CCol>
                    </CRow>
                  </CModalBody>
                </CModal>
              }
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ShowItems
