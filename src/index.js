import React, { act, Suspense, useEffect, useRef, useState } from 'react';
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
      <Canvas camera={{ fov: 60, near: 0.1, far: 1000, position: [8, 2, 12] }} ref={canvasRef} shadows>
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
                  <p>
                    Ideal for applications that require vibration resistance and consistent, repeatable clamp, the Huck Bobtail provides five times the fatigue life of conventional fasteners and does
                    not require re-torquing. Bobtail has been used in applications ranging from heavy trucking and trailers to mining applications.
                  </p>
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
                  <p>
                    Huck Floortight is an excellent example of how Huck has created problem-solving solutions for decades. The Floortight is a self-countersinking blind fastener that is designed for
                    wood-to-metal applications like the floors of buses.
                  </p>
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
                  <p>
                    The Huck Magnabulb is the perfect fastener for joints with thin sheet or low strength materials that still need high tensile and high shear values. It’s quick and easy to install,
                    requiring access to only one side of the application, and it’s consistent blind side bulb resists pull through.
                  </p>
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
                  <h2>BOM</h2>
                  <p>
                    The Huck BOM is the highest strength structural blind fastener in the world. Proven in applications from military vehicles to rail cars to green energy installations, the BOM
                    provides high joint tightness and tamper resistance while still being fast and easy to install.
                  </p>
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
                  <p>
                    Ideal for applications that require vibration resistance and consistent, repeatable clamp, the Huck Bobtail provides five times the fatigue life of conventional fasteners and does
                    not require re-torquing. Bobtail has been used in applications ranging from heavy trucking and trailers to mining applications.
                  </p>
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
                  <p>
                    One of the most versatile fasteners in the Huck lineup, the Magnagrip has a wide grip range that allows a single fastener to be used in a variety of joint thicknesses. Another
                    feature that’s unique to Magnagrip is a consistent break that’s flush with the collar, reducing the potential for snagging or scraping.
                  </p>
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
                  <p>
                    Providing five times the fatigue life of conventional fasteners, the Huck Bobtail is ideal for applications that require vibration resistance and measurable, consistent clamp and
                    shear values. Quick, easy installation also means less training time and more consistent fastening of joints across the entire application.
                  </p>
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
                  <p>
                    The next generation of the already excellent Huck BOM, the easy-to-install BOMtail provides high strength and tamper resistance with a pintail-less design that improves corrosion
                    resistance to its impressive list of benefits.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='callout-screen'></SwiperSlide>
          </Swiper>
        )}
      </div>
      <div
        className='swiper-pagination scene-pagination'
        onMouseEnter={() => {
          if (hover) {
            setHover(false);
          }
        }}
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

      <div
        className='swiper-navigation'
        onMouseEnter={() => {
          if (hover) {
            setHover(false);
          }
        }}
      >
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
