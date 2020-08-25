import * as React from 'react';
import { Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as  Components from "Components";
import { isEmpty } from "lodash";
import { toast } from 'react-toastify';

interface ISearchTaskProps {
    onSearch: (search_text, callback) => void
}

export const SearchTask: React.FC<ISearchTaskProps> = ({ onSearch }) => {
    const submitSearch = (values: { search_text: string }, { setSubmitting }: FormikHelpers<{ search_text: string }>) => {
        if (isEmpty(values.search_text)) {
            toast.error("Mã đơn hàng đang trống", { autoClose: 2000 })
            setSubmitting(false)
            return
        }
        onSearch(values.search_text, () => setSubmitting(false))
    }
    return <Formik
        initialValues={{ search_text: "SO18481" }}
        onReset={() => { }}
        onSubmit={submitSearch}
    >
        {({ isSubmitting }) => (
            <Form className="form-inline">
                <Field name="search_text"
                    type="text"
                    autoComplete="off"
                    style={{ textTransform: "uppercase" }}
                    placeholder="Nhập mã đơn hàng"
                    component={Components.ReactstrapFormik.BaseInput} />
                <Button
                    disabled={isSubmitting}
                    className="ml-2"
                    type="submit">
                    Search {isSubmitting && <Spinner size="sm" />}
                </Button>
            </Form>
        )}
    </Formik>
}