import React, { useEffect, useState } from "react";
// import images
import Twitter from "@/assets/images/icon/tw.svg";
import FaceBook from "@/assets/images/icon/fb.svg";
import LinkedIn from "@/assets/images/icon/in.svg";
import Google from "@/assets/images/icon/gp.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

const Social = () => {

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  const {logIn} = useAuth()

  const responseMessage = (response) => {
      console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  useEffect(
    () => {
      console.log("user", user?.access_token);
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

useEffect(() => {
  if (profile) {
    logIn({
      email: profile.email,
      nombre: profile.given_name,
      apellidos: profile.family_name,
      nombre_artistico: profile.name,
      id: profile.id,
      token: user.access_token,
      imagen: profile.picture
    });
  }
}, [ profile ]);

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: error => console.log(error),
  });

  return (
    <ul className="flex justify-center items-center">
      <li className="flex justify-center items-center">
        <div
          className="inline-flex h-10 w-10 bg-[#EA4335] text-white text-2xl flex-col items-center justify-center rounded-full cursor-pointer"
          onClick={googleLogin}
        >
          <img src={Google} alt=""/>
        </div>
      </li>
    </ul>
  );
};

export default Social;
