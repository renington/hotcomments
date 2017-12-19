import React, { Component } from 'react'
import 'bootstrap-css-only'

import NewComment from './NewComment'
import Comments from './Comments'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      comments: {},
      isLoggedIn: false,
      user: {}
    }

    this.refComments = this.props.base.syncState('comments', {
      context: this,
      state: 'comments'
    })

    this.props.auth.onAuthStateChanged((user)=>{
      if(user){
        this.setState({ isLoggedIn: true, user })
      }else{
        this.setState({ isLoggedIn: false, user: {} })
      }
    })

    this.postNewComment = this.postNewComment.bind(this)
  }

  postNewComment(comment){
    comment.user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName
    }

    const comments = { ...this.state.comments }
    const timestamp = Date.now()
    comments[`comm-${timestamp}`] = comment

    this.setState({
      comments: comments
    })
  }

  auth(provider){
    this.props.auth.signInWithPopup(this.props.providers[provider])
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">HotComments</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              { this.state.isLoggedIn && 
                <ul class="nav navbar-nav pull-right">
                  <li><span id="user-name">{ this.state.user.displayName }</span></li>
                  <li><img id="avatar" alt={this.state.user.displayName} src={this.state.user.photoURL} height="30" /></li>
                  <li><a onClick={() => this.props.auth.signOut()}>Deslogar</a></li>
                </ul>
                }
              { !this.state.isLoggedIn && 
                <ul class="nav navbar-nav pull-right">
                  <li><a onClick={()=> this.auth('google')}>Sign in with Google Account</a></li>
                </ul>
              }
            </div>
          </div>
        </nav>
        <div className="container">
          { this.state.isLoggedIn &&
            <NewComment postNewComment={this.postNewComment} />
          }
          <Comments comments={this.state.comments} />
        </div>
      </div>
    )
  }
}

export default App