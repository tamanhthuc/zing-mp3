import { Box } from '@mui/material';
import axios from 'axios';
import { SingerContext } from '../../context/SingerContext';
import React, { useContext, useEffect, useState } from 'react';
import UserComment from './UserComment';


export interface IListUserCommentProps {
  id: string;
}

interface ICommentListProps {
  comment: string;
  userAvatar: string;
  userName: string;
}

export default function ListUserComment({ id }: IListUserCommentProps) {

  const [commentList, setCommentList] = useState<ICommentListProps[]>([]);
  const value = useContext(SingerContext)
  const {listComment, setListComment}:any = value
  console.log("listComment", listComment)
  const getListComment = async () => {
    const res = await axios.get(`https://61d7f548e6744d0017ba8860.mockapi.io/singers/${id}`);
    setCommentList(res.data?.comments);
  };

  useEffect(() => {
    getListComment();
  }, []);

  console.log('commentList', commentList);
  return (
    
    <Box>
      {listComment?.map((itemComment:any, idx:any) => {
        return <UserComment itemComment={itemComment} key={idx} />;
      })}
    </Box>
  );
}
