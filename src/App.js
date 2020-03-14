import React, {Component}from 'react';
import './App.css';
import List from './components/List';
import { Form,FormControl,Navbar,Button } from 'react-bootstrap';
import Add from './components/Add';

export default class App extends Component {
  render() {
   return (
    <div>
      <Navbar bg="primary" variant="dark" expand="md">
        <Navbar.Brand href="/">썬아트</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <FormControl type="text" placeholder="치과검색" className="mr-sm-2" />
            <Button type="submit" variant="outline-light">검색</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Add/><input name="keyword" placeholder="Search" onChange={this.handleChange}/>
      <List/> 
    </div>  
    );
  }
}
