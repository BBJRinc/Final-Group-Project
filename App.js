import React from 'react';
import { StyleSheet, Text, View, Button, Alert, StatusBar, Image, AsyncStorage } from 'react-native';
import { Container, Content, Drawer } from 'native-base';
import axios from 'axios';
import FooterMenu from './components/Footer/FooterMenu';
import Unscheduled from './components/Unscheduled/Unscheduled';
import TaskDetails from './components/TaskDetails/TaskDetails';
import CalendarScreen from './components/CalendarScreen/CalendarScreen';
import Ongoing from './components/Ongoing/Ongoing';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import LoadingIndicator from './components/ActivityIndicator/ActivityIndicator';
import { auth0, AUTH0_DOMAIN } from './components/Logics/auth0';
import moment from 'moment';
import SideBar from './components/DrawerMenu/SideBar';
import DayView from './components/DayView/DayView.js'


const PubIpAdress = '192.168.0.236'
// home'192.168.0.105';
// '192.168.3.132'



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userToken: null,
      showTasks: false,
      showCalendar: false,
      showTaskDetails: false,
      showOngoing: false,
      selectedDay: '',
      selectedTask: {},
      unscheduledCount: null,
      isLoaded: false,
      hasToken: false,
    }
    this.showMenuItem = this.showMenuItem.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    this.onTaskPress = this.onTaskPress.bind(this);
    this.loginWindow = this.loginWindow.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.setUnscheduledCount = this.setUnscheduledCount.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getDay = this.getDay.bind(this);
  }

  async componentDidMount() {
    SplashScreen.hide();

    let checkToken = await AsyncStorage.getItem('token').then(res => {
      return res;
    }).catch(err => console.log(err));

    if (checkToken !== null) {
      console.log('CheckToken data: ', checkToken)
      this.setState({
        hasToken: true,
        userToken: checkToken
      })
    }
  }

  closeDrawer = () => {
    console.log('drawer is closed')
    this._drawer._root.close()
  }

  openDrawer = () => {
    console.log('drawer is open')
    this._drawer._root.open()
  }
  
  setUnscheduledCount(count){
    console.log('function unschedCount' + count);
    this.setState({unscheduledCount: count});
  }

  showMenuItem(name, clearTask){
    if(clearTask){
      this.setState({
        selectedTask: {}
      })
    }
    this.setState({[name]: !this.state[name]});
  }

  onDayPress(day) {
    let unixDay = moment(day.dateString, "YYYY-MM-DD").valueOf();
    console.log("test time " + unixDay)
    this.setState({
      selectedDay: unixDay
    });
    this.showMenuItem('showCalendar');
  }

  onTaskPress(task, listName) {
    this.setState({ selectedTask: task });
    this.showMenuItem('showTaskDetails');
    this.showMenuItem(listName);
  }

  getDay(){
    console.log('GET DAY CALLED!!!!');
  }

  onLogout(){
    AsyncStorage.removeItem('token', (err) => {
      if (err){
        console.log('Error deleting token: ' + err);
      }
      this.setState({userToken: null, hasToken:false});
    });
  }



  loginWindow() {
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email', useBrowser: true, responseType: 'id_token' })
      .then(credentials => {
        // console.log(credentials)
        axios.post(`http://${PubIpAdress}:4040/api/auth`, { token: credentials.idToken }).then(res => {
          AsyncStorage.setItem('token', res.data, () => {
            AsyncStorage.getItem('token', (err, result) => {
              this.setState({
                userToken: result,
                hasToken: true
              })
            })
          })
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  }



  render() {
    // if (!this.state.isLoaded && !this.state.user) {
    //   return (
    //     <LoadingIndicator />
    //   )
    // }
    console.log('state.user: ', this.state.user)
    console.log('state.hasToken: ', this.state.hasToken)
    console.log('state.userToken: ', this.state.userToken)
    console.log('selected date' + this.state.selectedDay);

    if (this.state.userToken && this.state.hasToken) {
      return (
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} logout={this.onLogout} showMenuItem={this.showMenuItem} onClose={this.closeDrawer} />}
          onClose={() => this.closeDrawer()}>
          <Container>
            <Content>
              <TaskDetails selectedTask={this.state.selectedTask} showTaskDetails={this.state.showTaskDetails} showMenuItem={this.showMenuItem} token={this.state.userToken} user={this.state.user}/>
              <DayView />
              <CalendarScreen visible={this.state.showCalendar} onDayPress={this.onDayPress} showMenuItem={this.showMenuItem} />
              <Unscheduled visible={this.state.showTasks} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress} setCount={this.setUnscheduledCount} token={this.state.userToken} />
              <Ongoing visible={this.state.showOngoing} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress} token={this.state.userToken}/>
            </Content>
            <FooterMenu logout={this.onLogout} showMenuItem={this.showMenuItem} openDrawer={this.openDrawer} unschedCount={this.state.unscheduledCount}/>
          </Container>
        </Drawer>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#4f6d7a"
            barStyle="light-content"
          />
          <LoginScreen login={this.loginWindow} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f6d7a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#f5fcff',
    fontSize: 20
  }
});