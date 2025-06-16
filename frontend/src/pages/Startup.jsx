import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUsersExist } from '../services/authService';

const Startup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      try {
        const data = await checkUsersExist();
        if (data.data && data.data.exists) {
          navigate('/login');
        } else {
          navigate('/register');
        }
      } catch (err) {
        // default to login on error
        navigate('/login');
      }
    }
    check();
  }, [navigate]);

  return null;
};

export default Startup;
