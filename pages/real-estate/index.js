/** @format */

import {useState} from "react";
import RealEstatePageLayout from "../../components/partials/RealEstatePageLayout";
import Link from "next/link";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ImageLoader from "../../components/ImageLoader";
import FormGroup from "../../components/FormGroup";
import DropdownSelect from "../../components/DropdownSelect";
import PropertyCard from "../../components/PropertyCard";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import InputGroup from "react-bootstrap/InputGroup";
import VenueCardOverlay from "../../components/VenueCardOverlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const BgParallax = dynamic(() => import("../../components/BgParallax"), {
  ssr: false
});

const HomePage = () => {

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

  // Recently added properties array
  const recentProperties = [
    {
      href: "/real-estate/single-v2",
      img: "/images/real-estate/recent/04.jpg",
      category: "For sale",
      title: "Duplex with Garage",
      location: "28 Jackson Ave Long Island City, NY 67234",
      amenities: [4, 2, 2, 126],
      description:
          "Blandit lorem dictum in velit. Et nisi at faucibus mauris pretium enim. Risus sapien nisi aliquam egestas leo dignissim ut quis ac. Amet, cras orci justo, tortor nisl aliquet.",
      button: "Sale for $160,000",
      badges: [
        ["info", "New"],
        ["success", "Verified"]
      ]
    },
    {
      href: "/real-estate/single-v2",
      img: "/images/real-estate/recent/05.jpg",
      category: "For rent",
      title: "Luxury Rental Villa",
      location: "1510 Castle Hill Ave Bronx, NY 10462",
      amenities: [5, 3, 1, 140],
      description:
          "Sagittis faucibus feugiat integer quam vel ornare. Tellus, vel consequat, sagittis ut penatibus urna, ante. Mattis fermentum lectus sed nisl ac viverra lacus. A at iaculis etiam nunc, diam urna in.",
      button: "Rent from $2,850",
      badges: [
        ["info", "New"],
        ["success", "Verified"]
      ]
    }
  ];

  // Property cost calculator modal
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  // Number of rooms radios buttons (Cost calculator modal)
  const [roomsValue, setRoomsValue] = useState("3");
  const rooms = [
    { name: "1", value: "1" },
    { name: "3", value: "3" },
    { name: "5", value: "5" },
    { name: "8", value: "8" },
    { name: "10+", value: "10+" }
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

  // properties.title keyword array
  const propertyTitleKeywords = ['house', 'apartment', 'flat', 'duplex', 'terrace', 'bedroom'];

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
                    [null, "Shortlet"]
                  ]}
                  variant="link ps-2 ps-sm-3"
                  className="w-sm-50 border-end-sm"
                />

                <hr className="d-sm-none my-2" />
                <DropdownSelect
                  defaultValue="Property type"
                  icon="fi-list"
                  options={[
                    [null, "All Types"],
                    [null, "Commercial Property"],
                    [null, "Flat/Apartment"],
                    [null, "Event Centre"],
                    [null, "House"],
                    [null, "Land"],
                  ]}
                  variant="link ps-2 ps-sm-3"
                  className="w-sm-50 border-end-md"
                />

                <hr className="d-sm-none my-2" />
                <DropdownSelect
                  defaultValue="Location"
                  icon="fi-map-pin"
                  options={[
                    [null, "Lagos"],
                    [null, "Abuja"],
                    [null, "Enugu"],
                    [null, "Kwara"]
                  ]}
                  variant="link ps-2 ps-sm-3"
                  className="w-sm-50 border-end-sm"
                />

                <hr className="d-sm-none my-2" />
                <DropdownSelect
                    defaultValue='Price range'
                    icon='fi-cash'
                    options={[
                      ['', '₦10,000 - ₦100,000'],
                      ['', '₦100,000 - ₦200,000'],
                      ['', '₦200,000 - ₦300,000'],
                      ['', '₦300,000 - ₦500,000'],
                      ['', '₦500,000 - ₦1M'],
                      ['', '₦1M and above']
                    ]}
                    variant="link ps-2 ps-sm-3"
                    className="w-sm-50 border-end-sm"
                />
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

      {/* Recently listed properties (carousel) */}
      <Container as="section" className="mt-n3 mt-md-0 mb-5 pb-2 pb-lg-4">
        <div className="d-flex align-items-end justify-content-between pb-2">
          <h2 className="h3 mb-0">Newly listed properties</h2>
          <Button
              as={Link}
              href="/real-estate/catalog?category=sale"
              variant="link fw-normal ms-2 p-0"
          >
            View all
            <i className="fi-arrow-long-right ms-2"></i>
          </Button>
        </div>

        {/* Swiper slider */}
        <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: "#prevProprty",
              nextEl: "#nextProprty"
            }}
            loop
            autoHeight
            slidesPerView={1}
        >
          {recentProperties.map((property, indx) => (
              <SwiperSlide key={indx} className="p-2 bg-light py-4">
                <Row>
                  <Col md={7} lg={8} className="mb-md-0 mb-3">
                    <div className="d-flex position-relative pe-lg-5">
                      <div className="position-absolute top-0 start-0 zindex-1 m-3 p-1">
                        {property.badges.map((badge, indx) => (
                            <span
                                key={indx}
                                className={`badge bg-${badge[0]} fs-sm me-2`}
                            >
                          {badge[1]}
                        </span>
                        ))}
                      </div>
                      <ImageLoader
                          src={property.img}
                          width={808}
                          height={480}
                          alt="Image"
                          className="rounded-3"
                      />
                    </div>
                  </Col>
                  <Col md={5} lg={4}>
                  <span className="d-inline-block fs-sm text-uppercase text-primary mb-2 ">
                    {property.category}
                  </span>
                    <div className="">
                      <h3 className="h4 mb-2">{property.title}</h3>
                      <p className="mb-md-4 mb-3 fs-sm">{property.location}</p>
                      <ul className="d-flex mb-md-4 mb-3 list-unstyled">
                        <li className="me-3 pe-3 border-end">
                          <b className="me-1">{property.amenities[0]}</b>
                          <i className="fi-bed mt-n1 lead align-middle text-muted"></i>
                        </li>
                        <li className="me-3 pe-3 border-end">
                          <b className="me-1">{property.amenities[1]}</b>
                          <i className="fi-bath mt-n1 lead align-middle text-muted"></i>
                        </li>
                        <li className="me-3 pe-3 border-end">
                          <b className="me-1">{property.amenities[2]}</b>
                          <i className="fi-car mt-n1 lead align-middle text-muted"></i>
                        </li>
                        <li>
                          <b>{property.amenities[3]} </b>sq.m
                        </li>
                      </ul>
                      <p className="mb-4 pb-md-2">{property.description}</p>
                    </div>
                    <ButtonGroup size="lg" className="">
                      <Button as={Link} href={property.href}>
                        {property.button}
                      </Button>
                      <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Add to Wishlist</Tooltip>}
                      >
                        <Button variant="primary px-3 border-start border-light">
                          <i className="fi-heart fs-5"></i>
                        </Button>
                      </OverlayTrigger>
                    </ButtonGroup>
                  </Col>
                </Row>
              </SwiperSlide>
          ))}
        </Swiper>

        {/* External Prev/Next buttons */}
        <div className="d-flex pb-1 pb-md-2">
          <Button id="prevProprty" variant="prev position-relative mx-2" />
          <Button id="nextProprty" variant="next position-relative mx-2" />
        </div>
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

      {/* Agents Banner + Agents */}
      <Container as='section' className='pt-4 pb-5 py-sm-5 '>
          {/* Item */}
          <div className='card card-body p-sm-5 card-light bg-faded-accent h-100'>
            <Row className='align-items-center py-3 py-sm-0'>
              <Col md={6} className='mb-4 pb-3 mb-md-0 pb-md-0 text-center text-md-start'>
                <h2 className='mb-0 p-2 text-primary text-nowrap'>
                  <i className='fi-users mt-n1 me-2 pe-1 fs-3 align-middle'></i>
                  Top Property
                  <span className='text-dark'>&nbsp;Agents</span>
                </h2>
                <p className='mb-2 p-2  pb-md-4 fs-lg text-body'>
                  Find the best real estate agents for buying, selling, or renting.
                </p>
                <Button as={Link} href='/car-finder/sell-car'>
                  Find Agents
                  <i className='fi-chevron-right fs-sm ms-2'></i>
                </Button>
              </Col>
              <Col md={6}>
                <Row className='gy-4 gx-3 gx-sm-4'>
                  <Col>
                    <div className='d-table bg-dark rounded-3 p-4 mx-auto mb-3'>
                      <div className="d-flex p-sm-2">
                        <ImageLoader
                            src='/images/car-finder/icons/buyers.svg'
                            width={56}
                            height={56}
                            alt='Icon'
                            light='true'
                        />
                      </div>
                    </div>
                    <div className='fw-bold text-primary text-center'>Vetted Agents</div>
                  </Col>
                  <Col>
                    <div className='d-table bg-dark rounded-3 p-4 mx-auto mb-3'>
                      <div className="d-flex p-sm-2">
                        <ImageLoader
                            src='/images/car-finder/icons/tools.svg'
                            width={56}
                            height={56}
                            alt='Icon'
                            light='true'
                        />
                      </div>
                    </div>
                    <div className='fw-bold text-primary text-center'>Proven Track Record </div>
                  </Col>
                  <Col>
                    <div className='d-table bg-dark rounded-3 p-4 mx-auto mb-3'>
                      <div className="d-flex p-sm-2">
                        <ImageLoader
                            src='/images/car-finder/icons/handshake.svg'
                            width={56}
                            height={56}
                            alt='Icon'
                            light='true'
                        />
                      </div>
                    </div>
                    <div className='fw-bold text-primary text-center'>Ensures Best Offer</div>
                  </Col>

                </Row>
              </Col>
            </Row>
          </div>
      </Container>
    </RealEstatePageLayout>
  );
};

export default HomePage;
