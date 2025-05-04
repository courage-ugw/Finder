/** @format */

import {useState} from "react";
import RealEstatePageLayout from "../../components/partials/RealEstatePageLayout";
import Link from "next/link";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ProgressBar from "react-bootstrap/ProgressBar";
import ImageLoader from "../../components/ImageLoader";
import FormGroup from "../../components/FormGroup";
import DropdownSelect from "../../components/DropdownSelect";
import IconBox from "../../components/IconBox";
import PropertyCard from "../../components/PropertyCard";
import PropertyCardOverlay from "../../components/PropertyCardOverlay";
import CardImageHoverOverlay from "../../components/CardImageHoverOverlay";
import ImageSwap from "../../components/ImageSwap";
import ReactSlider from "react-slider";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import InputGroup from "react-bootstrap/InputGroup";
import VenueCardOverlay from "../../components/VenueCardOverlay";
import MarketButton from "../../components/MarketButton";

const BgParallax = dynamic(() => import("../../components/BgParallax"), {
  ssr: false
});

const HomePage = () => {

  //TODO: Fix this - Places to eat (restaurants) array
  const restaurants1 = [
    {
      href: '/city-guide/single',
      imgSrc: '/images/real-estate/agents/01.jpg',
      imgSize: [100, 100],
      imgAlt: 'Estate agent',
      title: 'Miracle Josiah',
      rating: [5.0, 48],
      price: 'HomeFinder Nigeria',
      location: '+234 7512234554',
      social_media: ['instagram','miraclejosiah']
    },
    {
      href: '/city-guide/single',
      imgSrc: '/images/real-estate/agents/02.jpg',
      imgSize: [100, 100],
      imgAlt: 'Brand logo',
      title: 'Emmanuel Udom',
      rating: [4.0, 19],
      price: 'PekaProperties',
      location: '+234 7019234554',
      social_media: ['tiktok','emmanueludom']
    },
    {
      href: '/city-guide/single',
      imgSrc: '/images/real-estate/agents/03.jpg',
      imgSize: [100, 100],
      imgAlt: 'Brand logo',
      title: 'Femi Gbadamosi',
      rating: [4.6, 63],
      price: 'femRealEstate',
      location: '+234 6514534554',
      social_media: ['facebook','femigbadamosi']
    }
  ]
  const restaurants2 = [
    {
      href: '/city-guide/single',
      imgSrc: '/images/real-estate/agents/03.jpg',
      imgSize: [100, 100],
      imgAlt: 'Estate agent',
      title: 'Rotimi Douglas',
      rating: [4.6, 63],
      price: 'ArikFanProperties',
      location: '+234 8514534554',
      social_media: ['facebook','femigbadamosi']
    },
    {
      href: '/city-guide/single',
      imgSrc: '/images/real-estate/agents/01.jpg',
      imgSize: [100, 100],
      imgAlt: 'Estate agent',
      title: 'Confidence Okereke',
      rating: [4.0, 19],
      price: 'Oasis Properties',
      location: '+234 5019234554',
      social_media: ['instagram','oasisproperties']
    },
    {
      href: '/city-guide/single',
      imgSrc: '/images/real-estate/agents/01.jpg',
      imgSize: [100, 100],
      imgAlt: 'Estate agent',
      title: 'Aisha Ibrahim',
      rating: [5.0, 48],
      price: 'SleekProperties Nigeria',
      location: '+234 7512234554',
      social_media: ['instagram','aishaibrahim']
    }
  ]

  // Datepicker state
  const [startDate, setStartDate] = useState(null)

  // Price range slider
  const PriceRange = () => {
    const [minPrice, setMinPrice] = useState(5000);
    const [maxPrice, setMaxPrice] = useState(14000);

    const handleSliderChange = (sliderVal) => {
      let sliderMinVal = sliderVal[0];
      let sliderMaxVal = sliderVal[1];
      setMinPrice(sliderMinVal);
      setMaxPrice(sliderMaxVal);
    };

    return (
      <ReactSlider
        className="range-slider range-slider-light"
        thumbClassName="range-slider-handle"
        trackClassName="range-slider-track"
        min={1000}
        max={20000}
        value={[minPrice, maxPrice]}
        ariaLabel={["Lower handle", "Upper handle"]}
        ariaValuetext={(state) => `Handle value ${state.valueNow}`}
        step={500}
        renderThumb={(props, state) => (
          <div {...props}>
            <div className="range-slider-tooltip">$ {state.valueNow}</div>
          </div>
        )}
        pearling
        minDistance={1000}
        onChange={handleSliderChange}
      />
    );
  };

  // Property cost calculator modal
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  // Form validation
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Number of rooms radios buttons (Cost calculator modal)
  const [roomsValue, setRoomsValue] = useState("3");
  const rooms = [
    { name: "1", value: "1" },
    { name: "3", value: "3" },
    { name: "5", value: "5" },
    { name: "8", value: "8" },
    { name: "10+", value: "10+" }
  ];

  // Categories array
  const categories = [
    [
      {
        href: "/real-estate/catalog?category=rent",
        media: "fi-real-estate-house",
        title: "Houses"
      },
      {
        href: "/real-estate/catalog?category=sale",
        media: "fi-apartment",
        title: "Apartments"
      },
      {
        href: "/real-estate/catalog?category=rent",
        media: "fi-shop",
        title: "Commercial"
      },
      {
        href: "/real-estate/catalog?category=rent",
        media: "fi-rent",
        title: "Daily rental"
      },
      {
        href: "/real-estate/catalog?category=sale",
        media: "fi-house-chosen",
        title: "New buildings"
      }
    ],
    [
      {
        href: "/real-estate/catalog?category=rent",
        media: "fi-single-bed",
        title: "Room"
      },
      {
        href: "/real-estate/catalog?category=sale",
        media: "fi-computer",
        title: "Office"
      },
      {
        href: "/real-estate/catalog?category=rent",
        media: "fi-real-estate-buy",
        title: "Land"
      },
      {
        href: "/real-estate/catalog?category=sale",
        media: "fi-parking",
        title: "Parking lot"
      }
    ]
  ];

  // Properties (Top offers) array
  const properties = [
    {
      href: "/real-estate/single-v1",
      images: [["/images/real-estate/catalog/01.jpg", 467, 305, "Image"]],
      title: "3-bed Apartment",
      category: "For rent",
      location: "Aminu Kano Crescent, Wuse 2, Abuja",
      price: "5,000,000",
      badges: [
        ["success", "Premium"],
        ["info", "New"]
      ],
      footer: [
          [3, 'bedrooms', 'bedroom'],
          [2, 'bathrooms', "bathroom"],
          [3, 'toilets', "toilet"],
          [2, 'parking spaces', "parking space"]
      ],
      coveredArea: ["covered area","1,800 sq.m"],
      totalArea: ["total area", "1,800 sq.m"],
    },
    {
      href: "/real-estate/single-v1",
      images: [["/images/real-estate/catalog/02.jpg", 467, 305, "Image"]],
      title: "5 bedroom detached duplex",
      category: "For sale",
      location: "Ademola Adetokunbo, Wuse 2, Abuja",
      price: "5,000,000,000",
      badges: [
        ["success", "Premium"],
        ["primary", "Distress sale"]
      ],
      footer: [
        [4, 'bedrooms', 'bedroom'],
        [1, 'bathrooms', "bathroom"],
        [1, 'toilets', "toilet"],
        [2, 'parking spaces', "parking space"]
      ],
      coveredArea: ["covered area","900 sq.m"],
      totalArea: ["total area", "1,700 sq.m"],
    },
    {
      href: "/real-estate/single-v1",
      images: [["/images/real-estate/catalog/03.jpg", 467, 305, "Image"]],
      title: "Plaza | Mall",
      category: "For sale",
      location: "Adeniran Ogunsanya, Surulere, Lagos",
      price: "1,500,000,000",
      badges: [ ["secondary", "promo"]],
      footer: [
        [1, 'bedrooms', 'bedroom'],
        [4, 'bathrooms', "bathroom"],
        [3, 'toilets', "toilet"],
        [1, 'parking spaces', "parking space"]
      ],
      coveredArea: ["covered area","85 sq.m"],
      totalArea: ["total area", "1,700 sq.m"],
    },
    {
      href: "/real-estate/single-v1",
      images: [["/images/real-estate/catalog/05.jpg", 467, 305, "Image"]],
      title: "Office space",
      category: "For rent",
      location: "Trans Amadi Industrial Layout, Port Harcourt, Rivers",
      price: "6,000,000",
      badges: [
        ["success", "Verified"],
        ["info", "New"]
      ],
      coveredArea: ["total area", "1,800 sq.m"],
      totalArea: [""],
    },
    {
      href: "/real-estate/single-v1",
      images: [["/images/real-estate/catalog/04.jpg", 467, 305, "Image"]],
      title: "102 bedroom hotel / guest house for sale",
      category: "For sale",
      location: "Guru, Garki, Abuja",
      price: "8,600,000,000",
      badges: [["success", "Verified"]],
      footer: [
        [102, 'bedrooms', 'bedroom'],
        [ 'bathrooms', "bathroom"],
        [100, 'toilets', "toilet"],
        [51, 'parking spaces', "parking space"]
      ],
      coveredArea: ["covered area","1,200 sq.m"],
      totalArea: ["total area", "1,500 sq.m"],
    }
  ];

  // properties.title keywords array
  const propertyTitleKeywords = ['house', 'apartment', 'flat', 'duplex', 'terrace', 'bedroom'];

  // Cities array
  const cities = [
    {
      href: "/real-estate/catalog?category=sale",
      img: "/images/real-estate/city/new-york.jpg",
      city: "New York",
      forSale: [893, 20],
      forRent: [3756, 80]
    },
    {
      href: "/real-estate/catalog?category=rent",
      img: "/images/real-estate/city/chicago.jpg",
      city: "Chicago",
      forSale: [268, 15],
      forRent: [1540, 85]
    },
    {
      href: "/real-estate/catalog?category=sale",
      img: "/images/real-estate/city/los-angeles.jpg",
      city: "Los Angeles",
      forSale: [2750, 80],
      forRent: [692, 20]
    },
    {
      href: "/real-estate/catalog?category=rent",
      img: "/images/real-estate/city/san-diego.jpg",
      city: "San Diego",
      forSale: [1739, 48],
      forRent: [1854, 52]
    },
    {
      href: "/real-estate/catalog?category=sale",
      img: "/images/real-estate/city/dallas.jpg",
      city: "Dallas",
      forSale: [2567, 68],
      forRent: [1204, 32]
    }
  ];

  // Partners (brands) array
  const partners = [
    {
      href: "#",
      img: [
        "/images/real-estate/brands/01_gray.svg",
        "/images/real-estate/brands/01_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/02_gray.svg",
        "/images/real-estate/brands/02_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/03_gray.svg",
        "/images/real-estate/brands/03_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/04_gray.svg",
        "/images/real-estate/brands/04_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/05_gray.svg",
        "/images/real-estate/brands/05_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/04_gray.svg",
        "/images/real-estate/brands/04_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/05_gray.svg",
        "/images/real-estate/brands/05_color.svg"
      ]
    },
    {
      href: "#",
      img: [
        "/images/real-estate/brands/06_gray.svg",
        "/images/real-estate/brands/06_color.svg"
      ]
    }
  ];

  return (
    <RealEstatePageLayout pageTitle="Home v.1" activeNav="Home">
      {/* Property cost calculator modal */}
      <Modal centered show={modalShow} onHide={handleModalClose}>
        <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
          <Modal.Title as="h4" className="mt-4 text-center">
            Explore your property’s profit
          </Modal.Title>
          <CloseButton
            onClick={handleModalClose}
            aria-label="Close modal"
            className="position-absolute top-0 end-0 mt-3 me-3"
          />
        </Modal.Header>
        <Modal.Body className="px-sm-5 px-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="property-city" className="mb-3">
              <Form.Label className="fw-bold mb-2">
                Property Location
              </Form.Label>
              <Form.Select required>
                <option value="">Choose state</option>
                <option value="Chicago">Lagos</option>
                <option value="Dallas">Abuja</option>
                <option value="Los Angeles">Enugu</option>
                <option value="New York">Port Harcourt</option>
                <option value="San Diego">Oyo</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose the state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select required>
                <option value="">Choose city</option>
                <option value="Brooklyn">Ikeja</option>
                <option value="Manhattan">Ikorodu</option>
                <option value="Staten Island">Ojo</option>
                <option value="The Bronx">Ajah</option>
                <option value="Queens">Lekki</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose the city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="property-address" className="pt-2 mb-3">
              <Form.Label className="fw-bold mb-2">Property Purchase Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>₦</InputGroup.Text>
                <Form.Control
                    type="number"
                    placeholder="Enter your property's purchase price"
                    required
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Please provide your property&apos;s price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="property-city" className="mb-3">
              <Form.Label className="fw-bold mb-2">
                Property Type
              </Form.Label>
              <Form.Select required>
                <option value="">Choose property type</option>
                <option value="Chicago">House</option>
                <option value="Dallas">Land</option>
                <option value="Los Angeles">Commercial</option>
                <option value="New York">Apartment</option>
                <option value="San Diego">Shortlet</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose property type.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="pt-2 mb-3">
              <Form.Label className="d-block fw-bold mb-2">
                Investment Period
              </Form.Label>
              <ButtonGroup>
                {rooms.map((room, indx) => (
                  <ToggleButton
                    key={indx}
                    type="radio"
                    id={`rooms-${indx}`}
                    name="rooms"
                    value={room.value}
                    checked={roomsValue === room.value}
                    onChange={(e) => setRoomsValue(e.currentTarget.value)}
                    variant="outline-secondary"
                  >
                    {room.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Form.Group controlId="property-area" className="pt-2 mb-4">
              <Form.Label className="fw-bold mb-2">
                Investment Goal
              </Form.Label>
              <Form.Select required>
                <option value="">Choose investment goal</option>
                <option value="Chicago">Profit on Sale</option>
                <option value="Dallas">Rental Cashflow</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose your investment goal.
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary d-block w-100 mb-4">
              <i className="fi-calculator me-2"></i>
              Calculate
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Hero */}
      <Container fluid as="section" className="my-5 pt-5 pb-lg-4 px-xxl-4">
        <BgParallax
          imgSrc="/images/real-estate/hero-image-v3.jpg"
          type="scroll" // scale, opacity, scroll-opacity, scale-opacity
          speed={0.5} // from -1.0 to 2.0
          overlay={45} // from 0 to 100 or 'gradient' to apply gradient overlay
          contentWrapper={
            {
              style: { maxWidth: "856px" }
            }
          }
          className="card align-items-center justify-content-center border-0 p-md-5 p-4 bg-secondary overflow-hidden mt-n3"
          style={{ minHeight: "65vh" }}
        >
          <h1
            className="display-4 text-light pb-3 mb-4 mb-lg-5 text-center"
            style={{ maxWidth: "746px" }}
          >
            Find your{" "}
            <span className="fireboy text-primary">perfect property</span> with
            ease
          </h1>

          <FormGroup className="d-block">
            <Row className="g-0">
              <Col md={11} className="d-sm-flex align-items-center">
                <DropdownSelect
                  defaultValue="Buy"
                  icon="fi-home"
                  options={[
                    [null, "Buy"],
                    [null, "Rent"],
                    [null, "Lease"]
                  ]}
                  variant="link ps-2 ps-sm-3"
                  className="w-sm-50 border-end-sm"
                />

                <hr className="d-sm-none my-2" />
                <DropdownSelect
                  defaultValue="Property type"
                  icon="fi-list"
                  options={[
                    [null, "Houses"],
                    [null, "Apartments"],
                    [null, "Commercial"],
                    [null, "Daily rental"],
                    [null, "New buildings"],
                    [null, "Shortlet"]
                  ]}
                  variant="link ps-2 ps-sm-3"
                  className="w-sm-50 border-end-md"
                />

                <hr className="d-sm-none my-2" />
                <DropdownSelect
                  defaultValue="Location"
                  icon="fi-map-pin"
                  options={[
                    [null, "New York"],
                    [null, "Chicago"],
                    [null, "Los Angeles"],
                    [null, "San Diego"]
                  ]}
                  variant="link ps-2 ps-sm-3"
                  className="w-sm-50 border-end-sm"
                />

                <div className="d-flex align-items-center w-100 pt-2 pb-4 py-sm-0 ps-2 ps-sm-3">
                  <i className="fi-cash fs-lg text-muted me-2"></i>
                  <span className="text-muted">Price</span>
                  <ReactSlider
                    className="range-slider range-slider-single me-0 me-sm-3"
                    thumbClassName="range-slider-handle"
                    trackClassName="range-slider-track"
                    min={0}
                    max={1000}
                    defaultValue={450}
                    ariaLabel={["Handle"]}
                    ariaValuetext={(state) => `Handle value ${state.valueNow}`}
                    step={1}
                    renderThumb={(props, state) => (
                      <div {...props}>
                        <div className="range-slider-tooltip">
                          &#8358; {state.valueNow}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </Col>

              <Col md={1} className="d-sm-flex align-items-center pt-3 pt-md-0">
                <Button
                  variant="primary btn-icon px-3 w-100 w-sm-auto "
                  className="w-100"
                >
                  <i className="fi-search"></i>
                  <span className="d-sm-none d-inline-block ms-2">Search</span>
                </Button>
                {/* <Button className="w-100">Search</Button> */}
              </Col>
            </Row>
          </FormGroup>

          {/* Statistics */}
          <Row className="d-none align-items-center d-lg-flex pt-5">
            <Col xs={12}  className="d-flex justify-content-center">
              <div className="border-end border-white pe-4 me-3">
                <div className="text-light me-3">
                  <div className="fs-3 fw-bold mb-1">12k</div>
                  <div className="fs-sm opacity-90 text-capitalize">Listed Houses</div>
                </div>
              </div>
             
              <div className="border-end border-white px-4 me-3">
                <div className="text-light me-3">
                  <div className="fs-3 fw-bold mb-1">8K</div>
                  <div className="fs-sm opacity-90">Commercial Properties</div>
                </div>
              </div>
              <div className="border-end border-white px-4 me-3">
                <div className="text-light me-3">
                  <div className="fs-3 fw-bold mb-1">5K</div>
                  <div className="fs-sm opacity-90">Shortlets</div>
                </div>
              </div>
              <div className="ps-4">
                <div className="text-light">
                  <div className="fs-3 fw-bold mb-1">10K</div>
                  <div className="fs-sm opacity-90">Active Realtors</div>
                </div>
              </div>
            </Col>
          </Row>
        </BgParallax>
      </Container>

      {/* Categories */}
      <Container as="section" className="mb-5">
        <Row xs={2} sm={3} lg={6} className="g-3 g-xl-4">
          {categories[0].map((category, indx) => (
            <Col key={indx}>
              <IconBox
                href={category.href}
                media={category.media}
                mediaShape="circle"
                title={category.title}
                type="card-shadow"
                align="center"
              />
            </Col>
          ))}
          <Col>
            <Dropdown className="h-100">
              <Dropdown.Toggle
                as="div"
                className="dropdown-toggle-flush h-100 bg-transparent border-0 shadow-none p-0"
              >
                <IconBox
                  media="fi-dots-horisontal"
                  mediaShape="circle"
                  title="More"
                  type="card-shadow"
                  align="center"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu align={{ sm: "end" }} className="my-2">
                {categories[1].map((category, indx) => (
                  <Dropdown.Item
                    key={indx}
                    as={Link}
                    href={category.href}
                    className="fw-bold"
                  >
                    <i
                      className={`${category.media} fs-base opacity-60 me-2`}
                    ></i>
                    {category.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      {/* Hot Deals and Promotion (slider) */}
      <Container as='section' className='mb-5 py-3'>
        <div className='d-md-flex align-items-center justify-content-between position-relative zindex-5 mb-2 pb-md-2'>
          <h2 className='h3 w-100 mb-4 mb-md-3 me-md-3 promotions-header'>
            Hot Deals and Promotions&nbsp;
            <ImageLoader
                src={'/images/pricing/icon-1.svg'}
                width={parseInt('30')}
                height={parseInt('30')}
                alt={'Icon'}
                className='mt-2'
            />
          </h2>
          <Button size='sm' variant='primary fw-normal ms-n1 me-3 mb-3'>
            Expires Tomorrow
          </Button>
          <Button size='sm' variant='secondary fw-normal ms-n1 me-3 mb-3'>
            Expires next week
          </Button>
          <Button as={Link} href='/city-guide/catalog' variant='link ms-md-3 ms-auto mb-3 p-0 fw-normal'>
            View all
            <i className='fi-arrow-long-right ms-2'></i>
          </Button>
        </div>

        {/* Swiper slider */}
        <div className='position-relative'>
          <Swiper
              modules={[Navigation, Pagination]}
              centeredSlides
              loop
              navigation={{
                prevEl: '#prevEvent',
                nextEl: '#nextEvent'
              }}
              pagination={{
                el: '#bullets',
                clickable: true
              }}
              spaceBetween={16}
              breakpoints={{
                600: {
                  slidesPerView: 2
                },
                768: {
                  slidesPerView: 1
                },
                991: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1100: {
                  slidesPerView: 2,
                  spaceBetween: 30
                }
              }}
              className='swiper-centered'
          >
            <SwiperSlide>
              <VenueCardOverlay
                  img={{
                    src: '/images/city-guide/home/upcoming-1.jpg',
                    alt: 'Background image'
                  }}
                  title='MOWE GOLF TOWN'
                  date='Nov 15'
                  time='21:00'
                  button={{
                    href: '#',
                    title: 'Secure with ₦5M',
                    variant: 'primary',
                    props: {
                      onClick: () => console.log('You\'ve just bought tickets to Simon Rock Concert.')
                    },
                    wishlistProps: {
                      onClick: () => console.log('You\'ve added Simon Rock Concert event to your wishlist!')
                    }
                  }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <VenueCardOverlay
                  img={{
                    src: '/images/city-guide/home/upcoming-2.jpg',
                    alt: 'Background image'
                  }}
                  title='LEKKI AVANA RESORT'
                  date='Dec 12'
                  time='10:00'
                  button={{
                    href: '#',
                    title: 'Secure with ₦5M',
                    variant: 'primary',
                    props: {
                      onClick: () => console.log('You\'ve just bought tickets to Holi Festival.')
                    },
                    wishlistProps: {
                      onClick: () => console.log('You\'ve added Holi Festival event to your wishlist!')
                    }
                  }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <VenueCardOverlay
                  img={{
                    src: '/images/city-guide/home/upcoming-3.jpg',
                    alt: 'Background image'
                  }}
                  title='REAL ESTATE CASHBACK'
                  date='Nov 11'
                  time='18:00'
                  button={{
                    href: '#',
                    title: 'Secure with ₦5M',
                    variant: 'primary',
                    props: {
                      onClick: () => console.log('You\'ve just bought tickets to Football Match.')
                    },
                    wishlistProps: {
                      onClick: () => console.log('You\'ve added Football Match event to your wishlist!')
                    }
                  }}
              />
            </SwiperSlide>
          </Swiper>

          {/* External Prev/Next buttons */}
          <Button id='prevEvent' variant='prev' className='d-none d-xxl-block ms-n5' />
          <Button id='nextEvent' variant='next' className='d-none d-xxl-block me-n5' />
        </div>

        {/* External pagination (bullets) buttons */}
        <div id='bullets' className='swiper-pagination position-relative bottom-0 pt-2 mt-4 mb-lg-3'></div>
      </Container>

      {/* Featured Property Listings (carousel) */}
      <Container as="section" className="mb-5 pb-md-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h3 mb-0">Featured Listings</h2>
          <Button
            as={Link}
            href="/real-estate/catalog?category=rent"
            variant="link fw-normal ms-sm-3 p-0"
          >
            View all
            <i className="fi-arrow-long-right ms-2"></i>
          </Button>
        </div>

        {/* Swiper slider */}
        <div className="position-relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: "#prevProperties",
              nextEl: "#nextProperties"
            }}
            pagination={{
              el: "#paginationProperties",
              clickable: true
            }}
            loop
            spaceBetween={8}
            breakpoints={{
              0: { slidesPerView: 1 },
              500: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 }
            }}
            className="pt-3 pb-4 mx-n2"
          >
            {properties.map((property, indx) => (
              <SwiperSlide key={indx} className="h-auto">
                <PropertyCard
                  href={property.href}
                  images={property.images}
                  title={property.title}
                  category={property.category}
                  location={property.location}
                  price={property.price}
                  badges={property.badges}
                  wishlistButton={{
                    tooltip: "Add to Wishlist",
                    props: {
                      onClick: () =>
                        console.log("Property added to your Wishlist!")
                    }
                  }}
                  footer={
                  (property.category.toLowerCase() === 'for rent' || property.category.toLowerCase() === 'for sale')
                  && propertyTitleKeywords.some(keywordInTitle => property.title.toLowerCase().includes(keywordInTitle))
                      ? [
                        ["fi-bed", property.footer[0]],
                        ["fi-bath", property.footer[1]],
                        ["fi-toilet", property.footer[2]],
                        ["fi-car", property.footer[3]]
                      ]
                      : [
                        ["fi-dice", property.coveredArea],
                        ["fi-resize", property.totalArea],
                      ]}
                  className="h-100 mx-2"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* External Prev/Next buttons */}
          <Button
            id="prevProperties"
            variant="prev"
            className="d-none d-xxl-block mt-n5 ms-n5"
          />
          <Button
            id="nextProperties"
            variant="next"
            className="d-none d-xxl-block mt-n5 me-n5"
          />
        </div>

        {/* External pagination (bullets) buttons */}
        <div
          id="paginationProperties"
          className="swiper-pagination position-relative bottom-0 py-2 mt-1"
        ></div>
      </Container>

      {/* Newly added properties */}
      <Container as="section" className="pb-4 mb-4">
        <div className="d-flex align-items-end align-items-lg-center justify-content-between mb-4 pb-md-2">
          <div className="d-flex w-100 align-items-center justify-content-between justify-content-lg-start">
            <h2 className="h3 mb-0 me-md-4">Newly Added</h2>

            {/* Dropdown displays on screens < 768px */}
            <DropdownSelect
              defaultValue="Houses"
              options={[
                [null, "Apartments"],
                [null, "Houses"],
                [null, "Lands"],
                [null, "Commercial"],
                [null, "Shortlets"]
              ]}
              variant="outline-secondary btn-sm"
              className="d-md-none"
            />

            {/* Nav tabs display on screens > 768px */}
            <Nav
              as="ul"
              variant="tabs"
              defaultActiveKey="houses"
              className="d-none d-md-flex ps-lg-2 mb-0"
            >
              <Nav.Item as="li">
                <Nav.Link eventKey="apartments" className="fs-sm mb-2 mb-md-0">
                  Apartments
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="houses" className="fs-sm mb-2 mb-md-0">
                  Houses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="lands" className="fs-sm mb-2 mb-md-0">
                  Lands
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="commercial" className="fs-sm mb-2 mb-md-0">
                  Commercial
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="shortlets" className="fs-sm mb-2 mb-md-0">
                  Shortlets
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Button
            as={Link}
            href="/real-estate/catalog?category=rent"
            variant="link fw-normal d-none d-lg-block p-0"
          >
            View all
            <i className="fi-arrow-long-right ms-2"></i>
          </Button>
        </div>

        {/* Grid of properties */}
        <Row className="g-4">
          <Col md={6}>
            <PropertyCardOverlay
              img={{
                src: "/images/real-estate/recent/01.jpg",
                alt: "Background image"
              }}
              href="/real-estate/single-v1"
              title="Luxury 3 bedroom apartment"
              category="For rent"
              location="Freedom Way Lekki, Lekki Phase 1, Lekki, Lagos"
              overlay
              badges={[
                ["success", "Premium"],
                ["info", "New"]
              ]}
              button={{
                href: "/real-estate/single-v1",
                title: "5,000,000",
                variant: "primary",
                wishlistProps: {
                  onClick: () =>
                    console.log(
                      "You've added Luxury Rental Villa property to your wishlist!"
                    )
                }
              }}
              className="h-100"
            />
          </Col>
          <Col md={6}>
            <PropertyCardOverlay
              img={{
                src: "/images/real-estate/recent/02.jpg",
                alt: "Background image"
              }}
              href="/real-estate/single-v1"
              title="5 bedroom detached duplex"
              category="For sale"
              location="Lekki Right, Lekki Phase 1, Lekki, Lagos"
              overlay
              badges={[["info", "New"]]}
              button={{
                href: "/real-estate/single-v1",
                title: "960,000,000",
                variant: "primary",
                wishlistProps: {
                  onClick: () =>
                    console.log(
                      "You've added Duplex with Garage property to your wishlist!"
                    )
                }
              }}
              className="mb-4"
            />
            <PropertyCardOverlay
              img={{
                src: "/images/real-estate/recent/03.jpg",
                alt: "Background image"
              }}
              href="/real-estate/single-v1"
              title="Mixed used land"
              category="For sale"
              location="Old Ikoyi, Ikoyi, Lagos"
              overlay
              badges={[["info", "New"]]}
              button={{
                href: "/real-estate/single-v1",
                title: "3,000,000",
                variant: "primary",
                wishlistProps: {
                  onClick: () =>
                    console.log(
                      "You've added Country House property to your wishlist!"
                    )
                }
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* Saving towards rent payment or Homeownership */}
      <Container as='section' className='mb-5'>
        <div className='bg-faded-accent rounded-3 card-shadow card-hover pb-5'>
          <Row className='align-items-center'>
            <Col lg={5} md={6} className='ps-lg-5'>
              <div className='ps-xl-5 pe-md-0 pt-4 pb-md-4 px-3 text-center text-md-start'>
                <h2 className='mb-md-3 pt-2 pt-md-0 mb-2 pb-md-0 pb-1'>Save Regularly for Your Next Rent or Home</h2>
                <p className='mb-4 pb-xl-3 fs-md'>Save small amounts of money regularly to help you get ready for your next rent payment or even buying your own home.</p>
                <div className='d-flex flex-column flex-sm-row justify-content-center justify-content-md-start'>
                  <Button as={Link} href='/job-board/post-resume-1' size='lg' variant='primary ' className='me-sm-3 mb-3'>
                    Start Saving Now
                    <i className='fi-chevron-right fs-sm ms-2'></i>
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={7} md={6}>
              <div className='d-none d-md-flex' style={{maxWidth: '698px'}}>
                <ImageLoader
                    src='/images/city-guide/illustrations/app.png'
                    width={1396}
                    height={634}
                    alt='Illustration'
                />
              </div>
              <div className='d-flex d-md-none mx-auto' style={{maxWidth: '446px'}}>
                <ImageLoader
                    src='/images/city-guide/illustrations/app-m.png'
                    width={892}
                    height={760}
                    alt='Illustration'
                />
              </div>
            </Col>
          </Row>
          <Row className='align-items-center justify-content-center '>
            <Col  className='ps-lg-5'>
              <div className='ps-xl-5 pe-xl-5 pe-md-0 pb-md-4 px-3  text-md-start'>
                <h2 className='mb-md-3 pt-4 pt-md-0 mb-2 pb-md-0 pb-1 '>How it works</h2>
                <div className='d-flex flex-column flex-sm-row justify-content-center justify-content-md-start'>
                  <Col className='mb-2 mb-sm-0 me-sm-3'>
                    <Card border='0' className='shadow position-relative h-100'>
                      <Card.Body>
                        <div className='h2 mb-2 text-primary'>01</div>
                        <Card.Title as='h5' className='mb-2'>Sign Up</Card.Title>
                        <Card.Text className='fs-sm'>
                          Create your free account to begin your savings journey!
                        </Card.Text>
                      </Card.Body>
                      {/* Arrow shape */}
                      <svg className='position-absolute top-0 end-0 mt-n2 d-sm-block d-none' xmlns='http://www.w3.org/2000/svg' width='78' height='30' fill='none' style={{transform: 'translateY(-100%) translateX(70%)'}}>
                        <path d='M77.955 14.396c.128-2.86 0-4.67-.576-4.745s-1.279 1.607-2.11 4.378l-1.279 4.897-.563 2.683c-.612-1.434-1.352-2.81-2.212-4.113-2.718-4.072-6.226-7.569-10.321-10.288C54.205 2.687 46.332.186 38.233.008c-8.823-.165-17.491 2.305-24.874 7.087C6.581 11.549 2.118 17.395.66 22.191.033 24.057-.15 26.04.123 27.987c.243 1.367.627 2.037.755 2.012.396 0-.396-3.025 1.522-7.264s6.394-9.339 12.789-13.123c6.905-4.018 14.838-5.974 22.841-5.631 3.811.182 7.574.924 11.164 2.202 7.323 2.623 13.717 7.296 18.403 13.452 1.061 1.417 1.816 2.531 2.404 3.417l-1.637-.278-5.295-1.012c-3.031-.569-4.988-.848-5.179-.392s1.419 1.544 4.335 2.759a47.66 47.66 0 0 0 5.269 1.772c1.023.278 2.097.544 3.21.772.588.127 1.1.228 1.765.342.541.152 1.109.184 1.663.094a3.86 3.86 0 0 0 1.547-.613 2.76 2.76 0 0 0 .934-1.265c.088-.252.156-.51.205-.772l.09-.595.23-1.544.384-2.949c.217-1.873.371-3.569.435-5.062' fill='#fd5631'></path>
                      </svg>
                    </Card>
                  </Col>
                  <Col className='mb-2 mb-sm-0 me-sm-4'>
                    <Card border='0' className='shadow position-relative h-100'>
                      <Card.Body>
                        <div className='h2 mb-2 text-primary'>02</div>
                        <Card.Title as='h5' className='mb-2'>Set Your Goal</Card.Title>
                        <Card.Text className='fs-sm'>
                          Choose if you're saving for rent or a home & how much to save regularly.
                        </Card.Text>
                      </Card.Body>
                      {/* Arrow shape */}
                      <svg className='position-absolute top-0 end-0 mt-n2 d-lg-block d-none' xmlns='http://www.w3.org/2000/svg' width='78' height='30' fill='none' style={{transform: 'translateY(-100%) translateX(70%)'}}>
                        <path d='M77.955 14.396c.128-2.86 0-4.67-.576-4.745s-1.279 1.607-2.11 4.378l-1.279 4.897-.563 2.683c-.612-1.434-1.352-2.81-2.212-4.113-2.718-4.072-6.226-7.569-10.321-10.288C54.205 2.687 46.332.186 38.233.008c-8.823-.165-17.491 2.305-24.874 7.087C6.581 11.549 2.118 17.395.66 22.191.033 24.057-.15 26.04.123 27.987c.243 1.367.627 2.037.755 2.012.396 0-.396-3.025 1.522-7.264s6.394-9.339 12.789-13.123c6.905-4.018 14.838-5.974 22.841-5.631 3.811.182 7.574.924 11.164 2.202 7.323 2.623 13.717 7.296 18.403 13.452 1.061 1.417 1.816 2.531 2.404 3.417l-1.637-.278-5.295-1.012c-3.031-.569-4.988-.848-5.179-.392s1.419 1.544 4.335 2.759a47.66 47.66 0 0 0 5.269 1.772c1.023.278 2.097.544 3.21.772.588.127 1.1.228 1.765.342.541.152 1.109.184 1.663.094a3.86 3.86 0 0 0 1.547-.613 2.76 2.76 0 0 0 .934-1.265c.088-.252.156-.51.205-.772l.09-.595.23-1.544.384-2.949c.217-1.873.371-3.569.435-5.062' fill='#fd5631'></path>
                      </svg>
                    </Card>
                  </Col>
                  <Col className='mb-2 mb-sm-0 me-sm-4'>
                    <Card border='0' className='shadow position-relative h-100'>
                      <Card.Body>
                        <div className='h2 mb-2 text-primary'>03</div>
                        <Card.Title as='h5' className='mb-2'>Automate Savings</Card.Title>
                        <Card.Text className='fs-sm'>
                          Save with automatic bank transfers & watch your savings grow easily.
                        </Card.Text>
                      </Card.Body>
                      {/* Arrow shape */}
                      <svg className='position-absolute top-0 end-0 mt-n2 d-sm-block d-none' xmlns='http://www.w3.org/2000/svg' width='78' height='30' fill='none' style={{transform: 'translateY(-100%) translateX(70%)'}}>
                        <path d='M77.955 14.396c.128-2.86 0-4.67-.576-4.745s-1.279 1.607-2.11 4.378l-1.279 4.897-.563 2.683c-.612-1.434-1.352-2.81-2.212-4.113-2.718-4.072-6.226-7.569-10.321-10.288C54.205 2.687 46.332.186 38.233.008c-8.823-.165-17.491 2.305-24.874 7.087C6.581 11.549 2.118 17.395.66 22.191.033 24.057-.15 26.04.123 27.987c.243 1.367.627 2.037.755 2.012.396 0-.396-3.025 1.522-7.264s6.394-9.339 12.789-13.123c6.905-4.018 14.838-5.974 22.841-5.631 3.811.182 7.574.924 11.164 2.202 7.323 2.623 13.717 7.296 18.403 13.452 1.061 1.417 1.816 2.531 2.404 3.417l-1.637-.278-5.295-1.012c-3.031-.569-4.988-.848-5.179-.392s1.419 1.544 4.335 2.759a47.66 47.66 0 0 0 5.269 1.772c1.023.278 2.097.544 3.21.772.588.127 1.1.228 1.765.342.541.152 1.109.184 1.663.094a3.86 3.86 0 0 0 1.547-.613 2.76 2.76 0 0 0 .934-1.265c.088-.252.156-.51.205-.772l.09-.595.23-1.544.384-2.949c.217-1.873.371-3.569.435-5.062' fill='#fd5631'></path>
                      </svg>
                    </Card>
                  </Col>
                  <Col>
                    <Card border='0' className='shadow position-relative h-100'>
                      <Card.Body>
                        <div className='h2 mb-2 text-primary'>04</div>
                        <Card.Title as='h5' className='mb-2'>Reach Goal</Card.Title>
                        <Card.Text className='fs-sm'>
                          Use your savings for rent or your home!
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Property cost calculator */}
      <Container as="section" className="mb-5 pb-2 pb-lg-4">
        <Row className="align-items-center">
          <Col md={5}>
            <div className="d-flex justify-content-center justify-content-md-start mb-md-0 mb-4">
              <ImageLoader
                src="/images/real-estate/illustrations/calculator.svg"
                width={416}
                height={400}
                alt="Illustration"
              />
            </div>
          </Col>
          <Col md={7} xxl={6} className="text-md-start text-center">
            <h2>Calculate Property Profit Potential</h2>
            <p className="pb-3 fs-lg">
              Calculate your potential property gain with our calculation service.
              We provide fast and reliable projections for Nigerian real estate,
              helping you make informed decisions and invest with foresight.
              See your future returns.
            </p>
            <Button size="lg" onClick={handleModalShow}>
              <i className="fi-calculator me-2"></i>
              Calculate
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Partners (carousen on screens < 1200px) */}
      <Container as="section" className="mb-5 pb-2 pb-lg-4">
        <h2 className="h3 mb-4 text-center text-md-start">Our partners</h2>
        <Swiper
          modules={[Pagination]}
          pagination={{
            el: "#paginationPartners",
            clickable: true
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            500: { slidesPerView: 4 },
            992: { slidesPerView: 5, spaceBetween: 16 },
            1200: { slidesPerView: 6, spaceBetween: 24 }
          }}
        >
          {partners.map((partner, indx) => (
            <SwiperSlide key={indx}>
              <ImageSwap
                href={partner.href}
                swapFrom={{
                  imgSrc: partner.img[0],
                  imgSize: [196, 80],
                  imgAlt: "Image from"
                }}
                swapTo={{
                  imgSrc: partner.img[1],
                  imgSize: [196, 80],
                  imgAlt: "Image to"
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* External pagination (bullets) buttons */}
        <div
          id="paginationPartners"
          className="swiper-pagination position-relative bottom-0 d-xl-none py-2 mt-2"
        ></div>
      </Container>

      {/* Agents Banner + Agents */}
      <Container as='section' className='mb-5 pb-2 pb-lg-4'>
        <Row>

          {/* Banner */}
          <Col lg={4} className='text-center text-lg-start mb-lg-0 mb-5'>
            <a href='#' className='d-block text-decoration-none bg-faded-accent rounded-3 h-100'>
              <div className='p-4'>
                <h2 className='mb-0 p-2 text-primary text-nowrap'>
                  <i className='fi-users mt-n1 me-2 pe-1 fs-3 align-middle'></i>
                  Property
                  <span className='text-dark'>&nbsp;Agents</span>
                </h2>

                <p className='mb-0 p-2 fs-lg text-body'>
                  Find the best real estate agents for buying, selling, or renting.
                </p>
              </div>
              <ImageLoader
                  src='/images/real-estate/illustrations/rent.svg'
                  width={416}
                  height={240}
                  alt='Illustraion'
              />
            </a>
          </Col>

          {/* Where to eat */}
          <Col lg={8} className='mb-n4 mb-sm-0'>
            <div className='d-flex align-items-center justify-content-between mb-4 pb-2'>
              <h2 className='h3 mb-0'>Top Agents</h2>
              <Button as={Link} href='/city-guide/catalog' variant='link fw-normal p-0'>
                View all
                <i className='fi-arrow-long-right ms-2'></i>
              </Button>
            </div>
            <Row>
              <Col sm={6}>
                {restaurants1.map((restaurant, indx) => (
                    <div key={indx} className='d-flex align-items-start position-relative mb-4'>
                      <ImageLoader
                          src={restaurant.imgSrc}
                          width={restaurant.imgSize[0]}
                          height={restaurant.imgSize[1]}
                          alt={restaurant.imgAlt}
                          className='flex-shrink-0 rounded-3'
                      />
                      <div className="ps-3">
                        <h3 className='mb-2 fs-lg my-responsive-font'>
                          <Link href='/city-guide/single' className='nav-link stretched-link'>{restaurant.title}
                            <span className='fs-sm' style={{ display: 'inline-block', marginLeft: '0.5em', paddingLeft: '0.5em', borderLeft: '1px solid #ccc' }}>
                              <i className='fi-star-filled mt-n1 me-1 fs-base text-warning align-middle my-responsive-font'></i>
                              <b>{restaurant.rating[0]}</b>
                              <span className='text-muted'>&nbsp;({restaurant.rating[1]})</span>
                            </span>
                          </Link>
                        </h3>
                        <ul className='list-unstyled mb-0 fs-xs'>
                          <li>
                            <i className='fi-real-estate-house mt-n1 me-1 fs-base text-muted align-middle'></i>
                            {restaurant.price}
                          </li>
                          <li>
                            <i className={'fi-'+ restaurant.social_media[0] + ' mt-n1 me-1 fs-base text-muted align-middle'}></i>
                            @{restaurant.social_media[1]}
                          </li>
                          <li>
                            <i className='fi-phone mt-n1 me-1 fs-base text-muted align-middle'></i>
                            {restaurant.location}
                          </li>
                        </ul>
                      </div>
                    </div>
                ))}
              </Col>
              <Col sm={6}>
                {restaurants2.map((restaurant, indx) => (
                    <div key={indx} className='d-flex align-items-start position-relative mb-4'>
                      <ImageLoader
                          src={restaurant.imgSrc}
                          width={restaurant.imgSize[0]}
                          height={restaurant.imgSize[1]}
                          alt={restaurant.imgAlt}
                          className='flex-shrink-0 rounded-3'
                      />
                      <div className="ps-3">
                        <h3 className='mb-2 fs-lg my-responsive-font'>
                          <Link href='/city-guide/single' className='nav-link stretched-link'>{restaurant.title}
                            <span className='fs-sm' style={{ display: 'inline-block', marginLeft: '0.5em', paddingLeft: '0.5em', borderLeft: '1px solid #ccc' }}>
                              <i className='fi-star-filled mt-n1 me-1 fs-base text-warning align-middle my-responsive-font'></i>
                              <b>{restaurant.rating[0]}</b>
                              <span className='text-muted'>&nbsp;({restaurant.rating[1]})</span>
                            </span>
                          </Link>
                        </h3>
                        <ul className='list-unstyled mb-0 fs-xs'>
                          <li>
                            <i className='fi-real-estate-house mt-n1 me-1 fs-base text-muted align-middle'></i>
                            {restaurant.price}
                          </li>
                          <li>
                            <i className={'fi-'+ restaurant.social_media[0] + ' mt-n1 me-1 fs-base text-muted align-middle'}></i>
                            @{restaurant.social_media[1]}
                          </li>
                          <li>
                            <i className='fi-phone mt-n1 me-1 fs-base text-muted align-middle'></i>
                            {restaurant.location}
                          </li>
                        </ul>
                      </div>
                    </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </RealEstatePageLayout>
  );
};

export default HomePage;
