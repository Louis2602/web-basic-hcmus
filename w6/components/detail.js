export default {
	props: ['person'],
	template: `
    <div class="d-flex align-items-center justify-content-center flex-column my-3">
        <h2>{{ person.first_name + " " + person.last_name}}</h2>
        <img :src="person.avatar" alt="Avatar" width="400" height="400" />    
        <h4>{{ person.email }}</h4>
    </div>
    `,
};
