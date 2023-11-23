// find post by id 
import { Button, Card  } from 'react-bootstrap';
import Auth from '../../utils/auth'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {ADD_COMMENT } from '../../utils/mutations'
import {GET_SINGLE_POST} from '../../utils/queries'
import dayjs from 'dayjs'
dayjs().format()

const HomeComment = ({ postId}) => {
  const { loading, data } = useQuery(GET_SINGLE_POST,{
    variables: { postId: postId },
    fetchPolicy: 'cache-and-network',
  });
  const  postData = data?.getSinglePost || []
  console.log("postData",postData.postComments)
  const [updatedData, setUpdatedData] = useState({userId: "", commentText: "" })
  
  const [addComment, {error}] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_SINGLE_POST],
  });

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  }

  const commentPost = async(postId)=>{
    try{
      await addComment({
        variables: { 
          commentText: updatedData.commentText,
          postId:postId
          }
      })
      if (error) {
        throw new Error('Unable to update post');
      }
    }catch (err){
      console.error(err)
    }
  }

  const date = async(commentDate)=>{
    return new Date(commentDate *1000)
  }
  if (loading) {
    return (
    <>
      <h1>Loading...</h1>
      {/* {Array.from({ length: 5 }, (_, index) => ({
        title: 'Loading Article ' + (index + 1),
        content: 'Loading content...',
      }))} */}
    </>
    )
    
  }

  return (
    <>
        <h5>Comments:</h5>
        {postData.postComments.length  ?  
        <>
        {postData.postComments.map((posts, index) => (
            <Card key={index}  className="mb-4">
            <Card.Body>
            <Card.Text>{posts.commentText}</Card.Text>
            <Card.Text>{new Date(parseInt(posts.createdAt)).toLocaleDateString()}</Card.Text>
            <Card.Text>{posts.author.username}</Card.Text>
            </Card.Body>
        </Card>
        ))}
        </> : 
        <Card >
         <Card.Body>
          <Card.Text>No Comments Yet</Card.Text>
        </Card.Body>
        </Card>}
        
          {Auth.loggedIn()?
          <>
            <h4 className="mt-4">Add a Comment:</h4>
            <InputGroup className="mt-2">
            <Form.Control
              className="mb-2"
              name='commentText'
              onChange={updateData}
              value={updatedData.commentText}
              /> 
            </InputGroup>
            <Button style={{ background: "#14e956" , border: "black", color:"black"}} onClick={()=>commentPost(postId)}>Post Comment</Button>
          </>:[]}
    </>
  );
};

export default HomeComment;