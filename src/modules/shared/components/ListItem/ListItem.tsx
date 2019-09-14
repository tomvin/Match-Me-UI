import React from 'react'
import './ListItem.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pill from '../Pill/Pill';
import { trimStringAddEllipsis } from '../../../../utils/TrimString';
import { ListItemVM } from './ListItemModels';

interface MatchListItemProps {
  className?: string;
  item: ListItemVM;
}

const ListItem = (props: MatchListItemProps) => {
  return (
    <Link to={props.item.route} className={`list-item list-item--${props.item.variant} ${props.className}`}>
      <div className="list-item__left">
        {
         props.item.type === 'image' ? 
         (
          <img className="list-item__image" src={props.item.imageUrl} alt={props.item.title} />
         ) 
         : 
         (
          <div className="list-item__icon-container">
            <FontAwesomeIcon className="icon-container__icon" icon={props.item.icon} />
          </div>
         )
        }
        
        <div className="list-item__info">
          <div className="info__header">
            <div className="header__title">{props.item.title}</div>
            <Pill text={props.item.pillText} variant={props.item.pillVariant} />
          </div>
          <div className="info__description">{trimStringAddEllipsis(props.item.description, 90)}</div>
        </div>
      </div>
      <div className="list-item__extra">
        <FontAwesomeIcon className="extra__icon" icon={['fas', 'chevron-right']} />
      </div>
    </Link>
  )
}

export default ListItem