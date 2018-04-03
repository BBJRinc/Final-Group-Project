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
import DayView from './components/DayView/DayView.js';
import DayViewHeader from './components/DayViewHeader/DayViewHeader';

const PubIpAddress = '192.168.3.176'

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
      todaysDateInUnix: '',
      previousDayTasks: [],
      currentTasks: [],
      nextDayTasks: [],
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
    this.getNextDay = this.getNextDay.bind(this);
    this.getPreviousDay = this.getPreviousDay.bind(this);
  }



  async componentDidMount() {
    // console.log('COMPONENT MOUNTED!!!!!');
    SplashScreen.hide();

    let checkToken = await AsyncStorage.getItem('token').then(res => {
      return res;
    }).catch(err => console.log(err));

    if (checkToken !== null) {
      this.setState({
        hasToken: true,
        userToken: checkToken
      })
    }


    let newToday = Math.round(new Date().getTime())
    let offSet = moment().utcOffset()
    offSet = (offSet * 1000) * 60;
    newToday += offSet;
    // One day in milliseconds
    let oneDay = 86400000;
    // Todays Tasks
    let todayConv = moment(newToday).format("YYYY-MM-DD")
    let todayUnix = moment(todayConv, "YYYY-MM-DD").valueOf()
    console.log('todayUnix: ', todayUnix);
    this.setState({
      selectedDay: todayUnix
    })
    axios({
      method: 'get',
      url: `http://${PubIpAddress}:4040/api/day/${todayUnix}`,
      headers: {
        "token": this.state.userToken
      }
    }).then(response => {
      this.setState({
        currentTasks: response.data
      })

      // Yesterdays Tasks
      let newYesterday = this.state.selectedDay - oneDay;
      console.log('yesterdaysDateInUnix: ', newYesterday);
      axios({
        method: 'get',
        url: `http://${PubIpAddress}:4040/api/day/${newYesterday}`,
        headers: {
          "token": this.state.userToken
        }
      }).then(response => {
        this.setState({
          previousDayTasks: response.data
        })

        // Tomorrows Tasks
        let newTomorrow = this.state.selectedDay + oneDay;
        console.log('tomorrowsDateInUnix: ', newTomorrow);
        axios({
          method: "get",
          url: `http://${PubIpAddress}:4040/api/day/${newTomorrow}`,
          headers: {
            "token": this.state.userToken
          }
        }).then(response => {
          this.setState({
            nextDayTasks: response.data
          })
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    console.log('user token: ', this.state.userToken);
    console.log('previousDayTasks: ', this.state.previousDayTasks);
    console.log('currentTasks: ', this.state.currentTasks);
    console.log('nextDayTasks: ', this.state.nextDayTasks);
  } // Compondent did mount ends

  /// Methods Begin ///

  closeDrawer = () => {
    this._drawer._root.close()
  }

  openDrawer = () => {
    this._drawer._root.open()
  }

  setUnscheduledCount(count) {
    this.setState({ unscheduledCount: count });
  }

  showMenuItem(name, clearTask) {
    if (clearTask) {
      this.setState({
        selectedTask: {}
      })
    }
    this.setState({ [name]: !this.state[name] });
  }

  getPreviousDay() {
    let oneDay = 86400000;
    let previousDateUnix = this.state.selectedDay - oneDay;
    console.log('previousDateUnix: ', previousDateUnix)
    this.setState({
      nextDayTasks: this.state.currentTasks,
      currentTasks: this.state.previousDayTasks,
      previousDayTasks: null
    })
    axios({
      method: "get",
      url: `http://${PubIpAddress}:4040/api/day/${previousDateUnix}`,
      headers: {
        "token": this.state.userToken
      }
    }).then(response => {
      this.setState({
        previousDayTasks: response.data,
        selectedDay: previousDateUnix
      })
    }).catch(err => console.log(err));
    console.log('previousDayTasks: ', this.state.previousDayTasks);
    console.log('currentTasks: ', this.state.currentTasks);
    console.log('nextDayTasks: ', this.state.nextDayTasks);
  }

  getNextDay() {
    let oneDay = 86400000;
    let nextDateUnix = this.state.selectedDay + oneDay;
    console.log('nextDateUnix: ', nextDateUnix)
    this.setState({
      previousDayTasks: this.state.currentTasks,
      currentTasks: this.state.nextDayTasks,
      nextDateTasks: null
    })
    axios({
      method: "get",
      url: `http://${PubIpAddress}:4040/api/day/${nextDateUnix}`,
      headers: {
        "token": this.state.userToken
      }
    }).then(response => {
      this.setState({
        nextDateTasks: response.data,
        selectedDay: nextDateUnix
      })
    }).catch(err => console.log(err));
    console.log('previousDayTasks: ', this.state.previousDayTasks);
    console.log('currentTasks: ', this.state.currentTasks);
    console.log('nextDayTasks: ', this.state.nextDayTasks);
  }

  onDayPress(day) {
    let unixDay = moment(day.dateString, "YYYY-MM-DD").valueOf();
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

  getDay() {
    // console.log('GET DAY CALLED!!!!');
  }

  onLogout() {
    AsyncStorage.removeItem('token', (err) => {
      if (err) {
        console.log('Error deleting token: ' + err);
      }
      this.setState({ userToken: null, hasToken: false });
    });
  }

  loginWindow() {
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email', useBrowser: true, responseType: 'id_token' })
      .then(credentials => {
        axios.post(`http://${PubIpAddress}:4040/api/auth`, { token: credentials.idToken }).then(res => {
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
    if (this.state.userToken && this.state.hasToken) {
      return (
          <Drawer
            ref={(ref) => { this._drawer = ref }}
            content={<SideBar navigator={this._navigator} logout={this.onLogout} showMenuItem={this.showMenuItem} onClose={this.closeDrawer} unschedCount={this.state.unscheduledCount} />}
            onClose={() => this.closeDrawer()}>
            <StatusBar
            backgroundColor="#4f6d7a"
            barStyle="light-content"
          />
            <Container>
              <DayViewHeader selectedDay={this.state.selectedDay} nextDay={this.getNextDay} previousDay={this.getPreviousDay} />
              <Content>
                <DayView tasksToRender={this.state.currentTasks} />
                <TaskDetails selectedTask={this.state.selectedTask} showTaskDetails={this.state.showTaskDetails} showMenuItem={this.showMenuItem} token={this.state.userToken} user={this.state.user} />
                <CalendarScreen visible={this.state.showCalendar} onDayPress={this.onDayPress} showMenuItem={this.showMenuItem} />
                <Unscheduled visible={this.state.showTasks} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress} setCount={this.setUnscheduledCount} token={this.state.userToken} />
                <Ongoing visible={this.state.showOngoing} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress} token={this.state.userToken} />
              </Content>
              <FooterMenu logout={this.onLogout} showMenuItem={this.showMenuItem} openDrawer={this.openDrawer} unschedCount={this.state.unscheduledCount} />
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