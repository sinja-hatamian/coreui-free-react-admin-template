import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CFormInput,
  CRow,
  CForm,
  CFormSelect,
} from '@coreui/react'

const OpenCash = () => {
  const manager = JSON.parse(localStorage.getItem('manager'))
  const [selectedStage, setSelectedStage] = useState(0)
  const [stages, setStages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    AxiosInstance.get('/stages')
      .then((res) => {
        setStages(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value)
  }

  const handleOpenCash = () => {
    AxiosInstance.post('/managers/open-register', {
      stage_id: selectedStage,
    })
      .then((res) => {
        console.log(res.data.data)
        // localStorage.setItem('manager', JSON.stringify(res.data.data.manager))
        toast.success('صندوق با موفقیت باز شد')
        navigate('/theme/CustomerReg')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>باز کردن صندوق</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={6}>
              <CFormInput
                label="کاربر"
                name="user"
                value={manager.firstname + ' ' + manager.lastname}
                aria-label="user"
                locale="fa-IR"
                disabled
              />
            </CCol>
          </CRow>
          <CForm className="row g-3">
            <CCol md={6}>
              <CCol xs>
                <CFormSelect
                  label="صندوق"
                  name="cash"
                  aria-label="cash"
                  locale="fa-IR"
                  value={selectedStage}
                  onChange={handleStageChange}
                >
                  <option value={0}>انتخاب کنید</option>
                  {stages.map((stage) => (
                    <option value={stage.id} key={stage.id}>
                      {stage.title}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <p />
              <CCol md={6}>
                <CButton color="success" onClick={handleOpenCash}>
                  پذیرش
                </CButton>
              </CCol>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
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
    </CCol>
  )
}

export default OpenCash
