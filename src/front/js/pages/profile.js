import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>User Profile:</h1>
			{typeof store.user.id !== "undefined" ? (
				<div className="row">
					<div className="col">
						<img src={store.user.photo} className="img-fluid" />
					</div>
					<div className="col">
						<p>
							Email:&emsp;
							{store.user.email}
						</p>
						<p>
							User ID:&emsp;
							{store.user.id}
						</p>
					</div>
				</div>
			) : (
				<h3>No User Profile</h3>
			)}
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
