export default {
	data() {
		return {
			form: {
				searchInput: '',
			},
		};
	},
	template: `
		<nav class="navbar navbar-light bg-light justify-content-between">
			<a style="cursor: pointer;" class="navbar-brand font-weight-bold" href="index.html">Home</a>
			<form class="form-inline" @submit.prevent="submit">
				<input
					class="form-control mr-sm-2"
					type="search"
					placeholder="Search"
					aria-label="Search"
					v-model="form.searchInput"
					id="searchInput"
				/>
				<button
					class="btn btn-outline-success my-2 my-sm-0"
					type="submit"
					id="searchButton"
				>
					Search
				</button>
			</form>
		</nav>
    `,
	methods: {
		async submit() {
			this.$emit('search', this.form);
		},
	},
};
