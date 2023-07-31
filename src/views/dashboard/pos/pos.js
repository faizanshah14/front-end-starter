import React, { Fragment, useEffect, useState, useMemo } from "react";
import FsLightbox from "fslightbox-react";

import {
  Row,
  Col,
  Modal,
  Form,
  Nav,
  Dropdown,
  Tab,
  FloatingLabel,
  Button,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import Card from "../../../components/Card";
import { ScrollSpy } from "bootstrap";
import { Link } from "react-router-dom";
// img
import icon1 from "../../../assets/images/icons/01.png";
import icon2 from "../../../assets/images/icons/02.png";
import icon3 from "../../../assets/images/icons/03.png";
import icon4 from "../../../assets/images/icons/04.png";
import icon8 from "../../../assets/images/icons/08.png";
import icon6 from "../../../assets/images/icons/06.png";
import icon7 from "../../../assets/images/icons/07.png";

import icon5 from "../../../assets/images/icons/05.png";
import shap2 from "../../../assets/images/shapes/02.png";
import shap4 from "../../../assets/images/shapes/04.png";
import shap6 from "../../../assets/images/shapes/06.png";
import pages2 from "../../../assets/images/pages/02-page.png";

import ShareOffcanvas from "../../../components/partials/components/shareoffcanvas";

const Pos = () => {
  const [toggler, setToggler] = useState();
  const [selectedCardType, setSelectedCardType] = useState("root");
  // modal conffigs
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  useEffect(() => {
    new ScrollSpy(document.body, {
      target: "#scrollableArea",
    });
  });

  const handleCardClick = (item) => {
    console.log(item);
  };
  const renderCards = () => {
    let cardsArray = []
      if(selectedCardType=='root'){
        cardsArray =   ["Mobile", "Tab", "Laptop"]
      }
      else if(selectedCardType=='Mobile'){
        cardsArray =  ['Iphone X', 'Samsung galaxy', 'Note 2']
      } 

    return (
      <Fragment>
        {cardsArray.map((item, index) => (
          <a onClick={()=>{setSelectedCardType(item)}}>
        <Card className="mx-4" key={index}>
          <Card.Body className="icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-phone"
              viewBox="0 0 16 16"
            >
              <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
              <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </Card.Body>
          <Card.Footer>{item}</Card.Footer>
        </Card>
        </a>
        ))}
      </Fragment>
    );
  };
  const renderedCards = useMemo(() => {
    console.log(selectedCardType);
    return renderCards();
  }, [selectedCardType]);
  return (
    <Fragment>
      <FsLightbox
        toggler={toggler}
        sources={[
          icon4,
          shap2,
          icon8,
          shap4,
          icon2,
          shap6,
          icon5,
          shap4,
          icon1,
        ]}
      />
      <Tab.Container defaultActiveKey="first">
        <Row className="d-flex flex-row">
          <Col lg="12">
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                      <div className="input-group search-input">
                        <span className="input-group-text" id="search-input">
                          <svg
                            width="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7669"
                              cy="11.7666"
                              r="8.98856"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></circle>
                            <path
                              d="M18.0186 18.4851L21.5426 22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search..."
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Nav
                      className="d-flex nav-pills mb-0 text-center profile-tab"
                      data-toggle="slider-tab"
                      id="profile-pills-tab"
                    >
                      <Nav.Item className="text-dark">
                        <Nav.Link className="text-dark" eventKey="viewInvoice">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-card-heading"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                          </svg>{" "}
                          <span>View Invoices</span>{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          className="text-dark"
                          onClick={handleModalOpen}
                        >
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-card-heading"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />{" "}
                          </svg>{" "}
                          <span> Pending Invoices</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Nav
                    as="ul"
                    className="d-flex nav-pills mb-0 text-center profile-tab"
                    data-toggle="slider-tab"
                    id="profile-pills-tab"
                    role="tablist"
                  >
                    <Nav.Item as="li">
                      <Nav.Link eventKey="first">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="third">Cash</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="fourth">Wallet</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="repair">Repair</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="7">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="d-flex flex-wrap">
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                  <Card className="mx-4">
                    <Card.Body className="icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-phone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </Card.Body>
                    <Card.Footer>Iphone 12 pro max</Card.Footer>
                  </Card>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="viewInvoice">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      {new Date().toLocaleString()}
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      {new Date().toLocaleString()}
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                        <ListGroup.Item>Invoice #123</ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey={"repair"}>
              <Nav
                      className="d-flex nav-pills mb-0 text-center profile-tab"
                      data-toggle="slider-tab"
                      id="profile-pills-tab"
                    >
                      <Nav.Item className="text-dark">
                        <Nav.Link className="text-dark" onClick={()=>setSelectedCardType('root')}>
                          <span>Category </span>{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          className="text-dark"
                          onClick={()=>setSelectedCardType('Mobile')}
                        >
                          <span>Manufacturer</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                <div className="d-flex flex-wrap">{renderedCards}</div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col md="5">
            <Card>
              <Card.Header>
                <Row className="d-flex justify-content-between w-100">
                  <Col md="6">
                    <h4 className="card-title">Invoice #001</h4>
                  </Col>
                  <Col md="6">
                    <Form.Control type="date" value={new Date()} disabled />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Select
                    className=""
                    aria-label=".form-select-lg"
                    id="supplierSelect"
                  >
                    <option href="#" defaultValue>
                      Walk in Customer
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </Row>
                <div
                  style={{
                    overflowY: "auto",
                    height: "40vh",
                  }}
                  className="px-4 overflow-cards "
                >
                  <Card className="border border-secondary mt-4">
                    <Row>
                      <Col
                        md="1"
                        className="d-flex align-content-center align-items-center "
                      >
                        {" "}
                        <h3 className=" mx-2"> #1</h3>{" "}
                      </Col>
                      <Col md="10">
                        <Card.Body>
                          <Row>
                            <Col md="6">Iphone 12 Pro Max</Col>
                            <Col md="2">Tax</Col>
                            <Col md="2">Disc</Col>
                            <Col md="2">Qty</Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md="6">12000$</Col>
                            <Col md="2">0.0$</Col>
                            <Col md="2">0.0$</Col>
                            <Col md="2">1</Col>
                          </Row>
                        </Card.Body>
                      </Col>
                      <Col
                        md="1"
                        className="d-flex align-content-center align-items-center"
                      >
                        {" "}
                        <h3 className=" mx-n4 text-danger">X</h3>{" "}
                      </Col>
                    </Row>
                  </Card>
                  <Card className="border border-secondary mt-4">
                    <Row>
                      <Col
                        md="1"
                        className="d-flex align-content-center align-items-center "
                      >
                        {" "}
                        <h3 className=" mx-2"> #1</h3>{" "}
                      </Col>
                      <Col md="10">
                        <Card.Body>
                          <Row>
                            <Col md="6">Iphone 12 Pro Max</Col>
                            <Col md="2">Tax</Col>
                            <Col md="2">Disc</Col>
                            <Col md="2">Qty</Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md="6">12000$</Col>
                            <Col md="2">0.0$</Col>
                            <Col md="2">0.0$</Col>
                            <Col md="2">1</Col>
                          </Row>
                        </Card.Body>
                      </Col>
                      <Col
                        md="1"
                        className="d-flex align-content-center align-items-center"
                      >
                        {" "}
                        <h3 className=" mx-n4 text-danger">X</h3>{" "}
                      </Col>
                    </Row>
                  </Card>
                  <Card className="border border-secondary mt-4">
                    <Row>
                      <Col
                        md="1"
                        className="d-flex align-content-center align-items-center "
                      >
                        {" "}
                        <h3 className=" mx-2"> #1</h3>{" "}
                      </Col>
                      <Col md="10">
                        <Card.Body>
                          <Row>
                            <Col md="6">Iphone 12 Pro Max</Col>
                            <Col md="2">Tax</Col>
                            <Col md="2">Disc</Col>
                            <Col md="2">Qty</Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md="6">12000$</Col>
                            <Col md="2">0.0$</Col>
                            <Col md="2">0.0$</Col>
                            <Col md="2">1</Col>
                          </Row>
                        </Card.Body>
                      </Col>
                      <Col
                        md="1"
                        className="d-flex align-content-center align-items-center"
                      >
                        {" "}
                        <h3 className=" mx-n4 text-danger">X</h3>{" "}
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Card.Body>
              <Card.Footer>
                <Card>
                  <Card.Body className="border rounded">
                    <Row className="d-flex justify-content-around">
                      <Col md="6">Sub Total</Col>
                      <Col md="6" className="d-flex justify-content-center">
                        1450$
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-around">
                      <Col md="6">Discount</Col>
                      <Col md="6" className="d-flex justify-content-center">
                        1450$
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-around">
                      <Col md="6">Tax</Col>
                      <Col md="6" className="d-flex justify-content-center">
                        1450$
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-around">
                      <Col md="6">Net Total</Col>
                      <Col md="6" className="d-flex justify-content-center">
                        1450$
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body className="border rounded">
                    <Row>
                      <Col md="4" className="d-flex justify-content-center">
                        <Button variant="primary" className="btn w-100">
                          Cash
                        </Button>
                      </Col>
                      <Col md="4" className="d-flex justify-content-center">
                        <Button variant="primary" className="btn w-100">
                          Custom
                        </Button>
                      </Col>
                      <Col md="4" className="d-flex justify-content-center">
                        <Button variant="primary" className="btn w-100">
                          Card
                        </Button>
                      </Col>
                    </Row>
                    <Row className="pt-4">
                      <Col md="4" className="d-flex justify-content-center">
                        <Button variant="primary" className="btn w-100">
                          Multi-Pay
                        </Button>
                      </Col>
                      <Col md="4" className="d-flex justify-content-center">
                        <Button variant="primary" className="btn w-100">
                          Pay Later
                        </Button>
                      </Col>
                      <Col md="4" className="d-flex justify-content-center">
                        <Button variant="primary" className="btn w-100">
                          Pending
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
      <Modal
        className="modal fade modal-xl"
        show={showModal}
        centered
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pending Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3 mx-2">
            <Form.Control type="text" placeholder="Search invoice No" />
            <ListGroup className="mt-2">
              <ListGroup.Item action>Invoice 1</ListGroup.Item>
              <ListGroup.Item action>Invoice 1</ListGroup.Item>
              <ListGroup.Item action>Invoice 1</ListGroup.Item>
              <ListGroup.Item action>Invoice 1</ListGroup.Item>
            </ListGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Pos;
