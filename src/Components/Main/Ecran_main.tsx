import React, { useEffect, useRef, useState } from 'react'
import style from "../../Styles/Main.module.scss"
const Ecran_main = () => {
const effect = useRef(null);
const write = useRef(null)
const [preffect, setPreffect] = useState(false);

useEffect(() => {
    const interval = setInterval(() => {
        if (preffect === false) {
        effect.current.style.transform = 'translateY(10px)';
        setTimeout(() => {
        setPreffect(true);
        }, 100);
    } else {
        effect.current.style.transform = 'translateY(-10px)';
        setPreffect(false);
    }
    }, 300);
    
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);

}, [preffect]);


    return (
    <main className = {style.fon}>
        <h1 >QuickTalk</h1>
        <svg ref={effect} width="120px" height="120px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M12 20L8 16M12 20L16 16" stroke="#ffffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </main>
)
}

export default Ecran_main