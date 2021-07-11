import React from 'react';
import { Router, Route } from 'react-router-dom';

// import root level components
import Header from './components/Header';
import Home from './components/Home';

// user component
import UserPosts from './components/user/UserPosts';

// post components 
import EditPost from './components/posts/EditPost';
import DeletePost from './components/posts/DeletePost';
import SinglePost from './components/posts/SinglePost';
import CreatePost from './components/posts/CreatePost';

// comment components
import UserComments from './components/user/UserComments';
import EditComment from './components/comments/EditComment';
import DeleteComment from './components/comments/DeleteComment';

// custom history object
import history from './history';

const App = () => {
    return (
        <div className="ui header">
            <Router history={history}>
                <Header />
                <div>
                    {/* Main pages */}
                    <Route path="/" exact component={ Home } />
                    <Route path="/create" exact component={ CreatePost } />
                    {/* POST CRUD FUNCTIONS */}
                    <Route path="/single/:id" exact component={ SinglePost } />
                    <Route path="/posts" exact component={ UserPosts } />
                    <Route path="/posts/edit/:id" exact component={ EditPost } />
                    <Route path="/posts/delete/:id" exact component={ DeletePost } />
                    {/* COMMENT CRUD FUNCTIONS */}
                    <Route path="/comments" exact component={ UserComments } />
                    <Route path="/comments/edit/:id" exact component={ EditComment } />
                    <Route path="/comments/delete/:id" exact component={ DeleteComment } />
                </div>
            </Router>
        </div>
    );
}

export default App;

