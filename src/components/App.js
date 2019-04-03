import React, { Component } from 'react';

import './App.css';
import Post from './Post/Post.js';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(res => {
        console.log("===== Success! =====");
        this.setState({
          posts: res.data
        })
      })
      .catch(err =>{
        console.log( "===== Failure =====" );
        console.log( err );
      })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => {
      console.log("===== PUT Success! =====");
      this.setState({
      posts: res.data
      });

    })
    .catch(err =>{
      console.log( "===== PUT Fialure =====" );
      console.log(err);
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
    .then( res => {
      console.log("====== Delete Success! ======");
      this.setState({
        posts: res.data
      });
    })
    .catch(err =>{
      console.log( "====== Delete Failure ======" );
      console.log(err);
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
    .then(res => {
      console.log("===== Post Success! =====");
      this.setState({
      posts: res.data
      });

    })
    .catch(err =>{
      console.log( "===== Post Fialure =====" );
      console.log(err);
    });
  }

    searchPost(text) {

      axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${ text }`)
      .then(res => {
        console.log("===== Search Success! =====");
        this.setState({
        posts: res.data
        });
      })
      .catch(err =>{
        console.log( "===== Post Fialure =====" );
        console.log(err);
      });

  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header searchPostFn={ this.searchPost }/>

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map( post => ( 
              <Post key={ post.id }
                    text={ post.text }
                    date={ post.date }
                    id={ post.id }
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost }
                     />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
