import { Link } from "react-router-dom";

function About() {
  return (
    <main>
      <Link to="/">Back</Link>
      <h2>About</h2>
      <p>
        Do you ever find yourself trying to remember the name of a film, but can
        only remember the actors? Then you can use Find That Film to help you
        rediscover it.
      </p>
      <h2>How to use</h2>
      <p>
        To add an actor or director to your search, select "actor" or "director"
        from the category select and then search for them by name. Then click
        one to add them to your film criteria.
      </p>
      <p>
        To add a genre to your search, select "genres" from the category select
        and then pick one from the dropdown. Then click submit.
      </p>
      <p>
        Finally, click "Find films" to see all the films which match your
        criteria!
      </p>
      <h2>Info</h2>
      <p>
        This website was made by Chris Duckworth. You can view the GitHub source
        code{" "}
        <a href="https://github.com/chrisRduckworth/find-that-film">here.</a>
      </p>
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <a href="https://www.themoviedb.org/" target="_blank">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="TMDB logo"
        />
      </a>
    </main>
  );
}

export default About;
