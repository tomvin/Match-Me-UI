import React from 'react';
import MatchListItem from './MatchListItem';
import { MatchListItemVM } from './MatchListItemModels';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Link } from 'react-router-dom';
import Pill from '../Pill/Pill';

const MOCK_ITEM: MatchListItemVM = {
  route: '/test',
  imageUrl: '',
  title: 'My Item',
  description: 'My item description',
  score: .27
};

describe('<MatchListItem />', () => {
  it('renders <MatchListItem />  title. ', () => {
    const item = shallow(<MatchListItem item={MOCK_ITEM}/>);
    const title = item.find('.header__title');
    const description = item.find('.header__description');
    expect(title.contains(MOCK_ITEM.title)).toEqual(true);
  });
  it('renders <MatchListItem />  description. ', () => {
    const item = shallow(<MatchListItem item={MOCK_ITEM}/>);
    const description = item.find('.info__description');
    expect(description.contains(MOCK_ITEM.description)).toEqual(true);
  });
  it('Passes the given route into a <Link /> ', () => {
    const item = shallow(<MatchListItem item={MOCK_ITEM}/>);
    expect(item.find(Link).props().to).toBe(MOCK_ITEM.route);
  });
  it('Displays the given score as a percentage of 100. ', () => {
    const item = shallow(<MatchListItem item={MOCK_ITEM}/>);
    expect(item.find(Pill).props().text).toContain(MOCK_ITEM.score * 100 + '%');
  });
});
