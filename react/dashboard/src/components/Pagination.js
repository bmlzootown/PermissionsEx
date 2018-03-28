import React from 'react'
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination'

import {
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap'

const Page = ({ value, isActive, onClick }) => (
    <PaginationItem active={isActive}>
        <PaginationLink onClick={onClick}>{value}</PaginationLink>
    </PaginationItem>
)

const Ellipsis = ({ isActive, onClick }) => {
    return <PaginationItem active={isActive}>
        <PaginationLink previous onClick={onClick}>...</PaginationLink>
    </PaginationItem>
}

const FirstPageLink = ({ onClick }) => {
    return (
        <PaginationItem>
            <b><PaginationLink previous onClick={onClick}></PaginationLink></b>
        </PaginationItem>
    )
}

const PreviousPageLink = ({ onClick }) => {
    return (
        <PaginationItem>
            <PaginationLink previous onClick={onClick} ></PaginationLink>
        </PaginationItem>
    )
}

const NextPageLink = ({ onClick }) => {
    return (
        <PaginationItem>
            <PaginationLink next onClick={onClick}></PaginationLink>
        </PaginationItem>
    )
}

const LastPageLink = ({ onClick }) => {
    return (
        <PaginationItem>
            <b><PaginationLink next onClick={onClick} ></PaginationLink></b>
        </PaginationItem>
    )
}

const Wrapper = (props) => (
    <Pagination className="pagination float-left">{props.children}</Pagination>
)

var itemTypeToComponent = {
    [ITEM_TYPES.PAGE]: Page,
    [ITEM_TYPES.ELLIPSIS]: Ellipsis,
    [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
    [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
    [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
    [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
}

export default createUltimatePagination({
    itemTypeToComponent: itemTypeToComponent,
    WrapperComponent: Wrapper
})