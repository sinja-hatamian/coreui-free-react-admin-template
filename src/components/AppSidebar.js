import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import logo from '../assets/images/LogoHeliumNew.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import userNavigation from '../_userNav'
import supportNav from '../_supportNav'
import packageNav from '../_packageNav'
// import AxiosInstance from 'src/utils/AxiosInstance'

const AppSidebar = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isCustomerSupport, setIsCustomerSupport] = useState(false)
  const [isPackageSeller, setIsPackageSeller] = useState(false)
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    const manager = JSON.parse(localStorage.getItem('manager'))
    if (manager) {
      setIsSuperAdmin(manager.is_superadmin === true)
      setIsCustomerSupport(manager.roles[0] === 'customer_support')
      setIsPackageSeller(manager.roles[0] === 'package_seller')
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
        <img src={logo} alt="logo" width="120px" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {isSuperAdmin && <AppSidebarNav items={navigation} />}
          {isCustomerSupport && !isSuperAdmin && <AppSidebarNav items={supportNav} />}
          {isPackageSeller && !isSuperAdmin && !isCustomerSupport && (
            <AppSidebarNav items={packageNav} />
          )}
          {!isSuperAdmin && !isCustomerSupport && !isPackageSeller && (
            <AppSidebarNav items={userNavigation} />
          )}
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
