import React, { PureComponent } from 'react';
import Search from './components/search/search.component';
import ItemList from './components/item-list/item-list.components';
import Pagination from './components/pagination/pagination.component';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { IItem } from './models/item.model';
import { withTranslation, WithTranslation } from 'react-i18next';
import './i18n';
import ItemServices, { IItemServices } from './services/item.services';
import { AxiosResponse, AxiosError } from 'axios';
import { APP_CONFIG } from './config/app.config';

interface AppProps extends WithTranslation { }
type AppState = {
    ItemList: IItem[];
    currentPage: number;
    OriginalList: IItem[];
}

class App extends PureComponent<AppProps, AppState> {
    itemservice: IItemServices;
    constructor(props: AppProps) {
        super(props)
        this.state = {
            ItemList: [],
            OriginalList: [],
            currentPage: 1
        };
        this.itemservice = new ItemServices();
    }

    componentWillMount = () => {
        this.itemservice.getItemList()
            .then((response: AxiosResponse) => {
                if (!this.itemservice.checkError(response)) {
                    let result: IItem[] = this.itemservice.getResult(response);
                    console.log(result)
                    this.setState({
                        ItemList: [...result],
                        OriginalList: [...result]
                    })
                }
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    setPage = (newPage: number) => {
        this.setState({
            currentPage: newPage
        }, () => { console.log(this.state.currentPage) })
    }

    searchItems = (q: string) => {
        this.setState({
            ItemList: [],
            currentPage: 1
        })
        this.itemservice.seatchItem(q)
            .then((response: AxiosResponse) => {
                if (!this.itemservice.checkError(response)) {
                    let result: IItem[] = this.itemservice.getResult(response);
                    console.log(result)
                    this.setState({
                        ItemList: [...result],
                        currentPage: 1
                    })
                }
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    componentWillUnmount = () => { 
        this.itemservice.unsuscribe('APP');
    }

    render = () => (
        <div className="App">
            <nav>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">{this.props.t('App.Title')}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        {
                            this.state.OriginalList.length > 0
                                ? <Search list={this.state.OriginalList} onSubmitSearch={this.searchItems} />

                                : null
                        }

                    </Navbar.Collapse>
                </Navbar>

            </nav>
            <main>
                <Container>
                    <Row>
                        <Col>
                            {
                                this.state.ItemList.length > 0
                                    ? <Pagination onPageChange={this.setPage} pageLength={APP_CONFIG.MAX_PAGINATION} itemsNumber={this.state.ItemList.length} />
                                    : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                this.state.ItemList.length > 0
                                    ? <ItemList
                                        list={this.state.ItemList}
                                        displayedPage={this.state.currentPage}
                                    />
                                    : null
                            }

                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default withTranslation()(App);
