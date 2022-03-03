import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRunning } from '../../redux/actions/music';
import { IRootState } from '../../redux/reducers';


export default function Search () {
    const dispatch = useDispatch();
    const searchMusics = useSelector((state: IRootState) => state.music.searchMusic);
    
    const topMatching = searchMusics[0];   
    const handleRunning = (music:any) => {
        dispatch(setRunning(music))
    }
  return (
    <div className="search">
        {
            topMatching ? 
            <div className="search__first">
                <div className="search__first__heading">
                    Top kết quả <span>{`" ${topMatching.name} "`}</span>
                </div>

                <div className="search__first__body">
                    <div className="search__first__body__img">
                        <Box component="img" className="search__first__body__img__song" src={topMatching.image}/>
                        <span className="search__first__body__img__action">
                            <PlayCircleOutlineIcon className="search__first__body__img__action__icon" onClick={() => handleRunning(topMatching)} />
                        </span>
                    </div>
                    <div className="search__first__body__detail">
                        <div className="search__first__body__detail__name">{topMatching.name}</div>
                        <div className="search__first__body__detail__singer">{topMatching.singer}</div>
                    </div>
                </div>
            </div>
            : ''
        }

        <div className="search__list">
            <div className="search__list__heading">Bài hát</div>
            {
                searchMusics.map((music:any) => {
                    return (
                        <div className="search__list__item" key={music.id}>
                            <div className="search__list__item__info">
                                <Box component="img" className="search__list__item__info__img" src={music.image} />
                                <div className="search__list__item__info__detail">
                                    <div className="search__list__item__info__detail__song">{music.name}</div>
                                    <div className="search__list__item__info__detail__singer">{music.singer}</div>
                                </div>
                            </div>

                            <div className="search__list__item__action">
                                <PlayCircleOutlineIcon className="search__list__item__action__icon"/>

                                <FavoriteBorderIcon className="search__list__item__action__icon"/>
                                <span>...</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}
