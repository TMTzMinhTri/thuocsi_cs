import * as React from "react";
import { Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';

const PREVIOUS_PAGE = 'PREV';
const NEXT_PAGE = 'NEXT';

const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

interface IPaginationBarProps {
    totalRecords: number,
    perpage: number,
    pageRangeDisplayed?: number,
    onChangePage: Function,
    size?: "sm" | "lg",
    current: number,
    perpageOptions?: number[]
}

export const PaginationBar: React.FC<IPaginationBarProps> = React.memo((props) => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    // const [perPageCurrent, setPerpageCurrent] = React.useState<number>(0)
    const { totalRecords = 0, perpage = 30, pageRangeDisplayed = 2, size = "normal", current, onChangePage, perpageOptions } = props;
    const totalPages = Math.ceil(totalRecords / perpage);

    const gotoPage = React.useCallback(page => {
        setCurrentPage(page)
        // setPerpageCurrent(perpage)
        onChangePage(page)
    }, [onChangePage])

    React.useEffect(() => {
        if (current === currentPage) return
        gotoPage(current);
    }, [gotoPage, current, currentPage]);


    const getPager = () => {

        const totalItems = (pageRangeDisplayed * 2) + 3;
        const totalBlocks = totalItems + 2;

        if (totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - pageRangeDisplayed);
            const endPage = Math.min(totalPages - 1, currentPage + pageRangeDisplayed);

            let pages = range(startPage, endPage) as any;

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalItems - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [PREVIOUS_PAGE, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, NEXT_PAGE];
                    break;
                }

                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [PREVIOUS_PAGE, ...pages, NEXT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];

        }

        return range(1, totalPages);

    }
    const setPage = (page: number) => (event: React.MouseEvent) => {
        event.preventDefault();
        if (page === currentPage) return
        gotoPage(page);
    }
    const pages = getPager();

    return !totalRecords || totalPages === 1
        ? null
        : <div className="d-flex align-items-center mt-3">
            <Pagination size={size} listClassName="m-0">
                <PaginationItem disabled={currentPage === 1} >
                    <PaginationLink first onClick={setPage(1)} />
                </PaginationItem>
                {pages.map((page, index) => {
                    if (page === PREVIOUS_PAGE) {
                        return <PaginationItem key={index}>
                            <PaginationLink previous onClick={setPage(currentPage - 1)} />
                        </PaginationItem>
                    }
                    if (page === NEXT_PAGE) {
                        return <PaginationItem key={index}>
                            <PaginationLink next onClick={setPage(currentPage + 1)} />
                        </PaginationItem>
                    }
                    return <PaginationItem key={index} active={page === currentPage}>
                        <PaginationLink onClick={setPage(page)} >{page}</PaginationLink>
                    </PaginationItem>
                })}
                <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink last onClick={setPage(totalPages)} />
                </PaginationItem>

            </Pagination >
            {perpageOptions && <Input
                type="select"
                className="w-auto ml-2"
                onChange={(e) => console.log(e.target.value)}
                name="select"
                bsSize={"sm"}>
                {perpageOptions.map((item, index) => <option key={`perpage_item_${index}`} value={item}> {item} / trang </option>)}
            </Input>
            }
            <b className="ml-2">{totalRecords} task</b>
        </div >
})