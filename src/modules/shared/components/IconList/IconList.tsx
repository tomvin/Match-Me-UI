import React from 'react'
import './IconList.scss';
import { IconListItemVM } from './IconListModels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  title: string;
  items: IconListItemVM[];
  className?: string;
}

const IconList = (props: Props) => {
  return (
    <div className={`${props.className}`}>
      <h4 className="icon-list-title">{props.title}</h4>
      <ul className="icon-list">
        {
          props.items.map((item, key) => (
            <li key={key} className="icon-list__item">
              <FontAwesomeIcon className="item__icon" icon={item.icon} />
              <span className="item__label">{item.label}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default IconList
