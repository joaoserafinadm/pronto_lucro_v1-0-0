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

  const session = useSession()



  useEffect(() => {

    console.log("session", session)

    if (session.status === "authenticated") {
      console.log('session', session)
      handleSocialAuth(session.data.token)
    }

  }, [session.status])


  const handleSocialAuth = async (token) => {

    const data = {
      name: token.name,
      email: token.email,
      image: token.picture
    }


    await axios.post(`${baseUrl()}/api/login/socialSignIn`, data)
      .then(res => {
        signOut()
      }).catch(e => {
        signOut()
      })

  }




  if (session.status !== "unauthenticated") {

    return (
      <div className="d-flex align-items-center fadeItem" style={{ height: '100vh', width: '100vw' }}>
        <div className="col-12 d-flex justify-content-center ">
          <AkvoSpinner static />
          <span className="text-secondary ms-2 pt-1"></span>

        </div>
      </div>
    )
  }
  // if (session.status === "authenticated") {

  //   console.log("session", session)

  //   handleSocialAuth(session.data.token)
  //   return (
  //     <div className="d-flex align-items-center fadeItem" style={{ height: '100vh', width: '100vw' }}>
  //       <div className="col-12 d-flex justify-content-center ">
  //         <AkvoSpinner static />
  //         <span className="text-secondary ms-2 pt-1"></span>

  //       </div>
  //     </div>
  //   )
  // }







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
