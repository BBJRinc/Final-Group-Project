import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Container } from 'native-base'
import axios from 'axios';
import FooterMenu from './component/footer/FooterMenu';
import Unscheduled from './component/unscheduled/Unscheduled';


import TaskDetails from './TaskDetails';
import Actions from './Actions'
import AgendaScreen from './AgendaScreen'
// import CalendarScreen from './CalendarScreen'


import { auth0, AUTH0_DOMAIN } from './src/auth0'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {id: 1, name: "Jordan"}
    }
    this.showMenuItem = this.showMenuItem.bind(this);
  }

  showMenuItem(name){
    if (this.state[name] === false){
      this.setState({[name]: true});
    } else {
      this.setState({[name]: false});
    };
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