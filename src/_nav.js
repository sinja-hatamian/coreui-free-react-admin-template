import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilPeople,
  cilMoney,
  cilGift,
  cilDollar,
  cilCheckCircle,
  cilChart,
  cilChartLine,
  cilBarChart,
  cilGrid,
  cilGamepad,
  cilDoor,
  cilRoom,
  cilExitToApp,
  cilBank,
  cilDevices,
  cilColorBorder,
  cilNotes,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'داشبورد',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
  // {
  //   component: CDropdownItem,
  //   name: 'خروج',
  //   to: '/login',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'مدیریت ',
  },
  {
    component: CNavItem,
    name: 'افزودن کاربر جدید',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    to: '/base/operatorReg',
  },
  {
    component: CNavItem,
    name: ' مدیریت راه های آشنایی',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    to: '/pages/introductionWays',
  },

  {
    component: CNavItem,
    name: 'مدیریت جدول اعتبارات',
    to: '/pages/ChargeCredits',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'مدیریت بانک ها',
    to: '/pages/banks',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'مدیریت اسناد',
  //   to: '/pages/accountingDetails',
  //   icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'مدیریت دستگاه پوز',
    to: '/pages/posDevice',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: ' مدیریت سالن ها ',
    to: '/pages/Stages',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: ' مدیریت  بازی ها ',
    to: '/pages/Games',
    icon: <CIcon icon={cilGamepad} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'مدیریت گیت ها ',
    to: '/pages/Gates',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: ' مدیریت دستبند ها ',
    to: '/pages/Wristband',
    icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },

  // {
  //   component: CNavItem,
  //   name: 'حذف کارت',
  //   to: '/charts',
  //   icon: <CIcon icon={cilDelete} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'ثبت کارت هدیه',
    to: '/pages/giftCard',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'هزینه صدور و تعویض کارت',
  //   to: '/charts',
  //   icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
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
    name: ' تسویه مشتریان',
    to: '/pages/exitCustomer',
    icon: <CIcon icon={cilExitToApp} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'بررسی دستبند ',
  //   to: '/pages/showByTag',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },

  {
    component: CNavTitle,
    name: 'گزارشات',
  },
  {
    component: CNavItem,
    name: 'گزارشات مشتریان',
    to: '/pages/customerFullLog',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'گزارشات گردش حساب مشتری',
    to: '/logs/CustomerLog',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'گزارشات رزواسیون',
    to: '/theme/color',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'گزارشات کارت‌های هدیه',
    to: '/theme/color',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'گزارشات صندوق',
    to: '/theme/color',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
]

export default _nav
