import { useSelector } from "react-redux";
import EsgCard from "./EsgCard";
import GeeCard from "./GeeCard";
import PcafCard from "./PcafCard";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import isMobile from "../../utils/isMobile";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import { useDispatch } from "react-redux"
import { setAkvoTool } from "../../store/AkvoTools/AkvoTools.actions";





export default function IndexCardsTools() {
    const [slideNumber, setSlideNumber] = useState(0)

    const token = jwt.decode(Cookie.get('auth'))

    const akvoTool = useSelector(state => state.tool)

    const dispatch = useDispatch()


    useEffect(() => {
        if (slideNumber === 0 && token.tools.geeCalculator) {
            dispatch(setAkvoTool('geeCalculator'))
        } else if (slideNumber === 1 && token.tools.esgIndicators) {
            dispatch(setAkvoTool('esgIndicators'))
        }
        else if (slideNumber === 2 && token.tools.pcaf) {
            dispatch(setAkvoTool('pcaf'))
        }
        else {
            dispatch(setAkvoTool(''))
        }
    }, [slideNumber])


    return (
        <>
            {isMobile() ?
                <div className="indexCardsBG fadeItem m-0 ">
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                            '--swiper-navigation-size': '25px',
                            zIndex: 0
                        }}
                        slidesPerView={1}
                        navigation
                        pagination
                        keyboard
                        onSlideChange={(swiper) => {
                            setSlideNumber(swiper.activeIndex);
                        }}
                    >
                        <SwiperSlide>
                            <div className="d-flex justify-content-center text-center" style={{marginTop:'75px'}}>
                                <div className="my-5">
                                    <GeeCard akvoTool={akvoTool} />
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="d-flex justify-content-center text-center" style={{marginTop:'75px'}}>
                                <div className="my-5">
                                    <EsgCard akvoTool={akvoTool} />
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="d-flex justify-content-center text-center" style={{marginTop:'75px'}}>
                                <div className="my-5">
                                    <PcafCard akvoTool={akvoTool} />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
                :
                <div className="indexCardsBG fadeItem">
                    <div className=" d-flex justify-content-center flex-wrap">
                        <div className="col-12 col-xl-4 mt-sm-5 mt-md-5 mt-xl-0 d-flex justify-content-center text-center">
                            <div className="my-5 mt-md-0 mt-sm-0 mt-xl-5">
                                <GeeCard akvoTool={akvoTool} />
                            </div>
                        </div>
                        {/* <div className="col-12 col-xl-4 my-5 d-flex justify-content-center text-center">
                  <div>
                  <MeuResiduoCard akvoTool={akvoTool} />
                  </div>
                </div> */}
                        {/* <div className="col-12 col-xl-4 my-5 d-flex justify-content-center text-center">
                  <div>
                  <AgroGeeCard akvoTool={akvoTool} />
                  </div>
                </div> */}
                        <div className="col-12 col-xl-4 mt-5 mt-sm-5 mt-md-5 mt-xl-0 d-flex justify-content-center text-center">
                            <div className="my-5">
                                <EsgCard akvoTool={akvoTool} />
                            </div>
                        </div>
                        <div className="col-12 col-xl-4 mt-5 mt-sm-5 mt-md-5 mt-xl-0 d-flex justify-content-center text-center">
                            <div className="my-5">
                                <PcafCard akvoTool={akvoTool} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>


    )
}