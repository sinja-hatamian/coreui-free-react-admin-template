// import { element, exact } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomerReg = React.lazy(() => import('./views/theme/colors/CustomerReg'))

// Base
const OperatorReg = React.lazy(() => import('./views/base/operatorReg/OperatorReg'))

//pages

const Login = React.lazy(() => import('./views/pages/login/Login'))
const OpenCash = React.lazy(() => import('./views/pages/openCash/OpenCash'))
const Stages = React.lazy(() => import('./views/pages/stages/Stages'))
const Games = React.lazy(() => import('./views/pages/games/Games'))
const Gates = React.lazy(() => import('./views/pages/gates/Gates'))
const InfoCard = React.lazy(() => import('./views/pages/infoCard/InfoCard'))
const GiftCard = React.lazy(() => import('./views/pages/giftCard/GiftCard'))
const ChargeCredits = React.lazy(() => import('./views/pages/chargeCredits/ChargeCredits'))
const IntroductionWays = React.lazy(() => import('./views/pages/introductionWays/IntroductionWays'))
const ChargeForm = React.lazy(() => import('./views/pages/chargeForm/ChargeForm'))
const exitCustomer = React.lazy(() => import('./views/pages/exitCustomer/ExitCustomer'))
const banks = React.lazy(() => import('./views/pages/banks/Banks'))
// const customerFullLog = React.lazy(() => import('./views/pages/customerFullLog/CustomerFullLog'))
const posDevice = React.lazy(() => import('./views/pages/posDevice/PosDevice'))
const Wristband = React.lazy(() => import('./views/pages/wristband/Wristband'))
const AccountingDetails = React.lazy(() =>
  import('./views/pages/accountingDetails/AccountingDetails'),
)
const customerFullLog = React.lazy(() => import('./views/pages/customerFullLog/CustomerFullLog'))
const customerFinanceLog = React.lazy(() =>
  import('./views/pages/customerFinanceLog/CustomerFinanceLog'),
)
const StagesPlans = React.lazy(() => import('./views/pages/stagePlans/StagePlans'))
const stageDays = React.lazy(() => import('./views/pages/stageDays/StageDays'))
const StageDayException = React.lazy(() =>
  import('./views/pages/stageDayException/StageDayException'),
)
const Reservation = React.lazy(() => import('./views/pages/reservation/Reservation'))
const ClassReg = React.lazy(() => import('./views/pages/classReg/ClassReg'))
const ClassRegUser = React.lazy(() => import('./views/pages/classRegUser/ClassRegUser'))
const AddCallReport = React.lazy(() => import('./views/pages/addCallReport/AddCallReport'))
const callReport = React.lazy(() => import('./views/pages/callReport/CallReport'))
const showPackages = React.lazy(() => import('./views/pages/showPackages/ShowPackages'))
const packageReg = React.lazy(() => import('./views/pages/packageReg/PackageReg'))
const itemsReg = React.lazy(() => import('./views/pages/itemsReg/ItemsReg'))
const ShowItems = React.lazy(() => import('./views/pages/showItems/ShowItems'))
const packageDays = React.lazy(() => import('./views/pages/packageDays/PackageDays'))
const packageReserve = React.lazy(() => import('./views/pages/packageReserve/PackageReserve'))

// const showByTag = React.lazy(() => import('./views/pages/showByTag/ShowByTag'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: CustomerReg, exact: true },
  { path: '/theme/CustomerReg', name: 'Colors', element: CustomerReg },
  { path: '/base/operatorReg', name: 'operatorReg', element: OperatorReg },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating‰ Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/pages/login', name: 'Pages', element: Login, exact: true },
  { path: '/pages/openCash', name: 'OpenCash', element: OpenCash, exact: true },
  { path: '/pages/stages', name: 'Stages', element: Stages, exact: true },
  { path: '/pages/games', name: 'Games', element: Games, exact: true },
  { path: '/pages/gates', name: 'Gates', element: Gates, exact: true },
  { path: '/pages/infoCard', name: 'InfoCard', element: InfoCard, exact: true },
  { path: '/pages/giftCard', name: 'GiftCard', element: GiftCard, exact: true },
  { path: '/pages/chargeCredits', name: 'ChargeCredits', element: ChargeCredits, exact: true },
  {
    path: '/pages/introductionWays',
    name: 'IntroductionWays',
    element: IntroductionWays,
    exact: true,
  },
  { path: '/pages/chargeForm', name: 'ChargeForm', element: ChargeForm, exact: true },
  { path: '/pages/exitCustomer', name: 'ExitCustomer', element: exitCustomer, exact: true },
  { path: '/pages/banks', name: 'banks', element: banks, exact: true },
  { path: '/pages/posDevice', name: 'posDevice', element: posDevice, exact: true },
  { path: '/pages/wristband', name: 'Wristband', element: Wristband, exact: true },
  {
    path: '/pages/accountingDetails',
    name: 'AccountingDetails',
    element: AccountingDetails,
    exact: true,
  },
  {
    path: '/pages/customerFullLog',
    name: 'customerFullLog',
    element: customerFullLog,
    exact: true,
  },
  {
    path: '/pages/customerFinanceLog',
    name: 'customerFinanceLog',
    element: customerFinanceLog,
    exact: true,
  },
  { path: '/pages/stagePlans', name: 'StagesPlans', element: StagesPlans, exact: true },
  { path: '/pages/stageDays', name: 'stageDays', element: stageDays, exact: true },
  {
    path: '/pages/stageDayException',
    name: 'stageDayException',
    element: StageDayException,
    exact: true,
  },
  {
    path: '/pages/reservation',
    name: 'Reservation',
    element: Reservation,
    exact: true,
  },
  { path: '/pages/classReg', name: 'ClassReg', element: ClassReg, exact: true },
  { path: '/pages/classRegUser', name: 'ClassRegUser', element: ClassRegUser, exact: true },
  {
    path: '/pages/addCallReport',
    name: 'AddCallReport',
    element: AddCallReport,
    exact: true,
  },
  { path: '/pages/callReport', name: 'callReport', element: callReport, exact: true },
  { path: '/pages/showPackages', name: 'showPackages', element: showPackages, exact: true },
  { path: '/pages/packageReg', name: 'packageReg', element: packageReg, exact: true },
  { path: '/pages/itemsReg', name: 'itemsReg', element: itemsReg, exact: true },
  { path: '/pages/showItems', name: 'ShowItems', element: ShowItems, exact: true },
  { path: '/pages/packageDays', name: 'packageDays', element: packageDays, exact: true },
  { path: '/pages/packageReserve', name: 'packageReserve', element: packageReserve, exact: true },
]

export default routes
