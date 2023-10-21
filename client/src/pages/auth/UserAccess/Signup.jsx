import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import SendGoogleToken_API from '../../../apis/auth/Signup_API';
import { useAuth } from '../../../contexts/authContext/AuthContext';

import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer} from 'react-toastify';
import "../../../styles/Signup.css"

const Signup = () => {
    const leftColStyle = {padding: 0,margin: 0,border: 'none',};
    const { isLoggedIn, login } = useAuth();
    const navigate=useNavigate();

    useEffect(()=>{
        if(isLoggedIn)
        {
            navigate("/dashboard");
        }
    },[isLoggedIn])

    useEffect(() => {
        /* global google */
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: "943473128573-7l3vijl2jiut8f9fginurn45di7o18s7.apps.googleusercontent.com",
                callback: sendToken,
            });

            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large" }
            );
            
            // google.accounts.id.prompt();
        }
    }, []);

    const sendToken=async (response)=> {
        const token=await SendGoogleToken_API(response.credential);
        if(token){login(token)};
    }

    return (
        <Container fluid>
            <ToastContainer />
            <Row>
                <Col lg={6} className="d-none d-lg-block" style={leftColStyle}>
                    <ImageSlider />
                </Col>

                {/* Right Side */}
                <Col xs={12} lg={6}>
                    <div className="text-center d-flex flex-column align-items-center justify-content-center h-100">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/CCS.jpg`}
                            alt="Career Connect Society"
                            className="logo-placeholder"
                        />

                        <h1>Career Connect Society</h1>
                        <p>Connecting Dreams</p>

                        {/* Signup with Google Button */}
                        <div className="signInDiv" id="signInDiv"></div>

                        <a href="#" className="already-have-account">Already Have an Account?</a>

                        {/* Social Media Icons */}
                        <div className="social-icons">
                            <div className="social-icon">
                                <a href="#">
                                    <i className="fa fa-facebook"></i>
                                </a>
                            </div>
                            <div className="social-icon">
                                <a href="#">
                                    <i className="fa fa-twitter"></i>
                                </a>
                            </div>
                            <div className="social-icon">
                                <a href="#">
                                    <i className="fa fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>

            </Row>
        </Container>
    );
};

export default Signup;
