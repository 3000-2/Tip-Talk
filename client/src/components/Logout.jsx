import { useHistory } from 'react-router';
import Modal from './Modal';
import Portal from './Portal';
import axios from 'axios';

const Logout = ({ setUser, isOpen, setIsOpen }) => {
  const history = useHistory();

  const logoutHandler = () => {
    axios
      .post('http://localhost:8000/auth/signout')
      .then((res) => {
        localStorage.removeItem('token');
        setUser(null);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isOpen === true ? (
        <Portal>
          <Modal
            message={'로그아웃 하시겠습니까?'}
            setIsOpen={setIsOpen}
            callback={logoutHandler}
          />
        </Portal>
      ) : null}
    </>
  );
};

export default Logout;
