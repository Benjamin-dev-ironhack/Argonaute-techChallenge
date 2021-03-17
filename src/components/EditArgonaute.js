import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import "../styles/edit.css"


class EditArgonaute extends Component {

    state = {
        argonaute: {}
    }

    componentDidMount(){
        let argonauteId = this.props.match.params.argonauteId
        axios.get(`${config.API_URL}/api/argonautes/${argonauteId}`)
          .then((response) => {
              this.setState({argonaute: response.data})
          })
          .catch(() => {
              console.log('Detail fetch failed')
          })
    }

    handleNameChange = (event) => {
        let text = event.target.value
        let cloneArgonaute = JSON.parse(JSON.stringify(this.state.argonaute))
        cloneArgonaute.name = text

        this.setState({
            argonaute: cloneArgonaute
        })
    }

    handleDescriptionChange = (event) => {
        let text = event.target.value
        let cloneArgonaute = JSON.parse(JSON.stringify(this.state.argonaute))
        cloneArgonaute.description = text

        this.setState({
            argonaute: cloneArgonaute
        })
    }

    render() {
        const {argonaute} = this.state
        const {onEdit} = this.props
        return (
            <div className="container">
                <input type="text" onChange={this.handleNameChange} value={argonaute.name} />
                <input type="text" onChange={this.handleDescriptionChange} value={argonaute.description} />
                <Link to="/">
                <button onClick={() => {onEdit(argonaute)}}>Edit</button>
                </Link>
            </div>
        )
    }
}

export default EditArgonaute