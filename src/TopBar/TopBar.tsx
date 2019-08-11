import React from 'react';
import './TopBar.scss';
import { Container, Grid, Icon } from '@material-ui/core';
import {Location} from '@reach/router';
import { MenuItem } from '../Models/MenuItem';

type TopBarProps = {
  menuItems: MenuItem[];
}

class TopBar extends React.Component<TopBarProps> {

  menuItemMatchingPath(path: string): string {
    const menuItem: MenuItem | undefined = this.props.menuItems.find(i => i.route === path);
    return menuItem ? menuItem.label : 'Page Not Found';
  }

  render() {
    return (
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <div className="topbar">
                <div className="topbar__left">
                  <Location>
                    {({ location })=> {
                      return <span className="topbar-page-name">{ this.menuItemMatchingPath(location.pathname) }</span>
                    }}
                  </Location>
                </div>
                <div className="topbar__right">
                  <Icon fontSize="small">arrow_drop_down</Icon>
                  <span className="topbar-user">Job Seeker</span>
                  <div className="topbar-user-portrait">JS</div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
    )
  }
}

export default TopBar;