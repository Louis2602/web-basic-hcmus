let currentPage = 1;
let totalPages = 0;

const fetchUser = async (page, search = '') => {
	try {
		const response = await fetch(
			`https://reqres.in/api/users?page=${page}&q=${search}`
		);
		const users = await response.json();
		totalPages = users.total_pages;

		const userTableBody = $('#userTableBody');
		userTableBody.empty();

		users.data.forEach((user, index) => {
			if (
				search === '' ||
				user.first_name.toLowerCase().includes(search.toLowerCase()) ||
				user.last_name.toLowerCase().includes(search.toLowerCase()) ||
				user.email.toLowerCase().includes(search.toLowerCase())
			) {
				userTableBody.append(`
            <tr>
                <td>${user.id}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td><img src="${user.avatar}" alt="Avatar" width="150" height="150"></td>
            </tr>
        `);
			}
		});

		updatePagination();
	} catch (err) {
		console.log(`An error has occurred: ${err}`);
	}
};

const updatePagination = () => {
	$('#currentPage').text(currentPage);
	$('#totalPages').text(totalPages);
	generatePaginationLinks();
};

const generatePaginationLinks = () => {
	const pagination = $('#pagination');
	pagination.empty();

	const previousPageLink = `
        <li class="page-item" id="previousPage">
            <a class="page-link">
                <i class="fa-solid fa-angles-left fa-sm"></i>
            </a>
        </li>
    `;

	pagination.append(previousPageLink);

	pagination.find('#previousPage').on('click', () => {
		if (currentPage > 1) {
			navigateToPage(currentPage - 1);
		}
	});

	const prevButton = pagination.find('#previousPage a');
	if (currentPage > 1) {
		prevButton.addClass('text-primary');
	} else {
		prevButton.addClass('text-muted');
	}

	const nextPageLink = `
        <li class="page-item" id="nextPage">
            <a class="page-link">
                <i class="fa-solid fa-angles-right fa-sm"></i>
            </a>
        </li>
    `;

	pagination.append(nextPageLink);

	const nextButton = pagination.find('#nextPage a');

	if (currentPage < totalPages) {
		nextButton.addClass('text-primary');
	} else {
		nextButton.addClass('text-muted');
	}

	pagination.find('#nextPage').on('click', () => {
		if (currentPage < totalPages) {
			navigateToPage(currentPage + 1);
		}
	});

	for (let page = 1; page <= totalPages; page++) {
		const pageLink = `
            <li class="page-item ${page === currentPage ? 'active' : ''}">
                <a class="page-link" href="#">${page}</a>
            </li>
        `;

		$(pageLink).insertBefore('#nextPage');

		pagination.find(`li:nth-child(${page + 1})`).on('click', () => {
			navigateToPage(page);
		});
	}
};

const navigateToPage = (page) => {
	if (page >= 1 && page <= totalPages) {
		currentPage = page;
		fetchUser(currentPage);
	}
};

$(document).ready(function () {
	fetchUser(currentPage);
	let currentSearchTerm = '';

	const searchInput = $('#searchInput');
	searchInput.on('change', function () {
		currentSearchTerm = searchInput.val();
		if (currentSearchTerm.length > 0) {
			$('#searchButton').on('click', function () {
				fetchUser(currentPage, currentSearchTerm);
			});
		} else {
			fetchUser(currentPage);
		}
	});
});
