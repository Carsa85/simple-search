import React, { PureComponent, FormEvent, ChangeEvent } from 'react';
import { Form, FormControl, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { APP_CONFIG } from '../../config/app.config';
import { IItem } from '../../models/item.model';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SearchProps extends WithTranslation {
    list: IItem[]
    onSubmitSearch: Function;
}
type SearchState = {
    strSearch: TInput
    isFocus: boolean;
}

type TInput = {
    value: string;
    isRequired: boolean;
    isValid: boolean;
}

class Search extends PureComponent<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props)
        this.state = {
            strSearch: {
                value: '',
                isRequired: true,
                isValid: false
            },
            isFocus: false
        };
    }

    searchItems = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmitSearch(this.state.strSearch.value);
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            strSearch: {
                value: event.target.value,
                isRequired: event.target.required,
                isValid: event.target.validity.valid
            }
        })
    }

    createMarkup = (name: string, strSearch: string) => {
        return { __html: name.replace(strSearch, "<span class='found'>" + strSearch + "</span>") };
    }

    clearSearch = () => {
        this.setState({
            strSearch: {
                value: '',
                isRequired: true,
                isValid: false
            }
        })
        this.props.onSubmitSearch('');
    }

    render = () => (
        <div className="Search">
            <Form onSubmit={this.searchItems} inline>
                <InputGroup className="">
                    <InputGroup.Prepend>
                        <Button onClick={() => { this.clearSearch() }} variant="secondary">{this.props.t('App.Search.Button.Clear')}</Button>
                    </InputGroup.Prepend>
                    <FormControl
                        autoComplete="off"
                        type="text"
                        id="search"
                        onFocus={() => { this.setState({ isFocus: true }) }}
                        onBlur={() => { setTimeout(() => this.setState({ isFocus: false }), 300) }}
                        value={this.state.strSearch.value}
                        onChange={this.handleChange}
                        required={this.state.strSearch.isRequired}
                        minLength={APP_CONFIG.MIN_SEARCH_LENGTH}
                        placeholder={this.props.t('App.Search.Placeholder')} />
                    <InputGroup.Append>
                        <Button disabled={!this.state.strSearch.isValid} variant="primary" type="submit">{this.props.t('App.Search.Button.Search')}</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            <div className={"typeahead"}>

                <ListGroup hidden={!(this.state.strSearch.value.length > 0) || !this.state.isFocus}>
                    {
                        this.props.list.map((item: IItem, index: number) => {
                            return (
                                <ListGroup.Item
                                    onClick={() => {
                                        this.setState({
                                            strSearch: {
                                                value: item.name,
                                                isRequired: true,
                                                isValid: true
                                            }
                                        })
                                    }}
                                    key={item.id}
                                    hidden={!item.name.includes(this.state.strSearch.value)}>
                                    <p dangerouslySetInnerHTML={this.createMarkup(item.name, this.state.strSearch.value)} />
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>

            </div>
        </div>
    );
}

export default withTranslation()(Search);
