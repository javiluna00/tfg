import React, { useEffect, Suspense } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import Footer from "@/components/partials/footer";
const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        {<Outlet />}
        <Footer />
      </Suspense>
    </>
  );
};

export default AuthLayout;
