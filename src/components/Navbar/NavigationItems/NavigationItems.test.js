import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  it('It should render 2 <NavigationItem /> elements if they are not authenticated', () => {
    const wrapper = shallow(<NavigationItems />)
    expect(wrapper.find(NavigationItem)).toHaveLength(2) ;
  })
})