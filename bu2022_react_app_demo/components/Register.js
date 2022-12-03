
import { useCallback, useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleOutlined } from '@ant-design/icons';
import NoteCard from './NoteCard'
import axios from 'axios';

const { TextArea } = Input;


function Register() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const [userList, setUserList] = useState([]);

    useEffect(()=> {
        axios.get(`http://localhost:5000` + `/users`, { withCredentials: true }).then((res) => {
            console.log('get users', res)
            setUserList(res)
        })
    }, [])

    const handleClickLogin = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChangeUsername = (evt) => {
        setUsername(evt.target.value)
    };

    
    const onChangePassword = (evt) => {
        setPassword(evt.target.value)
    };

    const handleClickSubmit = () => {
        console.log('userList', userList.data)
        if (userList.data.includes(username)) {
            alert('username already exists. Please choose a different user name.')
        } else {
            const submitData = {username: username, password: password}
            axios.post('http://localhost:5000' + `/register`, { submitData }, { withCredentials: true })    
        }
     }


    return (
        <div>
            <Button onClick={handleClickLogin}> Register </Button>
            <div>
                <Modal title="Register" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input
                        placeholder="input user name"
                        onChange={onChangeUsername}
                    />
                    <Input.Password
                        placeholder="input password"
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        onChange={onChangePassword}
                    />
                    <Button onClick={handleClickSubmit}> Submit </Button>
                </Modal>
            </div>

        </div>
    )
}

export default Register