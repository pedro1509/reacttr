import React, { Component } from 'react'
import styles from './login.css'

class Login extends Component{
  constructor(prop){
    super(props);
  }

  render(){
    return(
      <div className={styles.root}>
        <p className={styles.text}>
          Necesitamos que inicies sesion con tu cuenta de github
          para que puesdas leer mensaje y escribir mensajes
        </p>
        <button className={styles.button} onClick={this.props.onAuth}>
          Login con Github
        </button>
      </div>
        )
  }
}

export default Login
