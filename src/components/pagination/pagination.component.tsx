import React, { PureComponent } from 'react';
import { Pagination } from 'react-bootstrap';

type MyPaginationProps = {
    itemsNumber: number;
    pageLength: number;
    onPageChange: Function;
}
type MyPaginationState = {
    lastPage: number;
    currentPage: number;
}

class MyPagination extends PureComponent<MyPaginationProps, MyPaginationState> {
    constructor(props: MyPaginationProps) {
        super(props)
        this.state = {
            currentPage: 1,
            lastPage: Math.ceil(this.props.itemsNumber / this.props.pageLength)
        };
    }

    setPage = (selectedPage: number) => {
        this.setState({
            currentPage: selectedPage
        }, ()=> {this.props.onPageChange(this.state.currentPage)});
    }

    render = () => (
        <div className="MyPagination">
            <Pagination>
                <Pagination.Item
                    onClick={() => { this.setPage(1) }}
                    disabled={this.state.currentPage === 1}>{1}</Pagination.Item>
                <Pagination.Prev
                    onClick={() => { this.setPage(this.state.currentPage - 1) }}
                    disabled={this.state.currentPage === 1} />
                <Pagination.Item active>{this.state.currentPage}</Pagination.Item>
                <Pagination.Next
                    onClick={() => { this.setPage(this.state.currentPage + 1) }}
                    disabled={this.state.currentPage === this.state.lastPage} />
                <Pagination.Item
                    onClick={() => { this.setPage(this.state.lastPage) }}
                    disabled={this.state.currentPage === this.state.lastPage}>{this.state.lastPage}</Pagination.Item>
            </Pagination>
        </div>
    );
}

export default MyPagination;
