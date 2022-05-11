import fetchGenreList from './fetchGenreList';
import {
  HomeIcon,
  FireIcon,
  CollectionIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

const CreateNavigationLinks = () => {
  return [
    { id: 1, title: 'Home', url: '/', hasChildren: false, icon: <HomeIcon /> },
    {
      id: 2,
      title: 'Popular',
      url: '/Popular',
      hasChildren: false,
      icon: <FireIcon />,
    },
    {
      id: 3,
      title: 'Collections',
      url: '/Collections',
      hasChildren: false,
      icon: <CollectionIcon />,
    },
    {
      id: 5,
      title: 'Actors',
      url: '/Actors',
      hasChildren: false,
      icon: <UserGroupIcon />,
    },
    {
      id: 4,
      title: 'Genres',
      hasChildren: true,
      children: fetchGenreList(),
    },
  ];
};

export default CreateNavigationLinks;
