import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import Pill from '../Pill/Pill';
import { ListItemVM } from './ListItemModels';
import ListItem, { InnerListItem } from './ListItem';

const MOCK_ICON_ITEM: ListItemVM = {
  type: 'icon',
  route: '/test',
  title: 'My Item',
  description: 'My item description',
  variant: 'primary',
  pillText: 'Pill Text',
  pillVariant: 'green',
  icon: 'inbox'
};

describe('<ListItem />', () => {
  it('renders <ListItem />  title. ', () => {
    const item = shallow(<InnerListItem item={MOCK_ICON_ITEM}/>);
    const title = item.find('.header__title');
    expect(title.contains(MOCK_ICON_ITEM.title)).toEqual(true);
  });
  it('renders <ListItem />  description. ', () => {
    const item = shallow(<InnerListItem item={MOCK_ICON_ITEM}/>);
    const description = item.find('.info__description');
    expect(description.contains('My item description')).toEqual(true);
  });
  it('Passes the given route into a <Link /> ', () => {
    const item = shallow(<ListItem item={MOCK_ICON_ITEM}/>);
    expect(item.find(Link).props().to).toBe(MOCK_ICON_ITEM.route);
  });
  it('Displays the given pill text. ', () => {
    const item = shallow(<InnerListItem item={MOCK_ICON_ITEM}/>);
    expect(item.find(Pill).props().text).toContain(MOCK_ICON_ITEM.pillText);
  });
});
