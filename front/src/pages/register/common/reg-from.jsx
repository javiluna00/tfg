import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useRegisterUserMutation } from "@/store/api/auth/authApiSlice";

const schema = yup
  .object({
    name: yup.string().required("El nombre es necesario"),
    email: yup.string().email("Email inválido").required("Email necesario"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres")
      .required("Por favor, introduce una contraseña"),
    // confirm password
  })
  .required();

const RegForm = () => {
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.error) {
        throw new Error(response.error.message);
      }
      reset();
      navigate("/feed");
      toast.success("Cuenta registrada correctamente");
    } catch (error) {
      console.log(error.response); // Log the error response to the console for debugging

      const errorMessage =
        error.response?.data?.message ||
        "Un error inesperado ha sucedido. Por favor, intenta de nuevo.";

      if (errorMessage === "Este email ya está registrado") {
        toast.error(errorMessage);
      } else {
        toast.warning(errorMessage);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="name"
        label="nombre"
        type="text"
        placeholder=" Introduce tu nombre"
        register={register}
        error={errors.name}
        className="h-[48px]"
      />{" "}
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder=" Introduce tu email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="contraseña"
        type="password"
        placeholder=" Introduce tu contraseña"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <Checkbox
        label="Aceptas nuestros términos y condiciones"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <Button
        type="submit"
        text="Crear cuenta"
        className="btn btn-dark block w-full text-center"
        isLoading={isLoading}
      />
    </form>
  );
};

export default RegForm;
