import React, {useState} from "react";
import './styles.css'

const Form = ({searchRes, setSearchRes, setWord, data, setDate}) => {
    const handleChange = (val) => {
        setWord(val)
        let oldList = data.map(item => item)
        if (val !== '') {
            let newList = []
            newList = oldList.filter(item => item.name.toLowerCase().includes(val.toLowerCase()) || item.email.toLowerCase().includes(val.toLowerCase()))
            setSearchRes(newList)
        } else {
            setSearchRes(data)
        }
    }
    const handleSelectChange = (val) => {
        setDate([...data.sort((a, b) => a[val === 'Name' ? 'name' : 'email'].localeCompare(b[val === 'Name' ? 'name' : 'email'], {ignorePunctuation: true}))]);
        searchRes.length && setSearchRes([...searchRes.sort((a, b) => a[val === 'Name' ? 'name' : 'email'].localeCompare(b[val === 'Name' ? 'name' : 'email'], {ignorePunctuation: true}))]);
    }
    return (
        <div className="formContainer">
                <div className="formAttri">
                    <label className="textBox" htmlFor="user">Search</label>
                    <input className="textBox" type='text' onChange={(e) => handleChange(e.target.value)}/>
                </div>
                <div className="formAttri">
                    <label htmlFor="sort" className="textBox">Sort By</label>
                    <select className="dd" style={{borderColor: 'black'}}
                            onChange={(e) => handleSelectChange(e.target.value)}>
                        <option value="Name">Name</option>
                        <option value="Email">Email</option>
                    </select>
                </div>
        </div>
    )
}
export default Form;
