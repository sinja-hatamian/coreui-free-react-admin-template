import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilCheckCircle,
  cilChart,
  cilBarChart,
  cilExitToApp,
  cilBookmark,
  cilInbox,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _userNav = [
  {
    component: CNavTitle,
    name: 'پذیرش',
  },
  {
    component: CNavGroup,
    name: 'عملیات صندوق',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'فرم نوبت صندوق',
        to: '/pages/openCash',
      },
      {
        component: CNavItem,
        name: 'فرم پرداخت',
        to: '/pages/chargeForm',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'پذیرش مشتریان',
    to: '/theme/CustomerReg',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'رزرو آنلاین ',
    to: '/pages/reservation',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: ' تسویه مشتریان',
    to: '/pages/exitCustomer',
    icon: <CIcon icon={cilExitToApp} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'گزارشات',
  },
  {
    component: CNavGroup,
    name: 'گزارشات',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'گزارشات مشتریان',
        to: '/pages/customerFullLog',
        icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'گزارشات گردش حساب مشتری',
        to: '/pages/customerFinanceLog',
        icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _userNav
