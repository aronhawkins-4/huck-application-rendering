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
                    <li>Vibration-resistant design keeps joints secure and tight</li>
                    <li>Tamper-proof for added protection</li>
                    <li>Consistent clamping prevents joints from slipping</li>
                    <li>Strong shear and tensile performance</li>
                    <li>Corrosion-resistant for long-lasting durability</li>
                    <li>Easy to install with no special training needed</li>
                    <li>Fast assembly improves efficiency</li>
                    <li>Lasts 5x longer than standard fasteners</li>
                    <li>Permanent installation with no retightening required</li>
                    <li>Ideal for truck chassis applications</li>
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
                    <li>Self-countersinking eliminates the need for counterboring plywood</li>
                    <li>Protects panels during replacements without damage</li>
                    <li>Water-resistant to extend the life of floors and cargo</li>
                    <li>Versatile grip fits different floor thicknesses</li>
                    <li>Recessed pin breaks, no grinding required</li>
                    <li>Suitable for wood, aluminum floors, buses, and subway cars</li>
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
                    <li>Single-sided installation speeds up fastening</li>
                    <li>Easy to install, no special training needed</li>
                    <li>Fast assembly boosts throughput</li>
                    <li>No need to grind post-drill burrs</li>
                    <li>Circle lock increases shear strength</li>
                    <li>Visual inspections ensure proper installation</li>
                    <li>Large blind bulb prevents pull-through</li>
                    <li>Works with thin sheets and misaligned holes</li>
                    <li>Ideal for trailers, buses, seats, and street signs</li>
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
                  <h2>Magnagrip</h2>
                  <ul className='callout-list'>
                    <li>Vibration-resistant joints stay tight without loosening</li>
                    <li>Tamper-proof design enhances safety</li>
                    <li>Consistent clamping prevents slippage</li>
                    <li>Fast assembly improves workflow</li>
                    <li>Flush pin breaks create a smooth surface</li>
                    <li>Single SKU accommodates multiple material thicknesses</li>
                    <li>Reduces human error with one SKU</li>
                    <li>Minimizes inventory needs compared to using three SKUs</li>
                    <li>Ideal for grills, shelving, and safety applications</li>
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
                <h2>Enhance marine performance with Huck bolts.</h2>
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
                    <li>Strongest blind fastener available on the market</li>
                    <li>Single-sided installation for faster fastening</li>
                    <li>Easy installation with no special training required</li>
                    <li>Fast assembly increases throughput</li>
                    <li>Vibration-resistant to prevent joints from loosening</li>
                    <li>Tamper-resistant for added security</li>
                    <li>High shear strength ensures durability</li>
                    <li>Broad blind side footprint prevents pull-through</li>
                    <li>Creates strong joints in weak or thin materials</li>
                    <li>Break design enhances corrosion protection</li>
                    <li>Installs with standard tools, increasing speed and flexibility</li>
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
                  <h2>Large Bobtail</h2>
                  <ul className='callout-list'>
                    <li>Vibration-resistant design keeps joints secure and tight</li>
                    <li>Tamper-proof for added protection</li>
                    <li>Consistent clamping prevents joints from slipping</li>
                    <li>Strong shear and tensile performance</li>
                    <li>Corrosion-resistant for long-lasting durability</li>
                    <li>Easy to install with no special training needed</li>
                    <li>Fast assembly improves efficiency</li>
                    <li>Lasts 5x longer than standard fasteners</li>
                    <li>Permanent installation with no retightening required</li>
                    <li>Ideal for truck chassis applications</li>
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
                    <li>Vibration-resistant joints stay tight without loosening</li>
                    <li>Tamper-proof design enhances safety</li>
                    <li>Consistent clamping prevents slippage</li>
                    <li>Fast assembly improves workflow</li>
                    <li>Flush pin breaks create a smooth surface</li>
                    <li>Single SKU accommodates multiple material thicknesses</li>
                    <li>Reduces human error with one SKU</li>
                    <li>Minimizes inventory needs compared to using three SKUs</li>
                    <li>Ideal for grills, shelving, and safety applications</li>
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
                    <li>Vibration-resistant to prevent joint loosening</li>
                    <li>Tamper-resistant for added security</li>
                    <li>Consistent clamping prevents slipping</li>
                    <li>High shear and tensile strength for durability</li>
                    <li>No-break design offers enhanced corrosion protection</li>
                    <li>Easy installation with no special training required</li>
                    <li>Fast assembly increases productivity</li>
                    <li>5x longer fatigue life than standard fasteners</li>
                    <li>Permanent installation, no retorquing needed</li>
                    <li>Ideal for applications like truck chassis</li>
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
                    <li>Strongest blind fastener available on the market</li>
                    <li>Single-sided installation for faster fastening</li>
                    <li>Easy installation with no special training required</li>
                    <li>Fast assembly increases throughput</li>
                    <li>Vibration-resistant to prevent joints from loosening</li>
                    <li>Tamper-resistant for added security</li>
                    <li>High shear strength ensures durability</li>
                    <li>Broad blind side footprint prevents pull-through</li>
                    <li>Creates strong joints in weak or thin materials</li>
                    <li>Break design enhances corrosion protection</li>
                    <li>Installs with standard tools, increasing speed and flexibility</li>
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
