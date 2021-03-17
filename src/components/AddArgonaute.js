import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../styles/home.css"

class AddArgonaute extends Component {

    render() {
      const {argonautes} = this.props
        return (
            <div className="mainContainer">
             <div className="container">
              <h2>Ajouter un(e) Argonaute</h2>
              <h3>Nom de l'Argonaute</h3>
              <form onSubmit={this.props.onAdd}>
                <input name="name" type="text" placeholder="argonaute" />
                <input name="description" type="text" placeholder="description" />
                <button type="submit">Submit</button>
              </form>
              <div>
               <div>
                <h2>Membres de l'équipages</h2>
               </div>
              </div>
             </div>
             <div className="dataPrint">
               {
                    argonautes.map((argonaute) => {
                        return <Link style={{ textDecoration: 'none' }} key={argonaute._id} to={`/argonautes/${argonaute._id}`}>
                        <div className="oneAgronaute">
                          <h5>{argonaute.name} {argonaute.description}</h5>
                        </div>
                        </Link>
                    })
                }
               </div>
            </div>
        )
    }
}

export default AddArgonaute
