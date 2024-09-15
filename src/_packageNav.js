import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import { cilMoney } from '@coreui/icons'

const _packageNav = [
  {
    component: CNavTitle,
    name: 'فروش پکیج',
  },
  {
    component: CNavItem,
    name: ' رزرو پکیج',
    to: '/pages/packageReserve',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
]

export default _packageNav
