import React from 'react';
import { StyleSheet, View, Alert, Button, Text } from 'react-native';
import { Container, Drawer, Right, Content } from 'native-base';
import axios from 'axios';
import FooterMenu from './components/Footer/FooterMenu';
import Unscheduled from './components/Unscheduled/Unscheduled';
import TaskDetails from './components/TaskDetails/TaskDetails';
import CalendarScreen from './components/CalendarScreen/CalendarScreen';
import Ongoing from './components/Ongoing/Ongoing';
// import SplashScreen from 'react-native-splash-screen';


import { auth0, AUTH0_DOMAIN } from './components/Logics/auth0'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {id: 1, name: "Jordan"},
      showTasks: false,
      showCalendar: false,
      showTaskDetails: false,
      showOngoing: false,
      selectedDay: '',
      selectedTask: {}
    }
    this.showMenuItem = this.showMenuItem.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    this.onTaskPress = this.onTaskPress.bind(this);
  }

  componentDidMount(){
    // SplashScreen.hide();
  }

  showMenuItem(name){
    this.setState({[name]: !this.state[name]});
  }

  onDayPress(day) {    
    this.setState({
      selectedDay: day.dateString
    });
    this.showMenuItem('showCalendar');
  }

  onTaskPress(task, listName){
    this.setState({selectedTask: task});
    this.showMenuItem('showTaskDetails');
    this.showMenuItem(listName);
  }

  

  loginWindow() {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: `https://${AUTH0_DOMAIN}/userinfo`, useBrowser: true, responseType:'id_token'})
      .then(credentials => {
        // console.log(verifyToken)
        console.warn(credentials);
        console.log(credentials);
        axios.post(`/api/index/${credentials}`).then(res=>{
          console.log(res)
          res.status(200).send(res)
        })
        
      })
      // .catch(error => console.log(error));

  }

 
    
  
  render() {
    if (this.state.user){
      return(
        <Container>
          <Content>
            <TaskDetails selectedTask={this.state.selectedTask}/>
            <CalendarScreen onDayPress={this.onDayPress} visible={this.state.showCalendar} showMenuItem={this.showMenuItem}/>
            <Unscheduled visible={this.state.showTasks} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress}/>
            <Ongoing visible={this.state.showOngoing} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress}/>
          </Content>
          <FooterMenu showMenuItem={this.showMenuItem} />         
        </Container>
      )
    } else {
      return(
        <View style={styles.container}>
          <Text>Welcome To Coolendesk!</Text>
          <Button
            title="login"
            onPress={() => this.loginWindow()}
          />
        </View>
        
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});