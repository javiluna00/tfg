import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Contact from './pages/contact'
// const IconPage = lazy(() => import("./pages/icons"));
// const NotificationPage = lazy(() => import("./pages/utility/notifications"));
// const ChangelogPage = lazy(() => import("./pages/changelog"));

// // widget pages
// const BasicWidget = lazy(() => import("./pages/widget/basic-widget"));
// const StatisticWidget = lazy(() => import("./pages/widget/statistic-widget"));

// // app page
// const TodoPage = lazy(() => import("./pages/app/todo"));
// const EmailPage = lazy(() => import("./pages/app/email"));
// const ChatPage = lazy(() => import("./pages/app/chat"));
// const ProjectPostPage = lazy(() => import("./pages/app/projects"));
// const ProjectDetailsPage = lazy(() =>
//   import("./pages/app/projects/project-details")
// );

// const KanbanPage = lazy(() => import("./pages/app/kanban"));
// const CalenderPage = lazy(() => import("./pages/app/calendar"));

// //Ecommerce-Pages

// const EcommercePage = lazy(() => import("./pages/ecommerce"));

import Loading from '@/components/Loading'
// import { ProductDetails } from "./pages/ecommerce/productDetails";
// import Cart from "./pages/ecommerce/cart";
// import Wishlist from "./pages/ecommerce/wish-list";
// import Orders from "./pages/ecommerce/orders";
// import OrderDetails from "./pages/ecommerce/orderDetails";

// import EditProduct from "./pages/ecommerce/edit-product";
// import Customers from "./pages/ecommerce/customers";
// import Sellers from "./pages/ecommerce/sellers";
// import AddProduct from "./pages/ecommerce/add-product";
// import InvoiceEPage from "./pages/ecommerce/invoice-ecompage";
import HomeLayout from './layout/HomeLayout'
import BeatDetails from './pages/BeatDetails'
import PerfilLayout from './layout/PerfilLayout'
import RestrictedAdminRoutes from '@/pages/restrictedroutes/RestrictedAdminRoutes'
import VerifyAccount from '@/pages/verifyaccount/'

// home pages  & dashboard
// import Dashboard from "./pages/dashboard";

const Feed = lazy(() => import('./pages/feed'))
const Mixmaster = lazy(() => import('./pages/mixmaster'))
const Projects = lazy(() => import('./pages/projects'))

const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const ForgotPassword = lazy(() => import('./pages/forgotpassword'))
const ResetPassword = lazy(() => import('./pages/forgotpassword/ResetPassword'))

const AdminDashboard = lazy(() => import('./pages/admindashboard'))
const EditBeat = lazy(() => import('./pages/admindashboard/BeatDashboard/EditBeat'))
const ShowBeat = lazy(() => import('./pages/admindashboard/BeatDashboard/ShowBeat'))

const BeatDashboard = lazy(() => import('./pages/admindashboard/BeatDashboard/BeatDashboard'))
const Newbeat = lazy(() => import('./pages/admindashboard/BeatDashboard/NewBeat'))

const UserDashboard = lazy(() => import('./pages/admindashboard/UserDashboard/UserDashboard'))
const ShowUser = lazy(() => import('./pages/admindashboard/UserDashboard/ShowUser'))
const EditUser = lazy(() => import('./pages/admindashboard/UserDashboard/EditUser'))

const ProjectDashboard = lazy(() => import('./pages/admindashboard/ProjectDashboard/ProjectDashboard'))
const NewProject = lazy(() => import('./pages/admindashboard/ProjectDashboard/NewProject'))
const ShowProject = lazy(() => import('./pages/admindashboard/ProjectDashboard/ShowProject'))
const EditProject = lazy(() => import('./pages/admindashboard/ProjectDashboard/EditProject'))

const ContactDashboard = lazy(() => import('./pages/admindashboard/ContactDashboard/ContactDashboard'))
const CheckOut = lazy(() => import('./pages/checkout/Checkout'))
const SuccessCheckout = lazy(() => import('./pages/checkout/SuccessCheckout'))
const ErrorCheckout = lazy(() => import('./pages/checkout/ErrorCheckout'))

const ManageMoods = lazy(() => import('./pages/admindashboard/BeatDashboard/ManageMoods'))
const ManageGenres = lazy(() => import('./pages/admindashboard/BeatDashboard/ManageGenres'))

// const Dashboard = lazy(() => import("./pages/dashboard"));
// const Ecommerce = lazy(() => import("./pages/dashboard/ecommerce"));
// const CrmPage = lazy(() => import("./pages/dashboard/crm"));
// const ProjectPage = lazy(() => import("./pages/dashboard/project"));
// const BankingPage = lazy(() => import("./pages/dashboard/banking"));

// const Login2 = lazy(() => import("./pages/auth/login2"));
// const Login3 = lazy(() => import("./pages/auth/login3"));

