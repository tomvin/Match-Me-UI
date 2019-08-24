import React from 'react'
import './MatchList.scss';
import { MatchListItemVM } from '../MatchListItem/MatchListItemModels';
import MatchListItem from '../MatchListItem/MatchListItem';

interface MatchListProps {
  items: MatchListItemVM[];
}

const MatchList = (props: MatchListProps) => {
  return (
    <div className="match-list">
      {
        props.items
          .sort((itemA, itemB) => (itemB.matchPercentage - itemA.matchPercentage))
          .map((item, i) => (
            <MatchListItem className="match-list__item" key={i} item={item} />
          )
        )
      }
    </div>
  )
}

export default MatchList
