import React, { useState, useEffect } from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Avatar from './../../assets/images/avatars/Avatar.png'

const AppHeaderDropdown = () => {
  const [formData, setFormData] = useState({})

  //get firstname of manager from localstorage
  useEffect(() => {
    if (localStorage.getItem('manager')) {
      const manager = JSON.parse(localStorage.getItem('manager'))
      setFormData({
        firstname: manager.firstname,
        lastname: manager.lastname,
        stage_title: manager.stage_title,
      })
    }
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginTop: '7px',
            marginLeft: '5px',
          }}
        >
          {formData.firstname} {formData.lastname}
          <p
            style={{
              fontSize: '14px',
              color: 'gray',
            }}
          >
            {formData.stage_title ?? ' '}
          </p>
        </div>
      </div>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={Avatar} size="lg" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
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
    </>
  )
}

export default AppHeaderDropdown
