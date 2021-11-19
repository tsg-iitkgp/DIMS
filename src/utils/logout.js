
export default function logout(history) {
    localStorage.removeItem('authToken');
    history.push('/login');
}
