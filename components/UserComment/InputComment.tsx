import { Avatar, Box } from '@mui/material';
import axios from 'axios';
import { SingerContext } from '../../context/SingerContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/reducers';


interface IInputCommentPops {
  id: string;
}

export default function InputComment({ id }: IInputCommentPops) {
  const info = firebase.auth().currentUser;
  const [comment, setComment] = useState('');
  const inputRef = useRef(null);
  const boxRef = useRef(null)
  const isSignIn = useSelector((state: IRootState) => state.models.isSign)
  const value = useContext(SingerContext)
  const {listComment, setListComment}:any = value
  
  console.log("isSignIn", isSignIn)
 
  const [data,setdata] = useState<{
      [key: string]: any | any[]
  }[]>([])
 
  const getData = async () => {
    const res = await axios.get("https://61d7f548e6744d0017ba8860.mockapi.io/singers")
    setdata(res.data)
  }
  const getCommentSinger = async (id: string) => {
    const res = await axios.get(`https://61d7f548e6744d0017ba8860.mockapi.io/singers/${id}`);
    setListComment(res.data.comments)
    console.log('res',res)
  }


  useEffect(() => {
    getData();
    getCommentSinger(id)
  },[id])

  const handleChange = (e:any) => {
    setComment(e.target.value)
  }

  const postComment = async () => {
    const item = [...data]?.find(item => item?.id === id);
    console.log("item", item)
    if(item) {
        item.comments = [...item.comments, {
            comment: comment,
            userAvatar: info?.photoURL,
            userName: info?.displayName
        }];
    }
    const res = await axios.put(`https://61d7f548e6744d0017ba8860.mockapi.io/singers/${id}`, item);
    return res;    
  };

  

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      console.log('comment', comment);
      setComment('');
      postComment().then(res => {
        const { data } = res;
        setListComment(data.comments);
      });
     
    }
  };

  

  return (
    <Box
      sx={{
        ml: '20px',
        mt: '30px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        pb: '10px',
      }}
      ref={boxRef}

    >
      <Box>
          
      {info && info.photoURL &&<Avatar alt="Remy Sharp" src={info.photoURL} />}
      </Box>
      <Box sx={{ ml: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Box
          component="input"
          placeholder="Viết bình luận"
          sx={{ width: '250px', border: 'none', height: '25px' }}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          ref={inputRef}
          value={comment}
        />
      </Box>
    </Box>
  );
}