// const Register2 = lazy(() => import("./pages/auth/register2"));
// const Register3 = lazy(() => import("./pages/auth/register3"));
// const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
// const ForgotPass2 = lazy(() => import("./pages/auth/forgot-password2"));
// const ForgotPass3 = lazy(() => import("./pages/auth/forgot-password3"));
// const LockScreen = lazy(() => import("./pages/auth/lock-screen"));
// const LockScreen2 = lazy(() => import("./pages/auth/lock-screen2"));
// const LockScreen3 = lazy(() => import("./pages/auth/lock-screen3"));
const Error = lazy(() => import('./pages/404'))

// // components pages
// const Button = lazy(() => import("./pages/components/button"));
// const Dropdown = lazy(() => import("./pages/components/dropdown"));
// const Badges = lazy(() => import("./pages/components/badges"));
// const Colors = lazy(() => import("./pages/components/colors"));
// const Typography = lazy(() => import("./pages/components/typography"));
// const Alert = lazy(() => import("./pages/components/alert"));
// const Progressbar = lazy(() => import("./pages/components/progress-bar"));
// const Card = lazy(() => import("./pages/components/card"));
// const Image = lazy(() => import("./pages/components/image"));
// const Placeholder = lazy(() => import("./pages/components/placeholder"));
// const Tooltip = lazy(() => import("./pages/components/tooltip-popover"));
// const Modal = lazy(() => import("./pages/components/modal"));
// const Carousel = lazy(() => import("./pages/components/carousel"));
// const Pagination = lazy(() => import("./pages/components/pagination"));
// const TabsAc = lazy(() => import("./pages/components/tab-accordion"));
// const Video = lazy(() => import("./pages/components/video"));

// // forms components
// const InputPage = lazy(() => import("./pages/forms/input"));
// const TextareaPage = lazy(() => import("./pages/forms/textarea"));
// const CheckboxPage = lazy(() => import("./pages/forms/checkbox"));
// const RadioPage = lazy(() => import("./pages/forms/radio-button"));
// const SwitchPage = lazy(() => import("./pages/forms/switch"));
// const InputGroupPage = lazy(() => import("./pages/forms/input-group"));
// const InputlayoutPage = lazy(() => import("./pages/forms/input-layout"));
// const InputMask = lazy(() => import("./pages/forms/input-mask"));
// const FormValidation = lazy(() => import("./pages/forms/form-validation"));
// const FileInput = lazy(() => import("./pages/forms/file-input"));
// const FormRepeater = lazy(() => import("./pages/forms/form-repeater"));
// const FormWizard = lazy(() => import("./pages/forms/form-wizard"));
// const SelectPage = lazy(() => import("./pages/forms/select"));
// const Flatpicker = lazy(() => import("./pages/forms/date-time-picker"));

// // chart page
// const AppexChartPage = lazy(() => import("./pages/chart/appex-chart"));
// const ChartJs = lazy(() => import("./pages/chart/chartjs"));
// const Recharts = lazy(() => import("./pages/chart/recharts"));

// // map page
// const MapPage = lazy(() => import("./pages/map"));

// // table pages
// const BasicTablePage = lazy(() => import("./pages/table/table-basic"));
// const TanstackTable = lazy(() => import("./pages/table/react-table"));

