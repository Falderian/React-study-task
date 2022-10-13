import { IGenres } from 'interfaces/searchCard';
import React from 'react';
import PropTypes from 'prop-types';

export const returnGenresString = (arr: IGenres) => {
  let result = '';
  arr.forEach((it) => {
    result += it.name.toLowerCase() + ', ';
    +',';
  });
  return result.slice(0, result.length - 2);
};

export const YoutubeEmbed = ({ embedId }: { embedId: string }) => {
  return (
    <div className="modal__trailer">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
