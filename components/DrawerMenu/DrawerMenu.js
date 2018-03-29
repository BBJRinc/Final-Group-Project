import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from './SideBar'

export default class DrawerMenu extends Component {
    render() {

        closeDrawer = () => {
            this.drawer._root.close()
        }

        openDrawer = () => {
            this.drawer._root.open()
        }


        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                onClose={() => this.closeDrawer()}>
            </Drawer>
        )
    }
}