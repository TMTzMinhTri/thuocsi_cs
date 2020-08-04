import * as React from 'react';
import { ITaskComment } from 'Interface/Response/task_manager.types';
import * as Components from "Components";
import Utils from "Utils";

interface ICommentList {
    comments: ITaskComment[]
}

export const CommentList: React.FC<ICommentList> = React.memo(({ comments }) => {
    return <ul className="comment_list">
        {comments.map((cm, index) => <li key={`task_comment__item_${index}`} className="comment_list__item">
            <div><Components.Avata name="Minh Tri" target={`comment_creater_${index}`} /></div>
            <div className="comment_list__item__body">
                <div className="comment_list__item__title">
                    <div className="comment_list__item__name">Minh Tri</div>
                    <i className="text-muted">
                        <span className='mx-2'>{Utils.FormatDateBy_YYYY_MM_DD(cm.created_at)}, {Utils.converTime(cm.created_at)}</span>
                        <Components.TimeAgo datetime={cm.created_at} />
                    </i>
                </div>
                <div className="comment_list__item__content">{cm.content}</div>
            </div>
        </li>)}
    </ul>
})