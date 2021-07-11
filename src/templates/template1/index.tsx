/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/heading-has-content */
import * as React from 'react';
import '../assets/animate.min.css';
import '../assets/bootstrap.min.css';
import '../assets/custom.css';
import '../assets/link-custom.css';
import './css/body.css';

export interface Template1Props {
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
}

export default function Teamplate1(props: Template1Props) {
  const script = document.createElement('script');

  script.src = 'https://use.typekit.net/foobar.js';
  script.async = true;

  document.body.appendChild(script);
  return (
    <div>
      <div className="container animate__animated animate__fadeIn">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-8 link-content ">
            <header className="d-flex flex-column align-items-center" style={{ color: '#000000' }}>
              <img
                id="image"
                src="https://atplink.com/uploads/avatars/b5ac75e88fd9faa1de05425c28f6a9af.png"
                alt="Avatar"
                className="link-image"
              />
              <div className="d-flex flex-row align-items-center mt-4">
                <h1 style={{ fontSize: '2.0rem' }} id="title">
                  @BAMA
                </h1>
                <span data-toggle="tooltip" title="Verified" className="link-verified ml-1">
                  <i className="fa fa-fw fa-check-circle fa-1x" />
                </span>
              </div>
              <p id="description">Balo, túi đeo chính hãng</p>
            </header>
            <main id="links" className="mt-4">
              <div className="row">
                <div data-biolink-block-id={74448} className="col-12 my-2">
                  <a
                    target="_blank"
                    data-nodeeplink
                    href="https://atplink.com/"
                    data-biolink-block-id={74448}
                    className="btn btn-block btn-primary link-btn link-btn-round animate__animated animate__infinite animate__pulse animate__delay-2s"
                    rel="noreferrer"
                    style={{
                      color: '#000000',
                      background: 'transparent',
                      border: '.1rem solid #000000',
                    }}
                  >
                    <div className="link-btn-image-wrapper link-btn-round">
                      <img
                        src="https://atplink.com/uploads/block_thumbnail_images/228dc6519ac9300d9b334b8c31c2f7dc.png"
                        className="link-btn-image"
                        loading="lazy"
                        alt="alt"
                      />
                    </div>
                    Fanpage BAMA
                  </a>
                </div>
                <div data-biolink-block-id={74449} className="col-12 my-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    data-nodeeplink
                    href="https://atplink.com/"
                    data-biolink-block-id={74449}
                    className="btn btn-block btn-primary link-btn link-btn-round animate__animated animate__repeat-1 animate__false animate__delay-2s"
                    style={{
                      color: '#000',
                      background: 'transparent',
                      border: '.1rem solid #000000',
                    }}
                  >
                    <div className="link-btn-image-wrapper link-btn-round">
                      <img
                        src="https://atplink.com/uploads/block_thumbnail_images/70059c9dc29135bb6465ec4385239b49.png"
                        className="link-btn-image"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    Instagram BAMA
                  </a>
                </div>
                <div data-biolink-block-id={74450} className="col-12 my-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    data-nodeeplink
                    href="https://atplink.com/"
                    data-biolink-block-id={74450}
                    className="btn btn-block btn-primary link-btn link-btn-round animate__animated animate__repeat-1 animate__false animate__delay-2s"
                    style={{
                      color: '#000',
                      background: 'transparent',
                      border: '.1rem solid #000000',
                    }}
                  >
                    <div className="link-btn-image-wrapper link-btn-round">
                      <img
                        src="https://atplink.com/uploads/block_thumbnail_images/30528d25abc5d07fce9b056d599bfc3a.png"
                        className="link-btn-image"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    Website BAMA
                  </a>
                </div>
                <div data-biolink-block-id={74451} className="col-12 mt-4 mb-4">
                  <div className="d-flex justify-content-center align-items-center">
                    <hr className="w-100" style={{ borderColor: '#000000' }} />
                    <span className="mx-4">
                      <i className="fa fa-infinity fa-fw" style={{ color: '#000000' }} />
                    </span>
                    <hr className="w-100" style={{ borderColor: '#000000' }} />
                  </div>
                </div>
                <div data-biolink-block-id={74452} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: '#000000' }}>
                    Các mẫu Balo thịnh hành nhất hiện nay
                  </h2>
                  <p className="text-break" style={{ color: '#fff' }} />
                </div>
                <div data-biolink-block-id={74453} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    BAMA BASIC BACKPACK - BLUE
                    <br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 550,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74454} className="col-12 my-2">
                  <a
                    href="https://atplink.com/"
                    rel="noreferrer"
                    data-biolink-block-id={74454}
                    target="_blank"
                  >
                    <img
                      src="https://atplink.com/uploads/block_images/14014d05888d8fb02b1485c6d0e8e11e.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74455} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    <span style={{ textAlign: 'center' }}>BAMA BASIC BACKPACK - HOLOGRAM</span>
                    <br style={{ textAlign: 'center' }} />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span>
                    <span style={{ textAlign: 'center' }}>&nbsp;550,000₫</span>
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74456} className="col-12 my-2">
                  <a href="https://atplink.com/" data-biolink-block-id={74456} target="_blank">
                    <img
                      src="https://atplink.com/uploads/block_images/ac8f64fcd8410687301327b0540f8bda.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74457} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    BASIC BACKPACK 4.4 - BLACK PINK
                    <br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 650,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74458} className="col-12 my-2">
                  <a href="https://atplink.com/" data-biolink-block-id={74458} target="_blank">
                    <img
                      src="https://atplink.com/uploads/block_images/2647fe0102892c51d32e20d8d1aa5ac4.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74459} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    URBAN BAMA BACKPACK - BLACK&amp;WHITE
                    <br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 690,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74460} className="col-12 my-2">
                  <a href="https://atplink.com/" data-biolink-block-id={74460} target="_blank">
                    <img
                      src="https://atplink.com/uploads/block_images/5c5adbe695b9fe3962708bf3d7576d65.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74461} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    SHOULDER BAG 4.0 - VITAMIN C<br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 390,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74464} className="col-12 my-2">
                  <a href="https://atplink.com/" data-biolink-block-id={74464} target="_blank">
                    <img
                      src="https://atplink.com/uploads/block_images/6d61fb6c0cdcc790f928bac28659bdb7.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74463} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    SUMMER MINI BAG - MINT
                    <br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 400,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74462} className="col-12 my-2">
                  <a href="https://atplink.com/" data-biolink-block-id={74462} target="_blank">
                    <img
                      src="https://atplink.com/uploads/block_images/405f5acbbac38988fbcef0d50062372d.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74465} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    Túi đeo chéo SHOULDER BAG 4.2 - COLOR
                    <br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 420,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74466} className="col-12 my-2">
                  <a href="https://atplink.com/" data-biolink-block-id={74466} target="_blank">
                    <img
                      src="https://atplink.com/uploads/block_images/f5ef0222a49e9f9429ee426e7827318e.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74467} className="col-12 my-2">
                  <h2 className="h4 text-break" style={{ color: 'white' }} />
                  <p className="text-break" style={{ color: 'white' }}></p>
                  <p style={{ textAlign: 'center' }}>
                    Túi bao tử DBR BAG 3.0 - COLOR
                    <br />
                    <span style={{ textDecoration: 'underline' }}>Giá:</span> 550,000₫
                  </p>
                  <p />
                </div>
                <div data-biolink-block-id={74468} className="col-12 my-2">
                  <a
                    href="https://atplink.com/"
                    rel="noreferrer"
                    data-biolink-block-id={74468}
                    target="_blank"
                  >
                    <img
                      src="https://atplink.com/uploads/block_images/da70a669d603141f719aea3dafdd497b.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                </div>
                <div data-biolink-block-id={74469} className="col-12 my-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    data-nodeeplink
                    href="https://atplink.com/"
                    data-biolink-block-id={74469}
                    className="btn btn-block btn-primary link-btn link-btn-rounded animate__animated animate__infinite animate__pulse animate__delay-2s"
                    style={{
                      color: '#000',
                      background: 'transparent',
                      border: '.1rem solid #000000',
                    }}
                  >
                    <div
                      className="link-btn-image-wrapper link-btn-rounded"
                      style={{ display: 'none' }}
                    >
                      <img src="" className="link-btn-image" loading="lazy" alt="" />
                    </div>
                    XEM THÊM
                  </a>
                </div>
              </div>
              <div id="socials" className="d-flex flex-wrap justify-content-center mt-5">
                <div className="mx-3 mb-3">
                  <span>
                    <a href="tel: 0903019023" target="_blank" rel="noreferrer">
                      <i
                        data-toggle="tooltip"
                        title="Telephone"
                        className="fa fa-phone-square fa-fw fa-2x"
                        style={{ color: '#000000', fill: '#000000' }}
                      ></i>
                    </a>
                  </span>
                </div>
                <div className="mx-3 mb-3">
                  <span>
                    <a href="https://facebook.com/BAMA" target="_blank" rel="noreferrer">
                      <i
                        data-toggle="tooltip"
                        title="Facebook"
                        className="fab fa-facebook fa-fw fa-2x"
                        style={{ color: '#000000', fill: '#000000' }}
                      ></i>
                    </a>
                  </span>
                </div>
                <div className="mx-3 mb-3">
                  <span>
                    <a href="https://instagram.com/BAMA" target="_blank" rel="noreferrer">
                      <i
                        data-toggle="tooltip"
                        title="Instagram"
                        className="fab fa-instagram fa-fw fa-2x"
                        style={{ color: '#000000', fill: '#000000' }}
                      ></i>
                    </a>
                  </span>
                </div>
              </div>
            </main>
            <footer className="link-footer">
              <a id="branding" href="/" style={{ color: '#000000' }}>
                ATP Link
              </a>
            </footer>
          </div>
        </div>
      </div>
      <input type="hidden" id="url" name="url" defaultValue="https://atplink.com/" />
      <input type="hidden" name="global_token" defaultValue="834ae907c797c6a5ffa9f3dc7dc5ea38" />
      <input type="hidden" name="number_decimal_point" defaultValue="." />
      <input type="hidden" name="number_thousands_separator" defaultValue="," />
    </div>
  );
}
