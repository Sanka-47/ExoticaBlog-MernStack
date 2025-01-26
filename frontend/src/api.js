import axios from "axios";

const URL = "http://localhost:3000";

export async function getPosts() {
  const response = await axios.get(`${URL}/posts`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function getPost(id) {
    // "http://localhost : 3000/posts/12345 "
    const response = await axios.get(`${URL}/posts/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function createPost(post) {
    const response = await axios.post(`${URL}/posts`,post);
   return response
}
export async function updatePost(id, post) {
    const response = await axios.put(`${URL}/posts/${id}`,post);
   return response
}

export async function deletePost(id) {
    //"http : / / localhost : 3000/ posts/ 12345 "
    const response = await axios.delete(`${URL}/posts/${id}`);
   return response
}

export async function getUser(id) {
  // "http://localhost : 3000/users/12345 "
  const response = await axios.get(`${URL}/users/${id}`);
if (response.status === 200) {
  return response.data;
} else {
  return;
}
}
export async function createUser(user) {
  const response = await axios.post(`${URL}/users`,user);
 return response
}
export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`,user);
 return response
}

export async function verifyUser(user) {
  try {
    const response = await axios.post(`${URL}/users/login`, user);
    console.log('Login response:', response.data);
    
    if (response.data.success) {
      return response.data.token;
    } else {
      return 
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error processing login request');
    }
  }
}



// export async function verifyUser(user){
//   const response = await axios.post(`${URL}/users/login`)
//   if(response.data.success){
//     return response.data.user
//   }else{
//     console.log(response)
//     throw new Error(response.data.statusText)
    
//   }
// }
