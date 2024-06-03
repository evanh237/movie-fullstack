import React, { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewform/ReviewForm";
import axios from "axios";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  const api = axios.create({ baseURL: "http://localhost:8080" });
  //   const [movie, setMovie] = useState(null);
  //   const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieData(movieId);
    // console.log("Movie ID:", movieId);
  }, [movieId]);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await api.post(`api/v1/reviews`, {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...(reviews || []), { body: rev.value }];

      setReviews(updatedReviews);

      rev.value = "";
    } catch (error) {
      console.error("error adding review!", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          {movie?.poster ? (
            <img src={movie.poster} alt={movie.title} />
          ) : (
            <p>Loading movie poster...</p>
          )}
        </Col>
        <Col>
          <Row>
            <Col>
              <ReviewForm
                handleSubmit={addReview}
                revText={revText}
                labelText="Review This Movie!"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          {reviews?.length ? (
            reviews.map((r, index) => (
              <React.Fragment key={index}>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </React.Fragment>
            ))
          ) : (
            <Row>
              <Col>
                <p>No Reviews Yet!</p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
