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
  cilBookmark,
  cilBasketball,
  cilMoodGood,
  cilInbox,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
  {
    component: CNavItem,
    name: 'مدیریت دستگاه پوز',
    to: '/pages/posDevice',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'مدیریت سالن ها',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'افزودن سالن',
        to: '/pages/Stages',
      },
      {
        component: CNavItem,
        name: '  جنسیت سالن ها ',
        to: '/pages/stagePlans',
      },
      {
        component: CNavItem,
        name: 'تعیین ظرفیت انلاین',
        to: '/pages/stageDays',
      },
      {
        component: CNavItem,
        name: 'افزودن روز استثنا',
        to: '/pages/stageDayException',
      },
    ],
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
  {
    component: CNavItem,
    name: 'ثبت کارت هدیه',
    to: '/pages/giftCard',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'کلاس های تابستانی',
  // },
  // {
  //   component: CNavItem,
  //   name: 'ثبت کلاس',
  //   to: '/pages/classReg',
  //   icon: <CIcon icon={cilBasketball} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'ثبت نام هنرجو',
  //   to: '/pages/classRegUser',
  //   icon: <CIcon icon={cilMoodGood} customClassName="nav-icon" />,
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
    name: 'پکیج ‌ها',
  },
  {
    component: CNavGroup,
    name: 'عملیات پکیج‌ ها',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' رزرو پکیج',
        to: '/pages/packageReserve',
      },
      {
        component: CNavItem,
        name: 'ثبت پکیج',
        to: '/pages/packageReg',
      },
      {
        component: CNavItem,
        name: 'نمایش پکیج‌ ها',
        to: '/pages/showPackages',
      },
      {
        component: CNavItem,
        name: 'ثبت ایتم های پکیج',
        to: '/pages/itemsReg',
      },
      {
        component: CNavItem,
        name: 'نمایش ایتم های پکیج',
        to: '/pages/showItems',
      },
      {
        component: CNavItem,
        name: 'روزهای پکیج',
        to: '/pages/packageDays',
      },
    ],
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

export default _nav
