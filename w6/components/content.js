import Pagination from './pagination.js';
import PersonDetail from './detail.js';

export default {
	props: ['persons', 'pages', 'currentPageSearch'],
	components: {
		Pagination,
		PersonDetail,
	},
	data() {
		return {
			currentPage: 1, // Initialize the current page
			rowClick: false,
			person: {},
		};
	},
	template: `
        <div class="row" style="flex: 1">
			<!-- Side Container -->
			<div class="col-md-3 p-3">
				<div class="border rounded h-100">
					<div style="background-color: #f7f7f7; color: #11caf0; font-size: 20px;" class="p-3 font-weight-bold border-bottom">Side</div>
					<div class="p-3">
						<p>...</p>
					</div>
				</div>
			</div>

			<!-- Main Container -->
			<div class="col-md-9 p-3">
				<div class="border rounded h-100">
					<div style="background-color: #f7f7f7; color: #11caf0; font-size: 20px;" class="p-3 font-weight-bold border-bottom">Main</div>
					<PersonDetail v-if="rowClick" :person="person"/>
					<div v-else class="p-3">
						<table  class="table-striped w-100">
							<thead class="text-black font-weight-bold" style="background-color: #cfe2ff; border-bottom: 2px solid #000 !important;">
								<tr>
									<th>ID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Avatar</th>
								</tr>
							</thead>
							<tbody>
								<!-- User data will be appended here -->
								<tr v-for="(person, index) in persons" :key="index" @click="showInfo(person)" style="cursor: pointer;">
									<td class="font-weight-bold">{{ person.id }}</td>
									<td>{{ person.first_name }}</td>
									<td>{{ person.last_name }}</td>
									<td>{{ person.email }}</td>
									<td><img :src="person.avatar" alt="Avatar" /></td>
								</tr>
							</tbody>
						</table>
						<!-- Pagination -->
						<div class="col-md-12">
							<Pagination :pages="pages.totalPages" :currentPage="currentPageSearch" @page-change="loadPage" />
						</div>
					</div>
				</div>
			</div>
		</div>
    `,
	methods: {
		loadPage(page) {
			this.$emit('page-change', page);
		},
		showInfo(person) {
			this.rowClick = true;
			this.person = person;
		},
	},
};
