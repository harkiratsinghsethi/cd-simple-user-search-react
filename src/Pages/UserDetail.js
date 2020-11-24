import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './styles.css'
const UserDetail = () => {
    const [details, setDetails] = useState({})
    const [posts, setPosts] = useState([])
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    const renderCard = (title) => {
        let card = <div>loading....</div>
        if (Object.keys(details).length !== 0) {
            if (title === 'Contact Info') {
                card = <div>
                    <h4>{title}</h4>
                    <div>  {`UserName: ${details.name}`}</div>
                    <div> Email: <a href={`mailto:${details.email}`}>{details.email}</a></div>
                    <div>Phone: <a href={`tel:${details.phone}`}>{details.phone}</a></div>
                    <div>Website: <a href={`${details.website}`} rel="noreferrer" target="_blank">{details.website}</a></div>
                </div>
            } else if (title === 'Address') {
                card = <div>
                    <h4>{title}</h4>
                    <span> {details.address.suite} {details.address.street}, {details.address.city}, {details.address.zipcode} </span>
                </div>
            } else {
                card = <div>
                    <h4>Company</h4>
                    <div>  {details.company.name}</div>
                    <div>  {details.company.bs.charAt(0).toUpperCase() + details.company.bs.slice(1)}</div>
                    <i> "{details.company.catchPhrase}"</i>
                </div>
            }
        }
        return card
    }

    const renderPosts = () => {
        return posts.map(item => <div className="post-grid-item">
                <div className="post-title"><strong>{item.title}</strong></div>
                <div>{item.body}</div>

            </div>
        )
    }
    const getUserDetails = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(resp => resp.json())
            .then(respJson => setDetails(respJson))
    }
    const getPosts = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(resp => resp.json())
            .then(respJson => setPosts(respJson))
    }
    useEffect(() => {
        getUserDetails()
        getPosts()
    }, [])
    return (
        <div className="container">
            <div><h2><Link to="/">{'Users'}</Link> > {details.name}</h2></div>
            <div className="main-grid">
                <div className="grid-item">{Object.keys(details).length !== 0 && renderCard('Contact Info')}</div>
                <div className="grid-item"> {Object.keys(details).length !== 0 && renderCard('Address')}</div>
                <div className="grid-item">{Object.keys(details).length !== 0 && renderCard('Company')}</div>
            </div>
            <div className="post-container">
                <div><h2>Posts by {details.name}</h2></div>
                <div className="post-grid">
                    {renderPosts()}
                </div>
            </div>
        </div>
    )
}
export default UserDetail;
