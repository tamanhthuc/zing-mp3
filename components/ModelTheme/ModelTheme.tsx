import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModelAgain } from '../../redux/actions/model';
import { IRootState } from '../../redux/reducers';
import { ThemeContext } from '../../context/ThemeContext';
import { themes } from './fakeTheme';
import ThemeItem from './ThemeItem';

export default function ModelTheme() {
  const dispatch = useDispatch();
  const modelNow = useSelector((state:IRootState) => state.models.model);
  const [model, setModel] = useState(modelNow);
  const handleModel = () => {
    // setModel(!model);
    dispatch(setModelAgain(!model));
  }
  const value = useContext(ThemeContext)
  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.stopPropagation();
  }

  return (
    <Box className="model" sx={{bgcolor:"#fff"}} onClick={handleBoxClick}>
      <div className="model__header">
        <div className="model__header__title">Giao Diện</div>
        <div className="model__header__close" >
          <CloseIcon className="model__header__close__icon"onClick={handleModel}  />
        </div>
      </div>

      <div className="model__main">
          {themes?.map(theme => {
            return (
              <div className="model__main__item" key={theme.id}>
                <div className="model__main__item__title">{theme.name}</div>
                <Grid container >

               {theme?.list?.map(themeImg => {
                 return (
                   <Grid item key={themeImg.id} xs={2}>

                     <ThemeItem themeImg={themeImg}  />
                   </Grid>
                 )
               })}
                </Grid>
              </div>

              
            )
          })}

      </div>
    </Box>
  );
}
