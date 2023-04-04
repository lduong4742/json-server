const courseApi= 'http://localhost:3000/course';
let courseList = [];

const getCourse = async () => {
    const resData = await fetch(courseApi);
    courseList = await resData.json();
    renderCourse(courseList);
};

const getCourseById = async (id) => {
    const resData = await fetch(courseApi + '/' + id);
    const course = await resData.json();
    return course;
};

const renderCourse = (courses) => {
    const listElement = document.querySelector('.course-list');
    const html = courses.map(course => `
        <li class="course">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button class="delete-btn" onclick="handleDeleteCourse(${course.id})">Delete</button>
            <button class="delete-btn" onclick="handleEditCourse(${course.id})">edit</button>
        </li>
    `).join('');
    listElement.innerHTML = html;
}

const handleAddCourse = () => {
    const addBtn = document.querySelector('.btn');
    addBtn.addEventListener('click', addCourse);
};

const handleEditCourse = async (id) => {
    const currentCourse = await getCourseById(id);
    document.querySelector('#course-name').value = currentCourse.name;
    document.querySelector('#course-description').value = currentCourse.description;
    const editBtn = document.querySelector('.btn');
    editBtn.textContent = 'Edit';
    editBtn.removeEventListener('click', addCourse);
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        editCourse(id);
    });
};

const handleDeleteCourse = (id) => {
    deleteCourse(id);
}

const addCourse = () => {
    const name = document.querySelector('#course-name').value;
    const description = document.querySelector('#course-description').value;
    if (name && description) {
        const formData = {
            name: name,
            description: description
        };
        fetch(courseApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
    }
};

const editCourse = (id) => {
    const name = document.querySelector('#course-name').value;
    const description = document.querySelector('#course-description').value;
    if (name && description) {
        const formData = {
            name: name,
            description: description
        };
        fetch(courseApi + '/' + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
    }
};

const deleteCourse = (id) => {
    fetch(courseApi + '/' + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
};

const start = () => {
    getCourse();
    handleAddCourse();
}

start();