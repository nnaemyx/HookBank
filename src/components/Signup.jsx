import React from "react";
import { Link } from 'react-router-dom'
import Toast from "./Toast";



function Signup() {
  return (
    <>
      <div className="h-screen">
        <section className='heading text-center pt-[-5rem]  text-white'>
          <h1 className=" gap-4 pt-2 text-center">
            Register
          </h1>
          <p className='text-white'>Please create an account</p>
        </section>

        <section className='form border-solid p-2 pb-6 border-2 shadow-[0_35px_60px_-15px_rgba(1,6,2,0.9)] rounded-md'>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                // value={name}
                placeholder='Enter your name'
                // onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                // value={email}
                placeholder='Enter your email'
                // onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                // value={password}
                placeholder='Enter password'
                // onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                // value={password2}
                placeholder='Confirm password'
                // onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
          <p className="text-white">Already Have an account yet?<Link to="/login" className='text-green-400 p-2'>Login</Link></p>
          <Toast/>
        </section>
      </div>
      
    </>
  )
}

export default Signup;
