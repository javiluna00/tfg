import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Contact from './pages/contact'

import Loading from '@/components/Loading'

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
const ShowContact = lazy(() => import('./pages/admindashboard/ContactDashboard/ShowContact'))

const CheckOut = lazy(() => import('./pages/checkout/Checkout'))
const SuccessCheckout = lazy(() => import('./pages/checkout/SuccessCheckout'))
const ErrorCheckout = lazy(() => import('./pages/checkout/ErrorCheckout'))

const PurchasesDashboard = lazy(() => import('./pages/admindashboard/PurchasesDashboard/PurchasesDashboard'))

const MixMasterDashboard = lazy(() => import('./pages/admindashboard/MixMasterDashboard/MixMasterDashboard'))
const ShowMixMaster = lazy(() => import('./pages/admindashboard/MixMasterDashboard/ShowMixMaster'))
const EditMixMaster = lazy(() => import('./pages/admindashboard/MixMasterDashboard/EditMixMaster'))
const NewMixMaster = lazy(() => import('./pages/admindashboard/MixMasterDashboard/NewMixMaster'))

const ManageMoods = lazy(() => import('./pages/admindashboard/BeatDashboard/ManageMoods'))
const ManageGenres = lazy(() => import('./pages/admindashboard/BeatDashboard/ManageGenres'))

const Error = lazy(() => import('./pages/404'))
const ComingSoonPage = lazy(() => import('./pages/utility/coming-soon'))
const UnderConstructionPage = lazy(() =>
  import('./pages/utility/under-construction')
)
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
              <Route path='show/:id' element={<ShowContact />} />
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

            <Route path='purchases'>
              <Route index element={<PurchasesDashboard />} />
            </Route>

            <Route path='mixmaster'>
              <Route index element={<MixMasterDashboard/>} />
              <Route path='new' element={<NewMixMaster />} />
              <Route path='show/:id' element={<ShowMixMaster />} />
              <Route path='edit/:id' element={<EditMixMaster />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/404' />} />
        </Route>
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
