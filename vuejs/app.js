import Top from './components/top.js';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Content from './components/content.js';

export default {
	data() {
		return {
			persons: [],
			page: 1,
			per_page: 2,
			pages: {},
		};
	},
	components: {
		Top,
		Header,
		Footer,
		Content,
	},
	methods: {
		async fetchData(page) {
			try {
				const res = await fetch(
					`https://reqres.in/api/users?page=${page}&per_page=${this.per_page}`
				);

				const data = await res.json();
				this.persons = data.data;
				this.pages = {
					page: page,
					totalPages: data.total_pages,
					per_page: this.per_page,
				};
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		},
		changePage(page) {
			this.page = page;
			this.fetchData(page);
		},
		handleSearch(form) {
			const searchInput = form.searchInput;

			// Parse the search input as an integer
			const pageNumber = parseInt(searchInput, 10);

			// Check if the parsed page number is a valid number and greater than 0
			if (!isNaN(pageNumber) && pageNumber > 0) {
				this.page = pageNumber;
			}
			this.fetchData(this.page);
		},
	},
	async mounted() {
		await this.fetchData(this.page);
	},
	template: `
    <div class="container-fluid py-2"> 
    <Top/>
        <Header @submit="handleSearch"/>
        <Content :persons="displayedPersons" :pages="pages" @page-change="changePage" :currentPageSearch="page"/>
        <Footer/>
    </div>
    `,
	computed: {
		displayedPersons() {
			return this.persons;
		},
	},
};
