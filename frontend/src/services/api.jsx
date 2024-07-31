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
    return axios.post(`/admin/mountain/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const Login = (username, password_hash) => {
    return axios.post('/login', {
        username,
        password_hash
    })
}

const InforUser = (token) => {
    return axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
const Register = (username, password_hash, full_name, email) => {
    return axios.post('/register', {
        username,
        password_hash,
        full_name,
        email
    })
}

export { showMountain, addMountain, deleteMountain, updateMountain, Login, Register, InforUser };
