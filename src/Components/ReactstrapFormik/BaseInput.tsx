import * as React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { FieldProps } from "formik";

interface IProps extends FieldProps {
    id: string,
    label: string,
    labelClassName?: string
}

export const BaseInput: React.FC<IProps> = ({ field: { ...fields }, form: { touched, errors, ...rest }, ...props }) => (
    <FormGroup>
        {props.label && <Label for={props.id} className={props.labelClassName}>{props.label}</Label>}
        <Input {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])} autoComplete="off"/>
        {touched[fields.name] && errors[fields.name] ? <FormFeedback>{errors[fields.name]}</FormFeedback> : ''}
    </FormGroup>
);