  import { Box } from '@mui/system';
import React from 'react';

export interface IUserCommentProps {
  itemComment: {
    comment:string,
    userName: string,
    userAvatar:string 
  }
}

export default function UserComment({itemComment}: IUserCommentProps) {

 
  const {comment, userAvatar, userName} = itemComment
  return (
    <Box sx={{display: "flex", ml: "20px",mt: "20px", color: "#fff"}}>
      <Box
        component="img"
        src={userAvatar}
        alt=""
        sx={{height: "40px", width: "40px", borderRadius: "50%"}}
      />

      <Box sx={{ml :"15px"}}>
          <Box sx={{fontSize: "16px", fontWeight: "600s"}}>
             {userName}
          </Box>
          <Box sx={{fontSize: "14px", color: ""}}>{comment}</Box>
      </Box>
    </Box>
  );
}
