import * as React from 'react';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { RootState } from 'Store';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { signIn } from 'Store/actions/layout.actions';
import Logo from "stylesheets/svg/logo_thuocsi.svg";
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import * as Componets from "Components";

interface IState {
    isAuthenticated: boolean
}

const mapState = (state: RootState): IState => ({
    isAuthenticated: state.layout.isAuthenticated
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    signIn
}, dispatch)


type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

const LoginScreen: React.FC<Iprops> = ({ isAuthenticated, signIn }) => {
    const submitLogin = (values: { login: string; password: string; }) => {
        signIn(values)
    }
    
    const form_validation = (values: { login: string; password: string; }) => {
        const errors = {} as any;
        if (!values.login) {
            errors.login = "Required";
        }
        else if (!values.password) {
            errors.password = "Required"
        }
        return errors;
    }

    return isAuthenticated
        ? <Redirect to='/' />
        : <div className="d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light py-5 px-4 px-sm-5">
                        <div className="brand-logo text-center">
                            <img src={Logo} alt="Logo-thuoc-si" />
                        </div>
                        <Formik
                            initialValues={{ login: "0111222333", password: "123123" }}
                            onReset={() => { }}
                            onSubmit={values => submitLogin(values)}
                            validate={values => form_validation(values)}
                        >
                            {({ isSubmitting }) => (
                                <Form className="pt-3">
                                    <Field name="login"
                                        type="text"
                                        component={Componets.ReactstrapFormik.BaseInput}
                                        placeholder="Số điện thoại" />
                                    <Field
                                        name="password"
                                        type="password"
                                        component={Componets.ReactstrapFormik.BaseInput}
                                        placeholder="Mật khẩu" />
                                    <Button color="primary" block disabled={isSubmitting}>SIGN IN</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
}

export default connect(mapState, mapAction)(LoginScreen)