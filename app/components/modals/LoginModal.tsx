'use client'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
//error handler
import { toast } from "react-hot-toast";
import Button from '../Button';
import { useRouter } from 'next/navigation';




const LoginModal = () => {

  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    //credentials from [...nextauth] credentials provider
    signIn('credentials', {
      ...data,
      redirect: false
      //callback refers to the obj returned by signIn function
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('logged in');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    });
  };

  //toggle from login to register
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='LogIn to your account'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>First time using Airbnb?
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline font-bold ml-2">
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;