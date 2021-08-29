import { Location } from "history";
import { RouteComponentProps } from "react-router-dom";

export interface RouteLocation extends Location<any> {
  query: { [key: string]: string | undefined };
}

export interface RouteProps extends RouteComponentProps {
  location: RouteLocation;
}
