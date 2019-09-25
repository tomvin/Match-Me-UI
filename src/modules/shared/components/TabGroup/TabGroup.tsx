import React, { useState } from 'react'
import { TabProps } from '../Tab/Tab';
import './TabGroup.scss';

interface Props {
  className?: string;
  children: { props: TabProps }[];
}

interface State {
  activeTabIndex: number;
}

const TabGroup = (props: Props) => {
  const [state, setState] = useState<State>({ activeTabIndex: 0 });

  const handleTabClick = (tabIndex: number) => {
    setState({
      ...state,
      activeTabIndex: tabIndex
    })
  }

  return (
    <div className={`tab-group ${props.className}`}>
      <div className="tab-group__header">
        { 
          props.children.map(({props}, index) => (
            <div onClick={() => handleTabClick(index)} key={index} className={`tab ${index === state.activeTabIndex ? 'tab--active' : ''}`}>
              <div className="tab__label">{ props.label }</div>
              <div className="tab__description">{ props.description }</div>
            </div>
            )
          )
        }
      </div>
      <div className="tab-group__content">
        { props.children[state.activeTabIndex] }
      </div>
    </div>
  )
}

export default TabGroup
