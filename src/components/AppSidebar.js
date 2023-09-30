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
import AxiosInstance from 'src/utils/AxiosInstance'

const AppSidebar = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    AxiosInstance.get('/managers')
      .then((res) => {
        console.log(res.data.data)
        const superAdmin = res.data.data.managers.filter((item) => item.is_superadmin == true)
        console.log(superAdmin)
        if (superAdmin.length > 0) {
          setIsSuperAdmin(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    AxiosInstance.get('/roles')
      .then((res) => {
        console.log(res.data.data)
        const roles = res.data.data.roles
        console.log(roles)
      })
      .catch((err) => {
        console.log(err)
      })
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
