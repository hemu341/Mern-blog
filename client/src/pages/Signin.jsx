import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import { Alert, Button, ButtonGroup, Label, Spinner, TextInput } from 'flowbite-react'



export default function Signin() {
  const [formData,setFormData] = useState({})
  const [errorMessage,setErrorMessages] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if( !formData.email || !formData.password){
      return setErrorMessages('please fill out all fields')
    }
    try {
      setLoading(true)
      setErrorMessages(null)
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers:{ 'Content-Type':'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
               return setErrorMessages(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/')
      }
    } catch (error) {
        setErrorMessages(error.message)
    }

  }
console.log(formData)
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto md:flex-row flex-col gap-5'>
        <div className="flex-1">
          <Link
            to="/"
            className=" font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-lime-500 rounded-lg text-white">
              hemanth's
            </span>
            blog
          </Link>
          <p className="text-sm mt-5">This is sample blog project. You can signin with your email</p>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput 
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              />
            </div>
            <div>
              <Label value="your password" />
              <TextInput 
              type='password'
              placeholder='password'
              id='password'
              onChange={handleChange}
              />
            </div>
            <Button className='my-5' gradientDuoTone='tealToLime' type="submit" disabled={loading}>
              {
                loading ? (<>
                <Spinner size='sm' />
                            <span className="pl-3">loading....</span>
                </>
                
              ):'sign up'
              }
            </Button>
          </form>
          <div>
            <span>Don't Have an account? </span>
            <Link to='/sign-up' className="text-blue-500">sign up</Link>
          </div>
          {
            errorMessage && (<Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>)
          }
        </div>
      </div>
    </div>
  );
}
