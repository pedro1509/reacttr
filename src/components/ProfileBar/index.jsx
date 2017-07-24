import React, { Component } from 'react'
import styles from './profile-bar.css'
import { Link } from 'react-router'

class ProfileBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className={styles.root}>
          <Link to='/profile'>
            <figure>
              <img className={styles.avatar} src={this.props.picture}></img>
            </figure>
          </Link>
            <span className={styles.username}>Hola @{this.props.username}!</span>
            <button onClick={this.props.onOpenText} className={styles.button}>
              <span className='fa fa-lg fa-edit'></span> Tweet!
            </button>
        </div>
    )
  }
}
export default ProfileBar
