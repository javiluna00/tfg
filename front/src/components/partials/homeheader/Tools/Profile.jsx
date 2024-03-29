import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "@/assets/images/all-img/user.png";
import useAuth from "@/hooks/useAuth";

const profileLabel = ({user}) => {

  const {userLogged, logOut} = useAuth()

  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="h-7 w-7 rounded-full">
          <img
            src={userLogged?.imagen || UserAvatar}
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center flex overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block text-white lg:block hidden">
          {user?.email}
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px] ">
          <Icon icon="heroicons-outline:chevron-down" className={"text-white"}></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = ({user}) => {

  const {isLogged, userFavved, toogleFav, logIn, logOut} = useAuth()

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const ProfileMenu = [
    {
      label: "Perfil",
      icon: "heroicons-outline:user",

      action: () => {
        navigate("/profile");
      },
    },

    {
      label: "Compras",
      icon: "heroicons-outline:credit-card",
      action: () => {
        navigate("/profile/purchases");
      },
    },
    {
      label: "Guardados",
      icon: "heroicons-outline:heart",
      action: () => {
        navigate("/perfil/saves");
      }
    },
    {
      label: "Cerrar sesión",
      icon: "heroicons-outline:login",
      action: () => {
        logOut()
        navigate("/feed")
      },
    },

  ];

  return (
    <Dropdown label={profileLabel({user})} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-red-100 text-red-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
