import { Container, MenuItem, MenuList } from "@material-ui/core";
import React, { useEffect } from "react";
import { RouteProps } from "../../interfaces/route";
import routes from "../../routes";
import "./style.less";

interface IProps extends RouteProps {}

// interface IState {}

const Home: React.FC<IProps> = (props: IProps) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="home">
      <Container maxWidth="sm">
        <MenuList>
          {routes.map((route) => (
            <MenuItem key={route["path"]} onClick={() => props.history.push(route["path"])}>
              {route["title"]}
            </MenuItem>
          ))}
        </MenuList>
      </Container>
    </div>
  );
};

export default Home;
