import * as React from 'react'
import { format, cancel, render } from 'timeago.js';
import { Opts, TDate } from 'timeago.js/lib/interface';


interface ITimeAgoProps {
    live?: boolean,
    opts?: Opts,
    locale?: string,
    datetime: TDate
}

const toDateTime = (input: TDate): string => {
    return '' + (input instanceof Date ? input.getTime() : input);
}

export const TimeAgo: React.FC<ITimeAgoProps> = React.memo(({ datetime, live = true, locale, opts }) => {
    const domref = React.useRef<HTMLTimeElement>(null)

    React.useEffect(() => {
        const ref = domref.current
        if (null !== ref) renderTimeAgo()
        return () => {
            if (null !== ref) cancel(ref && ref)
        }
    })
    function renderTimeAgo() {
        const node = domref.current
        if (null !== node) {
            cancel(node)
            if (live) {
                node.setAttribute("datetime", toDateTime(datetime))
                render(node, locale, opts)
            }
        }
    }
    return <time ref={domref} style={{ fontSize: "12px" }}>{format(new Date(datetime).toDateString(), locale, opts)}</time>
})