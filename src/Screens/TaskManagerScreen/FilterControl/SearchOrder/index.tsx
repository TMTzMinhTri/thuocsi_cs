import * as React from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';


export const SearchOrder: React.FC<{}> = () => {

    return <Col md={2}><FormGroup>
        <Label >Mã SO</Label>
        <Input type="search" name="so_id" placeholder="SO1111" />
    </FormGroup>
    </Col>
}