import React from 'react'
import './MatchListItem.scss';
import { MatchListItemVM } from './MatchListItemModels';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pill from '../Pill/Pill';
import { trimStringAddEllipsis } from '../../utils/TrimString';

interface MatchListItemProps {
  className?: string;
  item: MatchListItemVM;
}

const MatchListItem = (props: MatchListItemProps) => {
  const convertPercentageToPillVariant = (percentage: number) => {
    if (percentage > 60) return 'green';
    else if (percentage > 30) return 'orange';
    else return 'red';
  };
  
  return (
    <Link to={props.item.route} className={`match-list-item ${props.className}`}>
      <div className="match-list-item__left">
        <img className="match-list-item__image" src={props.item.imageUrl} alt={props.item.title} />
        <div className="match-list-item__info">
          <div className="info__header">
            <div className="header__title">{props.item.title}</div>
            <Pill text={`${props.item.score}% match!`} variant={convertPercentageToPillVariant(props.item.score)} />
          </div>
          <div className="info__description">{trimStringAddEllipsis(props.item.description, 90)}</div>
        </div>
      </div>
      <div className="match-list-item__extra">
        <FontAwesomeIcon className="match-list-item__icon" icon={['fas', 'chevron-right']} />
      </div>
    </Link>
  )
}

export default MatchListItem
