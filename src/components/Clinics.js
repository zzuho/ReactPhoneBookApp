import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Clinics extends Component {
    render() {
        return(
            <div>
                <tr key={c.key}>
                    <td>{c.name}</td>
                    <td><a href={`tel:${c.tel}`}>{c.tel}</a></td>
                    <td><Link to={`/show/${c.key}`} className="btn btn-primary btn-sm">more</Link></td>
                </tr> 
            </div>

        );
    }
}