package dev.evan.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.aggregation.SelectionOperators.First.first;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo
            reviewRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId) {
        Review review = reviewRepo.insert(new Review(reviewBody));

        ObjectId reviewId = review.getId();

        Query query = Query.query(Criteria.where("imdbId").is(imdbId));
        Update update = new Update().push("reviewIds", reviewId);
        var updateResult = mongoTemplate.updateFirst(query, update, Movie.class);

//
//        mongoTemplate.update(Movie.class)
//                .matching(Criteria.where("imdbId").is(imdbId))
//                .apply(new Update().push("reviewIds").value(review));
//
//    mongoTemplate.updateFirst(
////            Query query = Query.query(Criteria.where("imdbId").is(imdbId));
////            Update update = new Update().push("reviewIds", review.getId());
////            var updateResult = mongoTemplate.updateFirst(query, update, Movie.class);
//
//
//
        return review;
    }


}
