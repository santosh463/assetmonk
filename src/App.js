import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Posts from './components/Posts'
import Albums from './components/Albums'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/albums" component={Albums} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
