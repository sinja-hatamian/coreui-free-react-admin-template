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
  cilBasketball,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _crmNav = [
  {
    component: CNavTitle,
    name: 'مدیریت پشتیبانی مشتری',
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
]

export default _crmNav
