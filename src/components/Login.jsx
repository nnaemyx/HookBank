import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className="h-screen">
        <section className='heading text-center pt-[5rem]  text-white'>
          <h1 className=" gap-4 pt-2 text-center">
            Login
          </h1>
          <p className='text-white'>Please Login to your account</p>
        </section>

        <section className='form border-solid p-2 pb-6 border-2 shadow-[0_35px_60px_-15px_rgba(1,6,2,0.9)] rounded-md'>
          <form>
           
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
              <button type='submit' className='btn btn-block'>
                Login
              </button>
            </div>
            <p className="text-white">Don't Have an account yet?<Link to="/signup" className='text-green-400 p-2'>Signup</Link></p>
          </form>
        </section>
      </div>
      
    </>
  )
}

export default Login