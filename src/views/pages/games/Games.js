import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react'

const Games = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [games, setGames] = useState([])
  const [stage, setStage] = useState([])
  const [gameData, setGameData] = useState({
    name: '',
    type: '',
    device_code: '',
    accountancy_code: '',
    base_price: '',
    extra_price: '',
    stage_id: '',
    base_time: '',
  })

  useEffect(() => {
    AxiosInstance.get('/games')
      .then((res) => {
        setGames(res.data.data.games)
      })
      .catch((err) => {
        console.log(err)
      })
    AxiosInstance.get('/stages')
      .then((res) => {
        setStage(res.data.data.stages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target

    if (name === 'type' && value === '1') {
      setGameData((prev) => ({
        ...prev,
        [name]: value,
        extra_price: '0', // Set extra_price to '0' when the game type is '1'
      }))
    } else if (name === 'base_price' || name === 'extra_price') {
      const rawNumber = value.replace(/[^0-9]/g, '')
      const formattedData = numberWithCommas(rawNumber)
      setGameData({
        ...gameData,
        [name]: formattedData,
      })
    } else {
      setGameData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleAddGame = () => {
    AxiosInstance.post('/games', gameData)
      .then((res) => {
        console.log(res.data.data)
        toast.success('بازی با موفقیت افزوده شد')
        setGames([...games, res.data.data.game])
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const handleUpdateGame = () => {
    AxiosInstance.put(`/games/${gameData.id}`, gameData)
      .then((res) => {
        console.log(res.data.data)
        toast.success('بازی با موفقیت ویرایش شد')
        setGames([...games.filter((item) => item.id != gameData.id), res.data.data.game])
        setActiveKey(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.errors[0].msg)
      })
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            لیست بازی ها
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            افزودن بازی جدید
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>لیست بازی ها</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>نام بازی</CTableHeaderCell>
                        <CTableHeaderCell>نوع بازی</CTableHeaderCell>
                        <CTableHeaderCell>کد دستگاه </CTableHeaderCell>
                        <CTableHeaderCell>کد حسابداری </CTableHeaderCell>
                        <CTableHeaderCell>قیمت پایه </CTableHeaderCell>
                        <CTableHeaderCell>قیمت اضافه </CTableHeaderCell>
                        <CTableHeaderCell> شماره سالن </CTableHeaderCell>
                        <CTableHeaderCell> تایم استفاده </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {games.map((game) => (
                        <CTableRow key={game.id}>
                          <CTableDataCell>{game.Name}</CTableDataCell>
                          <CTableDataCell>{game.Type}</CTableDataCell>
                          <CTableDataCell>{game.DeviceCode}</CTableDataCell>
                          <CTableDataCell>{game.AccountancyCod}</CTableDataCell>
                          <CTableDataCell>
                            {game.BasePrice ? numberWithCommas(game.BasePrice) : '0'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {game.ExtraPrice ? numberWithCommas(game.ExtraPrice) : '0'}
                          </CTableDataCell>
                          <CTableDataCell>{game.stage_id}</CTableDataCell>
                          <CTableDataCell>{game.BaseTime}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="info"
                              onClick={() => {
                                console.log(game)
                                setGameData({
                                  id: game.id,
                                  name: game.Name,
                                  type: game.Type,
                                  device_code: game.DeviceCode,
                                  accountancy_code: game.AccountancyCod,
                                  base_price: game.BasePrice,
                                  extra_price: game.ExtraPrice,
                                  stage_id: game.stage_id,
                                  base_time: game.BaseTime,
                                })
                                setActiveKey(2)
                              }}
                            >
                              ویرایش
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>افزودن بازی جدید</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="نام بازی"
                        placeholder="نام بازی"
                        name="name"
                        aria-label="name"
                        locale="fa-IR"
                        value={gameData.name}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormSelect
                        label="نوع بازی"
                        name="type"
                        aria-label="type"
                        locale="fa-IR"
                        value={gameData.type}
                        onChange={handleInput}
                      >
                        <option value="">انتخاب کنید</option>
                        <option value="1">قیمت پایه</option>
                        <option value="2">با تایم اضافه</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="کد دستگاه"
                        placeholder="کد دستگاه"
                        name="device_code"
                        aria-label="device_code"
                        locale="fa-IR"
                        value={gameData.device_code}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="کد حسابداری"
                        placeholder="کد حسابداری"
                        name="accountancy_code"
                        aria-label="accountancy_code"
                        locale="fa-IR"
                        value={gameData.accountancy_code}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="قیمت پایه"
                        placeholder="قیمت پایه"
                        name="base_price"
                        aria-label="base_price"
                        locale="fa-IR"
                        value={gameData.base_price}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      {gameData.type == '1' ? (
                        <CFormInput
                          label=" هزینه اضافه"
                          placeholder="هزینه اضافه"
                          name="extra_price"
                          aria-label="extra_price"
                          value={'0'}
                          locale="fa-IR"
                          onChange={handleInput}
                          disabled
                        />
                      ) : (
                        <CFormInput
                          label="هزینه اضافه"
                          placeholder=" هزینه اضافه"
                          name="extra_price"
                          aria-label="extra_price"
                          locale="fa-IR"
                          value={gameData.extra_price}
                          onChange={handleInput}
                        />
                      )}
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormSelect
                        label="شماره سالن"
                        name="stage_id"
                        aria-label="stage_id"
                        locale="fa-IR"
                        value={gameData.stage_id}
                        onChange={handleInput}
                      >
                        <option value="">انتخاب کنید</option>
                        {stage.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="تایم استفاده"
                        placeholder="تایم استفاده"
                        name="base_time"
                        aria-label="base_time"
                        locale="fa-IR"
                        value={gameData.base_time}
                        onChange={handleInput}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CButton
                        color="primary"
                        onClick={gameData.id ? handleUpdateGame : handleAddGame}
                      >
                        ثبت
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
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
    </>
  )
}

export default Games
