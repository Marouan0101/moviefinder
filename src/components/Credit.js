import React from 'react';
import fetchPeople from '../Data/fetchPeople';
import { FaCircleNotch } from 'react-icons/fa';

const Credit = () => {
  const people = fetchPeople();

  if (!people) {
    return (
      <div>
        Loading Credits <FaCircleNotch className='animate-spin' />
      </div>
    );
  } else if (people) {
    const cast = people.cast;
    const crew = people.crew;
    const directors = crew.filter((person) => {
      return person.job === 'Director';
    });
    const writers = crew.filter((person) => {
      return person.job === 'Writer';
    });

    /* const result = crew.find((person) => {
      return person.job === 'Writer';
    }); */

    return (
      <div className='text-xl'>
        {directors.length > 1 ? (
          <div>
            <hr className='border-primary border-[0.5px] mb-5' />
            <div className='flex justify-between'>
              <span className='font-bold mr-20'>Directors</span>
              <div className='flex'>
                {directors.map((director) => {
                  return (
                    <div className='ml-10 first-of-type:ml-0'>
                      {director.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <hr className='border-primary border-[0.5px] mb-5' />
            <div className='flex justify-between'>
              <span className='font-bold mr-20'>Director</span>
              <div>{directors[0].name}</div>
            </div>
          </div>
        )}

        {writers.length > 1 ? (
          <div className='mt-5'>
            <hr className='border-primary border-[0.5px] mb-5' />
            <div className='flex justify-between'>
              <span className='font-bold'>Writers</span>

              <div className='flex'>
                {writers.map((writer) => {
                  return (
                    <div className='mr-10 last-of-type:mr-0'>{writer.name}</div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          writers.length > 0 && (
            <div className='mt-5'>
              <hr className='border-primary border-[0.5px] mb-5' />

              <div className='flex justify-between'>
                <span className='font-bold'>Writer</span>
                <div>{writers[0].name}</div>
              </div>
            </div>
          )
        )}

        <div className='mt-5'>
          <hr className='border-primary border-[0.5px] mb-5' />

          <div className='flex justify-between'>
            <span className='font-bold'>Stars</span>

            <div className='flex'>
              {cast.slice(0, 3).map((actor) => {
                return (
                  <div className='mr-10 last-of-type:mr-0'>{actor.name}</div>
                );
              })}
            </div>
          </div>

          <hr className='border-primary border-[0.5px] mt-5' />
        </div>
      </div>
    );
  }
};

export default Credit;
