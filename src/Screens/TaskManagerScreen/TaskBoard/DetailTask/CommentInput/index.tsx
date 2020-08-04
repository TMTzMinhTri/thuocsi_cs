import * as React from "react";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import { Button, Label, FormGroup } from "reactstrap";
import * as Components from "Components";
import { isEmpty } from "lodash";
import { IResponseUser } from "Interface/Response/session.types";

interface IProps {
    name: string,
    CreateComment: Function,
    currentUser: IResponseUser | null
}


export const CommentInput: React.FC<IProps> = ({ name, CreateComment, currentUser }) => {
    let formRef = React.useRef<FormikProps<{ comment: string }>>(null)
    const submitLogin = (values: { comment: string }, { resetForm, setSubmitting }: FormikHelpers<{ comment: string }>) => {
        if (isEmpty(values.comment)) {
            setSubmitting(false)

            return
        }
        CreateComment(values.comment, () => {
            resetForm({})
            setSubmitting(false)
        })
    }
    React.useEffect(() => {
        if (!isEmpty(formRef.current?.values.comment)) formRef.current?.resetForm()
    }, [name, formRef])

    return <React.Fragment>
        <FormGroup>
            <Label className="detail-task__title" for={`user_${currentUser?.id}`}>Activity</Label>
            <div className="detail-task__comment">
                <Components.Avata name={currentUser ? currentUser.name : ""} target={`current_user_${currentUser?.id}`} classNames="mr-2" />
                <Formik
                    innerRef={formRef}
                    initialValues={{ comment: "" }}
                    onReset={() => { }}
                    onSubmit={submitLogin}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field name="comment"
                                type="text"
                                id={`user_${currentUser?.id}`}
                                component={Components.ReactstrapFormik.BaseInput}
                                placeholder="Số điện thoại" />

                            <Button color="primary" block
                                disabled={isSubmitting}
                                type="submit">
                                SIGN IN
            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </FormGroup>
    </React.Fragment>
}