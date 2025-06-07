fetch("http://localhost:3000/v1/role")
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
