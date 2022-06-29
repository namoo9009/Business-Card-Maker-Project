import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const navigateState = useLocation().state;
    const navigate = useNavigate();

    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(navigateState && navigateState.id);

    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        if(!userId) {
            return;
        }
        const stapSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);
        })
        // useEffect에서 함수를 리턴하면 리액트가 알아서 component가 unmount 되었을 때 return한 함수를 호출해준다.
        return () => stapSync();
    }, [userId]);

    useEffect(() => {
        authService.onAuthChage(user => {
            if(user) {
                setUserId(user.uid)
            } else {
                navigate('/')
            }
        });
    });

    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };

    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
  )
}

export default Maker;