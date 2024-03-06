import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import useSignIn from 'react-auth-kit/hooks/useSignIn'

const schema = yup
  .object({
    email: yup.string().email("Email incorrecto").required("Email requerido"),
    password: yup.string().required("Contraseña requerida"),
  })
  .required();
const LoginForm = () => {

  const {logIn, isAuthenticated, isLoading} = useAuth()

  if(isAuthenticated())
  {
    return null
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {

      
      const res = await logIn({email: data.email, password: data.password})
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="Contraseña"
        type="password"
        placeholder="**********"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Mantener sesión iniciada"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          ¿Olvidaste tu contraseña?{" "}
        </Link>
      </div>

      <Button
        type="submit"
        text="Iniciar sesión"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
