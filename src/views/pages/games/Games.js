import React, { useState, useEffect } from 'react'
import AxiosInstance from 'src/utils/AxiosInstance'
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
} from '@coreui/react'

const Games = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [games, setGames] = useState([])
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
        console.log(res.data.data.games)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleGamesChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddGame = () => {
    AxiosInstance.post('/games', gameData)
      .then((res) => {
        console.log(res.data.data)
        alert('بازی با موفقیت اضافه شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در اضافه کردن بازی')
      })
  }

  const handleUpdateGame = () => {
    AxiosInstance.put(`/games/${gameData.id}`, gameData)
      .then((res) => {
        console.log(res.data.data)
        alert('بازی با موفقیت ویرایش شد')
      })
      .catch((err) => {
        console.log(err)
        alert('خطا در ویرایش بازی')
      })
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
                          <CTableDataCell>{game.BasePrice}</CTableDataCell>
                          <CTableDataCell>{game.ExtraPrice}</CTableDataCell>
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
                        onChange={handleGamesChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="نوع بازی"
                        placeholder="نوع بازی"
                        name="type"
                        aria-label="type"
                        locale="fa-IR"
                        value={gameData.type}
                        onChange={handleGamesChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="کد دستگاه"
                        placeholder="کد دستگاه"
                        name="device_code"
                        aria-label="device_code"
                        locale="fa-IR"
                        value={gameData.device_code}
                        onChange={handleGamesChange}
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
                        onChange={handleGamesChange}
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
                        onChange={handleGamesChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="قیمت اضافه"
                        placeholder="قیمت اضافه"
                        name="extra_price"
                        aria-label="extra_price"
                        value={gameData.extra_price}
                        locale="fa-IR"
                        onChange={handleGamesChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="شماره سالن"
                        placeholder="شماره سالن"
                        name="stage_id"
                        aria-label="stage_id"
                        locale="fa-IR"
                        value={gameData.stage_id}
                        onChange={handleGamesChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CFormInput
                        label="تایم استفاده"
                        placeholder="تایم استفاده"
                        name="base_time"
                        aria-label="base_time"
                        locale="fa-IR"
                        value={gameData.base_time}
                        onChange={handleGamesChange}
                      />
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CButton color="primary" onClick={handleAddGame}>
                        افزودن بازی
                      </CButton>
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CButton color="primary" onClick={handleUpdateGame}>
                        ویرایش بازی
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default Games
