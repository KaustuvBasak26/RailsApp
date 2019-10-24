import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home";
import Books from "../components/Books";

export default(
	<Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/books" exact component={Books} />
		</Switch>
	</Router>
);
