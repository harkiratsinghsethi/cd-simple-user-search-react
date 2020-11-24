import React, {useState, useEffect} from "react";
import '../components/styles.css'
import Form from "../components/Form";

import {useHistory, useLocation} from 'react-router-dom';

const UserDetails = () => {
    const [data, setDate] = useState([])
    const [searchRes, setSearchRes] = useState([])
    const [word, setWord] = useState([])
    const history = useHistory();
    const {search} = useLocation();
    const getDate = () => {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(resp => resp.json())
            .then(respJson => {
                setDate(respJson.sort((A, B) => A['name'].localeCompare(B['name'])));
            })
    }

    const styleRow = (name, email) => {
        return (<div className="cell">
            <div className="circle"/>
            <div className="name"> {name}</div>
            <a href={`mailto:${email}`} className="email" onClick={(e) => e.stopPropagation()}>{email}</a>
        </div>)
    }

    const handleCellClick = (val) => {
        history.push(`/user${search}?id=${val.id}`);
    }

    const getRowsData = (data) => {
        return data.map(item => <tr>
            <td key={Math.random()}
                id={data.id}
                onClick={() => handleCellClick(item)}>
                {styleRow(item.name, item.email)}
            </td>
        </tr>)
    }
    useEffect(() => {
        getDate()
    }, [])
    return (
        <div className="user-container-box container">
            <h3 className="h1tag">Users</h3>
            <Form searchRes={searchRes} setSearchRes={setSearchRes} word={word} setWord={setWord} data={data}
                  setDate={setDate}/>
            <div className="usersDetails">
                <div>
                    <table className="tableStyle">
                        <tbody>
                        {getRowsData(word.length < 1 ? data : searchRes)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
