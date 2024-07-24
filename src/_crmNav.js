import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilCheckCircle,
  cilChart,
  cilChartLine,
  cilBarChart,
  cilExitToApp,
  cilBookmark,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _crmNav = [
  {
    component: CNavTitle,
    name: 'پشتیبانی مشتریان',
  },
  {
    component: CNavItem,
    name: 'ثبت گزارش',
    to: '/pages/addCallReport',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },
]

export default _crmNav
