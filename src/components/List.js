import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { Table } from 'react-bootstrap';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('clinics');
    this.unsubscribe = null;
    this.state ={
      clinics: []
    };
  }
 
  onCollectionUpdate = (querySnapshot) => {
        const clinics = [];
        querySnapshot.forEach((doc) => {
          const {name,tel,fax,email,adress} = doc.data();
          clinics.push({
            key: doc.id,
            doc, //DocumentSnapshot
            name, tel, fax, email, adress
          });
        });
        this.setState({
          clinics
        });
      }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Clinics</th>
            <th>Phone</th>
            <th>Etc.</th>
          </tr>
        </thead>
        <tbody>
          {this.state.clinics.map(c =>
          <tr key={c.key}>
            <td>{c.name}</td>
            <td><a href={`tel:${c.tel}`}>{c.tel}</a></td>
            <td><Link to={`/show/${c.key}`} className="btn btn-primary btn-sm">more</Link></td>
          </tr> 
          )}
        </tbody>
     </Table>
    );
  }  
}
