import React, { PureComponent } from 'react';
import { IItem } from '../../models/item.model';
import { ListGroup } from 'react-bootstrap';
import { APP_CONFIG } from '../../config/app.config';
import { withTranslation, WithTranslation } from 'react-i18next';

interface ItemListProps extends WithTranslation {
    list: IItem[];
    displayedPage: number;
}
type ItemListState = {
    list: IItem[];
    currentPage: number;
}

const MoreText = () => (
    <span>...</span>
)

class ItemList extends PureComponent<ItemListProps, ItemListState> {
    constructor(props: ItemListProps) {
        super(props)
        this.state = {
            list: [...this.props.list],
            currentPage: this.props.displayedPage
        };
        console.log((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION);
        console.log(((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION) + APP_CONFIG.MAX_PAGINATION);

    }

    componentWillReceiveProps = (nextProps: ItemListProps) => {
        console.log('itemList----->', nextProps.displayedPage)
        this.setState({
            currentPage: nextProps.displayedPage
        })
    }

    render = () => (
        <div className="ItemList">
            <ListGroup>
                {
                    this.state.list.map((item: IItem, index: number) => {
                        return (
                            (index >= ((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION) && index < (((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION) + APP_CONFIG.MAX_PAGINATION))
                                ? <ListGroup.Item
                                    key={item.id}
                                    hidden={!(index >= ((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION) && index < (((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION) + APP_CONFIG.MAX_PAGINATION))}>
                                    <fieldset>
                                        <p>{this.props.t('App.ItemList.Field.Name', { itemName: item.name })}</p>
                                        <p>{this.props.t('App.ItemList.Field.Email', { itemEmail: item.email })}</p>
                                        <div>
                                            {item.body.split('').slice(0, 64).join('')}
                                            {
                                                item.body.length > 64
                                                    ? <MoreText />
                                                    : null
                                            }
                                        </div>
                                    </fieldset>
                                </ListGroup.Item>
                                : null
                        )
                    })
                }
            </ListGroup>
        </div>
    );
}

export default withTranslation()(ItemList);
