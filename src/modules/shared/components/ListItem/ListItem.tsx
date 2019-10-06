import React from 'react'
import './ListItem.scss';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pill from '../Pill/Pill';
import { trimStringAddEllipsis } from '../../../../utils/TrimString';
import { ListItemVM } from './ListItemModels';


interface MatchListItemProps {
  className?: string;
  item: ListItemVM;
  canDelete: boolean
}

interface Props {
  jobId: string
}

const DeleteButton = (props: Props) => {
  const [deleteJob] = useMutation(gql`
      mutation {
        deleteJob(jobId: "${props.jobId}")
      }
    `);

  const onDelete = (e: any) => {
    deleteJob();
    e.preventDefault();
  }

  return (
    <div className="list-item__delete" onClick={onDelete}>
      <FontAwesomeIcon icon="trash-alt" />
    </div>
  );
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
            { props.canDelete ? <DeleteButton jobId={props.item.jobId} /> : null }
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
