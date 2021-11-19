import { useHistory } from 'react-router';
import Modal from './Modal';
import Portal from './Portal';
import axios from 'axios';

const Logout = ({ isOpen, setIsOpen, setUser }) => {
  const history = useHistory();

  const logoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/signout`)
      .then((res) => {
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
