import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChart, cilBookmark } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _supportNav = [
  {
    component: CNavTitle,
    name: 'پشتیبانی مشتریان',
  },
  {
    component: CNavItem,
    name: 'لیست گزارشات',
    to: '/pages/callReport',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'ثبت گزارش',
    to: '/pages/addCallReport',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },
]

export default _supportNav
