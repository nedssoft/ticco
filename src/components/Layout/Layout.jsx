
import React, { Component} from 'react'
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Footer from '../Footer/Footer'

class Layout extends Component{

  state = {
    showSideDrawer: false,
  }

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false});
  }
  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }
   render() {
    const { children } = this.props;
    return (
      <Aux>
        <Toolbar 
          toggleMenu={this.toggleSideDrawerHandler}
        />
        <SideDrawer 
          closed={this.closeSideDrawerHandler} 
          open={this.state.showSideDrawer} 
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>
          { children }
        </main>
        <Footer />
      </Aux>
    );
   }
}

export default Layout;