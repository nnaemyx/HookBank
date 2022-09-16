import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';

function Signup() {

  const { isError, loading, success, registerUser } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => await registerUser(data);

  return (
    <>
      <div className='h-screen'>
        <section className='heading text-center pt-[-5rem]  text-white'>
          <h1 className=' gap-4 pt-2 text-center'>
            Register
          </h1>
          <p className='text-white'>Please create an account</p>
        </section>

        <section className='form border-solid p-2 pb-6 border-2 shadow-[0_35px_60px_-15px_rgba(1,6,2,0.9)] rounded-md'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <input
                required
                type='text'
                className='form-control'
                id='name'
                placeholder='First Name'
                {...register('firstName', { required: 'FIRST NAME REQUIRED', minLength: 1 })}
              />
              {errors.firstName && <span>{errors.firstName.message}</span>}
            </div>

            <div className='form-group'>
              <input
                required
                type='text'
                className='form-control'
                id='name'
                placeholder='Last Name'
                {...register('lastName', { required: 'LAST NAME REQUIRED', minLength: 1 })}
              />
              {errors.lastName && <span>{errors.lastName.message}</span>}
            </div>

            <div className='form-group'>
              <input
                required
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
                required
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
              <input
                required
                type='password'
                className='form-control'
                id='password2'
                placeholder='Confirm password'
                {...register('confirmPassword', {
                  required: 'PLEASE CONFIRM YOUR PASSWORD',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || 'PASSWORDS MUST MATCH!';
                    }
                  }
                })}
              />
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                {loading ? <Spinner /> : 'Submit'}
              </button>
            </div>
          </form>
          <p className='text-white'>
            Already Have an account yet?
            <Link to='/login' className='text-green-400 p-2'>
              Login
            </Link>
          </p>
          {success && <Toast />}
        </section>
      </div>

    </>
  )
}

export default Signup;
