import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
export const ROUTE_LIST__BOTTOM = [
  {
    id: 1,
    label: 'Nhạc mới',
    path: '/musicnew',
    icon: <MusicNoteRoundedIcon />,
  },
  {
    id: 2,
    label: 'Thể loại',
    path: '/typemusic',
    icon: <WorkspacesIcon />,
  },
  {
    id: 3,
    label: 'Top100',
    path: '/top100',
    icon:  <StarBorderIcon />
  },
  {
    id: 4,
    label: 'Mv',
    path: '/mv',
    icon:  <VideoLibraryIcon />
  },

];
