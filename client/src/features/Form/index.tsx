import React, { useState } from 'react';
import styles from 'styles/Form.module.css';
import Modal from 'react-modal';
import Options from './Options';
import { users } from 'types/formTypes';

type loginPropsType = {};

const Form = (props: loginPropsType) => {
  const [state, setState] = useState<users>({
    isSignedIn: false,
    orgCode: '',
    userId: '',
    userPass: '',
  });

  const [vehicleId, setVehicleId] = useState<string>(
    localStorage.getItem('vehicleId') || ''
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  function isDisabledLoginButton() {
    if (state.userId === null || state.userPass === null) return;
    if (window.location.pathname.includes('/aw')) {
      localStorage.setItem('vehicleId', vehicleId);
      if (
        vehicleId.length > 0 &&
        state.userId.length > 0 &&
        state.userPass.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (state.userId.length > 0 && state.userPass.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  const getvehiclesList = [
    { value: 'pikachu', label: 'ピカチュウ' },
    { value: 'bulbasaur', label: 'フシギダネ' },
    { value: 'charmander', label: 'ヒトカゲ' },
    { value: 'squirtle', label: 'ゼニガメ' },
  ];
  function renderIcon() {
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div></div>
          <div className={styles.App}>
            <div className={styles.loginContainer}>
              ポケモン
              <div>
                <select
                  className={styles.select}
                  value={vehicleId}
                  onChange={(e) => {
                    setVehicleId(e.target.value);
                    handleChange(e);
                  }}
                  onBlur={handleChange}
                >
                  <option value=''>ポケモンを選択してください</option>
                  {getvehiclesList && <Options list={getvehiclesList} />}
                </select>
              </div>
              <button
                className={styles.modalsubmit}
                onClick={() => setModalIsOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div className={styles.App}>
      <div className={styles.loginContainer}>
        {renderIcon()}
        <p>react-modal</p>
        <button onClick={() => setModalIsOpen(true)} className={styles.submit}>
          {isDisabledLoginButton() ? 'modal open' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Form;
