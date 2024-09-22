import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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

const ShowPackages = () => {
  const [packages, setPackages] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentPackage, setCurrentPackage] = useState(null)

  useEffect(() => {
    AxiosInstance.get('/packages')
      .then((response) => {
        setPackages(response.data.data.packages)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const openModal = (item) => {
    setCurrentPackage(item)
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

    // If name is price_per_person, format the number with commas
    if (name === 'price_per_person') {
      value = value.replace(/,/g, '') // Remove existing commas
      if (!isNaN(value) && value !== '') {
        value = formatNumberWithCommas(value)
      }
    }

    setCurrentPackage({
      ...currentPackage,
      [name]: value,
    })
  }

  const updatePackage = () => {
    AxiosInstance.put(`/packages/${currentPackage.id}`, currentPackage)
      .then((response) => {
        const newPackages = packages.map((item) =>
          item.id === currentPackage.id ? currentPackage : item,
        )
        setPackages(newPackages)
        setVisible(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>لیست بسته ها</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>نام بسته</CTableHeaderCell>
                <CTableHeaderCell>قیمت به ازای نفر</CTableHeaderCell>
                <CTableHeaderCell>توضیحات</CTableHeaderCell>
                <CTableHeaderCell>مدت زمان (ساعت)</CTableHeaderCell>
                <CTableHeaderCell> وضعیت</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {packages.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.title}</CTableDataCell>
                  <CTableDataCell>{numberWithCommas(item.price_per_person)}</CTableDataCell>
                  <CTableDataCell>{item.description}</CTableDataCell>
                  <CTableDataCell>{item.duration}</CTableDataCell>
                  <CTableDataCell>{item.status === '1' ? 'فعال' : 'غیرفعال'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      style={{ color: '#fff' }}
                      onClick={() => openModal(item)}
                      block
                    >
                      ویرایش
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
              {
                <CModal visible={visible} onClose={closeModal}>
                  <CModalHeader>
                    <h3>ویرایش بسته</h3>
                  </CModalHeader>
                  <CModalBody
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="title"
                          value={currentPackage?.title}
                          onChange={handleInput}
                          placeholder="نام بسته"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="price_per_person"
                          value={currentPackage?.price_per_person}
                          onChange={handleInput}
                          placeholder="قیمت به ازای نفر"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="description"
                          value={currentPackage?.description}
                          onChange={handleInput}
                          placeholder="توضیحات"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="duration"
                          value={currentPackage?.duration}
                          onChange={handleInput}
                          placeholder="مدت زمان"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormSelect
                          name="status"
                          value={currentPackage?.status}
                          onChange={handleInput}
                        >
                          <option value="1">فعال</option>
                          <option value="0">غیرفعال</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CButton color="success" style={{ color: '#fff' }} onClick={updatePackage}>
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

export default ShowPackages
