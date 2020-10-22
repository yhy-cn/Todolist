import React from 'react';
// import ToDoList from './page/todolist'
import 'semantic-ui-css/semantic.min.css'
import {HashRouter,Redirect,Route,Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const ToDoList =Loadable({
  loader:()=>import('./page/todolist'),
  loading:()=> <div>加载中</div>
})
const Home =Loadable({
  loader:()=>import('./page/home'),
  loading:()=> <Segment>
  <Dimmer active inverted>
    <Loader inverted>Loading</Loader>
  </Dimmer>
</Segment>
})

function App() {
  return (
    <div className="App">
     <HashRouter>
       <Switch>
         <Redirect exact from='/' to='/todolist' />
         <Route path='/todolist' component={ToDoList} />
         <Route path='/Home' component={Home} />
       </Switch>
     </HashRouter>
    </div>
  );
}

export default App;
