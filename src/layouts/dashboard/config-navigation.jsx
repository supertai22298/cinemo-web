import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'movie finder',
    path: '/movies',
    icon: icon('ic_user'),
  },
  {
    title: 'my favourite',
    path: '/my-favourite',
    icon: icon('ic_user'),
  }
];

export default navConfig;
