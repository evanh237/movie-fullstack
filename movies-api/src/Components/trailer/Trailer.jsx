import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Trailer.css";

const Trailer = () => {
  //   let params = useParams();
  const key = useParams()?.ytTrailerId;

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          controls={true}
          playing={true}
          //   url={`https://www.youtube.com/watch?v=${key}`}
          url={`https://www.youtube-nocookie.com/embed/${key}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
};

export default Trailer;
