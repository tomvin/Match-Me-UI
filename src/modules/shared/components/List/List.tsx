import React from 'react'
import './List.scss';
import ListItem from '../ListItem/ListItem';
import { ListItemVM } from '../ListItem/ListItemModels';

interface Props {
  items: ListItemVM[];
}

const List = ({ items }: Props) => {
  return (
    <div className="list">
      {
        items
          .map((item: ListItemVM, i: number) => (
            <ListItem className="list__item" key={i} item={item} />
          )
        )
      }
    </div>
  )
}

export default List
