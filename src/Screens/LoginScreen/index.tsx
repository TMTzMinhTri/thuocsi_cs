import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';

const LoginScreen: React.FC<{}> = () => {
    return <div>
        <div className="d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div className="brand-logo">
                            {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
                        </div>
                        <h4>Hello! let's get started</h4>
                        <h6 className="font-weight-light">Sign in to continue.</h6>
                        <Form className="pt-3">
                            <FormGroup className="d-flex search-field">
                                <Input type="email" placeholder="Username" className="h-auto" />
                            </FormGroup>
                            <FormGroup className="d-flex search-field">
                                <Input type="password" placeholder="Password" className="h-auto" />
                            </FormGroup>
                            <div className="mt-3">
                                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link>
                            </div>
                            {/* <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a> */}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default LoginScreen