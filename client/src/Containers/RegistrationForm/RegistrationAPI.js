const baseUrl = 'http://localhost:3001';

async function Register(user) {
  try {
    const res = await fetch(`${baseUrl}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
  }
}

module.exports = { Register };
