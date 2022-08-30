import React from "react";
import {RouteMatch} from "react-router-dom";

export const DeepRouteMatchesContext = React.createContext<RouteMatch[]>([]);
