import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaLock } from 'react-icons/fa6';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials  } from '../slices/authSlice';
import { toast } from 'react-toastify';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/home');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  return (
    <>
      <div className="container" style={{ 'width': '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="col-12 col-lg-4">
          <div className="card">
            <h1 className='p-4 bg-dark text-light'>
              <div className="d-flex align-items-center">
                <div className="border p-3" style={{ borderRadius: '50%', fontSize: '1rem' }}>
                  <FaLock/>
                </div>
                <span className='px-2'>Login</span>
              </div>
            </h1>
            <form className='my-4 px-4' onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="form-control" 
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  className="form-control" 
                  value={password} 
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-outline-dark">Sign In</button>
              </div>
            </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default LoginScreen