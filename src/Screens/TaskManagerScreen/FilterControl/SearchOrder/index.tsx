import * as React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export const SearchOrder: React.FC<{}> = () => {

    return <FormGroup>
        <Label >Mã SO</Label>
        <Input type="search" name="so_id" placeholder="SO1111" />
    </FormGroup>
}