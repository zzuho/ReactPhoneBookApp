import React, { Component } from 'react';
import firebase from '../Firebase';
import { Form, Modal, Button } from 'react-bootstrap';

export default class Add extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('clinics');
    this.clickOpen = this.clickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
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
     // this.props.history.push("/");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  clickOpen() {
    this.setState({open:true});
  }

  handleClose() {
    this.setState({
      name: '', tel: '', fax: '', email: '', adress: '',open: false
    });
  }

  render() {
    const {  name, tel, fax, email, adress } = this.props;
    
    return (
        <div>
            <Button variant="outline-danger" size="sm" onClick={this.clickOpen}>치과추가</Button>
            <Modal show={this.state.open} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>치과 추가</Modal.Title>
                </Modal.Header>    
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>치과명</Form.Label>
                            <Form.Control name= "name" type="text" value={name} onChange={this.onChange} placeholder="Enter clinic's name" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group controlId="formTel">
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control name="tel" type="text" value={tel} onChange={this.onChange} placeholder="Enter telephone number" />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group controlId="formFax">
                            <Form.Label>팩스번호</Form.Label>
                            <Form.Control name="fax" type="text" value={fax} onChange={this.onChange} placeholder="Enter fax number" />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control name="email" type="email" value={email} onChange={this.onChange} placeholder="Enter email" />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group controlId="formAdress">
                            <Form.Label>주 소</Form.Label>
                            <Form.Control name="adress" type="text" value={adress} onChange={this.onChange} placeholder="Enter adress" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>취소</Button>
                    <Button variant="primary" onClick={this.onSubmit}>추가하기</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
  }
}