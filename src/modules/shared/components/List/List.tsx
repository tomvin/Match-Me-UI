import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './List.scss';
import ListItem from '../ListItem/ListItem';
import { ListItemVM } from '../ListItem/ListItemModels';

interface Props {
  items: ListItemVM[];
  canDelete?: boolean;
}

const List = (props: Props) => {
  const [ items, setItems ] = useState<ListItemVM[]>(props.items);
  const [deleteJob] = useMutation(gql`
      mutation delete($jobId: String) {
        deleteJob(jobId: $jobId)
      }
    `);

  const onDelete = (e: any, jobId: string) => {
    deleteJob({
      variables: { jobId: jobId }
    });
    // remove item from the rendered list
    setItems(props.items.filter(item => item.jobId !== jobId));
    e.preventDefault();
  }

  return (
    <div className="list">
      {
        items
          .map((item: ListItemVM, i: number) => (
            <ListItem className="list__item" key={i} item={item} canDelete={props.canDelete|| false} onDelete={onDelete} />
          )
        )
      }
    </div>
  )
}

export default List
