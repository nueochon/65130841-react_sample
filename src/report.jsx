import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import Common from "./common";
const BASE_URL = Common.API_URL;
export default class report extends Component {
  state = {
    zipcode: 33000,
    amphur_code: 0,
    amphur_name: "",
    province_code: 0,
    province_name: "",
    district: [],
  };
  getData = async () => {
    if(this.state.zipcode.length <5){
      return false;
    }
    try {
      await axios
        .get(`${BASE_URL}/${this.state.zipcode}`)
        .then((response) => {
          let res = response.data;

          if (res.district === undefined) {
            this.setState({
              district: [],
            });
          }
          this.setState({
            amphur_name: res.amphur_name,
            province_name: res.province_name,
            district: res.district,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  filter = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const { district } = this.state;
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#">ค้นหาเลขไปรษณีย์</Navbar.Brand>
            <div style={{color:"#ffffff" , fontSize:"19px"}}>
              <Image src="https://scontent.fbkk15-1.fna.fbcdn.net/v/t1.6435-9/132151530_2115052838627669_1840709369983232305_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHiDzgvVFo7nm6nxYn9EA4kzB882JeeFwDMHzzYl54XAKExve-92lQOAPWSgqVUnPHtTbGZZ5LaEh9wx8DLREE-&_nc_ohc=0eSqdbfjhaAAX8wFoBE&_nc_ht=scontent.fbkk15-1.fna&oh=00_AfBq6hU15Ga-ZiBoQo34La17LBRJkOilXp0echcVIwq8dA&oe=6417E2E1"
              roundedCircle style={{width:"50px",height:"50px"}}/>
          {"  "} 65130841 Nueochon Kaewjittawong</div>
          </Container>
        </Navbar>
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <Row>
              <Col lg="9">
                <div align="left">
                  <h3>
                    อำเภอ <u>{this.state.amphur_name}</u> จังหวัด{" "}
                    <u>
                      {this.state.province_name} {this.state.zipcode}
                    </u>
                  </h3>
                </div>
              </Col>
              <Col lg="3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="ระบุเลขไปรษณีย์ 5 หลัก"
                    onChange={this.filter}
                    onKeyUp={this.filter}
                    maxLength="5"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสตำบล</th>
                      <th>ตำบล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {district?.map((rs, index) => (
                      <tr key={index}>
                        <td align="center">{index + 1}</td>
                        <td>{rs.district_code}</td>
                        <td>{rs.district_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}
