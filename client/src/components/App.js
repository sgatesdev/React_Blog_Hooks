import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header';
import AllPosts from './AllPosts';
import UserPosts from './UserPosts';
import Create from './Create';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

import history from '../history';

const App = () => {
    return (
        <div className="ui header">
            <Router history={history}>
                <Header />
                <div>
                    <Route path="/" exact component={ AllPosts } />
                    <Route path="/posts" exact component={ UserPosts } />
                    <Route path="/posts/edit/:id" exact component={ EditPost } />
                    <Route path="/posts/delete/:id" exact component={ DeletePost } />
                    <Route path="/create" exact component={ Create } />
                </div>
            </Router>
        </div>
    );
}

export default App;

