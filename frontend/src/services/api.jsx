import axios from "./Axios";

const showMountain = () => {
    return axios.get('admin/mountain');
}

const addMountain = (name, description, latitude, longitude, altitude, country, region, img) => {
    return axios.post('admin/mountain/addnew', {
        name,
        description,
        latitude,
        longitude,
        altitude,
        country,
        region,
        img
    }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const deleteMountain = (id) => {
    return axios.delete(`admin/mountain/delete/${id}`)
}


const updateMountain = (id, name, description, latitude, longitude, altitude, country, region, image) => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('altitude', altitude);
    formData.append('country', country);
    formData.append('region', region);
    if (image) {
        formData.append('image', image);
    }
    return axios.post(`admin/mountain/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const ListUser = () => {
    return axios.get('users');
}
const role = () => {
    return axios.get('/user/role')
}
const changeRole = (id, role) => {
    return axios.post(`user/role/${id}`, {
        role
    })
}
const Login = (username, password) => {
    return axios.post('/login', {
        username,
        password
    });
}

const InforUser = (token) => {
    return axios.get('user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
const Register = (username, password, full_name, email) => {
    return axios.post('register', {
        username,
        password,
        full_name,
        email
    })
}
const updateProfile = (id, full_name, email, gender, img, dob, address) => {
    let formData = new FormData();
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('address', address);
    if (img) {
        formData.append('img', img);
    }
    return axios.post(`user/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const changePass = (id, newpassword) => {
    return axios.post(`user/changepass/${id}`, {
        newpassword
    });
}

const count = () => {
    return axios.get('count')
}

const ListGroups = () => {
    return axios.get('groups')
}

const GroupComment = (id) => {
    return axios.get(`groups/comments/${id}`)
}

const UserComment = (groupid, userid, content, rating) => {
    return axios.post(`groups/${groupid}/user/${userid}/comment`, {
        content,
        rating
    })
}
const UpdateUserComment = (commentid, content, rating) => {
    return axios.post(`comments/${commentid}`, {
        content,
        rating
    })
}
const DeleteUserComment = (commentid) => {
    return axios.delete(`comments/${commentid}`)
}
const listCategory = () => {
    return axios.get('blog/category')
}
const listPosts = () => {
    return axios.get('blog')
}
const AddPost = (title, content, category, author_id) => {
    return axios.post('blog/add', {
        title,
        content,
        category,
        author_id
    })
}
const updatePost = (id, title, content, category) => {
    return axios.post(`/blog/update/${id}`, {
        title,
        content,
        category
    });
};
const deletePost = (id) => {
    return axios.delete(`/blog/delete/${id}`);
};
const postcategory = () => {
    return axios.get('/post-category-analytics');
}
const commentGroup = () => {
    return axios.get('/comment-counts');
}
const pageview = (token) => {
    return axios.get('/record-visit', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
const totalvisit = () => {
    return axios.get('/totalvisit');
}
const showcomment = () => {
    return axios.get('/comments');
}
const deletecomment = (id) => {
    return axios.delete(`/comments/${id}`);
}
const showStory = () => {
    return axios.get('/story')
}
const createStory = (title, content, author_id, location_id, image) => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author_id', author_id);
    formData.append('location_id', location_id);
    if (image) {
        formData.append('image', image);
    }
    return axios.post(`/story/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
const contact = (user_id, contact_phone, message) => {
    return axios.post('/contact/send', {
        user_id,
        contact_phone,
        message
    });
}
export {
    showMountain,
    addMountain,
    deleteMountain,
    updateMountain,
    Login,
    Register,
    InforUser,
    updateProfile,
    changePass,
    count,
    ListUser,
    role,
    changeRole,
    ListGroups,
    GroupComment,
    UserComment,
    UpdateUserComment,
    DeleteUserComment,
    listCategory,
    listPosts,
    AddPost,
    updatePost,
    deletePost,
    postcategory,
    commentGroup,
    pageview,
    totalvisit,
    showcomment,
    deletecomment,
    showStory,
    createStory,
    contact
};
