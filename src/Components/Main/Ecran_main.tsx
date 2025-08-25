
import React, { useEffect, useRef, useState } from 'react'
import style from "../../Styles/Main.module.scss"
import Message from "./Message.tsx";

const Ecran_main = () => {
    const arrowRef = useRef<SVGSVGElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const messageWrapperRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleScrollDown = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);


        if (mainRef.current) {
            mainRef.current.classList.add(style.scrolled);
        }

        if (messageWrapperRef.current) {
            messageWrapperRef.current.classList.add(style.visible);
        }
    };


    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0 && !isTransitioning) {
                handleScrollDown();
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isTransitioning]);

    return (
        <div className={style.mainContainer}>
            <div ref={mainRef} className={style.fon}>
                <h1>QuickTalk</h1>
                <svg
                    ref={arrowRef}
                    width="120px"
                    height="120px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleScrollDown}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <path
                        d="M12 4V20M12 20L8 16M12 20L16 16"
                        stroke={isHovered ? "#667eea" : "#ffffff"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div ref={messageWrapperRef} className={style.messageWrapper}>
                <Message onBack={() => window.location.reload()} />
            </div>
        </div>
    )
}

export default Ecran_main