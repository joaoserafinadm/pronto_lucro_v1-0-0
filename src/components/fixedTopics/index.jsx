import { useEffect } from "react";
import { useState } from "react";
import styles from "./fixedTopics.module.scss"
import window2Mobile from "../../../utils/window2Mobile";



export function FixedTopicsTop({ children }) {

    const [fixed, setFixed] = useState(false);

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position >= 30) {
            setFixed(true)
        } else {
            setFixed(false)
        }
    };


    useEffect(() => {

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={` ${fixed && `${styles.fixedTopicsTop}  shadow`} `}>
            {children}
        </div>


    )

}



export function FixedTopicsBottom({ children }) {

    const [fixed, setFixed] = useState(true);

    useEffect(() => {
        if (!window2Mobile()) setFixed(true)
        else setFixed(false)

    }, [])



    return (
        <div className={` ${fixed && `${styles.fixedTopicsBottom}  shadow `} `}>
            {children}
        </div>
    )
}