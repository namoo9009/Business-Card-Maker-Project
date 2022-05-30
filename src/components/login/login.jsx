import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({authService}) => {
    const navigate = useNavigate();
    const goToMaker = (userIde) => {
        navigate({
            pathname: '/maker',
            state: {id: userIde}
        });
    };

    const onLogin = (event) => {
        authService
        .login(event.currentTarget.textContent)
        .then(data => goToMaker(data.user.uid));
    };

    useEffect(() => {
        authService
        .onAuthChage(user => {
            user && goToMaker(user.uid)
        })
    })
  return (
    <section className={styles.login}>
        <Header />
            <section>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Google</button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Github</button>
                    </li>
                </ul>
            </section>
        <Footer />
    </section>
  )
}

export default Login;