import React, { PureComponent } from 'react';
import { IItem } from '../../models/item.model';
import { ListGroup } from 'react-bootstrap';
import { APP_CONFIG } from '../../config/app.config';
import { withTranslation, WithTranslation } from 'react-i18next';

interface IItemListProps extends WithTranslation {
    list: IItem[];
    displayedPage: number;
}
interface IItemListState {
    list: IItem[];
    currentPage: number;
}

const MoreText = () => (
    <span>...</span>
)

class ItemList extends PureComponent<IItemListProps, IItemListState> {
    constructor(props: IItemListProps) {
        super(props);
        this.state = {
            list: [...this.props.list],
            currentPage: this.props.displayedPage
        };
        console.log((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION);
        console.log(((this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION) + APP_CONFIG.MAX_PAGINATION);

    }

    inPagination = (index: number): boolean => {

        const startingPoint: number = (this.state.currentPage - 1) * APP_CONFIG.MAX_PAGINATION;
        const endinPoint: number = startingPoint + APP_CONFIG.MAX_PAGINATION;

        return (index >= startingPoint && index < endinPoint);
    }

    componentWillReceiveProps = (nextProps: IItemListProps) => {
        console.log('itemList----->', nextProps.displayedPage);
        this.setState({
            currentPage: nextProps.displayedPage
        });
    }

    render = () => (
        <div className="ItemList">
            <ListGroup>
                {
                    this.state.list.map((item: IItem, index: number) => {
                        return (
                            this.inPagination(index)
                                ? <ListGroup.Item
                                    key={item.id}>
                                    <fieldset>
                                        <p>{this.props.t("App.ItemList.Field.Name", { itemName: item.name })}</p>
                                        <p>{this.props.t("App.ItemList.Field.Email", { itemEmail: item.email })}</p>
                                        <div>
                                            {item.body.split("").slice(0, 64).join("")}
                                            {
                                                item.body.length > 64
                                                    ? <MoreText />
                                                    : null
                                            }
                                        </div>
                                    </fieldset>
                                </ListGroup.Item>
                                : null
                        );
                    })
                }
            </ListGroup>
        </div>
    )
}

export default withTranslation()(ItemList);
