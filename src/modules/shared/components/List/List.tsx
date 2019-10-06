import React from 'react'
import './List.scss';
import ListItem from '../ListItem/ListItem';
import { ListItemVM } from '../ListItem/ListItemModels';

interface Props {
  items: ListItemVM[];
  canDelete?: boolean;
}

const List = (props: Props) => {
  return (
    <div className="list">
      {
        props.items
          .map((item, i) => (
            <ListItem className="list__item" key={i} item={item} canDelete={props.canDelete|| false} />
          )
        )
      }
    </div>
  )
}

export default List
