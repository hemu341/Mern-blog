import React from "react";
import {Link} from "react-router-dom"
import { Button, ButtonGroup, Label, TextInput } from 'flowbite-react'



export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto md:flex-row flex-col gap-5'>
        <div className="flex-1">
          <Link
            to="/"
            className=" font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              hemanth's
            </span>
            blog
          </Link>
          <p className="text-sm mt-5">This is sample blog project. You can signup with your email</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="your username" />
              <TextInput 
              type='text'
              placeholder='Username'
              id='username'
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput 
              type='text'
              placeholder='name@company.com'
              id='email'
              />
            </div>
            <div>
              <Label value="your password" />
              <TextInput 
              type='text'
              placeholder='password'
              id='password'
              />
            </div>
            <Button className='my-5' gradientDuoTone='purpleToPink' type="submit">signup</Button>
          </form>
          <div>
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">signin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
