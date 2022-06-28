import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
    const [cards, setCards] = useState([
        {
            id: '1',
            name: 'Mi',
            company: 'Samsung',
            theme: 'dark',
            title: 'Software Enginner',
            email: 'nami@gmail.com',
            message: 'go for it',
            fileName: 'nami',
            fileURL: undefined,
        },
        {
            id: '2',
            name: 'Mi',
            company: 'Samsung',
            theme: 'light',
            title: 'Software Enginner',
            email: 'nami@gmail.com',
            message: 'go for it',
            fileName: 'nami',
            fileURL: null,
        },
        {
            id: '3',
            name: 'Mi',
            company: 'Samsung',
            theme: 'colorful',
            title: 'Software Enginner',
            email: 'nami@gmail.com',
            message: 'go for it',
            fileName: 'nami',
            fileURL: null,
        }
    ]);
    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChage(user => {
            if(!user) {
                navigate('/')
            }
        });
    });

    const addCard = (card) => {
        const updated = [...cards, card];
        setCards(updated);
    };

  return (
    <section className={styles.maker}>
        <Header onLogout={onLogout}/>
        <div className={styles.container}>
            <Editor cards={cards} addCard={addCard} />
            <Preview cards={cards} />
        </div>
        <Footer />
    </section>
  )
}

export default Maker;