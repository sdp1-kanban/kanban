import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../services/DataService";
import { Label, Input, Form, FormGroup, Button, Textarea } from './ReviewNote.styled';


function ReviewNote(props) {
  const { id } = props;
  const initialState = {
    content: "",
    author: "",
  };
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialState);
  const [reviews, setReview] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [x, setX] = useState(true);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    // let isMounted = true; 
    getReview();
    setRefresh(false);
    // return () => { isMounted = false }; 
  }, [refresh]);

  const getReview = async () => {
    const result = await DataService.getReviews(props.id).then((result) => {
      setReview(result.data.data);

    });
  };

  const handleSubmit = (event, id) => {
    event.preventDefault();


    const reviewToAdd = {
      ...data,
    };

    // API call to post review to DB
    const postReview = async () => {
      const result = await DataService.updateReview(props.id, reviewToAdd)
        .then((res) => {
          console.log(res);
          setData('')
        });
    };
    postReview();
    window.location.reload()
  };




  return (
    <div>

      {reviews.map((review) => {
        return (
          <div key={review.content} className="reviews-list">
            <ul>
              <li>
                <p style={{margin: 0}}>Author: {review.author}</p>
              </li>
              <li>
                <p style={{margin: 0}}>Note: {review.content}</p>
                <hr />
              </li>
            </ul>

          </div>
        );
      })}
      <span><Button onClick={() => { setShow(!show); setX(!x) }}>{x ? "Add Note" : "Cancel"}</Button></span>
      {
        show ?

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Author</Label>
              <Input
                required
                type="text"
                placeholder="Author"
                value={data.author}
                name="author"
                onChange={handleChange}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label>Content</Label>
              <Textarea
                required
                type="text"
                placeholder="Content"
                value={data.content}
                name="content"
                onChange={handleChange}
              ></Textarea>
            </FormGroup>

            <FormGroup>
              <Button type="submit">Save Note</Button>
            </FormGroup>
          </Form>


          : null
      }



    </div>
  )
}

export default ReviewNote;
