import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import {Link} from 'react-router-dom';

class Argonautes extends Component {

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

    render() {
        const{argonaute} = this.state
        const {onDelete} = this.props
        return (
            <div className="container">
                <h4>Details are:</h4>
                <div>Name: {argonaute.name}</div>
                <div>Description: {argonaute.description}</div>
                <Link to={`/argonautes/${argonaute._id}/edit`}>
                <button>Edit</button>
                </Link>
                <Link to="/">
                <button onClick={() => {onDelete(argonaute._id)}}>Delete</button>
                </Link>
            </div>
        )
    }
}



export default Argonautes
