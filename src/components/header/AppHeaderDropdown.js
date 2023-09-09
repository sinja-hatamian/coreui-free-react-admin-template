import React from 'react'
// import { useHistory } from 'react-router-dom'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">تنظیمات</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          پروفایل
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          تنظیمات
        </CDropdownItem>
        <CDropdownDivider />
  */}
        <CDropdownItem
          href="#/login"
          onClick={() => {
            localStorage.removeItem('token')
          }}
        >
          <CIcon
            icon={cilLockLocked}
            className="me-2"
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('customer')
            }}
          />
          خروج
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
