import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import logo from '../assets/images/LogoHeliumNew.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import userNavigation from '../_userNav'
// import AxiosInstance from 'src/utils/AxiosInstance'

const AppSidebar = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState()
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    const manager = JSON.parse(localStorage.getItem('manager'))
    if (manager) {
      if (manager.is_superadmin === true) {
        setIsSuperAdmin(true)
      } else {
        setIsSuperAdmin(false)
      }
    }
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <img src={logo} alt="logo" width="120px" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {/* <AppSidebarNav items={navigation} /> */}
          {isSuperAdmin ? (
            <AppSidebarNav items={navigation} />
          ) : (
            <AppSidebarNav items={userNavigation} />
          )}
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
