import isMobile from "./isMobile";



export default function handleShare(socialMidia) {

    const mobile = isMobile()

    console.log("mobile", mobile, socialMidia)

    if(mobile) {



    } else {



    }
    
}