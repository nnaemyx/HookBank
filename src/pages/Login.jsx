import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner'

const Login = () => {

  const { loading, loginUser, isError } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from.pathname || '/';

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => await loginUser(data, () => { navigate(from, { replace: true }) })

  return (
    <>
      <div className='h-screen'>
        <section className='heading text-center pt-[5rem]  text-white'>
          <h1 className=' gap-4 pt-2 text-center'>
            Login
          </h1>
          <p className='text-white'>Please Login to your account</p>
        </section>

        <section className='form border-solid p-2 pb-6 border-2 shadow-[0_35px_60px_-15px_rgba(1,6,2,0.9)] rounded-md'>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Enter your email'
                {...register('email', { required: 'PLEASE ENTER A VALID EMAIL' })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter password'
                {...register('password', {
                  required: 'YOU MUST SPECIFY A PASSWORD',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                }
                )}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                {loading ? <Spinner /> : 'Login'}
              </button>
            </div>
            {isError && <span>Sign in Error: {isError}</span>}
            <p className='text-white'>
              Don't Have an account yet?
              <Link to='/signup' className='text-green-400 p-2'>
                Signup
              </Link>
            </p>
          </form>
        </section>
      </div>

    </>
  )
}

export default Login