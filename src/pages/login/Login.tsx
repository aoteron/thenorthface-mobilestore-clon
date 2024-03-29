// Login.tsx
import React, { useEffect, useState } from 'react';
import { useAuthDispatch } from '../../components/contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { User } from '../../data/usersTypes.ts';
import { useUsersContext } from '../../components/contexts/UserContext.tsx';
import Header from '../../components/header/Header.tsx'
import XPLRLogo from '../../assets/icons/xplr-pass-logo.svg'
import BgGIF from '../../assets/northface-index-gif.png'

async function fetchUserData() {
  try {
    const data = await fetch('src/data/users.json');
    const JSONdata = await data.json();
    return JSONdata;
  } catch (error) {
    console.log(error)
  }
}

  export function Login() {
    const userCtxt = useUsersContext();
    const [users, setUsers] = useState([] as User[]);
    const [userData, setUserData] = useState({ usermail: "", password: "" });
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

  useEffect (() => {
    async function dataUsers() {
    const allUsersData = await fetchUserData();
    setUsers(allUsersData);
    }
    dataUsers();
  }, []);

  function handleLogin () {
    dispatch({ type: "LOGIN" });
    navigate('/main');
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {ev.preventDefault();
    
    const { usermail, password } = userData;

    const userTrue = users.find(
      (element) => usermail === element.mail && password === element.password
      );

      if (userTrue) {
        handleLogin();
        userCtxt.setUser(userTrue);
      } else {
        alert('Incorrect mail or password')
      }
    }

  return (
    <>
    <Header/>

    <div className='relative'>
      <div className='absolute inset-0 z-0'>
    <div className="flex items-center">
        <img src={BgGIF} alt='Fondo GIF' className='' style={{ width: '393px', height: '670px' }}/>
      </div>
    </div>
    </div>
    <div className='relative z-10'>
    

    <section className='flex justify-center'>
      <div style={{ width: '361px', height: '78px' }} className='bg-primary flex flex-col items-center justify-center mt-10 text-secondary'>
      <img src={XPLRLogo} style={{ width: '80px' }} alt="XPLR Logo" />
      <p className='underline hover:text-tertiary transition-colors duration-200 ease-in cursor-pointer text-lg mt-1'>Create an account</p>
      </div>
    </section>

    <section className='flex justify-center mt-4' id='LOGIN'>
      <div style={{ width: '361px', height: '530px' }} className='border border-primary p-10 bg-secondary bg-opacity-60 flex flex-col justify-between'>

        <h3 className='flex justify-center text-x18 font-semibold tracking-tighter'>LOG IN TO YOUR ACCOUNT</h3>
          <p className='text-x16'>Sign in to view your orders, request a return, and more. And if you are also a member of the XPLR Pass loyalty program, you can enjoy a lot of exclusive benefits.
          </p>

          <p className='text-x14 font-bold'>Haven't you suscribed to XPLR Pass yet? <br></br>
                  Create your account in the section of the top
          </p>
          
          <form onSubmit={handleSubmit} className='mt-6'>
            <div className='flex flex-col'>
            <input className='border border-tertiary text-x14 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 pl-4'
              style={{ height: '40px' }}
              type="text"
              placeholder="Email adress"
              value={userData.usermail}
              onChange={(e) => setUserData({...userData, usermail:e.target.value})}
              />
            <input className='border border-tertiary text-x14 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 pl-4 mt-6'
              style={{height: '40px' }}
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value })}
              />
            <p className='mt-4 underline text-x16 hover:text-tertiary transition-colors duration-200 ease-in cursor-pointer pl-1'>Forgot password?</p>
            </div>

            <div className='flex flex-col mt-4'>
              <button className='bg-primary text-secondary text-x18 font-semibold hover:text-tertiary transition-colors duration-200 ease-in cursor-pointer p-2 ' type="submit">LOG IN</button>
              <button className='bg-primary text-secondary text-x18 font-semibold hover:text-tertiary transition-colors duration-200 ease-in cursor-pointer p-2 mt-4'type="submit">SIGN UP</button>
            </div>
          </form>
      </div>
    </section>
    </div>
    </>
  );
}

export default Login;