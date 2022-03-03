import { Box } from '@mui/system';
import { ThemeContext } from '../../context/ThemeContext';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModelAgain } from '../../redux/actions/model';
import { IRootState } from '../../redux/reducers';


export interface IThemeItemProps {}
interface themeImgProps {
  themeImg: {
    image: string;
    label: string;
    id: string;
    bgColor: string;
  };
}
export default function ThemeItem({ themeImg }: themeImgProps) {
  const model = useSelector((state: IRootState) => state.models.model);
  const dispatch = useDispatch();
  const value = React.useContext(ThemeContext);

  const { backgroundUrl, setBackgroundUrl }: any = value;

  const handleClick = () => {
    setBackgroundUrl(themeImg.bgColor);
    localStorage.setItem('backGround', JSON.stringify(themeImg.bgColor));
    dispatch(setModelAgain(!model));
  };

  // useEffect(() => {
  //   document.body.style.background = `${backgroundUrl}`;
  // }, [backgroundUrl]);

  return (
    <Box className="theme__item">
      <Box className="theme__item__img">
        <Box component="img" src={themeImg.image} />
      </Box>
      <Box className="theme__item__label">{themeImg.label}</Box>

      <Box
        className="theme__item__button"
        sx={{ bgcolor: `${backgroundUrl}` }}
        onClick={handleClick}
      >
        <span>Áp dụng</span>
      </Box>
    </Box>
  );
}
