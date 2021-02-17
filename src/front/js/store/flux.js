const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {}
		},
		actions: {
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			setUser: user => {
				const store = getStore();
				store.user = user;
				setStore(store);
			}
		}
	};
};

export default getState;
