export const setModelAgain = (model: boolean) => {
  return {
    type: 'SET_MODEL',
    payload: model,
  };
};

export const setMore = (more: boolean) => {
  return {
    type: 'SET_MORE',
    payload: more,
  };
};

export const setSongModel = (songModel: any) => {
  return {
    type: 'Set_Song_Model',
    payload: songModel,
  };
};

export const isSignIn = (isSign: boolean) => {
  return {
    type: 'Is_SignIn',
    payload: isSign,
  };
};

export const setSingerModel = (singerModel: any) => {
  return {
    type: 'Set_Singer_Model',
    payload: singerModel,
  };
};
