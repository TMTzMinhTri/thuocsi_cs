import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { FieldProps } from "formik";

interface IProps extends FieldProps {
    disabled: boolean,
    id: string,
    label: string

}
export const RadioInput: React.FC<IProps> = ({
    field,
    form: { isSubmitting, setFieldValue, touched, errors, values },
    disabled = false,
    ...props
}) => (
        <FormGroup check inline>
            <Label for={props.id}>
                <Input {...props}
                    type="radio"
                    name={field.name}
                    checked={values[field.name] === field.value}
                    value={field.value}
                    onChange={() => setFieldValue(field.name, field.value)} />{props.label}
            </Label>
        </FormGroup>
    )