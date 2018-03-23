import React from 'react'
import ReactUltimatePagination from 'react-ultimate-pagination'

import {
    Pagination
} from 'reactstrap'

const Page = (props) => (
    <Pagination.Item
        style={props.isActive ? { fontWeight: 'bold' } : null}
        onClick={props.onClick}
        disabled={props.disabled}
    >{props.value}</Pagination.Item>
)

const Ellipsis = (props) => (
    <Pagination.Ellipsis onClick={props.onClick} disabled={props.disabled} />
)

const FirstPageLink = (props) => (
    <Pagination.First onClick={props.onClick} disabled={props.disabled} />
)

const PreviousPageLink = (props) => (
    <Pagination.Prev onClick={props.onClick} disabled={props.disabled} />
)

const NextPageLink = (props) => (
    <Pagination.Next onClick={props.onClick} disabled={props.disabled} />
)

const LastPageLink = (props) => (
    <Pagination.Last onClick={props.onClick} disabled={props.disabled} />
)

const Wrapper = (props) => (
    <div className="pagination">{props.children}</div>
)

var itemTypeToComponent = {
    'PAGE': Page,
    'ELLIPSIS': Ellipsis,
    'FIRST_PAGE_LINK': FirstPageLink,
    'PREVIOUS_PAGE_LINK': PreviousPageLink,
    'NEXT_PAGE_LINK': NextPageLink,
    'LAST_PAGE_LINK': LastPageLink
}

export default ReactUltimatePagination.createUltimatePagination({
    itemTypeToComponent: itemTypeToComponent,
    WrapperComponent: Wrapper
})