import React from 'react'
import './Tab.scss';

export interface TabProps {
  label: string;
  description: string;
  children: any;
}

const Tab = (props: TabProps) => {
  return (
    <div className="tab">
      { props.children }
    </div>
  )
}

export default Tab
