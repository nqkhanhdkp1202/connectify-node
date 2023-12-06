import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const useDialog = () => {
  return useContext(DialogContext);
};

export const DialogProvider = ({ children }) => {
  const [updateDialog, setUpdateDialog] = useState(false);

  const openDialog = () =>{
    setUpdateDialog(true);
  }

  const closeDialog = () =>{
    setUpdateDialog(false);
  }

  return (
    <DialogContext.Provider value={{ updateDialog, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
