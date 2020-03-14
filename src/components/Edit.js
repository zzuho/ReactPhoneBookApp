import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      tel: '', fax: '', email: '', adress: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('clinics').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const clinic = doc.data();
        this.setState({
          key: doc.id,
          name: clinic.name, tel: clinic.tel,
          fax: clinic.fax, email: clinic.email,
          adress: clinic.adress
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({clinic:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, tel, fax, email, adress } = this.state;
    const updateRef = firebase.firestore().collection('clinics').doc(this.state.key);
    updateRef.set({
      name, tel, fax, email, adress
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        tel: '', fax: '', email: '', adress: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              치과 정보 수정
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to='/' className="btn btn-primary">치과 목록</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Clinic's name" />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input type="text" className="form-control" name="tel" value={this.state.tel} onChange={this.onChange} placeholder="Telephone" />
              </div>
              <div className="form-group">
                <label>Fax:</label>
                <input type="text" className="form-control" name="fax" value={this.state.fax} onChange={this.onChange} placeholder="Fax" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Adress:</label>
                <input type="text" className="form-control" name="adress" value={this.state.adress} onChange={this.onChange} placeholder="Adress" />
              </div>
              <button type="submit" className="btn btn-success">확인</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;