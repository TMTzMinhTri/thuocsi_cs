import * as React from "react";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import { Button, Label, FormGroup } from "reactstrap";
import * as Components from "Components";
import { isEmpty } from "lodash";
import { IResponseUser } from "Interface/Response/session.types";
import { ITaskComment } from "Interface/Response/task_manager.types";

interface IProps {
    name: string,
    CreateComment: Function,
    currentUser: IResponseUser | null,
    comments: ITaskComment[]
}


export const CommentInput: React.FC<IProps> = ({ name, CreateComment, currentUser, comments }) => {
    const [isInput, setIsInput] = React.useState<boolean>(false)
    let formRef = React.useRef<FormikProps<{ comment: string }>>(null)
    let inputRef = React.useRef<HTMLElement>(null)
    const endRef = React.useRef<HTMLDivElement>(null)

    const submitLogin = (values: { comment: string }, { resetForm, setSubmitting }: FormikHelpers<{ comment: string }>) => {
        if (isEmpty(values.comment)) {
            setSubmitting(false)
            return
        }
        CreateComment(values.comment, () => {
            resetForm({})
            setSubmitting(false)
            setIsInput(false)
            endRef.current?.scrollIntoView({ behavior: "smooth" })
        })
    }
    const toggleInput = () => {
        setIsInput(!isInput)
    }

    React.useEffect(() => {
        if (isInput === true && null !== inputRef.current) inputRef.current.focus()
    }, [isInput, comments])

    React.useEffect(() => {
        if (!isEmpty(formRef.current?.values.comment)) formRef.current?.resetForm()
    }, [name, formRef])

    return <div ref={endRef}><FormGroup >
        <Label className="detail-task__title" for={`user_${currentUser?.id}`}>Activity</Label>
        <div className="detail-task__comment">
            <Components.Avata name={currentUser ? currentUser.name : ""} target={`current_user_${currentUser?.id}`} classNames="mr-2" />
            {isInput
                ? <Formik
                    innerRef={formRef}
                    initialValues={{ comment: "" }}
                    onSubmit={submitLogin}>
                    {({ isSubmitting }) => (
                        <Form className="w-100">
                            <Field name="comment"
                                type="textarea"
                                innerRef={inputRef}
                                id={`user_${currentUser?.id}`}
                                component={Components.ReactstrapFormik.BaseInput}
                                placeholder="Nhập comment ..." />

                            <Button color="primary"
                                className="mr-2"
                                disabled={isSubmitting}
                                type="submit">Lưu</Button>
                            <Button
                                type="button" onClick={toggleInput}>Huỷ</Button>
                        </Form>
                    )}
                </Formik>
                : <div onClick={(toggleInput)} className="detail-task__comment-placeholder">Add a comment...</div>}
        </div>
    </FormGroup>
    </div>
}