import React from "react";
import {
    Row,
    Col,
    Image,
    Form,
    Button,
    ListGroup,
    Alert,
} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Card from "../../../components/Card";

// img
import imgsuccess from "../../../assets/images/pages/img-success.png";
import auth5 from "../../../assets/images/auth/05.png";
import title from '../../../assets/images/title.PNG'
import { Register, createBusiness , createBusinessLocation } from "../../../services/auth";
const SignUp = () => {
    let history = useNavigate();
    const [show, AccountShow] = React.useState("personal");
    const [validated, setValidated] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [showAlert2, setShowAlert2] = React.useState('');
    const handleValidations = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const name = document.getElementById("validationCustom01").value;
        const businessName = document.getElementById("validationCustom02").value;
        const email = document.getElementById("validationCustomUsername01").value;
        const phoneNumber = document.getElementById("validationCustom05").value;
        const website = document.getElementById("validationCustom03").value;
        const noOfLocations = document.getElementById("validationCustom05").value;
        const whatDoYouRepair = document.getElementById("validationCustom06").value;
        const anythingAlsoYoudLikeUsToKnow = document.getElementById("validationCustom07").value;
        const agreeToTermsAndConditions = document.getElementById("invalidCheck").checked;
        console.log(name, businessName, email, phoneNumber, website, noOfLocations, whatDoYouRepair, anythingAlsoYoudLikeUsToKnow, agreeToTermsAndConditions);
        if (!agreeToTermsAndConditions) {
            setShowAlert(true);
            return event.preventDefault();
        }
        try {
            const businessResponse = await createBusiness(businessName);
            console.log(businessResponse);
            if (businessResponse?.result !== "ok") {
                setShowAlert(true);
                setShowAlert2(businessResponse?.message);
                return event.preventDefault();
            }
            const signUpResponse = await Register(email, email, 12345678 ,  name , businessResponse?.data?.id);
            if (signUpResponse?.result === "ok") {
                const createBusinessResponse = await createBusinessLocation(businessResponse?.data?.id, businessName, phoneNumber, email, website);
                if (createBusinessResponse?.result === "ok") {
                    setValidated(true);
                    history("/dashboard");
                } else {
                    setShowAlert(true);
                    return event.preventDefault();
                }
            }
        } catch (error) {
            console.log(error);
            setShowAlert(true);
            setShowAlert2(error?.message);
            return event.preventDefault();
        }
    };
    return (
        <>
            <Alert
                show={showAlert}
                variant="danger"
                className="alert-dismissible fade show alert alert-success alert-rounded justify-content-center"
            >
                {showAlert2}
            </Alert>
                <section className="login-content">
                <Row className="m-0 align-items-center bg-white vh-100">
                    <Col md="6">
                        <Row className="justify-content-center">
                            <Col md="12">
                                <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                                    <Card.Body>
                                        <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3">
                                        <img  width="30" className="text-primary" viewBox="0 0 30 30" src={title} alt="" />
                                            <h4 className="logo-title ms-3">Cell Home</h4>
                                        </Link>
                                        <h2 className="mb-2 text-left mb-3 mt-4">Sign Up</h2>
                                        <Card className="pl-4 pr-4 ">
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h5 className="card-title">Personal details</h5>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form noValidate
                                                    validated={validated}>
                                                    <Row className="mb-3">
                                                        <Col md="6">
                                                            <Form.Label htmlFor="validationCustom01">Name</Form.Label>
                                                            <Form.Control type="text" defaultValue="" id="validationCustom01" required/>
                                                            <Form.Control.Feedback>
                                                                Looks good!
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <Col md="6">
                                                            <Form.Label htmlFor="validationCustom02">Business Name</Form.Label>
                                                            <Form.Control type="text" defaultValue="" id="validationCustom02" required/>
                                                            <Form.Control.Feedback>
                                                                Looks good!
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <Col md="6">
                                                            <Form.Label htmlFor="validationCustomUsername01">Work Email</Form.Label>
                                                            <div className="input-group has-validation">
                                                                <Form.Control type="email" defaultValue="" id="validationCustomUsername01" aria-describedby="inputGroupPrepend" required/>
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please enter a valid emial.
                                                                </Form.Control.Feedback>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" className="mb-3">
                                                            <Form.Label htmlFor="validationCustom05">Phone Number</Form.Label>
                                                            <Form.Control defaultValue="" type="number" id="validationCustom05" required/>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Phone Number.
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Label htmlFor="validationCustom03">Website</Form.Label>
                                                            <Form.Control type="text" defaultValue="" id="validationCustom03" required/>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Website.
                                                            </Form.Control.Feedback>
                                                        </Col>

                                                        <Col md="12" className="mb-3"></Col>
                                                        <Col md="6" className="mb-3">
                                                            <Form.Label htmlFor="validationCustom05">No. Of Locations</Form.Label>
                                                            <Form.Select defaultValue="" type="text" id="validationCustom05" required>
                                                            <option defaultValue="0">Choose...</option>
                                                            <option>1</option>
                                                            <option>5</option>
                                                            <option>10</option>
                                                                <option>...</option>
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Phone Number.
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <Col md="6" className="mb-3">
                                                            <Form.Label htmlFor="validationCustom05">What Items Do you repair</Form.Label>
                                                            <Form.Select defaultValue="" type="text" id="validationCustom06" required placeholder="ABC">
                                                                <option defaultValue="0">Choose...</option>
                                                                <option>Mobile</option>
                                                                <option>Computer</option>
                                                                <option>or</option>
                                                                <option>...</option>
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Phone Number.
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <Col md="12" className="mb-3">
                                                            <Form.Label htmlFor="validationCustom05">Anything also you'd like us to know?</Form.Label>
                                                            <Form.Control defaultValue="" as="textarea" id="validationCustom07" rows="3" required/>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Phone Number.
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <div className="col-12">
                                                            <Form.Check className="mb-3">
                                                                <Form.Check.Input className="me-2" type="checkbox" defaultValue id="invalidCheck" required/>
                                                                <Form.Check.Label htmlFor="invalidCheck">
                                                                    Agree to terms and conditions
                                                                </Form.Check.Label>
                                                                <Form.Control.Feedback type="invalid">
                                                                    You must agree before submitting.
                                                                </Form.Control.Feedback>
                                                            </Form.Check>
                                                        </div>
                                                        <div className="col-12 d-flex flex-row-reverse">
                                                            <Button variant="btn btn-primary" type="button"
                                                                onClick={handleValidations}>Submit</Button>
                                                        </div>
                                                    </Row>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <div className="col-md-6 mt-2 d-md-block d-none bg-primary mt-n5 p-0 vh-100 overflow-hidden">
                        <Image src={auth5}
                            className="Image-fluid gradient-main animated-scaleX"
                            alt="images"/>
                    </div>
                </Row>
            </section>
        </>
    );
};

export default SignUp;
