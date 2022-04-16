import fetchGenreList from './fetchGenreList';

const CreateNavigationLinks = () => {
  return [
    { id: 1, title: 'Home', url: '/', hasChildren: false },
    { id: 2, title: 'Popular', url: '/Popular', hasChildren: false },
    { id: 3, title: 'Collections', url: '/Collections', hasChildren: false },
    {
      id: 4,
      title: 'Genres',
      hasChildren: true,
      children: fetchGenreList(),
    },
    { id: 5, title: 'Actors', url: '/Actors', hasChildren: false },
  ];
};

export default CreateNavigationLinks;
