"use client";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import Modals from "./Modals";
import CrossIcon from "../icons/CrossIcon";
import TextFields from "../TextFields";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import GoogleIcon from "../icons/GoogleIcon";
import DiscordIcon from "../icons/DiscordIcon";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.refresh();
        toast.success("Logged in");
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error("Failed to login");
      }
    });
  };
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);
  const onClose = useCallback(() => {
    loginModal.onClose();
  }, [loginModal]);
  const header = (
    <div className="flex w-full items-center px-5 border-b border-b-bnb-border pb-3">
      <button
        className="bg-transparent rounded-full hover:bg-bnb-hover p-2"
        onClick={onClose}
      >
        <CrossIcon style="w-4 h-4 fill-black" />
      </button>
      <p className="text-black font-bold text-lg flex-1 flex items-center justify-center">
        Register
      </p>
    </div>
  );
  const body = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold text-black">Welcome Back</h4>
        <p className="text-bnb-soft-gray">Login into your account</p>
        <TextFields
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          label="Email"
          id="email"
          value={email}
          setValue={setEmail}
        />
        <TextFields
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          label="Password"
          id="password"
          value={password}
          setValue={setPassword}
        />

        <Button color="red" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
      <div className="flex w-full items-center justify-center text-zinc-400 gap-5">
        <hr className="w-1/3 fill-black h-1 border-zinc-400" />
        <p>Or</p>
        <hr className="w-1/3 fill-black h-1 border-zinc-400" />
      </div>
      <div className="flex flex-col gap-3">
        <Button color="white">
          <div className="flex gap-7 items-center justify-center">
            <GoogleIcon style="w-5 h-5" />
            <p>Continue with Google</p>
          </div>
        </Button>
        <Button color="white">
          <div className="flex gap-7 items-center justify-center">
            <DiscordIcon style="w-5 h-5" />
            <p>Continue with Discord</p>
          </div>
        </Button>
      </div>
    </div>
  );
  const footer = (
    <div className="flex gap-2 w-full text-black justify-center">
      <p>Don&apos;t have any account yet?</p>
      <button onClick={onToggle}>
        <p className="font-bold hover:underline">Register</p>
      </button>
    </div>
  );

  return (
    <Modals
      isOpen={loginModal.isOpen}
      header={header}
      body={body}
      footer={footer}
    />
  );
};

export default LoginModal;
