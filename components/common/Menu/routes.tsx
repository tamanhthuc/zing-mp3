import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
export  const ROUTE_LIST = [
    {
        id: 1,
        label:'Cá Nhân',
        path: '/mymusic',
        icon: <MusicVideoIcon />
    },
    {
        id: 2,
        label:'Khám phá',
        path: '/',
        icon:  <AlbumIcon />
    },
    {
        id: 3,
        label:'#zingchart',
        path: '/zingchart',
        icon: <TimelineRoundedIcon />
    },
    {
        id: 4,
        label:'Radio',
        path: '/radio',
        icon: <LibraryMusicTwoToneIcon />
    },
    {
        id: 5,
        label:'Theo dõi',
        path: '/follow',
        icon: <ListOutlinedIcon />
    },
  

]