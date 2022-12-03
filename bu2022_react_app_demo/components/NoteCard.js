
import { useCallback, useState, useEffect } from 'react';
import { Input } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;


function NoteCard(props) {

  return (
    <div style={{ backgroundColor: 'white', width: '100%' }}>
        <p> This is Note Card {props.data}</p>
    </div>

  )
}

export default NoteCard