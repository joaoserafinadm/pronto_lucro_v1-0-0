import styles from "./Login.module.scss";

import { useEffect, useState } from "react";
import Head from "next/head";

import SignIn from "./SignIn";
import RescuePassword from "./RescuePassword";
import SignUp from "./SignUp";
import { signOut, useSession } from 'next-auth/react'
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { SpinnerSM } from "../../components/loading/Spinners";
import AkvoSpinner from "../../components/loading/AkvoSpinner";
import { signIn } from 'next-auth/react'

export default function Login() {
  const [section, setSection] = useState("signIn");

  



  return (
    <>
      <div className={`${styles.container} container-fluid`}>

        {section === "signIn" && (
          <SignIn section={section} setSection={(value) => setSection(value)} />
        )}

        {section === "rescuePassword" && (
          <RescuePassword
            section={section}
            setSection={(value) => setSection(value)}
          />
        )}

        {section === "signUp" && (
          <SignUp section={section} setSection={(value) => setSection(value)} />
        )}
      </div>
    </>
  );
}
