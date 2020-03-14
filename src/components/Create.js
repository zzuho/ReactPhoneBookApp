import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('clinics');
    this.state = {
      name: '',
      tel: '', fax: '', email: '', adress: '',
      open:false
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, tel, fax, email, adress } = this.state;
    this.ref.add({
      name,
      tel, fax, email, adress
    }).then((docRef) => {
      this.setState({
        name: '',
        tel: '', fax: '', email: '', adress: '',open: false
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  
  render() {
    const {  name, tel, fax, email, adress } = this.state;
    
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              치과 추가
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">치과 목록</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Clinic's name" />
              </div>
              <div class="form-group">
                <label for="tel">Phone:</label>
                <input type="text" class="form-control" name="tel" value={tel} onChange={this.onChange} placeholder="Telephone" />
              </div>
              <div class="form-group">
                <label for="fax">Fax:</label>
                <input type="text" class="form-control" name="fax" value={fax} onChange={this.onChange} placeholder="Fax" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="adress">Adress:</label>
                <input type="text" class="form-control" name="adress" value={adress} onChange={this.onChange} placeholder="Adress"/>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;