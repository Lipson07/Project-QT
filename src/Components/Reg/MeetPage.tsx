import React, {useEffect, useRef, useState} from 'react';
import style from "../../Styles/MeetPage.module.scss"

function MeetPage() {
    const pageRefs = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null)
    ];
    const [page, setPage] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (pageRefs[page].current) {
            const currentPage = pageRefs[page].current;
            currentPage.style.opacity = '1';
        }
        pageRefs.forEach((ref, index) => {
            if (ref.current && index !== page) {
                ref.current.style.opacity = '0';
            }
        });
    }, [page]);

    const nextPage = () => {
        if (page < 4) {
            setPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
    };

    const handleSmsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setSmsCode(value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        console.log('Регистрация завершена:', { phoneNumber, username, password });
    };

    return (
        <div className={style.main}>
            <div ref={pageRefs[0]}>
                <h1>Добро пожаловать в QuickTalk</h1>
                <p>Пройдите регистрацию для пользования</p>
            </div>

            <div ref={pageRefs[1]}>
                <div className={style.formContainer}>
                    <h2 className={style.formTitle}>Введите номер телефона</h2>
                    <input
                        type="tel"
                        className={style.formInput}
                        placeholder="+7 (999) 999-99-99"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={11}
                    />
                    <p className={style.formHint}>Мы отправим SMS с кодом подтверждения</p>
                </div>
            </div>

            <div ref={pageRefs[2]}>
                <div className={style.formContainer}>
                    <h2 className={style.formTitle}>Код из SMS</h2>
                    <input
                        type="text"
                        className={style.formInput}
                        placeholder="Введите 4-значный код"
                        value={smsCode}
                        onChange={handleSmsChange}
                        maxLength={4}
                    />
                    <p className={style.formHint}>Отправлен на номер {phoneNumber}</p>
                </div>
            </div>

            <div ref={pageRefs[3]}>
                <div className={style.formContainer}>
                    <h2 className={style.formTitle}>Создайте никнейм</h2>
                    <input
                        type="text"
                        className={style.formInput}
                        placeholder="Ваш уникальный никнейм"
                        value={username}
                        onChange={handleUsernameChange}
                        maxLength={20}
                    />
                    <p className={style.formHint}>От 3 до 20 символов</p>
                </div>
            </div>

            <div ref={pageRefs[4]}>
                <div className={style.formContainer}>
                    <h2 className={style.formTitle}>Придумайте пароль</h2>
                    <input
                        type="password"
                        className={style.formInput}
                        placeholder="Минимум 8 символов"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <p className={style.formHint}>Не менее 8 символов</p>
                </div>
            </div>

            <div className={style.navigation}>
                {page > 0 && (
                    <button className={style.navButton} onClick={prevPage}>
                        Назад
                    </button>
                )}
                <button className={style.navButton} onClick={page === 4 ? handleSubmit : nextPage}>
                    {page === 4 ? 'Завершить' : page === 0 ? 'Поехали' : 'Далее'}
                </button>
            </div>

            <div className={style.progress}>
                {[0, 1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`${style.progressDot} ${page === index ? style.active : ''}`}
                        onClick={() => setPage(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MeetPage;