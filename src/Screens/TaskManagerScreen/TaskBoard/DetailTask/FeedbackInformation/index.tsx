import * as React from 'react';
import { Row, Card, CardDeck, CardImg } from 'reactstrap';
import { Icstasks } from 'Interface/Response/task_manager.types';

interface IFeedBackInformationProps {
  task_selected: Icstasks
}

export const FeedbackInformation: React.FC<IFeedBackInformationProps> = ({ task_selected }) => {
  const lengthImageUrls = task_selected.feedback_image_urls.length;
  const feedbackUserNote = task_selected.feedback_user_note ? task_selected.feedback_user_note : "(Không có ghi chú)";

  return <React.Fragment>
    <Row>
      <div className="my-3 feedback col-12">
        <h5>Feedback from Customer</h5>

        <Card body outline color="primary">
            <div className="d-flex my-3">
                <strong className="mr-2">Hình ảnh từ khách hàng:</strong>
                { lengthImageUrls === 0 &&
                    <div className="text-muted">(Không có hình ảnh)</div>
                }
            </div>

            { lengthImageUrls > 0 &&
                <CardDeck className="w-50">
                    { task_selected.feedback_image_urls.map((img, idx) => {
                            return <Card>
                                  <CardImg src={img} alt={`Image ${idx}`} className="feedback__img" />
                                </Card>
                        })
                    }
                </CardDeck>
            }

            <div className="d-flex my-3">
              <strong className="mr-2">Ghi chú từ khách hàng:</strong>
              <div className="text-muted">{ feedbackUserNote }</div>
            </div>
        </Card>
      </div>
    </Row>
  </React.Fragment>
}