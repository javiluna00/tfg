import React from "react";
import Icon from "@/components/ui/Icon";
import HorizentalMenu from "./Tools/HorizentalMenu";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useNavbarType from "@/hooks/useNavbarType";
import useMenulayout from "@/hooks/useMenulayout";
import useSkin from "@/hooks/useSkin";
import Logo from "./Tools/Logo";
import MobileMenu from "./Tools/MobileMenu";
import Profile from "./Tools/Profile";
import useRtl from "@/hooks/useRtl";
import useMobileMenu from "@/hooks/useMobileMenu";
import HeaderCart from "./Tools/Cart";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useRecoilState } from "recoil";
import { authAtom } from "@/store/authStoreBien";


const Header = ({ className = "custom-class", isAuthenticated, isAdmin, AxiosPrivate, auth }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  const { width, breakpoints } = useWidth();
  const [navbarType] = useNavbarType();

  const navigate = useNavigate()


  const navbarTypeClass = () => {
    switch (navbarType) {
      case "floating":
        return "floating  has-sticky-header";
      case "sticky":
        return "sticky top-0 z-[999]";
      case "static":
        return "static";
      case "hidden":
        return "hidden";
      default:
        return "sticky top-0";
    }
  };
  const [menuType] = useMenulayout();
  const [skin] = useSkin();
  const [isRtl] = useRtl();

  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const handleOpenMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };


  const borderSwicthClass = () => {
    if (skin === "bordered" && navbarType !== "floating") {
      return "border-b border-slate-200 dark:border-slate-700";
    } else if (skin === "bordered" && navbarType === "floating") {
      return "border border-slate-200 dark:border-slate-700";
    } else {
      return "dark:border-b dark:border-slate-700 dark:border-opacity-60";
    }
  };
  return (
    <header className="h-[70px] sticky top-0 z-[999]">
      <div
        className={` app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base dark:shadow-base3 bg-zinc-900 border-b border-red-400 
        ${borderSwicthClass()}
             ${
               menuType === "horizontal" && width > breakpoints.md
                 ? "py-1"
                 : "md:py-6 py-3"
             }
        `}
      >
        <div className="flex justify-between items-center h-full">
          {/* For Horizontal  */}
          {menuType === "horizontal" && (
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Logo />
              {/* open mobile menu handlaer*/}
              {width <= breakpoints.md && (
                <div
                  className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" className={"text-white"}/>
                </div>
              )}
            </div>
          )}
          {/*  Horizontal  Main Menu */}
          {menuType === "horizontal" && width >= breakpoints.md ? (
            <HorizentalMenu />
          ) : null}
          {/* Nav Tools  */}

          {width < breakpoints.md && <MobileMenu open={mobileMenu} setOpen={setMobileMenu}/>}

          {isAdmin() == true ?
          
            <Link to="/dashboard"><Button className="h-8 w-full bg-red-500 text-white flex items-center" color="light" icon="heroicons:arrow-left-20-solid">Dashboard</Button></Link>

            :

            <></>
          }
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
            <HeaderCart AxiosPrivate={AxiosPrivate} auth={auth} />

          {isAuthenticated() == true ?
            
            
            <Profile user={auth.user} />
          

          :
            <>
            <button className="btn btn-primary btn-sm bg-white text-[#000000]" onClick={(e) => navigate("/login")}>Iniciar sesión</button>
            <button className="btn btn-outline btn-sm text-white" onClick={(e) => navigate("/register")}>Registrarse</button>
            </>
          }
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
