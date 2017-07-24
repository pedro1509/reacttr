import React, { Component } from 'react'
import uuid from 'uuid'
import MessageList from '../MessageList'
import ProfileBar from '../ProfileBar'
import InputText from '../InputText'

class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      openText:false,
      user: Object.assign({},this.props.user,{ rettweets:[] },{ favorities: [] }),
      usernameToReply: '',
      messages: [
        {
          id: uuid.v4(),
          text: 'Mensaje del twitt',
          picture: 'https://scontent.fscl1-1.fna.fbcdn.net/v/t1.0-9/12439002_1127515210594949_7560565839229546516_n.jpg?oh=53e03716e4115324dd05bb445827c382&oe=59BA53A1',
          displayName: 'Pedro Avaria',
          username: 'pedroavaria',
          date : Date.now()-180000,
          rettweets:0,
          favorities:0
        },
        {
            id: uuid.v4(),
          text: 'Este es un nuevo mensaje',
          picture: 'https://scontent.fscl1-1.fna.fbcdn.net/v/t1.0-9/12439002_1127515210594949_7560565839229546516_n.jpg?oh=53e03716e4115324dd05bb445827c382&oe=59BA53A1',
          displayName: 'Pedro Avaria',
          username: 'pedroavaria',
          date : Date.now()-1800000,
          rettweets:0,
          favorities:0
        }
      ]
    }
    this.handleSendText=this.handleSendText.bind(this)
    this.handleCloseText=this.handleCloseText.bind(this)
    this.handleOpenText=this.handleOpenText.bind(this)
    this.handleRetweet=this.handleRetweet.bind(this)
    this.handleFavorite=this.handleFavorite.bind(this)
    this.handleReplyTweet=this.handleReplyTweet.bind(this)

  }
  handleSendText(event){
      event.preventDefault()
      let newMessage={
          id: uuid.v4(),
          username:this.props.user.email.split('@')[0],
          displayName:this.props.user.displayName,
          picture: this.props.user.photoURL,
          date:Date.now(),
          text:event.target.text.value,
          rettweets:0,
          favorities:0
      }
      this.setState({
        messages: this.state.messages.concat(newMessage),
        openText: false
      })
  }
  handleCloseText(even){
      event.preventDefault()
      this.setState({openText: false})
  }

  handleOpenText (event) {
    event.preventDefault()
    this.setState({ openText: true })
  }

  renderOpenText(){
    if (this.state.openText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          usernameToReply={this.state.usernameToReply}
        />
      )
    }
  }

  handleRetweet(msgId){
    let alreadyRetweeted = this.state.user.rettweets.filter(rt => rt === msgId)
    if (alreadyRetweeted.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.rettweets++
        }
        return msg
      })
      let user = Object.assign({},this.state.user)
      user.rettweets.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }
  handleFavorite(msgId){
    let alreadyFavorited = this.state.user.favorities.filter(fav => fav === msgId)
    if (alreadyFavorited.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favorities++
        //  console.log('presiono favorites '+msg.favorities);
        }
        return msg
      })
      let user = Object.assign({},this.state.user)
      user.favorities.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  handleReplyTweet(msgId,usernameToReply){
    this.setState({
      openText:true,
      usernameToReply
    })
  }
  render(){
    return(
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText.bind(this)}
        />
        {this.renderOpenText()}
        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavorite={this.handleFavorite}
          onReplyTweet={this.handleReplyTweet}
        />
      </div>
    )
  }
}

export default Main
