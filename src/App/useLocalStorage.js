import React from 'react';

const Action = {
  error: Symbol('error'),
  success: Symbol('success'),
  save: Symbol('save'),
  sync: Symbol('sync'),
}

const reducer = (state, action) => {
  switch (action.type) {
    case Action.error:
      return {
        ...state,
        error: true,
      };
    case Action.success:
      return {
        ...state,
        loading: false,
        sinchronizedItem: true,
        error: false,
        item: action.payload
      };
    case Action.save:
      return {
        ...state,
      };
    case Action.sync:
      return {
        ...state,
        loading: true,
        sinchronizedItem: false
      };
    default:
      return {
        ...state
      };
  }
}

const initialState = (initialValue) => ({
  sinchronizedItem: false,
  error: false,
  loading: true,
  item: initialValue,
});

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState(initialValue));

  const { 
    sinchronizedItem,
    error,
    loading,
    item
  } = state;

  const onError = (error) => {
    dispatch({ type: Action.error, payload: error })
  }

  const onSuccess = item => {
    dispatch({ type: Action.success, payload: item })
  }

  const onSave = item => {
    dispatch({ type: Action.success, payload: item })
  }

  const onSynchronize = () => {
    dispatch({ type: Action.sync })
  }
  
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem)
      } catch (error) {
        onError(error)
      }
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sinchronizedItem]);
  
  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch(error) {
      onError(error);
    }
  };

  const sinchronizeItem = () => {
    onSynchronize()
  }

  return {
    item,
    saveItem,
    loading,
    error,
    sinchronizeItem
  };
}

export { useLocalStorage };
