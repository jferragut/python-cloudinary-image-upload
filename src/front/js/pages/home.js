import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

const base_url = "https://3001-moccasin-horse-vb4tx7a0.ws-us03.gitpod.io";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [file, setFile] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState(null);

	const handleSubmit = e => {
		e.preventDefault();
		let data = new FormData();
		let payload = {
			email: email,
			password: password,
			photo: file
		};
		for (let key in payload) {
			if (key === "photo") {
				data.append("photo", payload[key]);
			} else {
				data.append(key, payload[key]);
			}
		}
		console.log(data);

		fetch(`${base_url}/api/user/`, {
			method: "POST",
			body: data
		})
			.then(resp => resp.json())
			.then(data => {
				setStatus(data);
				actions.setUser(data.user);
			})
			.catch(err => console.error(err));
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center mt-5">
			<h1>Cloudinary Upload Example</h1>
			<form onSubmit={handleSubmit} className="p-5 border text-center">
				<div className="row pb-3 text-left">
					<label htmlFor="email" className="col">
						Email
					</label>
					<input type="email" id="email" className="col" onChange={e => setEmail(e.target.value)} />
				</div>
				<div className="row pb-3 text-left">
					<label htmlFor="password" className="col">
						Password
					</label>
					<input
						type="password"
						id="password"
						className="col form-control"
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className="row pb-3 text-left">
					<label htmlFor="photo" className="col">
						Profile Photo
					</label>
					<input
						type="file"
						id="photo"
						className="col form-control"
						onChange={e => setFile(e.target.files[0])}
					/>
				</div>

				<input className="btn btn-primary form-control mt-4" type="submit" value="Create User" />
			</form>
			{status !== null && (
				<div className="alert alert-info" role="alert">
					{status.msg}
				</div>
			)}
		</div>
	);
};
