import React, { useState } from "react";
interface id{
    Id: string,
    setId: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    setName:  React.Dispatch<React.SetStateAction<string>>
}

const AppContext = React.createContext<id | null>(null);

export default AppContext;