// // utility pages
// const InvoicePage = lazy(() => import("./pages/utility/invoice"));
// const InvoiceAddPage = lazy(() => import("./pages/utility/invoice-add"));
// const InvoicePreviewPage = lazy(() =>
//   import("./pages/utility/invoice-preview")
// );
// const InvoiceEditPage = lazy(() => import("./pages/utility/invoice-edit"));
// const PricingPage = lazy(() => import("./pages/utility/pricing"));
// const BlankPage = lazy(() => import("./pages/utility/blank-page"));
const ComingSoonPage = lazy(() => import('./pages/utility/coming-soon'))
const UnderConstructionPage = lazy(() =>
  import('./pages/utility/under-construction')
)
// const BlogPage = lazy(() => import("./pages/utility/blog"));
// const BlogDetailsPage = lazy(() => import("./pages/utility/blog/blog-details"));
// const FaqPage = lazy(() => import("./pages/utility/faq"));
const Settings = lazy(() => import('./pages/utility/settings'))
const Perfil = lazy(() => import('./pages/perfil'))
const Guardados = lazy(() => import('./pages/perfil/guardados'))
const Compras = lazy(() => import('./pages/perfil/compras'))
function App () {
  return (
    <main className='App relative'>
      <Routes>

        <Route path='/profile/*' element={<PerfilLayout />}>
          <Route index element={<Perfil />} />
          <Route path='settings' element={<Settings />} />
          <Route path='saves' element={<Guardados />} />
          <Route path='purchases' element={<Compras />} />
        </Route>

        <Route path='/*' element={<HomeLayout />}>
          <Route index element={<Feed />} />
          <Route path='verify' element={<VerifyAccount />} />
          <Route path='mixmaster' element={<Mixmaster />} />
          <Route path='projects' element={<Projects />} />
          <Route path='contact' element={<Contact />} />
          <Route path='beat/:beatId' element={<BeatDetails />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='checkout/success' element={<SuccessCheckout />} />
          <Route path='checkout/cancel' element={<ErrorCheckout />} />

          <Route path='dashboard' element={<RestrictedAdminRoutes />}>
            <Route index element={<AdminDashboard />} />
            <Route path='beats'>
              <Route index element={<BeatDashboard />} />
              <Route path='new' element={<Newbeat />} />
              <Route path='edit/:id' element={<EditBeat />} />
              <Route path='show/:id' element={<ShowBeat />} />
              <Route path='moods' element={<ManageMoods />} />
              <Route path='genres' element={<ManageGenres />} />
            </Route>
            <Route path='contacts'>
              <Route index element={<ContactDashboard />} />
            </Route>

            <Route path='projects'>
              <Route index element={<ProjectDashboard />} />
              <Route path='new' element={<NewProject />} />
              <Route path='show/:id' element={<ShowProject />} />
              <Route path='edit/:id' element={<EditProject />} />
            </Route>

            <Route path='users'>
              <Route index element={<UserDashboard />} />
              <Route path=':id' element={<ShowUser />} />
              <Route path='edit/:id' element={<EditUser />} />
            </Route>

          </Route>
          <Route path='*' element={<Navigate to='/404' />} />
        </Route>
        {/* <Route path="/login2" element={<Login2 />} />
            <Route path="/login3" element={<Login3 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register2" element={<Register2 />} />
            <Route path="/register3" element={<Register3 />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/forgot-password2" element={<ForgotPass2 />} />
            <Route path="/forgot-password3" element={<ForgotPass3 />} />
            <Route path="/lock-screen" element={<LockScreen />} />
            <Route path="/lock-screen2" element={<LockScreen2 />} />
            <Route path="/lock-screen3" element={<LockScreen3 />} /> */}

        {/* <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="crm" element={<CrmPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="banking" element={<BankingPage />} />
          {/* App pages *
          <Route path="todo" element={<TodoPage />} />
          <Route path="email" element={<EmailPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="projects" element={<ProjectPostPage />} />
          <Route path={"projects/:id"} element={<ProjectDetailsPage />} />
          <Route path="project-details" element={<ProjectDetailsPage />} />
          <Route path="kanban" element={<KanbanPage />} />
          <Route path="calender" element={<CalenderPage />} />
          {/* Components pages *
          <Route path="button" element={<Button />} />
          <Route path="dropdown" element={<Dropdown />} />
          <Route path="badges" element={<Badges />} />
          <Route path="colors" element={<Colors />} />
          <Route path="typography" element={<Typography />} />
          <Route path="alert" element={<Alert />} />
          <Route path="progress-bar" element={<Progressbar />} />
          <Route path="card" element={<Card />} />
          <Route path="image" element={<Image />} />
          <Route path="Placeholder" element={<Placeholder />} />
          <Route path="tooltip-popover" element={<Tooltip />} />
          <Route path="modal" element={<Modal />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="Paginations" element={<Pagination />} />
          <Route path="tab-accordion" element={<TabsAc />} />
          <Route path="video" element={<Video />} />
          <Route path="input" element={<InputPage />} />
          <Route path="textarea" element={<TextareaPage />} />
          <Route path="checkbox" element={<CheckboxPage />} />
          <Route path="radio-button" element={<RadioPage />} />

          <Route path="input-group" element={<InputGroupPage />} />
          <Route path="input-layout" element={<InputlayoutPage />} />
          <Route path="input-mask" element={<InputMask />} />
          <Route path="form-validation" element={<FormValidation />} />
          <Route path="file-input" element={<FileInput />} />
          <Route path="form-repeater" element={<FormRepeater />} />
          <Route path="form-wizard" element={<FormWizard />} />
          <Route path="select" element={<SelectPage />} />
          <Route path="date-time-picker" element={<Flatpicker />} />
          <Route path="appex-chart" element={<AppexChartPage />} />
          <Route path="chartjs" element={<ChartJs />} />
          <Route path="recharts" element={<Recharts />} />
          <Route path="map" element={<MapPage />} />
          <Route path="table-basic" element={<BasicTablePage />} />
          <Route path="react-table" element={<TanstackTable />} />
          <Route path="invoice" element={<InvoicePage />} />
          <Route path="invoice-add" element={<InvoiceAddPage />} />
          <Route path="invoice-preview" element={<InvoicePreviewPage />} />
          <Route path="invoice-edit" element={<InvoiceEditPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="blank-page" element={<BlankPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog-details" element={<BlogDetailsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="basic" element={<BasicWidget />} />
          <Route path="statistic" element={<StatisticWidget />} />
          <Route path="icons" element={<IconPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="changelog" element={<ChangelogPage />} />

          <Route path="products" element={<EcommercePage />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details" element={<OrderDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="customers" element={<Customers />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="invoice-ecommerce" element={<InvoiceEPage />} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Route> */}
        <Route
          path='/404'
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path='/coming-soon'
          element={
            <Suspense fallback={<Loading />}>
              <ComingSoonPage />
            </Suspense>
          }
        />
        <Route
          path='/under-construction'
          element={
            <Suspense fallback={<Loading />}>
              <UnderConstructionPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  )
}

export default App
