import React, { Component } from 'react'
import { HashRouter , Match } from 'react-router'
import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import 'normalize-css'

import styles from './app.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {
        photoURL: 'https://scontent.fscl1-1.fna.fbcdn.net/v/t1.0-9/12439002_1127515210594949_7560565839229546516_n.jpg?oh=53e03716e4115324dd05bb445827c382&oe=59BA53A1',
        email: 'pedro.avaria.contreras@gmail.com',
        onOpenText: false,
        displayName: 'Pedro Avaria',
        location: 'Los Salesianos 1635'
      }
    }
  }
  render(){
    return(
      <HashRouter>
        <div>
          <Header />


          <Match exactly pattern='/' render={()=> {
            if(this.state.user){
              return (<Main user={this.state.user}/>)
            }else {
              //Render login
            }
          }} />

          <Match pattern='/profile' render = {() => {
            return(
              <Profile
                picture = {this.state.user.photoURL}
                displayName={this.state.user.displayName}
                emailAddress={this.state.user.email}
                username={this.state.user.email.split('@')[0]}
                location={this.state.user.location}
              />
            )

          }} />

          <Match pattern='/user/:username' render = {({ params }) => {
            return (
              <Profile
                displayName={params.username}
                username={params.username}
              />
            )
          }} />
        </div>
      </HashRouter>
    )
  }
}

export default App
