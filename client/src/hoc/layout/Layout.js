import React, { Component } from "react";
import Menu from "../../features/home/menu";

class Layout extends Component {
  render() {
    return (
      <div>
        <Menu></Menu>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;
