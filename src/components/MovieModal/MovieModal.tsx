import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {movie.poster_path && (
          <img
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <div className={styles.content}>
          <h2 className={styles.title} id="movie-title">
            {movie.title}
          </h2>

          <p className={styles.overview}>
            {movie.overview || "No description available."}
          </p>

          <p className={styles.date}>
            Release date: {movie.release_date || "Unknown"}
          </p>

          <p className={styles.rating}>
            Rating: {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
