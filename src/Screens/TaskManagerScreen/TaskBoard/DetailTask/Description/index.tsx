import * as React from 'react';
import { useQuill } from "react-quilljs";

import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import "quill/dist/quill.snow.css";


export const Description: React.FC<{}> = () => {
    const [text, setText] = React.useState()
    const editorRef = React.useRef<HTMLDivElement>(null)
    const placeholder = React.useMemo(() => 'Add a description ...', []);
    var toolbar = React.useMemo(() => [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'size': ['small', false, 'large'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
    ], []);
    const { quill, quillRef, Quill } = useQuill({ modules: { counter: true, toolbar }, placeholder });

    React.useEffect(() => {
        if (quill) {
            quill.pasteHTML('<ol><li><strong>React Hook for Quill!sdasdas</strong></li><li><strong>asdasda</strong></li><li><strong>asdasd</strong></li><li><strong>qweq</strong></li><li><strong>asd</strong></li><li><strong>asdasd</strong></li></ol>')

        }
    }, [quill]);

    if (Quill && !quill) {
        Quill.register('modules/counter', function (quill, options) {
            quill.on('text-change', function () {
                setText(quill.scrollingContainer.innerHTML)
            });
        });
    }
    const toggleEditor = () => editorRef.current.classList.toggle("editor")

    return <Row className="my-4">
        <Col md={12}>
            <FormGroup>
                <Label className="detail-task__title">Description</Label>
                <div ref={editorRef} className="detail-task__description">
                    <div className="detail-task__editor">
                        <div ref={quillRef} />
                        <div className="mt-2">
                            <Button color="primary">Save</Button>
                            <Button onClick={toggleEditor} className="ml-2">Cancel</Button>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: text }} className="detail-task__placeholder" onClick={toggleEditor} />
                </div>
            </FormGroup>
        </Col>
    </Row>
}