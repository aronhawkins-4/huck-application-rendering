import React, { Suspense, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Loader, Html } from '@react-three/drei';
import App from './app';

import { Swiper, SwiperSlide } from 'swiper/swiper-react';
import { EffectFade } from 'swiper/modules';
import 'swiper/swiper.min.css';

const root = ReactDOM.createRoot(document.querySelector('#canvas'));

const Container = () => {
  const prevNavRef = useRef();
  const nextNavRef = useRef();
  const paginationRef = useRef();
  const swiperRef = useRef();
  const canvasRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (activeScene < 0) {
      setActiveScene(2);
    }
    if (activeScene > 2) {
      setActiveScene(0);
    }
  }, [activeScene]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeScene]);
  return (
    <>
      <Canvas camera={{ fov: 60, near: 0.1, far: 10000, position: [5, 150.25, 5] }} ref={canvasRef} shadows>
        <Suspense
          fallback={
            <Html>
              <Loader />
            </Html>
          }
        >
          <App activeIndex={activeIndex} activeScene={activeScene} hover={hover} setHover={setHover} />
        </Suspense>
      </Canvas>
      <div className='scene-swiper'>
        {activeScene === 0 && (
          <Swiper
            className='content truck-scene'
            direction='vertical'
            effect='fade'
            modules={[EffectFade]}
            pagination={{
              el: paginationRef.current,
            }}
            rewind={true}
            ref={activeScene === 0 && swiperRef}
            onActiveIndexChange={(event, handler) => {
              setActiveIndex(event.activeIndex);
            }}
          >
            <SwiperSlide className='callout-screen'>
              <div className='scene-heading'>
                <h2>Your road to performance starts with Huck.</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout truck'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Large Bobtail</h2>
                  <ul className='callout-list'>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>Consistent, repeatable clamp – delivers joints that will not slip</li>
                    <li>High shear strength</li>
                    <li>High tensile strength</li>
                    <li>No-break design – enhanced corrosion protection</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li>Five times the fatigue life of conventional fasteners – joints last longer and can often be designed with fewer fasteners to reduce weight</li>
                    <li>Permanent installation – no retorquing required</li>
                    <li>Ideal for critical applications like truck chassis</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout truck'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Floortight</h2>
                  <ul className='callout-list'>
                    <li>
                      Self-countersinking
                      <ul>
                        <li>No need to counterbore plywood</li>
                        <li>No dimpling in plymetal</li>
                      </ul>
                    </li>
                    <li>Does not damage panels when plywood floors need to be replaced</li>
                    <li>Water and weather resistance to extend the life of plywood floors and cargo</li>
                    <li>Versatile grip range – one fastener for varying floor thicknesses</li>
                    <li>Recessed pin break – no grinding the pin to get flush with the floor</li>
                    <li>Used in wood trailer floors, aluminum floors, buses, subway cars</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout truck'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Magnabulb</h2>
                  <ul className='callout-list'>
                    <li>Single sided installation – makes fastening faster</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li>No need to grind down burrs after hole drilling – undercut fillet helps fastener seat properly</li>
                    <li>Circle lock to retain pin and improve shear strength</li>
                    <li>Visual inspection to ensure proper installation</li>
                    <li>
                      Large blind side bulb
                      <ul>
                        <li>Eliminates pull through</li>
                        <li>Can be used in thin sheet applications</li>
                        <li>Works in misaligned, oversized, or out-of-round holes</li>
                      </ul>
                    </li>
                    <li>Ideal for a variety of applications: trailers, buses, seat track, street signs, etc.</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout truck'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Magnabulb</h2>
                  <ul className='callout-list'>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>Consistent, repeatable clamp – delivers joints that will not slip</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li>Pin breaks flush to the collar – no need to grind or sand it down</li>
                    <li>
                      One SKU covers a wide range of material thickness
                      <ul>
                        <li>Reduce human error of picking the wrong fastener out of the bin</li>
                        <li>Reduce inventory – one SKU vs up to 3 SKUs on a conventional fastener/Huckbolt</li>
                      </ul>
                    </li>
                    <li>Visual inspection of proper installation</li>
                    <li>Ideal for a wide variety of applications: Grills, shelving/racking, safety appliances (this is used in safety steps/ladders/handles on rail cars)</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        )}
        {activeScene === 1 && (
          <Swiper
            className='content boat-scene'
            direction='vertical'
            effect='fade'
            modules={[EffectFade]}
            pagination={{
              el: paginationRef.current,
            }}
            rewind={true}
            ref={activeScene === 1 && swiperRef}
            onActiveIndexChange={(event, handler) => {
              setActiveIndex(event.activeIndex);
            }}
          >
            <SwiperSlide className='callout-screen'>
              <div className='scene-heading'>
                <h2>Enhanced Marine Performance with Huck Bolts.</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout boat'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>BOMtail</h2>
                  <ul className='callout-list'>
                    <li>Highest strength blind fastener on the market</li>
                    <li>Single sided installation – makes fastening faster</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li> Visual inspection of proper installation</li>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>High shear strength</li>
                    <li>
                      Broad blind side footprint
                      <ul>
                        <li>eliminates fastener pull-through</li>
                        <li>creates strong joints in weak or thin material</li>
                      </ul>
                    </li>
                    <li>No-break design - enhanced corrosion protection</li>
                    <li>Installs with battery tools – increases installation speed & allows for greater flexibility during the manufacturing process</li>
                  </ul>
                  {/* <p>
                    The Huck BOM is the highest strength structural blind fastener in the world. Proven in applications from military vehicles to rail cars to green energy installations, the BOM
                    provides high joint tightness and tamper resistance while still being fast and easy to install.
                  </p> */}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout boat'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Large Bobtail</h2>
                  <ul className='callout-list'>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>Consistent, repeatable clamp – delivers joints that will not slip</li>
                    <li>High shear strength</li>
                    <li>High tensile strength</li>
                    <li>No-break design – enhanced corrosion protection</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li>Five times the fatigue life of conventional fasteners – joints last longer and can often be designed with fewer fasteners to reduce weight</li>
                    <li>Permanent installation – no retorquing required</li>
                    <li>Ideal for critical applications like truck chassis</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout boat'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Magnagrip</h2>
                  <ul className='callout-list'>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>Consistent, repeatable clamp – delivers joints that will not slip</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li>Pin breaks flush to the collar – no need to grind or sand it down</li>
                    <li>
                      One SKU covers a wide range of material thickness
                      <ul>
                        <li>Reduce human error of picking the wrong fastener out of the bin</li>
                        <li>Reduce inventory – one SKU vs up to 3 SKUs on a conventional fastener/Huckbolt</li>
                      </ul>
                    </li>
                    <li>Visual inspection of proper installation</li>
                    <li>Ideal for a wide variety of applications: Grills, shelving/racking, safety appliances (this is used in safety steps/ladders/handles on rail cars)</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        )}
        {activeScene === 2 && (
          <Swiper
            className='content solar-scene'
            direction='vertical'
            effect='fade'
            modules={[EffectFade]}
            pagination={{
              el: paginationRef.current,
            }}
            rewind={true}
            ref={activeScene === 2 && swiperRef}
            onActiveIndexChange={(event, handler) => {
              setActiveIndex(event.activeIndex);
            }}
          >
            <SwiperSlide className='callout-screen'>
              <div className='scene-heading'>
                <h2>Harness the power of Huck bolts.</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout solar'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>Small Bobtail</h2>
                  <ul className='callout-list'>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>Consistent, repeatable clamp – delivers joints that will not slip</li>
                    <li>High shear strength</li>
                    <li>High tensile strength</li>
                    <li>No-break design – enhanced corrosion protection</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li>Five times the fatigue life of conventional fasteners – joints last longer and can often be designed with fewer fasteners to reduce weight</li>
                    <li>Permanent installation – no retorquing required</li>
                    <li>Ideal for critical applications like truck chassis</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'>
              <div className='callout solar'>
                <div className='callout-content'>
                  <div className='callout-line-container'>
                    <div className='callout-line'></div>
                  </div>
                  <h2>BOMtail</h2>
                  <ul className='callout-list'>
                    <li>Highest strength blind fastener on the market</li>
                    <li>Single sided installation – makes fastening faster</li>
                    <li>Easy, consistent installation – no special training or certifications required for installers</li>
                    <li>Fast assembly – increases throughput</li>
                    <li> Visual inspection of proper installation</li>
                    <li>Vibration resistant – delivers joints that will not loosen</li>
                    <li>Tamper resistant</li>
                    <li>High shear strength</li>
                    <li>
                      Broad blind side footprint
                      <ul>
                        <li>eliminates fastener pull-through</li>
                        <li>creates strong joints in weak or thin material</li>
                      </ul>
                    </li>
                    <li>No-break design - enhanced corrosion protection</li>
                    <li>Installs with battery tools – increases installation speed & allows for greater flexibility during the manufacturing process</li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            {/* <SwiperSlide className='callout-screen'></SwiperSlide> */}
          </Swiper>
        )}
      </div>
      <div
        className='swiper-pagination scene-pagination'
        // onMouseEnter={() => {
        //   if (hover) {
        //     setHover(false);
        //   }
        // }}
        // onMouseLeave={() => {
        //   if (!hover) {
        //     setHover(true);
        //   }
        // }}
      >
        <div
          className={`swiper-pagination-bullet ${activeScene === 0 && 'active'}`}
          onClick={() => {
            setActiveScene(0);
          }}
        ></div>
        <div
          className={`swiper-pagination-bullet ${activeScene === 1 && 'active'}`}
          onClick={() => {
            setActiveScene(1);
          }}
        ></div>
        <div
          className={`swiper-pagination-bullet ${activeScene === 2 && 'active'}`}
          onClick={() => {
            setActiveScene(2);
          }}
        ></div>
      </div>

      <div className='swiper-navigation'>
        <a
          href='#'
          className='swiper-navigation-arrow swiper-navigation-arrow_prev'
          ref={prevNavRef}
          onClick={(e) => {
            e.preventDefault();
            if (swiperRef.current) {
              if (activeIndex === 0) {
                setActiveScene((current) => {
                  return current - 1;
                });
              } else {
                swiperRef.current.swiper.slidePrev();
              }
            }
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
            <path
              d='M4.80967 20.7967L4 19.987L4.80967 19.1774L16.8473 7.13975L17.657 6.33008L19.2763 7.94942L18.4666 8.7591L8.38513 18.8406H34.8536H36V21.1335H34.8536H8.38513L18.4666 31.215L19.2763 32.0247L17.657 33.644L16.8473 32.8343L4.80967 20.7967Z'
              fill='white'
            />
          </svg>
          <span>Previous</span>
        </a>
        <a
          href='#'
          className='swiper-navigation-arrow swiper-navigation-arrow_next'
          ref={nextNavRef}
          onClick={(e) => {
            e.preventDefault();
            if (swiperRef.current) {
              if (activeIndex === swiperRef.current.swiper.slides.length - 1) {
                setActiveScene((current) => {
                  return current + 1;
                });
              } else {
                swiperRef.current.swiper.slideNext();
              }
            }
          }}
        >
          <span>Next</span>
          <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
            <path
              d='M35.1903 20.7967L36 19.987L35.1903 19.1774L23.1527 7.13975L22.343 6.33008L20.7237 7.94942L21.5334 8.7591L31.6149 18.8406H5.14644H4V21.1335H5.14644H31.6149L21.5334 31.215L20.7237 32.0247L22.343 33.644L23.1527 32.8343L35.1903 20.7967Z'
              fill='white'
            />
          </svg>
        </a>
      </div>
    </>
  );
};

root.render(<Container />);
