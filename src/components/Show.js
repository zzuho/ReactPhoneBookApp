import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Clipboard from 'react-clipboard.js';
import { Button, Modal, Card, Container, Row, Col } from 'react-bootstrap';

class Show extends Component {

  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      clinic: {},
      key: '',
      open: false
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('clinics').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          clinic: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such Clinics!");
      }
    });
  }

  delete(id){
      firebase.firestore().collection('clinics').doc(id).delete().then(() => {
      console.log("Successfully deleted!");
      this.props.history.push("/")
      }).catch((error) => {
      console.error("Error removing document: ", error);
      });
      this.handleClose();
  }

  handleOpen() {
    this.setState({open:true});
  }

  handleClose() {
    this.setState({open:false});
  }

  onSuccess() {
    alert('Successfully copied');
  }

  render() {
    return (
      <div>
        <Card border="primary" style={{ width: '24rem' }}>
          <Card.Header as="h5"> {this.state.clinic.name}</Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Phone</Card.Title>
            <Card.Text><a href={`tel:${this.state.clinic.tel}`}>{this.state.clinic.tel}</a></Card.Text>
            <Card.Title className="text-muted">FAX</Card.Title>
            <Card.Text><a href={`fax:${this.state.clinic.fax}`}>{this.state.clinic.fax}</a></Card.Text>
            <Card.Title className="text-muted">Email</Card.Title>
            <Card.Text><a href={`mailto:${this.state.clinic.email}`}>{this.state.clinic.email}</a></Card.Text>
            <Card.Title className="text-muted">Adress</Card.Title>
            <Card.Text className="text-muted"> {this.state.clinic.adress}&nbsp;
              <Clipboard data-clipboard-text={this.state.clinic.adress} onSuccess={this.onSuccess} button-title="주소 복사하기">
                    복사하기
              </Clipboard>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Container>
              <Row>
                <Col xs={6}>
                  <Link to={`/edit/${this.state.key}`} className="btn btn-success">수정</Link>&nbsp;
                  <Button variant="danger" onClick={this.handleOpen}>삭제</Button>
                  <Modal color="danger" size="sm" show={this.state.open} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>삭제경고!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{`${this.state.clinic.name} 을(를) 영구히 삭제 하시겠습니까?`}</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary"onClick={this.handleClose}>취소</Button>
                      <Button variant="danger" onClick={this.delete.bind(this, this.state.key)}>삭제</Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <Col xs={{ span:5, offset:1}}>
                  <Link to='/' className="btn btn-primary">치과목록</Link>
                </Col>
              </Row>
            </Container>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default Show;