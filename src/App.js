import React, { Component } from  "react";
import { Switch, Route } from  "react-router-dom";
import config from "./config";
import axios from "axios";
import Nav from "./components/Nav";
import AddArgonaute from "./components/AddArgonaute";
import Argonautes from "./components/Argonautes";
import EditArgonaute from "./components/EditArgonaute";


class App extends Component {

  state = {
    argonautes: []
  }

  componentDidMount() {
    axios.get(`${config.API_URL}/api/argonautes`)
      .then((response) => {
        this.setState({argonautes: response.data})
      })
      .catch(() => {
        console.log('Fectching failed')
      })
  }

  handleSubmit = (event) => { 
    event.preventDefault()
    let name = event.target.name.value
    let description = event.target.description.value

    axios.post(`${config.API_URL}/api/create`, {
      name: name,
      description: description,
    })
      .then((response) => {
        this.setState({
          argonautes: [response.data, ...this.state.argonautes]
        })
      })
      .catch(() => {
        console.log('create failed')
      })
  }

  handleEditArgonaute = (argonaute) => {
    axios.patch(`${config.API_URL}/api/argonautes/${argonaute._id}`, {
      name: argonaute.name,
      description: argonaute.description,
    })
    .then(() => {
      let cloneArgonautes = JSON.parse(JSON.stringify(this.state.argonautes))
      cloneArgonautes.forEach((singleArgonaute) => {
        if (argonaute._id === singleArgonaute._id) {
          singleArgonaute.name = argonaute.name
          singleArgonaute.description = argonaute.description
        }
      })
      this.setState({
        argonautes: cloneArgonautes
      })
    })
    .catch((err) => {
      console.log('Edit failed', err)
    })

  }

  handleDeleteArgonaute = (argonauteId) => (
    axios.delete(`${config.API_URL}/api/argonautes/${argonauteId}`)
      .then(() => {
        let filteredArgonautes = this.state.argonautes.filter((argonaute) => {
          return argonaute._id !== argonauteId
        })
        this.setState({
          argonautes: filteredArgonautes
        })
      })
      .catch((err) => {
        console.log('delete failed', err)
      })
  )


	render() {

    const {argonautes} = this.state

		return (
		<div>
      <Nav />
      <Switch>
          <Route exact path="/" render={() => {
            return <AddArgonaute onAdd={this.handleSubmit} argonautes={argonautes} />
          }}/>
          <Route exact path="/argonautes/:argonauteId" render={(routeProps) => {
            return <Argonautes onDelete={this.handleDeleteArgonaute} {...routeProps} />
          }}/>
          <Route path="/argonautes/:argonauteId/edit" render={(routeProps) => {
            return <EditArgonaute onEdit={this.handleEditArgonaute} {...routeProps}/>
          }}/>
        </Switch>
		</div>
		);
	}
}

export  default App;