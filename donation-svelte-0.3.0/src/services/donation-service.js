import { goto } from "$app/navigation";
import axios from "axios";
import { user } from "../stores";

export const donationService = {
	baseUrl: "http://localhost:4000",

	async login(email, password) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
			if (response.data.success) {
				user.set({
					email: email,
					token: response.data.token
				});
				localStorage.donation = JSON.stringify({ email: email, token: response.data.token });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async logout() {
		user.set({
			email: "",
			token: ""
		});
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.removeItem("donation");
	},

	async signup(firstName, lastName, email, password) {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + "/api/users", userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	checkPageRefresh() {
		if (!axios.defaults.headers.common["Authorization"]) {
			const donationCredentials = localStorage.donation;
			if (donationCredentials) {
				const savedUser = JSON.parse(donationCredentials);
				user.set({
					email: savedUser.email,
					token: savedUser.token
				});
				axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
			}
		}
	},

	async donate(donation) {
		try {
			const response = await axios.post(this.baseUrl + "/api/candidates/" + donation.candidate + "/donations", donation);
			return response.status == 200;
		} catch (error) {
			return false;
		}
	},

	async getCandidates() {
		try {
			const response = await axios.get(this.baseUrl + "/api/candidates");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getDonations() {
		try {
			const response = await axios.get(this.baseUrl + "/api/donations");
			return response.data;
		} catch (error) {
			return [];
		}
	}
};
