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

interface Props {
  deleteItem: () => void
}

const DeleteButton = (props: Props) => {
  const handleDelete = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    props.deleteItem();
  }

  return (
    <div title="Delete Job" className="list-item__delete" onClick={(event: any) => handleDelete(event)}>
      <FontAwesomeIcon icon="trash-alt" />
    </div>
  );
}

const InnerListItem = (props: MatchListItemProps) => {
  return (
    <React.Fragment>
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
            { props.item.deleteItem !== undefined ? <DeleteButton deleteItem={props.item.deleteItem} /> : null }
          </div>
          {
            props.item.description ? (
              <div className="info__description">{trimStringAddEllipsis(props.item.description, 90)}</div>
            ) : ''
          }
        </div>
      </div>
    </React.Fragment>
  )
}

const ListItem = (props: MatchListItemProps) => {
  if (props.item.route !== '') {
    return (
      <Link to={props.item.route} className={`list-item list-item--hover list-item--${props.item.variant} ${props.className}`}>
        <InnerListItem {...props} />
        <div className="list-item__extra">
          <FontAwesomeIcon className="extra__icon" icon={['fas', 'chevron-right']} />
        </div>
      </Link>
    )
  }

  return (
    <div className={`list-item list-item--${props.item.variant} ${props.className}`}>
      <InnerListItem {...props} />
    </div>
  )
}

export default ListItem
