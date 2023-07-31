import React, { useEffect } from 'react'
import { Row, Col, Image, Form, Button, Alert, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'
import Footer from '../../../components/partials/dashboard/FooterStyle/footer'
// img
import auth1 from '../../../assets/images/auth/01.png'
import title from '../../../assets/images/title.PNG'

import {login} from '../../../services/auth'
const SignIn = () => {
   let history = useNavigate()
   const [showAlert, setShowAlert] = React.useState(false);
   const [validated, setValidated] = React.useState(false);
   
   const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }
      try{
         const email = document.getElementById('email').value
         const password = document.getElementById('password').value
         const rememberMe = document.getElementById('customCheck1').checked
         const status = await login(email, password , rememberMe)
         if( status ==='ok'){
            localStorage.setItem('isAuthenticated', JSON.stringify(true)) 
            setValidated(true);
            history('/dashboard')

         }else{
            setShowAlert(true)
            return event.preventDefault();
         }
      }catch(error){
         console.log(error)
      }

   };  
   return (
      <>
         <Alert show={showAlert} variant="danger" className="alert-dismissible fade show alert alert-success alert-rounded justify-content-center">
            Login Failed ! Please Check Your Email and Password
            </Alert> 
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Row >
                        <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3">
                                 <img  width="30" className="text-primary" viewBox="0 0 30 30" src={title} alt="" />
                                 <h4 className="logo-title ms-3">Cell Home</h4>
                              </Link>
                        </Row>
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                           <Card.Body>
                              <h2 className="mb-2 text-left">Welcome Back</h2>
                              <p className="text-left">Please enter your details</p>
                              <Form validated={validated}  onSubmit={handleSubmit} className="needs-validation" >
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Username</Form.Label>
                                          <Form.Control type="text" className="" id="email" aria-describedby="email" placeholder="Enter Your Username .." required/>
                                          <Form.Control.Feedback  className="invalid">Enter Valid Username</Form.Control.Feedback>
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder="Enter Your Password " required />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3">
                                          <Form.Check.Input type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button type="button" variant="btn btn-primary" onClick={handleSubmit}>Sign In</Button>
                                 </div>
                                 <p className="mt-3 text-center">
                                    Don’t have an account? <Link to="/auth/sign-up" className="text-underline">Click here to sign up.</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  {/* <div className="sign-bg">
                  <img width="280" height="230" viewBox="0 0 431 398"  className="text-primary opacity-15" src={title} alt="" />
                  </div> */}
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            </Row>
            <Footer/>
         </section>
      </>
   )
}

export default SignIn
